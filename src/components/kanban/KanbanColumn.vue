<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useSortable } from 'dnd-kit-vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectKanbanContext, provideKanbanColumnContext } from './context'

/**
 * Satu kolom.
 *
 * Ikut jadi sasaran lepas, bukan cuma wadah — tanpa itu, kolom yang sedang
 * kosong tidak bisa menerima kartu sama sekali, karena tidak ada kartu di
 * dalamnya untuk dilepasi.
 */
const props = defineProps<PrimitiveProps & {
  /** Unique column key; must match a key in the board's columns and items. */
  value: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const context = injectKanbanContext('KanbanColumn')

const index = computed(() => context.value.columns.indexOf(props.value))

const { elementRef, isDropTarget } = useSortable(() => ({
  id: props.value,
  index: index.value,
  type: 'column',
  accept: ['item', 'column'],
  disabled: props.disabled || context.value.disabled,
}))

provideKanbanColumnContext(computed(() => ({ value: props.value, index: index.value })))
</script>

<template>
  <Primitive
    :ref="elementRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex w-64 shrink-0 flex-col gap-2 rounded-lg border bg-muted/40 p-3 transition-colors data-[drop=true]:bg-accent/60',
      props.class,
    )"
    :data-drop="isDropTarget"
    data-slot="kanban-column"
    :data-value="props.value"
  >
    <slot />
  </Primitive>
</template>
