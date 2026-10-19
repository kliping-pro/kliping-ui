<script setup lang="ts">
import type { AcceptableValue, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ListboxItem as ListboxItemPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A single option. */
const props = defineProps<PrimitiveProps & {
  /** Value written to the listbox model when this item is selected. */
  value: AcceptableValue
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ListboxItemPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex w-full cursor-default select-none items-center justify-between gap-2 rounded-md p-4 outline-hidden ring-1 ring-border focus-visible:ring-ring data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50',
      props.class,
    )"
    data-slot="listbox-item"
    :disabled="props.disabled"
    :value="props.value"
  >
    <slot />
  </ListboxItemPrimitive>
</template>
