<script lang="ts">
export const description = "Cuma maju dan mundur, menyatu dalam satu bilah."
</script>

<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
</script>

<template>
  <Pagination :items-per-page="1" :total="10">
    <PaginationContent class="gap-0 divide-x overflow-hidden rounded-lg border">
      <PaginationPrevious class="rounded-none" />
      <PaginationNext class="rounded-none" />
    </PaginationContent>
  </Pagination>
</template>
