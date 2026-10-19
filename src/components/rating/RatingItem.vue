<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Star } from '@lucide/vue'
import { RatingItem as RatingItemPrimitive, RatingItemIndicator } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectRatingContext, RATING_SIZES } from './context'

/**
 * Satu bintang.
 *
 * Digambar dua lapis: satu ikon kosong sebagai dasar, dan satu penunjuk per
 * langkah di atasnya yang lebarnya dipotong sesuai bagian yang terisi.
 * Lapisan dasarnya `aria-hidden` — yang dibacakan pembaca layar penunjuknya,
 * yang memang tombol radio sungguhan.
 */
const props = defineProps<{
  /** Which star this is, counting from one. */
  item: number
  class?: HTMLAttributes['class']
}>()

const context = injectRatingContext('RatingItem')

const sizeClass = computed(() => RATING_SIZES[context.value.size])
</script>

<template>
  <RatingItemPrimitive
    as="span"
    :class="cn('relative inline-flex shrink-0', sizeClass, props.class)"
    data-slot="rating-item"
    :item="props.item"
  >
    <template #default="{ steps }">
      <span
        aria-hidden="true"
        :class="cn('pointer-events-none absolute inset-0 opacity-30 [&_svg]:size-full [&_svg]:fill-transparent', sizeClass)"
      >
        <slot><Star /></slot>
      </span>

      <RatingItemIndicator
        v-for="step in steps"
        :key="step"
        :aria-label="`${step} ${step === 1 ? 'star' : 'stars'}`"
        :class="cn(
          'absolute inset-y-0 left-0 overflow-hidden rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none',
          '[&_svg]:fill-transparent data-[state=active]:[&_svg]:fill-current',
        )"
        :step="step"
        :style="{
          width: 'var(--reka-rating-item-step-width)',
          opacity: 'var(--reka-rating-item-step-opacity)',
          zIndex: 'var(--reka-rating-item-step-z-index)',
        }"
      >
        <span :class="cn('block [&_svg]:size-full', sizeClass)">
          <slot><Star /></slot>
        </span>
      </RatingItemIndicator>
    </template>
  </RatingItemPrimitive>
</template>
