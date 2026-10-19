<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/** Starts the tour. Renders a `<button>` by default; `as-child` hands it to any element. */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The step the tour starts at. */
  step?: number
  class?: HTMLAttributes['class']
}>(), {
  as: 'button',
  step: 0,
})

const { start } = injectTourContext('TourTrigger')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(props.class)"
    data-slot="tour-trigger"
    :type="props.as === 'button' ? 'button' : undefined"
    @click="start(props.step)"
  >
    <slot />
  </Primitive>
</template>
