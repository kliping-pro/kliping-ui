<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectStepperContext } from './context'

/** The list of steps. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectStepperContext('StepperList')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex outline-none',
      context.orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col items-start',
      props.class,
    )"
    data-slot="stepper-list"
  >
    <slot />
  </Primitive>
</template>
