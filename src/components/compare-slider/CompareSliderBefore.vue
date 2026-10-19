<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'
import CompareSliderLabel from './CompareSliderLabel.vue'
import { injectCompareSliderContext } from './context'

/** The "before" layer — visible on the far side of the divider. */
const props = defineProps<PrimitiveProps & {
  /** Text of a floating label on this layer, also its accessible name; the layer is aria-hidden without it. */
  label?: string
  class?: HTMLAttributes['class']
}>()

const context = injectCompareSliderContext('CompareSliderBefore')

const labelId = useId()

const clipPath = computed(() => (context.value.orientation === 'vertical'
  ? `inset(${context.value.value}% 0 0 0)`
  : `inset(0 0 0 ${context.value.value}%)`))
</script>

<template>
  <Primitive
    :aria-hidden="props.label ? undefined : 'true'"
    :aria-labelledby="props.label ? labelId : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute inset-0 h-full w-full object-cover', props.class)"
    :data-orientation="context.orientation"
    data-slot="compare-slider-before"
    role="img"
    :style="{ clipPath }"
  >
    <slot />
    <CompareSliderLabel v-if="props.label" :id="labelId" side="before">
      {{ props.label }}
    </CompareSliderLabel>
  </Primitive>
</template>
