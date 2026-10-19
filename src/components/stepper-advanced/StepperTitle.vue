<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { StepperTitle as StepperTitlePrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The step title. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <StepperTitlePrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('font-medium text-sm', props.class)"
    data-slot="stepper-title"
  >
    <slot />
  </StepperTitlePrimitive>
</template>
