<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GripVertical } from '@lucide/vue'
import { useSortableContext } from 'dnd-kit-vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** The drag handle for a column. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { handleRef } = useSortableContext()
</script>

<template>
  <Button
    :ref="handleRef"
    aria-label="Drag column"
    :class="cn('size-6 cursor-grab text-muted-foreground hover:bg-transparent active:cursor-grabbing', props.class)"
    data-slot="kanban-column-handle"
    size="icon"
    type="button"
    variant="ghost"
  >
    <slot>
      <GripVertical class="size-3.5" />
    </slot>
  </Button>
</template>
