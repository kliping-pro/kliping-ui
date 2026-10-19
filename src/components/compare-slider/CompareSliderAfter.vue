<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'
import CompareSliderLabel from './CompareSliderLabel.vue'
import { injectCompareSliderContext } from './context'

/** The "after" layer — visible on the near side of the divider. */
const props = defineProps<PrimitiveProps & {
  /** Text of a floating label on this layer, also its accessible name; the layer is aria-hidden without it. */
  label?: string
  class?: HTMLAttributes['class']
}>()

const context = injectCompareSliderContext('CompareSliderAfter')

const labelId = useId()

const clipPath = computed(() => (context.value.orientation === 'vertical'
  ? `inset(0 0 ${100 - context.value.value}% 0)`
  : `inset(0 ${100 - context.value.value}% 0 0)`))
</script>

<template>
  <Primitive
    :aria-hidden="props.label ? undefined : 'true'"
    :aria-labelledby="props.label ? labelId : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute inset-0 h-full w-full object-cover', props.class)"
    :data-orientation="context.orientation"
    data-slot="compare-slider-after"
    role="img"
    :style="{ clipPath }"
  >
    <slot />
    <CompareSliderLabel v-if="props.label" :id="labelId" side="after">
      {{ props.label }}
    </CompareSliderLabel>
  </Primitive>
</template>
