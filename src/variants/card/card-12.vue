<script lang="ts">
export const description = "Kartu produk: lencana New, rating bintang, harga, tombol keranjang dan favorit."
</script>

<script setup lang="ts">
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card class="w-full max-w-sm overflow-hidden">
    <div class="relative">
      <div class="aspect-video w-full bg-gradient-to-br from-amber-400 to-orange-500" />
      <Badge class="absolute top-2 right-2">
        New
      </Badge>
    </div>
    <CardHeader>
      <CardTitle>Premium Wireless Headphones</CardTitle>
      <CardDescription>
        High-quality audio with active noise cancellation
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <StarIcon v-for="i in 4" :key="i" class="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <StarIcon class="h-4 w-4" />
          <span class="text-muted-foreground text-sm">(128)</span>
        </div>
        <div class="text-2xl font-bold">
          $299
        </div>
      </div>
    </CardContent>
    <CardFooter class="gap-2">
      <Button class="flex-1">
        <ShoppingCartIcon class="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
      <Button variant="outline" size="icon" aria-label="Add to favorites">
        <HeartIcon class="h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
</template>
