<script lang="ts">
export const description = "Tombol halamannya bulat penuh."
</script>

<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const pages = [1, 2, 3]
</script>

<template>
  <Pagination :items-per-page="1" :total="pages.length">
    <PaginationContent>
      <PaginationPrevious />
      <PaginationItem v-for="page in pages" :key="page"
          class="rounded-full"
         
          :is-active="page === 2" :value="page">
        {{ page }}
      </PaginationItem>
      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
