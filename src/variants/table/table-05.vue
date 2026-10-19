<script lang="ts">
export const description = "Dengan penomoran halaman di bawahnya."
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const products = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    rating: 4.5,
  },
  {
    id: 102,
    name: "Yoga Mat",
    category: "Sports & Fitness",
    price: 25.0,
    rating: 4.8,
  },
  {
    id: 103,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 80.0,
    rating: 4.2,
  },
  {
    id: 104,
    name: "Running Shoes",
    category: "Sportswear",
    price: 70.0,
    rating: 4.6,
  },
  {
    id: 105,
    name: "Smartwatch",
    category: "Electronics",
    price: 120.0,
    rating: 4.7,
  },
]
</script>

<template>
  <div class="w-full">
    <div class="w-full overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="pl-4">ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price (USD)</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="product in products" class="odd:bg-muted/50" :key="product.id">
            <TableCell class="pl-4">{{ product.id }}</TableCell>
            <TableCell class="font-medium">{{ product.name }}</TableCell>
            <TableCell>{{ product.category }}</TableCell>
            <TableCell>{{ product.price }}</TableCell>
            <TableCell>{{ product.rating }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <Pagination class="mt-4" :items-per-page="1" :total="3">
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
        <PaginationEllipsis />
        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>
