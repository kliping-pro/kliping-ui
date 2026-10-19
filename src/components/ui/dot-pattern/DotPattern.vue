<script setup lang="ts">
/**
 * Latar bertitik yang mengisi seluruh induknya.
 *
 * Jumlah titiknya bergantung ukuran wadahnya, jadi ukurannya diamati dengan
 * `ResizeObserver` — bukan pendengar `resize` di `window` seperti di sumbernya.
 * Bedanya nyata: wadah yang berubah ukuran karena tata letak di sekitarnya
 * bergeser — sidebar dibuka, panel dilipat — tidak memicu `resize` di window
 * sama sekali, dan titiknya akan berhenti mengisi separuh ruang tanpa sebab
 * yang terlihat.
 *
 * Saat `glow` menyala, tiap titik berdenyut dengan delay dan durasi acaknya
 * sendiri. Denyutnya CSS murni — satu halaman bisa memuat ratusan titik, dan
 * menggerakkan ratusan nilai tiap frame di JavaScript membuat halaman tersendat
 * tanpa menambah apa pun yang terlihat.
 *
 * Induknya harus `position: relative`.
 */
import { computed, onMounted, onScopeDispose, ref, useId, useTemplateRef } from 'vue'
import type { CSSProperties, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** The horizontal spacing between dots. */
  width?: number
  /** The vertical spacing between dots. */
  height?: number
  /** The horizontal offset of each dot within its cell. */
  cx?: number
  /** The vertical offset of each dot within its cell. */
  cy?: number
  /** The radius of each dot. */
  cr?: number
  /** Makes the dots pulse. */
  glow?: boolean
}>(), {
  width: 16,
  height: 16,
  cx: 1,
  cy: 1,
  cr: 1,
  glow: false,
})

const id = useId()
const svg = useTemplateRef<SVGSVGElement>('svg')
const size = ref({ width: 0, height: 0 })

onMounted(() => {
  const el = svg.value
  if (!el)
    return

  const observer = new ResizeObserver(([entry]) => {
    const rect = entry.contentRect
    size.value = { width: rect.width, height: rect.height }
  })

  observer.observe(el)
  onScopeDispose(() => observer.disconnect())
})

const dots = computed(() => {
  const cols = Math.ceil(size.value.width / props.width)
  const rows = Math.ceil(size.value.height / props.height)
  if (cols <= 0 || rows <= 0)
    return []

  return Array.from({ length: cols * rows }, (_, i) => ({
    x: (i % cols) * props.width + props.cx,
    y: Math.floor(i / cols) * props.height + props.cy,
    // Delay dan durasi acak per titik. Dihitung sekali saat jumlah titiknya
    // berubah, bukan tiap render — kalau tidak, denyutnya akan tersentak ulang
    // dari awal setiap kali ada yang menyebabkan komponennya digambar lagi.
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`,
  }))
})
</script>

<template>
  <svg
    ref="svg"
    data-slot="dot-pattern"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full', props.class)"
  >
    <defs>
      <radialGradient :id="`${id}-gradient`">
        <stop offset="0%" stop-color="currentColor" stop-opacity="1" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle
      v-for="t in dots"
      :key="`${t.x}-${t.y}`"
      :cx="t.x"
      :cy="t.y"
      :r="cr"
      class="text-neutral-400/80"
      :class="glow && 'dot-glow-animate'"
      :fill="glow ? `url(#${id}-gradient)` : 'currentColor'"
      :style="glow ? ({ '--dot-delay': t.delay, '--dot-duration': t.duration } as CSSProperties) : undefined"
    />
  </svg>
</template>
