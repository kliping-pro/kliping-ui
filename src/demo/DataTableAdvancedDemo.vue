<script setup lang="ts">
import type { ColumnFiltersState, ColumnVisibilityState, SortingState } from '@tanstack/vue-table'
import { CircleCheckIcon, CircleDashedIcon, CircleXIcon } from '@lucide/vue'
import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludesSome,
  filterFn_includesString,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table'
import { h, ref } from 'vue'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
} from '@/components/data-table-advanced'
import { Badge } from '@/components/ui/badge'

interface Invoice {
  id: string
  customer: string
  status: 'paid' | 'pending' | 'failed'
  amount: number
  date: string
}

const STATUS = [
  { label: 'Paid', value: 'paid', icon: CircleCheckIcon },
  { label: 'Pending', value: 'pending', icon: CircleDashedIcon },
  { label: 'Failed', value: 'failed', icon: CircleXIcon },
]

const FIRST_NAMES = ['Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Lucas', 'Mia', 'Jackson']
const STATUSES: Invoice['status'][] = ['paid', 'pending', 'failed']

const data: Invoice[] = Array.from({ length: 47 }, (_, i) => ({
  id: `INV-${String(1024 + i)}`,
  customer: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${['Martin', 'Nguyen', 'Brown', 'Davis'][i % 4]}`,
  status: STATUSES[(i * 7) % 3] as Invoice['status'],
  amount: 150 + ((i * 137) % 40) * 25,
  date: `2026-0${(i % 9) + 1}-${String((i % 27) + 1).padStart(2, '0')}`,
}))

const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filterFns: {
    includesString: filterFn_includesString,
    arrIncludesSome: filterFn_arrIncludesSome,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    text: sortFn_text,
  },
})

const columnHelper = createColumnHelper<typeof features, Invoice>()

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Invoice' }),
    cell: ({ row }) => h('span', { class: 'font-mono text-xs' }, row.getValue('id')),
    enableHiding: false,
  }),
  columnHelper.accessor('customer', {
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Customer' }),
    filterFn: 'includesString',
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = row.getValue('status') as Invoice['status']
      const variants = { paid: 'default', pending: 'secondary', failed: 'destructive' } as const
      return h(Badge, { variant: variants[status], class: 'capitalize' }, () => status)
    },
    filterFn: 'arrIncludesSome',
  }),
  columnHelper.accessor('date', {
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h('span', { class: 'tabular-nums' }, row.getValue('date')),
  }),
  columnHelper.accessor('amount', {
    header: ({ column }) => h(DataTableColumnHeader, { column, class: 'justify-end', title: 'Amount' }),
    cell: ({ row }) => h('div', { class: 'text-right font-medium tabular-nums' }, currency.format(row.getValue('amount'))),
    sortFn: 'basic',
  }),
])

// Keadaannya disimpan di luar supaya bagian lain halaman bisa membacanya —
// dan supaya jelas bahwa tabelnya tidak menyembunyikan apa pun.
const sorting = ref<SortingState>([{ id: 'date', desc: true }])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<ColumnVisibilityState>({})

const table = useTable({
  features,
  data,
  columns,
  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onColumnFiltersChange: (updater) => {
    columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater
  },
})

const COLUMN_LABELS = {
  customer: 'Customer',
  status: 'Status',
  date: 'Date',
  amount: 'Amount',
}
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <DataTableToolbar :table="table" search-column="customer" search-placeholder="Search customers…">
      <DataTableFacetedFilter :options="STATUS" :table="table" column="status" title="Status" />
      <template #right>
        <DataTableViewOptions :labels="COLUMN_LABELS" :table="table" />
      </template>
    </DataTableToolbar>

    <DataTable empty-message="No matching invoices." :table="table" />

    <DataTablePagination :show-selected="false" :table="table" />
  </div>
</template>
