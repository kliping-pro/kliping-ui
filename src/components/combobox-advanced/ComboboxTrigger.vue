<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { ComboboxTrigger as ComboboxTriggerPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The chevron button that opens the list. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxTriggerPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex shrink-0 items-center justify-center rounded-r-md border-input bg-transparent text-muted-foreground transition-colors hover:text-foreground/80 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    data-slot="combobox-trigger"
  >
    <slot>
      <ChevronDown class="size-4" />
    </slot>
  </ComboboxTriggerPrimitive>
</template>
