<script setup lang="ts" generic="T extends { id: string } | string">
import type { HTMLAttributes } from 'vue'
import type { SortableOrientation } from './context'
import { DragDropProvider } from 'dnd-kit-vue'
import { computed } from 'vue'
import { provideSortableContext } from './context'
import { moveItem } from './move'

/**
 * Daftar yang bisa diurutkan ulang dengan seret-dan-lepas.
 *
 * Ditulis di atas `dnd-kit-vue`, port Vue dari dnd-kit yang sudah terpasang
 * di repo ini. Yang dibawanya bukan cuma penyeretan: dnd-kit menangani
 * pengukuran ulang saat tata letaknya berubah, gulir otomatis di tepi, dan —
 * yang paling sering hilang di pustaka seret-dan-lepas — kemudi papan ketik.
 *
 * `v-model` menerima array objek ber-`id` atau array teks. Yang kedua
 * dipakai untuk daftar sederhana, dan idnya teks itu sendiri.
 */
const props = withDefaults(defineProps<{
  orientation?: SortableOrientation
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
  disabled: false,
})

const model = defineModel<T[]>({ default: () => [] })

const emit = defineEmits<{
  /** An item was moved: from index, to index. */
  move: [from: number, to: number]
}>()

const getId = (item: T) => (typeof item === 'string' ? item : item.id)

const order = computed(() => model.value.map(getId))

function onDragEnd(event: { operation: { source?: { id?: unknown } | null, target?: { id?: unknown } | null }, canceled: boolean }) {
  if (event.canceled) return

  const source = String(event.operation.source?.id ?? '')
  const target = String(event.operation.target?.id ?? '')
  if (!source || !target || source === target) return

  const from = order.value.indexOf(source)
  const to = order.value.indexOf(target)
  if (from === -1 || to === -1) return

  model.value = moveItem(model.value, from, to)
  emit('move', from, to)
}

provideSortableContext(computed(() => ({
  orientation: props.orientation,
  disabled: props.disabled,
  order: order.value,
})))
</script>

<template>
  <DragDropProvider @drag-end="onDragEnd">
    <slot :item="model" />
  </DragDropProvider>
</template>
