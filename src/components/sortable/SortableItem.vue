<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useSortable } from 'dnd-kit-vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectSortableContext, provideSortableItemContext } from './context'

/**
 * Satu unsur yang bisa diseret.
 *
 * Tanpa `SortableItemHandle` di dalamnya, seluruh unsurnya jadi pegangan.
 * Dengan pegangan, sisa unsurnya tetap bisa diklik dan disorot seperti biasa
 * — yang penting kalau di dalamnya ada tombol atau teks yang perlu disalin.
 */
const props = defineProps<PrimitiveProps & {
  /** Unique item id; its position in the sortable order sets the item's index. */
  value: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const context = injectSortableContext('SortableItem')

const index = computed(() => context.value.order.indexOf(props.value))

const { elementRef, isDragging } = useSortable(() => ({
  id: props.value,
  index: index.value,
  disabled: props.disabled || context.value.disabled,
}))

provideSortableItemContext(computed(() => ({
  id: props.value,
  index: index.value,
  disabled: props.disabled ?? context.value.disabled,
})))
</script>

<template>
  <Primitive
    :ref="elementRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80', props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    :data-dragging="isDragging"
    data-slot="sortable-item"
  >
    <slot :is-dragging="isDragging" />
  </Primitive>
</template>
