<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { EditableInput as EditableInputPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The input that replaces the preview while editing. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <EditableInputPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex w-full rounded-sm border border-input bg-transparent py-1 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      props.class,
    )"
    data-slot="editable-input"
  />
</template>
