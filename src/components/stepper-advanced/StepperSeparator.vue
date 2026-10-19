<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { StepperSeparator as StepperSeparatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectStepperContext } from './context'

/** The line connecting one step to the next. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectStepperContext('StepperSeparator')
</script>

<template>
  <StepperSeparatorPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'bg-border transition-colors data-[state=active]:bg-primary data-[state=completed]:bg-primary',
      context.orientation === 'horizontal' ? 'h-px flex-1' : 'h-10 w-px',
      props.class,
    )"
    data-slot="stepper-separator"
  />
</template>
