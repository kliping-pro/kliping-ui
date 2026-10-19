<script lang="ts">
export const description = "Riwayat pesanan dengan card info order dan tabel produk berstatus Delivered."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const OPTIONS = [
  {
    data: "Order ID",
    value: "1234",
  },
  {
    data: "Date of Placement",
    value: "April 3, 2024",
  },
  {
    data: "Amount",
    value: "$2,570",
  },
]

const TABLE_ROW = [
  {
    img: "/samples/products/product-03.svg",
    product: "Premium Suit",
    amount: "$790",
    date: "Apr 6, 2024",
  },
  {
    img: "/samples/products/product-07.svg",
    product: "Linen Suit",
    amount: "$790",
    date: "Apr 6, 2024",
  },
  {
    img: "/samples/products/product-11.svg",
    product: "Tweed Suit",
    amount: "$990",
    date: "Apr 6, 2024",
  },
]

const TABLE_HEAD = ["Product", "Amount", "Status", "Date", "Details"]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <h2 class="text-lg font-semibold">Order History</h2>
      <p class="text-muted-foreground mt-2">
        See your recent orders, download your invoices.
      </p>
      <Card class="mt-8 mb-4 py-0">
        <CardContent class="flex flex-wrap items-center justify-between gap-4 p-4">
          <div class="flex gap-10">
            <div v-for="(option, i) in OPTIONS" :key="i">
              <p class="text-muted-foreground mb-0.5 text-sm">
                {{ option.data }}
              </p>
              <p class="font-semibold">{{ option.value }}</p>
            </div>
          </div>
          <Button>View Invoice</Button>
        </CardContent>
      </Card>
      <Card>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead v-for="head in TABLE_HEAD" :key="head">{{ head }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="{ img, product, amount, date } in TABLE_ROW" :key="product">
                <TableCell>
                  <div class="flex items-center gap-3">
                    <img :src="img" :alt="product" class="h-16">
                    <span class="text-sm font-semibold">{{ product }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-muted-foreground text-sm">
                  {{ amount }}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    class="bg-green-100 text-green-700"
                  >
                    Delivered
                  </Badge>
                </TableCell>
                <TableCell class="text-muted-foreground text-sm">
                  {{ date }}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  </section>
</template>
