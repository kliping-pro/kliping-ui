<script setup lang="ts">
import AddToSetup from './AddToSetup.vue'
import { CheckIcon, CopyIcon, ExpandIcon } from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { withBase } from 'vitepress'
import { computed, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

/**
 * Satu varian: pratinjaunya digambar langsung, kodenya diambil saat diminta.
 *
 * Varian digambar inline, bukan di dalam iframe seperti block. Bedanya bukan
 * selera: sebuah block adalah halaman utuh dan sebagiannya memakai posisi
 * `fixed`, yang lolos dari `overflow-hidden` mana pun; sebuah varian cuma satu
 * komponen dan tidak punya masalah itu. Digambar inline, isinya ikut ke HTML
 * statis — jadi halamannya tetap terbaca sebelum JavaScript jalan.
 *
 * Kodenya lain cerita. Menyisipkan sumber tersorot ke halamannya yang dulu
 * membuat `docs:build` kehabisan memori, jadi yang dilakukan di sini sama
 * dengan yang dilakukan galeri block: berkasnya diambil dari
 * `/code/variants-<nama>.html` ketika tab Kode benar-benar dibuka, dan tidak
 * pernah masuk graf modul.
 *
 * Tiap varian juga punya halaman detailnya sendiri (`/variants/<nama>`) dengan
 * pratinjau selebar Desktop, Tablet, dan Mobile — tombol di sebelah namanya
 * membukanya.
 */
const props = defineProps<{
  name: string
  description?: string
  class?: string
}>()

const tab = ref<'preview' | 'code'>('preview')
const html = ref('')
const failed = ref(false)

watch(tab, async (current) => {
  if (current !== 'code' || html.value || failed.value)
    return

  try {
    const response = await fetch(withBase(`/code/variants-${props.name}.html`))
    if (!response.ok)
      throw new Error(String(response.status))
    html.value = await response.text()
  }
  catch {
    failed.value = true
  }
})

const { copy, copied } = useClipboard()

const heading = computed(() => props.description?.replace(/\.$/, '') ?? props.name)
</script>

<template>
  <div :id="name" :class="cn('kliping-variants scroll-mt-24', props.class)">
    <div class="flex flex-col gap-3 md:flex-row md:items-center">
      <Tabs v-model="tab">
        <TabsList class="kliping-segmented grid h-8 grid-cols-2 items-center p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
          <TabsTrigger value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <a :href="`#${name}`" class="flex-1 font-medium text-foreground text-sm no-underline hover:underline">
        {{ heading }}
      </a>

      <div class="flex items-center gap-2">
        <AddToSetup :name="name" size="icon-sm" />
        <Button as-child variant="outline" size="icon-sm" class="shadow-none" title="Open variant page">
          <a :href="withBase(`/variants/${name}`)">
            <ExpandIcon />
            <span class="sr-only">Open variant page</span>
          </a>
        </Button>
        <Button
          class="w-fit gap-1 px-2.5 shadow-none"
          size="sm"
          variant="outline"
          @click="copy(name)"
        >
          <CheckIcon v-if="copied" />
          <CopyIcon v-else />
          <span class="font-mono text-xs">{{ name }}</span>
        </Button>
      </div>
    </div>

    <div v-show="tab === 'preview'" class="mt-3 flex min-h-56 w-full items-center justify-center rounded-lg border p-8">
      <slot />
    </div>

    <div v-show="tab === 'code'" class="kliping-variants-code mt-3 overflow-hidden rounded-lg border">
      <div v-if="html" class="vp-doc" v-html="html" />
      <p v-else class="p-6 text-muted-foreground text-sm">
        {{ failed ? 'Could not load the source code.' : 'Loading code…' }}
      </p>
    </div>
  </div>
</template>
