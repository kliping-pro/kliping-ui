<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { StepperDescription as StepperDescriptionPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A short description below the step title. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <StepperDescriptionPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('text-muted-foreground text-sm', props.class)"
    data-slot="stepper-description"
  >
    <slot />
  </StepperDescriptionPrimitive>
</template>
