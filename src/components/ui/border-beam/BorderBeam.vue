<script setup lang="ts">
/**
 * Sinar yang berjalan mengelilingi tepi sebuah kotak.
 *
 * Jalurnya dibuat dengan `offset-path: rect(...)` dan ditempuh dengan
 * menganimasikan `offset-distance` dari 0% ke 100%. Keduanya properti CSS,
 * jadi animasinya dijalankan compositor — bukan dihitung ulang tiap frame di
 * JavaScript seperti di sumbernya.
 *
 * `initialOffset` dan `delay` sama-sama diterjemahkan jadi **satu**
 * `animation-delay` negatif. Delay negatif memulai animasi seolah-olah sudah
 * berjalan sekian detik, jadi sinarnya langsung muncul di posisi yang diminta
 * tanpa perlu keyframes tersendiri per nilai offset. Sumbernya melakukan hal
 * yang sama untuk `delay`; di sini caranya dipakai untuk keduanya.
 *
 * Induknya harus `position: relative` dan punya `rounded-*` — sinarnya
 * mewarisi radius itu lewat `rounded-[inherit]`.
 */
import type { CSSProperties, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** The beam length, in pixels. */
  size?: number
  /** The duration of one full loop, in seconds. */
  duration?: number
  /** Delays the start, in seconds. */
  delay?: number
  /** The color of the beam's head. */
  colorFrom?: string
  /** The color of the beam's tail. */
  colorTo?: string
  /** Reverses the direction of travel. */
  reverse?: boolean
  /** The beam's starting position along its path, 0–100. */
  initialOffset?: number
  /** The border width, in pixels. */
  borderWidth?: number
}>(), {
  size: 50,
  duration: 6,
  delay: 0,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
  reverse: false,
  initialOffset: 0,
  borderWidth: 1,
})

// Satu putaran penuh = `duration` detik. Maju `initialOffset` persen berarti
// memundurkan mulainya sebanyak persen itu dari durasinya.
const startOffset = computed(() =>
  -((props.initialOffset / 100) * props.duration) - props.delay,
)

const style = computed<CSSProperties>(() => ({
  'width': `${props.size}px`,
  'offsetPath': `rect(0 auto auto 0 round ${props.size}px)`,
  'animationName': 'border-beam',
  'animationDuration': `${props.duration}s`,
  'animationDelay': `${startOffset.value}s`,
  'animationTimingFunction': 'linear',
  'animationIterationCount': 'infinite',
  'animationDirection': props.reverse ? 'reverse' : 'normal',
  '--color-from': props.colorFrom,
  '--color-to': props.colorTo,
} as CSSProperties))
</script>

<template>
  <div
    data-slot="border-beam"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent border-(length:--border-beam-width) [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    :style="{ '--border-beam-width': `${borderWidth}px` } as CSSProperties"
  >
    <div
      :class="cn(
        'absolute aspect-square',
        'bg-gradient-to-l from-(--color-from) via-(--color-to) to-transparent',
        props.class,
      )"
      :style="style"
    />
  </div>
</template>
