<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ComboboxInput as ComboboxInputPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** Where the filter text is typed. */
const props = defineProps<{
  /** Placeholder text shown while the input is empty. */
  placeholder?: string
  /** Focuses the input when it mounts. */
  autoFocus?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ComboboxInputPrimitive
    :auto-focus="props.autoFocus"
    :class="cn(
      'flex h-9 w-full rounded-md bg-transparent text-base placeholder:text-muted-foreground focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      props.class,
    )"
    data-slot="combobox-input"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
  />
</template>
