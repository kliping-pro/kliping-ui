<script setup lang="ts">
import type { AnyTable } from './types'
import type { HTMLAttributes } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@lucide/vue'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/**
 * Penghalaman: jumlah baris per halaman dan tombol berpindah.
 *
 * Nomor halaman ditulis "3 dari 12", bukan sebagai deretan tombol angka.
 * Deretan angka masuk akal untuk daftar yang orang lompati sesukanya —
 * hasil pencarian, arsip. Tabel data dibaca berurutan, dan angka yang harus
 * dihitung sendiri letaknya cuma menambah barang di layar.
 */
const props = withDefaults(defineProps<{
  /** TanStack table instance whose pagination this controls. */
  table: AnyTable
  /** The rows-per-page options. */
  pageSizes?: number[]
  /** Shows how many rows are selected out of how many. */
  showSelected?: boolean
  class?: HTMLAttributes['class']
}>(), {
  pageSizes: () => [10, 20, 30, 50, 100],
  showSelected: true,
})

/** Every member used below only exists when `rowPaginationFeature` is registered. */
const t = computed(() => props.table)

const pageIndex = computed(() => t.value.store.state.pagination?.pageIndex ?? 0)
const pageSize = computed(() => t.value.store.state.pagination?.pageSize ?? 10)
const pageCount = computed(() => Math.max(1, t.value.getPageCount?.() ?? 1))

const selectedCount = computed(() => t.value.getFilteredSelectedRowModel?.().rows.length ?? 0)
const filteredCount = computed(() => t.value.getFilteredRowModel?.().rows.length ?? 0)
</script>

<template>
  <div
    :class="cn('flex flex-wrap items-center justify-between gap-4 px-1', props.class)"
    data-slot="data-table-pagination"
  >
    <p class="text-muted-foreground text-sm">
      <template v-if="props.showSelected && selectedCount > 0">
        {{ selectedCount }} of {{ filteredCount }} row(s) selected.
      </template>
      <template v-else>
        {{ filteredCount }} row(s).
      </template>
    </p>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="whitespace-nowrap text-sm">Rows per page</span>
        <Select
          :model-value="String(pageSize)"
          @update:model-value="t.setPageSize?.(Number($event))"
        >
          <SelectTrigger aria-label="Rows per page" class="h-8 w-[4.5rem]" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="n in props.pageSizes" :key="n" :value="String(n)">
              {{ n }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <span class="whitespace-nowrap text-sm tabular-nums">
        Page {{ pageIndex + 1 }} of {{ pageCount }}
      </span>

      <div class="flex items-center gap-1">
        <Button
          aria-label="First page"
          class="hidden size-8 sm:inline-flex"
          :disabled="!(t.getCanPreviousPage?.() ?? false)"
          size="icon"
          variant="outline"
          @click="t.setPageIndex?.(0)"
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          aria-label="Previous page"
          class="size-8"
          :disabled="!(t.getCanPreviousPage?.() ?? false)"
          size="icon"
          variant="outline"
          @click="t.previousPage?.()"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          aria-label="Next page"
          class="size-8"
          :disabled="!(t.getCanNextPage?.() ?? false)"
          size="icon"
          variant="outline"
          @click="t.nextPage?.()"
        >
          <ChevronRightIcon />
        </Button>
        <Button
          aria-label="Last page"
          class="hidden size-8 sm:inline-flex"
          :disabled="!(t.getCanNextPage?.() ?? false)"
          size="icon"
          variant="outline"
          @click="t.setPageIndex?.(pageCount - 1)"
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  </div>
</template>
