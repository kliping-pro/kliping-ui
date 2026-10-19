<script setup lang="ts">
/**
 * Petak garis dengan kotak-kotak yang menyala lalu padam di posisi acak.
 *
 * Tiap kotak menyala, padam, lalu **pindah** ke petak lain dan mengulanginya.
 * Perpindahan itu yang membuat polanya tidak pernah terlihat berulang.
 *
 * Nyala-padamnya CSS: satu animasi yang dijalankan dua kali dengan arah
 * bolak-balik — sama persis dengan `repeat: 1` + `repeatType: "reverse"` di
 * sumbernya. Yang tersisa untuk JavaScript hanya satu hal, yaitu memindahkan
 * kotaknya setelah animasinya habis, dan itu dikerjakan dari `animationend`.
 *
 * `putaran` dinaikkan tiap kali kotak pindah, dan ikut jadi bagian `:key`-nya.
 * Tanpa itu Vue akan memakai ulang elemen yang sama dan animasinya — yang sudah
 * selesai — tidak pernah dijalankan lagi: kotaknya berpindah sekali lalu diam
 * selamanya di tempat barunya.
 *
 * Induknya harus `position: relative`.
 */
import { onMounted, onScopeDispose, ref, useId, useTemplateRef, watch } from 'vue'
import type { CSSProperties, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** The width of each grid cell. */
  width?: number
  /** The height of each grid cell. */
  height?: number
  /** The horizontal offset of the whole pattern. */
  x?: number
  /** The vertical offset of the whole pattern. */
  y?: number
  /** The dash pattern for the grid lines. */
  strokeDasharray?: number | string
  /** How many squares light up in turn. */
  numSquares?: number
  /** The maximum opacity of each square. */
  maxOpacity?: number
  /** The duration of one flash, in seconds. */
  duration?: number
}>(), {
  width: 40,
  height: 40,
  x: -1,
  y: -1,
  strokeDasharray: 0,
  numSquares: 50,
  maxOpacity: 0.5,
  duration: 4,
})

interface Square {
  id: number
  col: number
  row: number
  cycle: number
}

const id = useId()
const svg = useTemplateRef<SVGSVGElement>('svg')
const size = ref({ width: 0, height: 0 })
const squares = ref<Square[]>([])

function randomCell() {
  return {
    col: Math.floor((Math.random() * size.value.width) / props.width),
    row: Math.floor((Math.random() * size.value.height) / props.height),
  }
}

function rebuild() {
  squares.value = Array.from({ length: props.numSquares }, (_, i) => ({
    id: i,
    ...randomCell(),
    cycle: 0,
  }))
}

function relocate(k: Square) {
  const { col, row } = randomCell()
  k.col = col
  k.row = row
  k.cycle += 1
}

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

// Sebelum ukurannya terbaca, `petakAcak()` cuma bisa mengembalikan 0 — semua
// kotak akan menumpuk di pojok kiri atas. Jadi penyusunannya menunggu sampai
// wadahnya benar-benar punya ukuran.
watch([size, () => props.numSquares], () => {
  if (size.value.width > 0 && size.value.height > 0)
    rebuild()
}, { immediate: true })
</script>

<template>
  <svg
    ref="svg"
    data-slot="animated-grid-pattern"
    aria-hidden="true"
    :class="cn(
      'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
      props.class,
    )"
  >
    <defs>
      <pattern
        :id="id"
        :width="width"
        :height="height"
        :x="x"
        :y="y"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="`M.5 ${height}V.5H${width}`"
          fill="none"
          :stroke-dasharray="strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
    <svg :x="x" :y="y" class="overflow-visible">
      <rect
        v-for="(k, i) in squares"
        :key="`${k.id}-${k.cycle}`"
        :width="width - 1"
        :height="height - 1"
        :x="k.col * width + 1"
        :y="k.row * height + 1"
        fill="currentColor"
        stroke-width="0"
        :style="{
          '--grid-square-opacity': maxOpacity,
          animationName: 'grid-square-fade',
          animationDuration: `${duration}s`,
          animationDelay: `${i * 0.1}s`,
          animationIterationCount: 2,
          animationDirection: 'alternate',
          animationFillMode: 'backwards',
        } as CSSProperties"
        @animationend="relocate(k)"
      />
    </svg>
  </svg>
</template>
