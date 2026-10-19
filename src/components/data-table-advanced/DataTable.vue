<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { FlexRender } from '@tanstack/vue-table'
import { computed } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { AnyTable } from './types'
import { getHeaderWidth, getVisibleCells, isRowSelected } from './types'

/**
 * Tabel data lengkap di atas TanStack Table.
 *
 * Yang diangkut dari sumbernya susunannya, bukan mesinnya. TanStack Table
 * sudah punya versi Vue yang resmi, jadi seluruh lapisan penyaringan,
 * pengurutan, penghalaman, dan pemilihan barisnya dipakai apa adanya — dan
 * di sanalah sebenarnya seluruh perhitungan tabel tinggal.
 *
 * Instansi tabelnya dibuat di luar, bukan di dalam. Kolom, data, dan
 * kemampuan yang dipakai berbeda-beda di tiap tabel, dan komponen yang
 * membuatnya sendiri akan menerima dua puluh prop untuk meneruskan semuanya —
 * lalu tetap kurang saat ada yang butuh yang kedua puluh satu.
 *
 * Yang tersisa di sini: kerangka, keadaan kosong, dan tanda baris terpilih.
 */
const props = withDefaults(defineProps<{
  /** TanStack table instance whose headers and current row model are rendered. */
  table: AnyTable
  /** The message shown when no rows pass the filters. */
  emptyMessage?: string
  /** Rows stay fully visible; their height is not clipped. */
  class?: HTMLAttributes['class']
}>(), {
  emptyMessage: 'No results.',
})

const rows = computed(() => props.table.getRowModel().rows)
const columnCount = computed(() => props.table.getAllLeafColumns().length)
</script>

<template>
  <div
    :class="cn('overflow-hidden rounded-md border', props.class)"
    data-slot="data-table"
  >
    <Table>
      <TableHeader>
        <TableRow v-for="group in props.table.getHeaderGroups()" :key="group.id">
          <TableHead
            v-for="header in group.headers"
            :key="header.id"
            :colspan="header.colSpan"
            :style="{ width: getHeaderWidth(header) ? `${getHeaderWidth(header)}px` : undefined }"
          >
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="row in rows"
          :key="row.id"
          :data-state="isRowSelected(row) ? 'selected' : undefined"
        >
          <TableCell v-for="cell in getVisibleCells(row)" :key="cell.id">
            <FlexRender :cell="cell" />
          </TableCell>
        </TableRow>

        <TableRow v-if="!rows.length">
          <TableCell class="h-24 text-center text-muted-foreground" :colspan="columnCount">
            <slot name="empty">{{ props.emptyMessage }}</slot>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
