<script lang="ts">
export const description = "Penomoran bawaan, halaman aktif bergaris tepi."
</script>

<script setup lang="ts">
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
      <PaginationPrevious />
      <PaginationItem :value="1">
        1
      </PaginationItem>
      <PaginationItem is-active :value="2">
        2
      </PaginationItem>
      <PaginationItem :value="3">
        3
      </PaginationItem>
      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
