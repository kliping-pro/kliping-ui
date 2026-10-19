<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { StepperIndicator as StepperIndicatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The numbered circle. Fill the slot to replace the number with an icon. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <StepperIndicatorPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-muted bg-background font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground',
      props.class,
    )"
    data-slot="stepper-indicator"
  >
    <template #default="{ step }">
      <slot :step="step">{{ step }}</slot>
    </template>
  </StepperIndicatorPrimitive>
</template>
