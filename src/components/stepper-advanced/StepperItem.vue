<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { StepperItem as StepperItemPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectStepperContext } from './context'

/** A single step. `not-last:flex-1` is what stretches the connecting line. */
const props = defineProps<PrimitiveProps & {
  /** This step's number, matched against the stepper's value (1-based by default). */
  step: number
  disabled?: boolean
  /** Marks the step as completed regardless of the current step. */
  completed?: boolean
  class?: HTMLAttributes['class']
}>()

const context = injectStepperContext('StepperItem')
</script>

<template>
  <StepperItemPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative flex not-last:flex-1 items-center',
      context.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      props.class,
    )"
    :completed="props.completed"
    data-slot="stepper-item"
    :disabled="props.disabled"
    :step="props.step"
  >
    <slot />
  </StepperItemPrimitive>
</template>
