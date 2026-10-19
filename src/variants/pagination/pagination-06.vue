<script lang="ts">
export const description = "Empat arah sekaligus: ke awal, mundur, maju, dan ke akhir."
</script>

<script setup lang="ts">
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from '@lucide/vue'
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
</script>

<template>
  <Pagination class="@container" :items-per-page="1" :total="3">
    <!-- Tujuh tombol 36px butuh 15.75rem; di wadah yang lebih sempit tombolnya mengecil. -->
    <PaginationContent class="gap-0 sm:gap-1 @max-[15.75rem]:*:size-8 @max-[14rem]:*:size-7">
      <PaginationFirst aria-label="Go to first page" size="icon">
        <ChevronFirst class="h-4 w-4" />
      </PaginationFirst>
      <PaginationPrevious aria-label="Go to previous page" size="icon">
        <ChevronLeft class="h-4 w-4" />
      </PaginationPrevious>
      <PaginationItem :value="1">
        1
      </PaginationItem>
      <PaginationItem is-active :value="2">
        2
      </PaginationItem>
      <PaginationItem :value="3">
        3
      </PaginationItem>
      <PaginationNext aria-label="Go to next page" size="icon">
        <ChevronRight class="h-4 w-4" />
      </PaginationNext>
      <PaginationLast aria-label="Go to last page" size="icon">
        <ChevronLast class="h-4 w-4" />
      </PaginationLast>
    </PaginationContent>
  </Pagination>
</template>
