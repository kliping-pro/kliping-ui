<script setup lang="ts">
import type { GalleryKind } from './gallery'
import { ArrowUpRightIcon, ExpandIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { CATALOG } from './gallery'

/**
 * Pratinjau sebuah isi galeri di halaman dokumentasinya.
 *
 * Kolom dokumentasi terlalu sempit untuk BlockViewer — bilah alatnya dirancang
 * untuk halaman selebar layar. Di sini kanvasnya dirender selebar layar desktop
 * di dalam iframe, lalu diskalakan pas ke lebar kolom: yang terlihat adalah
 * tampilan desktopnya yang sebenarnya, bukan tata seluler yang muncul kalau
 * iframe-nya dipersempit. Untuk melihat ukuran lain, kodenya, atau
 * memasangnya, ada tombol ke pratinjau penuhnya.
 *
 * Iframe-nya baru dimuat saat mendekati layar.
 */
const props = defineProps<{ kind: GalleryKind, name: string }>()

const catalog = computed(() => CATALOG[props.kind])

/** Lebar jendela maya: block dan template selebar desktop, isi kecil lebih sempit supaya tidak menciut. */
const WIDTHS: Record<GalleryKind, number> = { block: 1280, template: 1440, variant: 900, chart: 1024, hook: 900 }
const width = computed(() => WIDTHS[props.kind])
const height = computed(() => Number.parseInt(catalog.value.height(props.name)) || 720)

const container = ref<HTMLElement>()
const scale = ref(0.5)
let observer: ResizeObserver | undefined

function measure() {
  const w = container.value?.clientWidth
  if (w)
    scale.value = w / width.value
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
  <div class="not-prose my-6 flex flex-col overflow-hidden rounded-lg border">
    <div
      ref="container"
      class="relative w-full overflow-hidden bg-background"
      :style="{ height: `${height * scale}px` }"
    >
      <iframe
        :src="withBase(catalog.canvas(name))"
        :title="catalog.label(name)"
        loading="lazy"
        class="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
        :style="{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }"
        tabindex="-1"
      />
    </div>
    <div class="flex items-center justify-between gap-2 border-t px-3 py-2">
      <span class="truncate font-mono text-muted-foreground text-xs">{{ catalog.label(name) }}</span>
      <div class="flex shrink-0 items-center gap-1">
        <!-- `!`: gaya tautan `.vp-doc` tidak berlayer dan menang atas utility biasa. -->
        <Button as-child size="sm" variant="ghost" class="h-7 text-foreground! no-underline!">
          <a :href="withBase(catalog.canvas(name))" target="_blank" rel="noreferrer" title="Open in new tab">
            <ArrowUpRightIcon />
            <span class="sr-only sm:not-sr-only">New tab</span>
          </a>
        </Button>
        <Button as-child size="sm" variant="outline" class="h-7 text-foreground! no-underline!">
          <a :href="withBase(catalog.detailPage(name))">
            <ExpandIcon />
            Full preview
          </a>
        </Button>
      </div>
    </div>
  </div>
</template>
