<script lang="ts">
export const description = "Tiap tombol bergaris tepi sendiri."
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
    <PaginationContent>
      <PaginationPrevious class="border" />

        <PaginationItem v-for="page in pages" :key="page"
            :class="cn({
              [buttonVariants({
                variant: 'default',
                class:
                  'shadow-none! hover:text-primary-foreground! dark:bg-primary dark:hover:bg-primary/90',
              })]: (page === 2),
              border: !(page === 2),
            })"
           
            :is-active="page === 2" :value="page">
          {{ page }}
        </PaginationItem>

      <PaginationNext class="border" />
    </PaginationContent>
  </Pagination>
</template>
