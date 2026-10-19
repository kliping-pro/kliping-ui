<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { DataGridColumn } from './context'
import type { Cell, CellRange } from './grid'
import { computed, nextTick, ref } from 'vue'
import { cn } from '@/lib/utils'
import { provideDataGridContext } from './context'
import { isInRange, mapPasteToCells, moveCursor, nextCell, normalizeRange, parseClipboard, serializeClipboard } from './grid'

/**
 * Petak data yang bisa disunting langsung di selnya.
 *
 * Kemudinya mengikuti lembar sebar, bukan formulir: panah berpindah sel,
 * Enter menyunting lalu turun, Tab berpindah dan melingkar, Escape
 * mengurungkan, dan menempel dari papan klip mengisi banyak sel sekaligus.
 * Orang yang membuka petak data sudah punya kebiasaan dari Excel, dan
 * melawan kebiasaan itu tidak pernah dimenangkan komponen mana pun.
 *
 * Yang tidak ditiru dari lembar sebar: menempel tidak melebarkan petaknya.
 * Menambah baris diam-diam atas nama tempelan menciptakan data yang tidak
 * pernah diminta siapa pun.
 *
 * Fokusnya satu — di petaknya sendiri, bukan di tiap sel. Petak seratus baris
 * kali sepuluh kolom berarti seribu elemen yang bisa difokuskan, dan pemakai
 * pembaca layar yang menekan Tab akan menemukan dirinya terjebak di sana.
 */
const props = withDefaults(defineProps<{
  /** Column definitions: field key, title, and optional editable flag, width, and alignment. */
  columns: DataGridColumn[]
  /** Show row numbers in the leftmost column. */
  rowNumbers?: boolean
  disabled?: boolean
  readonly?: boolean
  class?: HTMLAttributes['class']
}>(), {
  rowNumbers: true,
  disabled: false,
  readonly: false,
})

const data = defineModel<Record<string, string>[]>({ default: () => [] })

const emit = defineEmits<{
  /** A cell changed. Fires once per cell, including when pasting. */
  change: [row: number, column: string, value: string]
}>()

const grid = ref<HTMLElement>()

const cursor = ref<Cell>({ row: 0, column: 0 })
const anchor = ref<Cell | null>(null)
const editing = ref<Cell | null>(null)

const rowCount = computed(() => data.value.length)
const columnCount = computed(() => props.columns.length)

const range = computed<CellRange | null>(() => (anchor.value ? normalizeRange(anchor.value, cursor.value) : null))

function cellValue(row: number, column: number): string {
  const id = props.columns[column]?.id
  if (!id) return ''

  return data.value[row]?.[id] ?? ''
}

function canEdit(cell: Cell): boolean {
  if (props.disabled || props.readonly) return false

  return props.columns[cell.column]?.editable !== false
}

function select(cell: Cell, extend = false) {
  if (props.disabled) return

  // Memilih sel lain saat sedang menyunting menyimpan suntingannya lebih
  // dulu. Membuangnya diam-diam berarti ketikan yang hilang tanpa jejak.
  editing.value = null

  if (extend) anchor.value ??= { ...cursor.value }
  else anchor.value = null

  cursor.value = cell
}

function edit(cell: Cell) {
  if (!canEdit(cell)) return

  cursor.value = cell
  anchor.value = null
  editing.value = cell
}

function commit(cell: Cell, value: string) {
  const id = props.columns[cell.column]?.id
  const row = data.value[cell.row]
  if (!id || !row || row[id] === value) {
    editing.value = null
    return
  }

  // Barisnya diganti, bukan diubah di tempatnya. Larik yang isinya diubah
  // langsung tidak memicu apa pun di sisi pemakai yang menyimpannya di
  // `shallowRef` — dan menuntut mereka memakai `ref` dalam saja bukan syarat
  // yang pantas dititipkan lewat dokumentasi.
  const copy = [...data.value]
  copy[cell.row] = { ...row, [id]: value }
  data.value = copy

  editing.value = null
  emit('change', cell.row, id, value)
}

function cancel() {
  editing.value = null
  focusGrid()
}

function focusGrid() {
  nextTick(() => grid.value?.focus())
}

/** The selected range — or the cursor cell — as spreadsheet text. */
function copyText(): string {
  const r = range.value ?? {
    startRow: cursor.value.row,
    startColumn: cursor.value.column,
    endRow: cursor.value.row,
    endColumn: cursor.value.column,
  }

  const rows: string[][] = []
  for (let b = r.startRow; b <= r.endRow; b++) {
    const columns: string[] = []
    for (let k = r.startColumn; k <= r.endColumn; k++)
      columns.push(cellValue(b, k))

    rows.push(columns)
  }

  return serializeClipboard(rows)
}

function onCopy(event: ClipboardEvent) {
  if (editing.value) return

  event.preventDefault()
  event.clipboardData?.setData('text/plain', copyText())
}

