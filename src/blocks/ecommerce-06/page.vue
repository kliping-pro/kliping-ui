<script lang="ts">
export const description = "Halaman detail tas mewah tiga kolom: thumbnail, gambar utama, dan info dengan panel lipat."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronDownIcon,
  MapPinIcon,
  PackageIcon,
  RulerIcon,
  ShoppingBagIcon,
  StarIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const selectedImage = ref(0)
const selectedColor = ref(1)
const isInfoOpen = ref(false)

const thumbnails = [
  "/placeholder.svg?height=80&width=80&text=Bag+1",
  "/placeholder.svg?height=80&width=80&text=Bag+2",
  "/placeholder.svg?height=80&width=80&text=Detail",
  "/placeholder.svg?height=80&width=80&text=Inside",
  "/placeholder.svg?height=80&width=80&text=Model",
  "/placeholder.svg?height=80&width=80&text=Lifestyle",
]

const colors = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Cream", hex: "#f5f0e8" },
  { name: "Forest Green", hex: "#7d9488" },
  { name: "Gray", hex: "#9ca3af" },
  { name: "Navy Blue", hex: "#0f172a" },
  { name: "Brown", hex: "#a0522d" },
]

const features = [
  { icon: ShoppingBagIcon, text: "Crossbody style" },
  { icon: PackageIcon, text: "Premium leather" },
  { icon: RulerIcon, text: "Adjustable strap" },
  { icon: MapPinIcon, text: "Crafted in France" },
]
</script>

<template>
  <div class="min-h-screen bg-neutral-50 p-4 sm:p-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-8 lg:grid-cols-[auto_1fr_1fr] lg:gap-12">
        <div class="hidden lg:flex lg:flex-col lg:gap-3">
          <button
            v-for="(thumb, index) in thumbnails"
            :key="index"
            :class="`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === index
                ? 'border-neutral-900'
                : 'border-neutral-200 hover:border-neutral-400'
            }`"
            @click="selectedImage = index"
          >
            <img
              :src="thumb"
              :alt="`Product view ${index + 1}`"
              class="h-full w-full object-cover"
            >
          </button>
        </div>

        <div class="flex items-start justify-center">
          <div class="w-full max-w-lg">
            <div class="aspect-square overflow-hidden rounded-2xl bg-white">
              <img
                :src="thumbnails[selectedImage]"
                alt="Product main view"
                class="h-full w-full object-cover"
              >
            </div>
            <div class="mt-4 flex gap-2 lg:hidden">
              <button
                v-for="(thumb, index) in thumbnails.slice(0, 4)"
                :key="index"
                :class="`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? 'border-neutral-900'
                    : 'border-neutral-200'
                }`"
                @click="selectedImage = index"
              >
                <img
                  :src="thumb"
                  :alt="`Thumbnail ${index + 1}`"
                  class="h-full w-full object-cover"
                >
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <Badge
            variant="outline"
            class="mb-4 w-fit border-neutral-300 text-xs font-medium text-neutral-600"
          >
            Trending Now
          </Badge>

          <h1 class="mb-2 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
            Artisan Leather Crossbody
          </h1>

          <div class="mb-6 flex items-center gap-4">
            <span class="text-2xl font-normal text-neutral-900">
              $385.00
            </span>
            <div class="flex items-center gap-1">
              <div class="flex">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="h-4 w-4 fill-neutral-900 text-neutral-900"
                />
              </div>
              <span class="text-sm text-neutral-500">(4.7)</span>
            </div>
          </div>

          <div class="mb-6">
            <p class="mb-3 text-sm font-medium text-neutral-900">
              Color:
              <span class="font-normal">
                {{ colors[selectedColor]!.name }}
              </span>
            </p>
            <div class="flex gap-2">
              <button
                v-for="(color, index) in colors"
                :key="index"
                :class="`h-10 w-10 rounded-md border-2 transition-all ${
                  selectedColor === index
                    ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
                @click="selectedColor = index"
              />
            </div>
          </div>

          <p class="mb-4 text-sm leading-relaxed text-neutral-600">
            Elegant crossbody bag crafted from premium vegetable-tanned
            leather with a minimalist silhouette. Features a secure magnetic
            clasp closure, interior zip compartment, and an adjustable
            shoulder strap for versatile wear.
          </p>

          <p class="mb-6 text-sm text-neutral-600">
            This is a demo store. To buy this product, visit
            <a
              href="#"
              class="font-medium text-neutral-900 underline underline-offset-2 hover:text-neutral-700"
            >
              Maison Atelier
            </a>
            official store.
          </p>

          <div class="mb-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              class="flex-1 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              class="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
            >
              Buy it Now
            </Button>
          </div>

          <div class="mb-6 grid grid-cols-2 gap-3">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="flex items-center gap-2 text-sm text-neutral-600"
            >
              <component :is="feature.icon" class="h-4 w-4" />
              <span>{{ feature.text }}</span>
            </div>
          </div>

          <div class="border-t border-neutral-200">
            <button
              class="flex w-full items-center justify-between py-4 text-sm font-medium text-neutral-900 hover:text-neutral-600"
              @click="isInfoOpen = !isInfoOpen"
            >
              More Information
              <ChevronDownIcon
                :class="`h-4 w-4 transition-transform ${
                  isInfoOpen ? 'rotate-180' : ''
                }`"
              />
            </button>
            <div v-if="isInfoOpen" class="pb-4 text-sm leading-relaxed text-neutral-600">
              <p class="mb-3">
                <strong>Materials &amp; Care:</strong> This bag is made from
                100% full-grain vegetable-tanned leather that develops a
                beautiful patina over time. Clean with a soft, dry cloth and
                condition regularly with leather cream.
              </p>
              <p class="mb-3">
                <strong>Dimensions:</strong> 9.5" W x 7" H x 3" D. Strap
                drop adjustable from 20" to 24". Weight: 1.2 lbs.
              </p>
              <p>
                <strong>Shipping &amp; Returns:</strong> Free standard shipping
                on orders over $200. 30-day return policy with original
                receipt and tags attached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
