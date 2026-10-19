<script lang="ts">
export const description = "Semua tombolnya menyatu jadi satu bilah bergaris pemisah."
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

const pages = [1, 2, 3]
</script>

<template>
  <Pagination :items-per-page="1" :total="pages.length">
    <PaginationContent class="gap-0 divide-x overflow-hidden rounded-lg border">
      <PaginationPrevious class="rounded-none" />
        <PaginationItem v-for="page in pages" :key="page"
            :class="cn(
              {
                [buttonVariants({
                  variant: 'default',
                  class:
                    'hover:text-primary-foreground! dark:bg-primary dark:hover:bg-primary/90',
                })]: (page === 2),
              },
              'rounded-none border-none'
            )"
           
            :is-active="(page === 2)" :value="page">
          {{ page }}
        </PaginationItem>
      <PaginationNext class="rounded-none" />
    </PaginationContent>
  </Pagination>
</template>
