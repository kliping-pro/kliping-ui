<script lang="ts">
export const description = "Tombol maju-mundur bertuliskan kata, bukan panah saja."
</script>

<script setup lang="ts">
import { ChevronsLeft, ChevronsRight } from '@lucide/vue'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
</script>

<template>
  <Pagination :items-per-page="1" :total="3">
    <PaginationContent>
      <PaginationPrevious
          aria-label="Go to previous page"
          class="gap-1 pl-2.5"
         
          size="default">
        <ChevronsLeft class="h-4 w-4" />
          <span class="hidden sm:block">Previous</span>
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
      <PaginationNext
          aria-label="Go to next page"
          class="gap-1 pr-2.5"
         
          size="default">
        <span class="hidden sm:block">Next</span>
          <ChevronsRight class="h-4 w-4" />
      </PaginationNext>
    </PaginationContent>
  </Pagination>
</template>
