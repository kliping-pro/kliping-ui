<script lang="ts">
export const description = "Titik tiga menandai halaman yang tidak ditampilkan."
</script>

<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
</script>

<template>
  <Pagination class="@container" :items-per-page="1" :total="3">
    <!-- Deretan ini butuh 15.25rem; di wadah yang lebih sempit tombolnya mengecil. -->
    <PaginationContent class="@max-[15.25rem]:gap-0.5 @max-[15.25rem]:*:size-8 @max-[15.25rem]:*:px-0">
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
      <PaginationEllipsis />
      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
