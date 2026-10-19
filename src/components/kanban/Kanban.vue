<script setup lang="ts" generic="T extends { id: string } | string">
import { DragDropProvider } from 'dnd-kit-vue'
import { computed } from 'vue'
import { provideKanbanContext } from './context'
import { moveBetween, moveItem } from '../sortable/move'

/**
 * Papan kanban seret-dan-lepas.
 *
 * `v-model` sebuah objek: nama kolom ke daftar kartunya. Bentuk itu yang
 * dibawa sumbernya, dan tetap benar — papan kanban memang peta kolom, dan
 * menyimpannya sebagai array datar berarti kolom yang kosong tidak punya
 * tempat untuk disebut sama sekali.
 *
 * Kartu yang dilepas di atas kartu lain menyisip di posisinya; yang dilepas
 * di atas kolom kosong masuk ke ujungnya. Keduanya dibedakan dari apakah id
 * tujuannya sebuah kartu atau sebuah kolom.
 */
const props = withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false,
})

const model = defineModel<Record<string, T[]>>({ default: () => ({}) })

const emit = defineEmits<{
  /** An item was dropped into another column: item id, from column, to column. */
  move: [item: string, fromColumn: string, toColumn: string]
}>()

const getId = (item: T) => (typeof item === 'string' ? item : item.id)

const columns = computed(() => Object.keys(model.value))

const items = computed(() => Object.fromEntries(
  columns.value.map(k => [k, (model.value[k] ?? []).map(getId)]),
))

/** The column an id belongs to, or the column itself when the id is a column. */
function columnOf(id: string): string | undefined {
  if (columns.value.includes(id)) return id
  return columns.value.find(k => items.value[k]?.includes(id))
}

function onDragEnd(event: { operation: { source?: { id?: unknown } | null, target?: { id?: unknown } | null }, canceled: boolean }) {
  if (event.canceled) return

  const source = String(event.operation.source?.id ?? '')
  const target = String(event.operation.target?.id ?? '')
  if (!source || !target || source === target) return

  const sourceColumn = columnOf(source)
  const targetColumn = columnOf(target)
  if (!sourceColumn || !targetColumn) return

  const from = items.value[sourceColumn]?.indexOf(source) ?? -1
  if (from === -1) return

  if (sourceColumn === targetColumn) {
    const to = items.value[targetColumn]?.indexOf(target) ?? -1
    if (to === -1) return
    model.value = { ...model.value, [sourceColumn]: moveItem(model.value[sourceColumn] ?? [], from, to) }
    return
  }

  // Dilepas di atas kolomnya sendiri, bukan di atas kartu: masuk ke ujung.
  const targetItem = items.value[targetColumn]?.indexOf(target) ?? -1
  const to = targetItem === -1 ? (model.value[targetColumn]?.length ?? 0) : targetItem

  const moved = moveBetween(model.value[sourceColumn] ?? [], model.value[targetColumn] ?? [], from, to)
  model.value = { ...model.value, [sourceColumn]: moved.source, [targetColumn]: moved.target }
  emit('move', source, sourceColumn, targetColumn)
}

provideKanbanContext(computed(() => ({
  disabled: props.disabled,
  columns: columns.value,
  items: items.value,
})))
</script>

<template>
  <DragDropProvider @drag-end="onDragEnd">
    <slot :columns="columns" />
  </DragDropProvider>
</template>
