<script lang="ts">
export const description = "Daftar produk empat kolom dengan deretan Select filter, urutan, dan tombol favorit."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FILTERS = [
  {
    id: "categories",
    label: "Categories",
    options: ["All", "Shirts", "Pants", "Sweaters", "Jackets"],
  },
  {
    id: "size",
    label: "Size",
    options: ["All Sizes", "XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "material",
    label: "Material",
    options: ["All Materials", "Cotton", "Cashmere", "Wool", "Silk", "Linen"],
  },
  {
    id: "color",
    label: "Color",
    options: ["All Colors", "Black", "Blue", "Gray", "Brown", "White", "Navy"],
  },
  {
    id: "pattern",
    label: "Pattern",
    options: ["All Patterns", "Solid", "Striped", "Cable-knit", "Printed"],
  },
]

const PRODUCTS = [
  {
    id: 1,
    image:
      "/samples/photos/photo-16.svg",
    brand: "Zegna",
    name: "Cable-knit cashmere cardigan",
    price: "€3,450",
    badge: "Exclusive",
  },
  {
    id: 2,
    image:
      "/samples/photos/photo-17.svg",
    brand: "Zegna",
    name: "Cotton and cashmere shirt",
    price: "€675",
    badge: null,
  },
  {
    id: 3,
    image:
      "/samples/photos/photo-18.svg",
    brand: "Zegna",
    name: "Wool straight pants",
    price: "€1,450",
    badge: "Exclusive",
  },
  {
    id: 4,
    image:
      "/samples/avatars/avatar-16.svg",
    brand: "Zegna",
    name: "Cashmere sweater",
    price: "€1,950",
    badge: "New Arrival",
  },
]

const favorites = ref<number[]>([])
const selectedFilters = ref<Record<string, string>>({})

function toggleFavorite(productId: number) {
  favorites.value = favorites.value.includes(productId)
    ? favorites.value.filter(id => id !== productId)
    : [...favorites.value, productId]
}

function setFilter(id: string, value: unknown) {
  selectedFilters.value = {
    ...selectedFilters.value,
    [id]: value as string,
  }
}
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2">
          <Select
            v-for="filter in FILTERS"
            :key="filter.id"
            :model-value="selectedFilters[filter.id] || filter.options[0]"
            @update:model-value="(value) => setFilter(filter.id, value)"
          >
            <SelectTrigger :aria-label="filter.label" class="w-[140px]">
              <SelectValue :placeholder="filter.label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in filter.options" :key="option" :value="option">
                {{ option }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-muted-foreground text-sm">462 Products</span>
          <Select default-value="featured">
            <SelectTrigger aria-label="Sort by" class="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="product in PRODUCTS"
          :key="product.id"
          class="group bg-card relative overflow-hidden rounded-lg border transition-all hover:shadow-lg"
        >
          <Badge
            v-if="product.badge"
            variant="secondary"
            class="absolute top-3 left-3 z-10 bg-white dark:bg-gray-900"
          >
            {{ product.badge }}
          </Badge>
          <button
            class="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
            :aria-label="`Add ${product.name} to favorites`"
            :aria-pressed="favorites.includes(product.id)"
            @click="toggleFavorite(product.id)"

          >
            <HeartIcon
              :class="`h-4 w-4 transition-colors ${
                favorites.includes(product.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`"
            />
          </button>

          <div class="bg-muted/30 aspect-square overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
          </div>

          <div class="border-t p-4">
            <div class="mb-2 flex items-start justify-between gap-2">
              <div class="flex-1">
                <p class="text-sm font-semibold">{{ product.brand }}</p>
                <p class="text-muted-foreground mt-1 text-sm leading-tight">
                  {{ product.name }}
                </p>
              </div>
            </div>
            <p class="mt-2 font-semibold">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
