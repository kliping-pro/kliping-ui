<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxEmpty as ComboboxEmptyPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** Shown when the filter finds nothing. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxEmptyPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('py-6 text-center text-sm', props.class)"
    data-slot="combobox-empty"
  >
    <slot>No matches.</slot>
  </ComboboxEmptyPrimitive>
</template>
