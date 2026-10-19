<script lang="ts">
export const description = "Keterangan halaman di kiri, tombol maju-mundur di kanan."
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
  <div class="flex w-full max-w-xs items-center justify-between gap-3">
    <p class="flex-1 whitespace-nowrap text-muted-foreground text-sm">
      Showing 5 results
    </p>

    <Pagination class="justify-end" :items-per-page="1" :total="10">
      <PaginationContent class="gap-0 divide-x overflow-hidden rounded-lg border">
        <PaginationPrevious
            class="rounded-none *:[span]:hidden"
           
            size="icon-sm"
          />
        <PaginationNext
            class="rounded-none *:[span]:hidden"
           
            size="icon-sm"
          />
      </PaginationContent>
    </Pagination>
  </div>
</template>
