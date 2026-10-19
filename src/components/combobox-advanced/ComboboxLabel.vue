<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxLabel as ComboboxLabelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A label for the input box. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxLabelPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('px-0.5 py-1.5 font-semibold text-sm', props.class)"
    data-slot="combobox-label"
  >
    <slot />
  </ComboboxLabelPrimitive>
</template>
