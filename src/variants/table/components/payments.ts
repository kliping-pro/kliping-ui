/**
 * Data dan definisi kolom yang dipakai bersama tiga varian tabel.
 *
 * Di sumbernya ketiganya membawa salinan datanya sendiri-sendiri, dan yang
 * membedakan cuma satu hal di masing-masing: kerapatan baris, penyaring nama
 * kolom, atau tidak sama sekali. Menyalinnya tiga kali berarti tiga tempat
 * yang harus disunting bersamaan untuk satu perubahan yang sama; di sini
 * bagian yang sama tinggal di satu berkas, dan tiap varian menyimpan
 * perbedaannya saja.
 */
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/vue-table'
import { ArrowUpDown } from '@lucide/vue'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const data: Payment[] = [
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
  { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@gmail.com' },
  { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@gmail.com' },
  { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
]

export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

const columnHelper = createColumnHelper<typeof features, Payment>()

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/**
 * Kolom aksi digambar pemakainya, bukan di sini: isinya menu yang menyentuh
 * papan klip, dan tiap varian menuliskannya sebagai template biasa supaya
 * yang terbaca di halaman kodenya markup, bukan panggilan `h()` berlapis.
 */
export function createColumns(renderActions: (payment: Payment) => unknown) {
  return columnHelper.columns([
    columnHelper.display({
      id: 'select',
      header: ({ table }) => h(Checkbox, {
        'modelValue': table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
      }),
      cell: ({ row }) => h(Checkbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row',
      }),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
    }),
    columnHelper.accessor('email', {
      header: ({ column }) => h(
        Button,
        { variant: 'ghost', onClick: () => column.toggleSorting(column.getIsSorted() === 'asc') },
        () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      ),
      cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    }),
    columnHelper.accessor('amount', {
      header: () => h('div', { class: 'text-right' }, 'Amount'),
      cell: ({ row }) => h(
        'div',
        { class: 'text-right font-medium' },
        usd.format(Number.parseFloat(row.getValue('amount'))),
      ),
    }),
    columnHelper.display({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => renderActions(row.original),
    }),
  ])
}
