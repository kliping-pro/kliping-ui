<script lang="ts">
export const description = "Halaman aktif diisi warna utama."
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'
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
      <PaginationItem
          :class="cn(
            'shadow-none! hover:text-primary-foreground! dark:bg-primary dark:hover:bg-primary/90',
            buttonVariants({
              variant: 'default',
              size: 'icon',
            })
          )"
         
          is-active :value="2">
        2
      </PaginationItem>
      <PaginationItem :value="3">
        3
      </PaginationItem>
      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
