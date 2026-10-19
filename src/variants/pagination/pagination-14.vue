<script lang="ts">
export const description = "Pemilih jumlah baris di kiri, hitungan dan tombol di kanan."
</script>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TOTAL_ITEMS = 100

const rowsPerPage = ref(10)

/**
 * Nomor halaman yang sedang dibuka datang dari slot `Pagination`, bukan dari
 * state di sini — di Reka UI akarnya yang memegangnya. Karena keterangan
 * "1-10 of 100" juga membutuhkannya, seluruh kelompok kanan ditaruh di dalam
 * slot itu, bukan cuma tombolnya.
 */
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-center gap-2">
    <div class="flex items-center gap-2">
      <Label class="whitespace-nowrap">Rows per page:</Label>
      <Select
        :model-value="rowsPerPage.toString()"
        @update:model-value="rowsPerPage = Number($event)"
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Pagination v-slot="{ page }" class="w-auto flex-auto" :items-per-page="rowsPerPage" :total="TOTAL_ITEMS">
      <div class="flex items-center gap-2">
        <span class="whitespace-nowrap text-muted-foreground text-sm">
          {{ (page - 1) * rowsPerPage + 1 }}-{{ Math.min(page * rowsPerPage, TOTAL_ITEMS) }}
          of {{ TOTAL_ITEMS }}
        </span>

        <PaginationContent>
          <PaginationPrevious as-child>
            <Button aria-label="Go to previous page" size="icon" variant="ghost">
              <ChevronLeftIcon class="h-4 w-4" />
            </Button>
          </PaginationPrevious>
          <PaginationNext as-child>
            <Button aria-label="Go to next page" size="icon" variant="ghost">
              <ChevronRightIcon class="h-4 w-4" />
            </Button>
          </PaginationNext>
        </PaginationContent>
      </div>
    </Pagination>
  </div>
</template>
