<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { injectDataGridContext } from './context'
import { isInRange } from './grid'

/**
 * Satu sel petak.
 *
 * Yang tergambar teks biasa sampai selnya disunting; kotak masukannya baru
 * dipasang saat itu. Seribu `<input>` yang selalu ada membuat petak seratus
 * baris tersendat sejak halamannya dibuka, dan tidak satu pun dari seribu itu
 * dipakai sampai ada yang mengetik.
 *
 * Selnya `<td>` biasa tanpa `tabindex`. Fokusnya satu — di petaknya — dan sel
 * yang bisa difokuskan sendiri-sendiri menjebak pemakai papan ketik di dalam
 * seribu perhentian.
 */
const props = defineProps<{
  /** Zero-based row index of the cell. */
  row: number
  /** Zero-based index into the grid's columns. */
  column: number
  class?: HTMLAttributes['class']
}>()

const { state, select, edit, commit, cancel, cellValue, takeInitialKey } = injectDataGridContext('DataGridCell')

const inputEl = ref<HTMLInputElement>()
const draft = ref('')

const cell = computed(() => ({ row: props.row, column: props.column }))
const definition = computed(() => state.value.columns[props.column])

const isCursor = computed(() =>
  state.value.cursor.row === props.row && state.value.cursor.column === props.column,
)

const selected = computed(() => isInRange(cell.value, state.value.range))

const isEditing = computed(() =>
  state.value.editing?.row === props.row && state.value.editing?.column === props.column,
)

const value = computed(() => cellValue(props.row, props.column))

const alignClass = computed(() => {
  const a = definition.value?.align
  return a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left'
})

watch(isEditing, async (started) => {
  if (!started) return

  // Huruf yang memulai penyuntingan menggantikan isi selnya, tidak
  // menambahinya — sama seperti lembar sebar. Enter dan F2 tidak membawa
  // huruf, dan yang begitu meneruskan isi lamanya.
  draft.value = takeInitialKey() ?? value.value

  await nextTick()
  inputEl.value?.focus()
  inputEl.value?.setSelectionRange(draft.value.length, draft.value.length)
})

function finish(next: 'down' | 'stay') {
  commit(cell.value, draft.value)

  if (next === 'down')
    select({ row: Math.min(props.row + 1, state.value.rowCount - 1), column: props.column })

  nextTick(() => {
    // Fokus dikembalikan ke petaknya, bukan dibiarkan di kotak masukan yang
    // sudah dicabut — fokus yang menggantung di elemen yang hilang jatuh ke
    // `<body>`, dan pintasan papan ketiknya berhenti bekerja.
    ;(inputEl.value?.closest('[role="grid"]') as HTMLElement | null)?.focus()
  })
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    finish('down')
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    cancel()
  }
  else if (event.key === 'Tab') {
    event.preventDefault()
    finish('stay')
  }
}
</script>

<template>
  <td
    :aria-colindex="props.column + 1"
    :aria-selected="isCursor || selected"
    :class="cn(
      'relative border-r border-b p-0 last:border-r-0',
      selected && !isCursor && 'bg-primary/10',
      isCursor && 'z-10 outline-2 -outline-offset-2 outline-primary',
      props.class,
    )"
    data-slot="data-grid-cell"
    role="gridcell"
    @mousedown.shift.prevent="select(cell, true)"
    @mousedown.exact="select(cell)"
    @dblclick="edit(cell)"
  >
    <input
      v-if="isEditing"
      ref="inputEl"
      v-model="draft"
      class="w-full bg-background px-2 py-1 text-base leading-5 outline-none md:text-sm"
      :class="alignClass"
      @blur="finish('stay')"
      @keydown="onKeydown"
    >
    <span
      v-else
      class="block truncate px-2 py-1"
      :class="[alignClass, definition?.editable === false && 'text-muted-foreground']"
    >{{ value }}</span>
  </td>
</template>
