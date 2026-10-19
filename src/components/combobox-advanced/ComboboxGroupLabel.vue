<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxLabel as ComboboxLabelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A group heading, inside the list. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxLabelPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('px-2 py-1.5 font-semibold text-muted-foreground text-xs', props.class)"
    data-slot="combobox-group-label"
  >
    <slot />
  </ComboboxLabelPrimitive>
</template>
