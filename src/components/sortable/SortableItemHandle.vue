<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GripVertical } from '@lucide/vue'
import { useSortableContext } from 'dnd-kit-vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectSortableItemContext } from './context'

/** The drag handle. The rest of the item stays clickable and selectable. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { handleRef } = useSortableContext()
const item = injectSortableItemContext('SortableItemHandle')
</script>

<template>
  <Button
    :ref="handleRef"
    aria-label="Drag to reorder"
    :class="cn('size-7 cursor-grab text-muted-foreground hover:bg-transparent active:cursor-grabbing', props.class)"
    data-slot="sortable-item-handle"
    :disabled="item.disabled"
    size="icon"
    type="button"
    variant="ghost"
  >
    <slot>
      <GripVertical class="size-4" />
    </slot>
  </Button>
</template>
