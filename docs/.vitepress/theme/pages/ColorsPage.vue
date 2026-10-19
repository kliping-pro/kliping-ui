<script setup lang="ts">
import { CheckIcon } from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { useData, withBase } from 'vitepress'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { COLOR_FORMATS, getPalettes, colorValue, type ColorFormat } from '@/lib/colors'
import PageHeader from './PageHeader.vue'

/**
 * Palet Tailwind lengkap dalam beberapa format.
 *
 * Datanya berkas statis yang ikut dibundel — 22 palet, 11 tingkat masing-masing.
 * Format yang dipilih berlaku untuk seluruh halaman: yang dicari pembaca di sini
 * biasanya satu format untuk satu project, bukan format berbeda tiap warna.
 */
const { frontmatter } = useData()

const palettes = getPalettes()
const format = ref<ColorFormat>('hex')
const { copy, copied, text: copiedText } = useClipboard()

const LABEL: Record<ColorFormat, string> = {
  className: 'Class',
  hex: 'HEX',
  rgb: 'RGB',
  hsl: 'HSL',
  oklch: 'OKLCH',
  var: 'CSS var',
}
</script>

<template>
  <PageHeader :title="frontmatter.title" :description="frontmatter.description">
    <template #actions>
      <Button as-child size="sm">
        <a href="#colors">Browse Colors</a>
      </Button>
      <Button as-child variant="ghost" size="sm">
        <a :href="withBase('/theming')">Documentation</a>
      </Button>
    </template>
  </PageHeader>

  <div id="colors" class="section-soft flex-1 scroll-mt-24">
    <div class="container-wrapper">
      <div class="container flex flex-col gap-8 py-8">
        <div class="flex flex-wrap items-center gap-1.5">
          <Button
            v-for="f in COLOR_FORMATS"
            :key="f"
            size="sm"
            :variant="format === f ? 'secondary' : 'ghost'"
            class="h-7 shadow-none"
            @click="format = f"
          >
            {{ LABEL[f] }}
          </Button>
        </div>

        <section v-for="p in palettes" :id="p.name" :key="p.name" class="scroll-mt-24">
          <h2 class="mb-3 text-sm font-medium capitalize">
            {{ p.name }}
          </h2>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-11">
            <button
              v-for="w in p.colors"
              :key="w.id"
              type="button"
              class="group flex flex-col gap-1 text-left"
              :title="`Copy ${colorValue(w, format)}`"
              @click="copy(colorValue(w, format))"
            >
              <span
                class="flex h-12 items-center justify-center rounded-md text-xs font-medium transition-transform group-hover:scale-[1.02]"
                :style="{ background: w.hex, color: w.foreground }"
              >
                <CheckIcon v-if="copied && copiedText === colorValue(w, format)" class="size-4" />
              </span>
              <span class="text-muted-foreground px-0.5 text-[0.7rem] tabular-nums">{{ w.scale }}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