function onPaste(event: ClipboardEvent) {
  if (editing.value || props.disabled || props.readonly) return

  const text = event.clipboardData?.getData('text/plain')
  if (!text) return

  event.preventDefault()

  const targets = mapPasteToCells(cursor.value, parseClipboard(text), rowCount.value, columnCount.value)
  if (!targets.length) return

  // Seluruh tempelan jadi satu penggantian larik, bukan satu per sel. Menempel
  // lima puluh sel yang memicu lima puluh penggambaran ulang terasa tersendat
  // justru di saat orang menunggu hasilnya.
  const copy = [...data.value]
  const changed: [number, string, string][] = []

  for (const { row, column, value } of targets) {
    if (props.columns[column]?.editable === false) continue

    const id = props.columns[column]?.id
    const previous = copy[row]
    if (!id || !previous || previous[id] === value) continue

    copy[row] = { ...previous, [id]: value }
    changed.push([row, id, value])
  }

  if (!changed.length) return

  data.value = copy
  for (const [b, id, value] of changed) emit('change', b, id, value)
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled || editing.value) return

  const { key, shiftKey } = event
  const directions = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' } as const

  if (key in directions) {
    event.preventDefault()
    moveTo(moveCursor(cursor.value, directions[key as keyof typeof directions], rowCount.value, columnCount.value), shiftKey)
    return
  }

  if (key === 'Tab') {
    event.preventDefault()
    select(nextCell(cursor.value, shiftKey, rowCount.value, columnCount.value))
    return
  }

  if (key === 'Enter' || key === 'F2') {
    event.preventDefault()
    edit(cursor.value)
    return
  }

  if (key === 'Home' || key === 'End') {
    event.preventDefault()
    moveTo({ row: cursor.value.row, column: key === 'Home' ? 0 : columnCount.value - 1 }, shiftKey)
    return
  }

  if (key === 'Delete' || key === 'Backspace') {
    event.preventDefault()
    clearSelection()
    return
  }

  // Huruf biasa langsung memulai penyuntingan dengan huruf itu sebagai
  // isinya — persis seperti lembar sebar. Yang berpengubah dilewatkan supaya
  // Ctrl+C dan kawan-kawannya tetap sampai ke penanganannya sendiri.
  if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && canEdit(cursor.value)) {
    event.preventDefault()
    initialKey.value = key
    edit(cursor.value)
  }
}

/** The first character that started editing, read once by the cell. */
const initialKey = ref<string>()

function takeInitialKey() {
  const char = initialKey.value
  initialKey.value = undefined
  return char
}

function moveTo(cell: Cell, extend: boolean) {
  if (extend) anchor.value ??= { ...cursor.value }
  else anchor.value = null

  cursor.value = cell
}

function clearSelection() {
  if (props.readonly) return

  const copy = [...data.value]
  const changed: [number, string, string][] = []

  for (let b = 0; b < rowCount.value; b++) {
    for (let k = 0; k < columnCount.value; k++) {
      const cell = { row: b, column: k }
      const selected = range.value
        ? isInRange(cell, range.value)
        : b === cursor.value.row && k === cursor.value.column

      if (!selected || props.columns[k]?.editable === false) continue

      const id = props.columns[k]?.id
      const previous = copy[b]
      if (!id || !previous || previous[id] === '') continue

      copy[b] = { ...previous, [id]: '' }
      changed.push([b, id, ''])
    }
  }

  if (!changed.length) return

  data.value = copy
  for (const [b, id, value] of changed) emit('change', b, id, value)
}

provideDataGridContext({
  state: computed(() => ({
    columns: props.columns,
    rowCount: rowCount.value,
    cursor: cursor.value,
    range: range.value,
    editing: editing.value,
    disabled: props.disabled,
    readonly: props.readonly,
  })),
  select,
  edit,
  commit,
  cancel,
  cellValue,
  takeInitialKey,
  grid,
})

defineExpose({ select, edit })
</script>

<template>
  <div
    ref="grid"
    :aria-colcount="columnCount"
    :aria-disabled="props.disabled || undefined"
    :aria-readonly="props.readonly || undefined"
    :aria-rowcount="rowCount"
    :class="cn(
      'w-full overflow-auto rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-ring',
      props.class,
    )"
    data-slot="data-grid"
    role="grid"
    tabindex="0"
    @copy="onCopy"
    @keydown="onKeydown"
    @paste="onPaste"
  >
    <!-- Peran grid ada di pembungkus (yang memegang fokus), jadi tabelnya
         presentational; baris dan selnya diberi peran grid secara eksplisit. -->
    <table class="w-full border-collapse text-sm" role="presentation">
      <thead class="sticky top-0 z-10 bg-muted/60 backdrop-blur" role="rowgroup">
        <tr role="row">
          <th
            v-if="props.rowNumbers"
            class="w-10 border-r border-b px-2 py-1.5 text-center font-medium text-muted-foreground text-xs"
            role="columnheader"
            scope="col"
          >
            #
          </th>
          <th
            v-for="k in props.columns"
            :key="k.id"
            class="border-r border-b px-2 py-1.5 text-left font-medium last:border-r-0"
            role="columnheader"
            scope="col"
            :style="{ width: k.width ? `${k.width}px` : undefined }"
          >
            {{ k.title }}
          </th>
        </tr>
      </thead>

      <tbody role="rowgroup">
        <tr v-for="(_, b) in data" :key="b" role="row">
          <td
            v-if="props.rowNumbers"
            class="border-r border-b bg-muted/30 px-2 py-1 text-center text-muted-foreground text-xs tabular-nums"
            role="rowheader"
          >
            {{ b + 1 }}
          </td>
          <slot :row="b" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
