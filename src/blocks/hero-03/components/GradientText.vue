<script setup lang="ts">
/**
 * Teks dengan gradien yang bergeser pelan di belakangnya.
 *
 * Caranya: gradien dipasang sebagai `background-image` yang jauh lebih lebar
 * dari teksnya (300%), lalu `background-position`-nya digeser. Karena teksnya
 * memakai `bg-clip-text` dengan warna transparan, yang terlihat bergerak adalah
 * warna huruf itu sendiri.
 *
 * Pergeserannya CSS murni. Sumbernya menghitung posisinya tiap frame di
 * JavaScript lalu menuliskannya ke gaya elemen; di sini `@keyframes` dengan
 * `animation-direction: alternate` melakukan hal yang sama — bolak-balik tanpa
 * putus — dan compositor yang menjalankannya. `pauseOnHover` pun jadi satu
 * baris `animation-play-state` alih-alih satu potong state tersendiri.
 *
 * Warna pertama diulang di akhir daftar supaya sambungan gradiennya tidak
 * terlihat saat animasinya berbalik arah.
 */
import type { CSSProperties, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** The gradient colors, in order. */
  colors?: string[]
  /** Duration of one pass, in seconds. */
  animationSpeed?: number
  /** Draws a gradient border around the text. */
  showBorder?: boolean
  /** Direction the gradient moves in. */
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  /** Pauses the motion while the pointer is over it. */
  pauseOnHover?: boolean
  /** Goes back and forth instead of restarting each pass. */
  yoyo?: boolean
}>(), {
  colors: () => ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed: 8,
  showBorder: false,
  direction: 'horizontal',
  pauseOnHover: false,
  yoyo: true,
})

const gradientAngle = computed(() => {
  if (props.direction === 'horizontal')
    return 'to right'
  if (props.direction === 'vertical')
    return 'to bottom'
  return 'to bottom right'
})

const backgroundSize = computed(() => {
  if (props.direction === 'horizontal')
    return '300% 100%'
  if (props.direction === 'vertical')
    return '100% 300%'
  return '300% 300%'
})

const gradientStyle = computed<CSSProperties>(() => ({
  // Warna pertama diulang di ujung — tanpa itu ada garis sambungan yang kentara.
  backgroundImage: `linear-gradient(${gradientAngle.value}, ${[...props.colors, props.colors[0]].join(', ')})`,
  backgroundSize: backgroundSize.value,
  backgroundRepeat: 'repeat',
  // Arah diagonal digeser mendatar saja. Menggeser dua sumbu sekaligus membuat
  // dua pola bergerak saling bertemu, dan yang terlihat adalah kedipan.
  animationName: props.direction === 'vertical' ? 'gradient-text-y' : 'gradient-text-x',
  animationDuration: `${props.animationSpeed}s`,
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  animationDirection: props.yoyo ? 'alternate' : 'normal',
}))
</script>

<template>
  <span
    :class="cn(
      'relative mx-auto inline-flex max-w-fit flex-row items-center justify-center overflow-hidden font-medium backdrop-blur transition-shadow duration-500',
      showBorder && 'px-2 py-1',
      pauseOnHover && 'hover:[animation-play-state:paused] [&_*]:hover:[animation-play-state:paused]',
      props.class,
    )"
  >
    <span
      v-if="showBorder"
      class="pointer-events-none absolute inset-0 z-0 rounded-[1.25rem]"
      :style="gradientStyle"
      aria-hidden="true"
    >
      <span class="absolute left-1/2 top-1/2 z-[-1] h-[calc(100%-2px)] w-[calc(100%-2px)] -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] bg-background" />
    </span>
    <span
      class="relative z-[2] inline-block bg-clip-text text-transparent"
      :style="gradientStyle"
    >
      <slot />
    </span>
  </span>
</template>
