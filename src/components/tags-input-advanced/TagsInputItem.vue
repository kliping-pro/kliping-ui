<script setup lang="ts">
import type { AcceptableInputValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { TagsInputItem as TagsInputItemPrimitive, TagsInputItemDelete, TagsInputItemText } from 'reka-ui'
import { cn } from '@/lib/utils'

/** A single tag, with its delete button. */
const props = defineProps<{
  /** The tag value this item represents and removes when deleted. */
  value: AcceptableInputValue
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TagsInputItemPrimitive
    :class="cn(
      'inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-[editable]:select-none data-[editing]:bg-transparent data-disabled:opacity-50 data-[editing]:ring-1 data-[editing]:ring-ring [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-accent [&[data-highlighted]:not([data-editing])]:text-accent-foreground',
      props.class,
    )"
    data-slot="tags-input-item"
    :disabled="props.disabled"
    :value="props.value"
  >
    <TagsInputItemText class="truncate">
      <slot />
    </TagsInputItemText>
    <TagsInputItemDelete class="size-4 shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
      <X class="size-3.5" />
    </TagsInputItemDelete>
  </TagsInputItemPrimitive>
</template>
