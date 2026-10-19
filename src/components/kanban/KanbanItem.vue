<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useSortable } from 'dnd-kit-vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectKanbanColumnContext, injectKanbanContext, provideKanbanItemContext } from './context'

/** A single card. */
const props = defineProps<PrimitiveProps & {
  /** Unique item id; must appear in its column's item list. */
  value: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const context = injectKanbanContext('KanbanItem')
const column = injectKanbanColumnContext('KanbanItem')

const index = computed(() => context.value.items[column.value.value]?.indexOf(props.value) ?? -1)

const { elementRef, isDragging } = useSortable(() => ({
  id: props.value,
  index: index.value,
  type: 'item',
  accept: ['item'],
  group: column.value.value,
  disabled: props.disabled || context.value.disabled,
}))

provideKanbanItemContext(computed(() => ({
  value: props.value,
  index: index.value,
  column: column.value.value,
  disabled: props.disabled ?? context.value.disabled,
})))
</script>

<template>
  <Primitive
    :ref="elementRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative z-0 rounded-md border bg-card p-3 text-sm shadow-sm data-[dragging=true]:z-10 data-[dragging=true]:opacity-80',
      props.class,
    )"
    :data-dragging="isDragging"
    data-slot="kanban-item"
  >
    <slot :is-dragging="isDragging" />
  </Primitive>
</template>
