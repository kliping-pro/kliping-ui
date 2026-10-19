<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { EditableArea as EditableAreaPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The container that alternates between the preview and the input. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <EditableAreaPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative inline-block min-w-0 data-disabled:cursor-not-allowed data-disabled:opacity-50', props.class)"
    data-slot="editable-area"
  >
    <slot />
  </EditableAreaPrimitive>
</template>
