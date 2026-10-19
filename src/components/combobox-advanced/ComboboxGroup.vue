<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxGroup as ComboboxGroupPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A group of options. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxGroupPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('overflow-hidden', props.class)"
    data-slot="combobox-group"
  >
    <slot />
  </ComboboxGroupPrimitive>
</template>
