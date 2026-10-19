<script lang="ts">
export const description = "Maju-mundur di dua ujung, keterangan halaman di tengahnya."
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
  <div class="w-full max-w-xs">
    <Pagination class="w-full" :items-per-page="1" :total="10">
      <PaginationContent class="w-full justify-between">
        <PaginationPrevious class="border" />
        <span class="text-muted-foreground text-sm">Page 1 of 21</span>
        <PaginationNext class="border" />
      </PaginationContent>
    </Pagination>
  </div>
</template>
