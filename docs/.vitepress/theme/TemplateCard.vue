<script setup lang="ts">
import type { Template } from '@/lib/templates'
import { isLicensed } from '@/lib/templates'
import { ExpandIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/**
 * Satu template: pratinjaunya dibingkai iframe, keterangannya di bawahnya.
 *
 * Iframe, bukan gambar tangkapan layar — yang dilihat pembaca template yang
 * sesungguhnya, ikut tema yang sedang aktif, dan tidak akan basi saat
 * templatenya diperbaiki. Yang dibayar untuk itu satu permintaan halaman per
 * kartu, dan `loading="lazy"` menahannya sampai kartunya benar-benar
 * mendekati layar.
 *
 * Dibingkai pada lebar desktop lalu diperkecil, sama seperti pratinjau block:
 * navbar template membaca lebar layar lewat media query, dan di iframe selebar
 * kartu ia menganggap dirinya di ponsel sementara render servernya tidak.
 */
const props = defineProps<{ template: Template }>()

const WIDTH = 1440
const HEIGHT = 900

const container = ref<HTMLElement>()
const scale = ref(0.3)
let observer: ResizeObserver | undefined

function measure() {
  const width = container.value?.clientWidth
  if (width)
    scale.value = width / WIDTH
}

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (container.value)
    observer.observe(container.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg border">
    <a
      ref="container"
      class="relative block w-full overflow-hidden bg-background no-underline"
      :href="withBase(`/templates/${props.template.slug}/preview`)"
      :style="{ height: `${HEIGHT * scale}px` }"
    >
      <iframe
        class="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
        :height="HEIGHT"
        loading="lazy"
        :src="withBase(`/templates/${props.template.slug}`)"
        :style="{ transform: `scale(${scale})` }"
        :title="props.template.name"
        :width="WIDTH"
      />
    </a>

    <div class="flex flex-1 flex-col gap-3 border-t p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-semibold text-lg tracking-tight">
          {{ props.template.name }}
        </h3>
        <div class="flex shrink-0 items-center gap-1">
          <Button as-child class="size-7 rounded-full p-0" size="icon" title="Open Full" variant="ghost">
            <a
              :href="withBase(`/templates/${props.template.slug}`)"
              rel="noreferrer"
              target="_blank"
            >
              <ExpandIcon />
              <span class="sr-only">Open Full</span>
            </a>
          </Button>
        </div>
      </div>

      <p class="text-muted-foreground text-sm">
        {{ props.template.description }}
      </p>

      <!-- Asal & status lisensi tiap template, apa adanya; rinciannya di /credits#template. -->
      <p class="text-muted-foreground text-xs">
        Based on
        <a
          class="underline"
          :href="`https://github.com/${props.template.repo}`"
          rel="noreferrer"
          target="_blank"
        >{{ props.template.repo }}</a>
        —
        <template v-if="isLicensed(props.template)">
          {{ props.template.license.type }}, {{ props.template.license.copyright }}.
        </template>
        <template v-else>
          license not stated by the original author.
        </template>
        <a class="underline" :href="withBase('/credits#template')">Credits</a>
      </p>

      <div class="mt-auto flex flex-wrap gap-1.5 pt-1">
        <Badge v-for="section in props.template.sections" :key="section" variant="secondary">
          {{ section }}
        </Badge>
      </div>
    </div>
  </div>
</template>
