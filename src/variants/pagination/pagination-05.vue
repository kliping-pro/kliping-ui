<script lang="ts">
export const description = "Panah ganda untuk melompat ke ujung."
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
      <PaginationPrevious aria-label="Go to previous page" size="icon">
        <ChevronsLeft class="h-4 w-4" />
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
        <ChevronsRight class="h-4 w-4" />
      </PaginationNext>
    </PaginationContent>
  </Pagination>
</template>
