<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectCompareSliderContext } from './context'

/** A label floating over one of the sides. */
const props = defineProps<PrimitiveProps & {
  /** Which layer the label marks: `before` sits top-left, `after` top-right (bottom-left when vertical). */
  side?: 'before' | 'after'
  class?: HTMLAttributes['class']
}>()

const context = injectCompareSliderContext('CompareSliderLabel')

const positionClass = computed(() => {
  const isVertical = context.value.orientation === 'vertical'
  if (isVertical) return props.side === 'after' ? 'bottom-2 left-2' : 'top-2 left-2'
  return props.side === 'after' ? 'top-2 right-2' : 'top-2 left-2'
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'absolute z-20 rounded-md border border-border bg-background/80 px-3 py-1.5 font-medium text-sm backdrop-blur-sm',
      positionClass,
      props.class,
    )"
    data-slot="compare-slider-label"
  >
    <slot />
  </Primitive>
</template>
