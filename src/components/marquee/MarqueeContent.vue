<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { marqueeContentVariants } from '.'
import { injectMarqueeContext } from './context'

/**
 * Isi yang berjalan, digambar dua kali.
 *
 * Salinan kedua yang membuat putarannya tampak tanpa sambungan: begitu salinan
 * pertama keluar dari layar, yang kedua sudah persis berada di tempatnya, dan
 * animasinya mengulang tanpa satu bingkai pun kosong. Salinan itu ditandai
 * `aria-hidden` supaya pembaca layar tidak membacakan isinya dua kali.
 *
 * `autoFill` menggandakan isinya lagi kalau ia lebih pendek dari wadahnya —
 * tanpa itu, isi pendek meninggalkan ruang kosong yang ikut berjalan.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, contentSize } = injectMarqueeContext('MarqueeContent')

const content = ref<HTMLElement>()

useResizeObserver(content, ([entry]) => {
  const rect = entry.contentRect
  contentSize.value = state.value.orientation === 'vertical' ? rect.height : rect.width
})

const isVertical = computed(() => state.value.orientation === 'vertical')

const copies = computed(() => {
  if (!state.value.autoFill || !contentSize.value) return 1
  return contentSize.value < state.value.rootSize
    ? Math.ceil(state.value.rootSize / contentSize.value)
    : 1
})

const classes = computed(() => cn(
  marqueeContentVariants({
    side: state.value.side,
    dir: state.value.dir,
    pauseOnHover: state.value.pauseOnHover,
    reverse: state.value.reverse,
  }),
  isVertical.value && 'flex-col',
  props.class,
))

const style = computed(() => ({
  animationDuration: 'var(--marquee-duration)',
  animationDelay: 'var(--marquee-delay)',
  animationIterationCount: 'var(--marquee-loop-count)',
  animationDirection: state.value.reverse ? 'reverse' : 'normal',
}))

const trailingGap = computed(() => {
  if (isVertical.value) return 'mb-(--marquee-gap)'
  return state.value.dir === 'rtl' ? 'ml-(--marquee-gap)' : 'mr-(--marquee-gap)'
})
</script>

<template>
  <div
    :class="cn(classes, trailingGap)"
    :data-orientation="state.orientation"
    data-slot="marquee-content"
    :style="style"
  >
    <div ref="content" :class="cn('flex shrink-0 gap-(--marquee-gap)', isVertical && 'flex-col')">
      <slot />
    </div>
    <template v-for="i in copies - 1" :key="i">
      <slot />
    </template>
  </div>

  <div
    aria-hidden="true"
    :class="classes"
    data-slot="marquee-content"
    role="presentation"
    :style="style"
  >
    <template v-for="i in copies" :key="i">
      <slot />
    </template>
  </div>
</template>
