<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { MarqueeDirection, MarqueeOrientation, MarqueeSide } from './context'
import { useResizeObserver } from '@vueuse/core'
import { Primitive, useDirection } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { provideMarqueeContext } from './context'

/**
 * Deretan isi yang berjalan sendiri tanpa henti.
 *
 * Yang menggerakkannya animasi CSS, bukan JavaScript — jadi ia jalan di
 * compositor peramban dan tidak membangunkan main thread satu kali pun per
 * bingkai. Yang dihitung JavaScript cuma satu angka: berapa detik satu putaran
 * seharusnya, supaya kecepatannya tetap sama berapa pun panjang isinya.
 *
 * Sumbernya membangun satu `ResizeObserver` global yang dibagi seluruh marquee
 * di halaman, lengkap dengan penghitung rujukan dan cache potret. Di sini
 * dipakai `useResizeObserver` biasa per komponen: satu halaman jarang memuat
 * lebih dari dua tiga marquee, dan pengamat bersama itu membeli penghematan
 * yang tidak pernah terasa dengan harga seratus baris yang harus dijaga.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The direction the content moves toward. */
  side?: MarqueeSide
  dir?: MarqueeDirection
  /** Pixels per second. */
  speed?: number
  /** The delay before the first loop, in seconds. */
  delay?: number
  /** How many times to loop. Zero means forever. */
  loopCount?: number
  /** Space between repeated copies: a CSS length, or a number in px. */
  gap?: string | number
  /** Duplicates the content until it fills the container, if it is too short. */
  autoFill?: boolean
  /** Pauses the animation while the pointer is over the marquee. */
  pauseOnHover?: boolean
  /** Space pauses and resumes it, and the element becomes focusable. */
  pauseOnKeyboard?: boolean
  /** Plays the animation backwards, moving away from `side` instead of toward it. */
  reverse?: boolean
  class?: HTMLAttributes['class']
}>(), {
  side: 'left',
  speed: 50,
  delay: 0,
  loopCount: 0,
  gap: '1rem',
  autoFill: false,
  pauseOnHover: false,
  pauseOnKeyboard: false,
  reverse: false,
})

const orientation = computed<MarqueeOrientation>(() =>
  (props.side === 'top' || props.side === 'bottom' ? 'vertical' : 'horizontal'))

const direction = useDirection(computed(() => props.dir))

const root = ref<HTMLElement>()
const rootSize = ref(0)
const contentSize = ref(0)

useResizeObserver(root, ([entry]) => {
  const rect = entry.contentRect
  rootSize.value = orientation.value === 'vertical' ? rect.height : rect.width
})

const paused = ref(false)

function onKeydown(event: KeyboardEvent) {
  if (!props.pauseOnKeyboard || event.key !== ' ') return
  event.preventDefault()
  paused.value = !paused.value
}

const duration = computed(() => {
  // Kecepatan nol akan membagi dengan nol dan menghasilkan durasi tak hingga —
  // yang oleh CSS dibaca sebagai animasi yang tidak pernah bergerak.
  const speed = Math.max(0.001, props.speed)

  if (!contentSize.value) {
    // Sebelum apa pun terukur, dipakai jarak perkiraan supaya animasinya sudah
    // jalan pada bingkai pertama alih-alih diam lalu menyentak.
    return (props.autoFill ? 1000 : 2000) / speed
  }

  if (props.autoFill) {
    const copies = contentSize.value < rootSize.value
      ? Math.ceil(rootSize.value / contentSize.value)
      : 1
    return (contentSize.value * copies) / speed
  }

  return (contentSize.value < rootSize.value ? rootSize.value : contentSize.value) / speed
})

const style = computed(() => ({
  '--marquee-duration': `${duration.value}s`,
  '--marquee-gap': typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
  '--marquee-delay': `${props.delay}s`,
  '--marquee-loop-count': props.loopCount === 0 || props.loopCount === Number.POSITIVE_INFINITY
    ? 'infinite'
    : String(props.loopCount),
}))

provideMarqueeContext({
  state: computed(() => ({
    side: props.side,
    orientation: orientation.value,
    dir: direction.value,
    autoFill: props.autoFill,
    pauseOnHover: props.pauseOnHover,
    reverse: props.reverse,
    rootSize: rootSize.value,
  })),
  contentSize,
})
</script>

<template>
  <div class="grid" data-slot="marquee-wrapper">
    <Primitive
      ref="root"
      aria-live="off"
      :as="props.as"
      :as-child="props.asChild"
      :class="cn(
        'relative flex overflow-hidden motion-reduce:animate-none',
        orientation === 'vertical' && 'h-full flex-col',
        orientation === 'horizontal' && 'w-full',
        paused && '[&_*]:[animation-play-state:paused]',
        props.pauseOnHover && 'group',
        props.pauseOnKeyboard && 'rounded-md focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        props.class,
      )"
      :data-orientation="orientation"
      data-slot="marquee"
      :dir="direction"
      role="marquee"
      :style="style"
      :tabindex="props.pauseOnKeyboard ? 0 : undefined"
      @keydown="onKeydown"
    >
      <slot />
    </Primitive>
  </div>
</template>
