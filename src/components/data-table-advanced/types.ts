import type { FlexRenderCell, FlexRenderHeader } from '@tanstack/vue-table'

/**
 * Bentuk minimal tabel TanStack yang benar-benar disentuh komponen di sini.
 *
 * TanStack v9 memasang tipe per fitur: `row.getIsSelected` baru ada di tipe
 * `Row` kalau `rowSelectionFeature` didaftarkan, `column.getCanSort` baru ada
 * kalau `rowSortingFeature` didaftarkan. Rancangan yang bagus — yang tidak
 * dipakai tidak ikut masuk bundel, dan yang memanggilnya tanpa mendaftarkan
 * fiturnya ditolak sebelum program jalan.
 *
 * Tapi komponen di berkas ini harus melayani tabel mana pun. Dua jalan yang
 * tampak jelas keduanya buntu:
 *
 * Menuliskan `Table<TFeatures, TData>` dan membiarkannya generik gagal di
 * tempat pemanggilan lewat `h()` — TypeScript tidak bisa menyimpulkan
 * `TFeatures` dari sana dan jatuh ke batas atasnya, yang berarti seluruh
 * fitur, yang berarti tabel nyata mana pun kurang.
 *
 * Menuliskan `any` untuk parameter fiturnya justru lebih buruk:
 * `ExtractFeatureMapTypes` sengaja membuka seluruh anggota tiap fitur saat
 * melihat `any`, jadi yang diminta malah lebih banyak, bukan lebih sedikit.
 *
 * Yang ditempuh jalan ketiga: menuliskan apa yang sungguh-sungguh dipakai.
 * Tiap anggota yang bergantung fitur ditulis boleh tidak ada, dan tabel
 * TanStack mana pun memenuhinya secara struktural tanpa perlu diberi tahu.
 * Sebagai bonus, daftar di bawah jadi keterangan yang tepat tentang apa yang
 * disentuh kerangka ini — sesuatu yang tidak pernah bisa dikatakan
 * `Table<any, any>`.
 *
 * Yang menulis kolom dan datanya tetap mendapat pemeriksaan penuh dari
 * `createColumnHelper`. Yang dilonggarkan cuma tapal batas antara tabel dan
 * kerangkanya.
 */

export interface AnyColumn {
  id: string
  accessorFn?: unknown
  getCanSort?: () => boolean
  getIsSorted?: () => false | 'asc' | 'desc'
  toggleSorting?: (desc?: boolean) => void
  clearSorting?: () => void
  getCanHide?: () => boolean
  getIsVisible?: () => boolean
  toggleVisibility?: (value?: boolean) => void
  getFilterValue?: () => unknown
  setFilterValue?: (value: unknown) => void
  getFacetedUniqueValues?: () => Map<unknown, number>
}

export interface AnyHeader extends FlexRenderHeader {
  id: string
  colSpan: number
  isPlaceholder: boolean
  getSize?: () => number
}

export interface AnyCell extends FlexRenderCell {
  id: string
}

export interface AnyRow {
  id: string
  getIsSelected?: () => boolean
  getVisibleCells?: () => AnyCell[]
  getAllCells: () => AnyCell[]
}

export interface AnyTable {
  getHeaderGroups: () => { id: string, headers: AnyHeader[] }[]
  getRowModel: () => { rows: AnyRow[] }
  getAllLeafColumns: () => AnyColumn[]
  getColumn: (id: string) => AnyColumn | undefined
  // v9 tidak lagi punya `getState()`. Yang ada `store`, sebuah
  // `ReadonlyStore` yang nilainya dibaca lewat `.state` — dan potongan
  // keadaan tiap fitur cuma ada di sana kalau fiturnya didaftarkan.
  /** The table state; each feature's slice only exists when that feature is registered. */
  store: {
    state: {
      pagination?: { pageIndex: number, pageSize: number }
      columnFilters?: { id: string, value: unknown }[]
    }
  }
  getPageCount?: () => number
  setPageIndex?: (index: number) => void
  setPageSize?: (size: number) => void
  previousPage?: () => void
  nextPage?: () => void
  getCanPreviousPage?: () => boolean
  getCanNextPage?: () => boolean
  resetColumnFilters?: () => void
  getFilteredSelectedRowModel?: () => { rows: unknown[] }
  getFilteredRowModel?: () => { rows: unknown[] }
}

/** The column width set by `columnSizingFeature`, when that feature is used. */
export function getHeaderWidth(header: AnyHeader): number | undefined {
  const size = header.getSize?.()

  // 150 lebar bawaan TanStack untuk kolom yang tidak diatur lebarnya. Menulis
  // lebar itu ke gaya membuat seluruh kolom kaku 150 piksel — kebalikan dari
  // maksudnya.
  return size === undefined || size === 150 ? undefined : size
}

/** Whether the row is selected, when `rowSelectionFeature` is used. */
export function isRowSelected(row: AnyRow): boolean {
  return row.getIsSelected?.() ?? false
}

// Tabel tanpa `columnVisibilityFeature` tidak punya kolom tersembunyi, jadi
// seluruh selnya memang terlihat — dan `getAllCells` jawaban yang benar di
// sana, bukan sekadar penambal.
/** The cells rendered in a row. */
export function getVisibleCells(row: AnyRow): AnyCell[] {
  return row.getVisibleCells?.() ?? row.getAllCells()
}

// Yang ditawarkan cuma kolom beraksesor. Kolom tampilan — kotak centang
// pemilih baris, tombol aksi di ujung kanan — tidak punya judul yang bisa
// dibaca, dan menyembunyikannya membuat tabelnya tidak bisa dipakai lagi.
/** The columns a user may hide, for the view options menu. */
export function getHideableColumns(table: AnyTable): AnyColumn[] {
  return table.getAllLeafColumns().filter(k => (k.getCanHide?.() ?? false) && k.accessorFn !== undefined)
}
