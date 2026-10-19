<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectTimePickerContext } from './context'

/** The box holding the time segments. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state } = injectTimePickerContext('TimePickerInputGroup')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex h-9 select-none items-center gap-0.5 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      state.disabled && 'pointer-events-none opacity-50',
      props.class,
    )"
    :data-disabled="state.disabled ? '' : undefined"
    data-slot="time-picker-input-group"
  >
    <slot />
  </Primitive>
</template>
