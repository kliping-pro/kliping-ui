import type { ComputedRef, Ref } from 'vue'
import type { Cell, CellRange } from './grid'
import { createContext } from '@/lib/create-context'

export interface DataGridColumn {
  /** Field key in each row. */
  id: string
  title: string
  // Kolom nomor atau hasil hitungan biasanya tidak bisa disunting.
  /** Whether the column's cells can be edited. */
  editable?: boolean
  /** Fixed width, in pixels. */
  width?: number
  // Angka biasanya rata kanan.
  /** Text alignment. */
  align?: 'left' | 'center' | 'right'
}

export interface DataGridState {
  columns: DataGridColumn[]
  rowCount: number
  cursor: Cell
  range: CellRange | null
  /** The cell currently being edited, if any. */
  editing: Cell | null
  disabled: boolean
  readonly: boolean
}

export interface DataGridContext {
  state: ComputedRef<DataGridState>
  select: (cell: Cell, extend?: boolean) => void
  edit: (cell: Cell) => void
  commit: (cell: Cell, value: string) => void
  cancel: () => void
  cellValue: (row: number, column: number) => string
  // Mengetik huruf biasa di atas sel langsung memulai penyuntingan dengan
  // huruf itu sebagai isinya — kebiasaan dari lembar sebar. Hurufnya
  // ditampung di akar karena di sanalah papan ketik didengarkan, dan diambil
  // selnya saat terpasang.
  /** The character that started editing; read once, then cleared. */
  takeInitialKey: () => string | undefined
  grid: Ref<HTMLElement | undefined>
}

export const [provideDataGridContext, injectDataGridContext, injectDataGridContextOptional] = createContext<DataGridContext>('DataGrid')
