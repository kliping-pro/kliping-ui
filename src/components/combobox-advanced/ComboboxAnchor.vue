<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxAnchor as ComboboxAnchorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The input box the list is anchored to. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxAnchorPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-ring',
      props.class,
    )"
    data-slot="combobox-anchor"
  >
    <slot />
  </ComboboxAnchorPrimitive>
</template>
