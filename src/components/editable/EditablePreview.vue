<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { EditablePreview as EditablePreviewPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The text shown before editing. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <EditablePreviewPrimitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'cursor-text truncate rounded-sm border border-transparent py-1 text-base focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring data-disabled:cursor-not-allowed data-readonly:cursor-default data-[empty]:text-muted-foreground data-disabled:opacity-50 md:text-sm',
      props.class,
    )"
    data-slot="editable-preview"
  >
    <slot />
  </EditablePreviewPrimitive>
</template>
