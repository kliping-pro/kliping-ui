<script lang="ts">
export const description = "Deskripsi produk dengan breadcrumb, galeri thumbnail, Select warna dan ukuran, serta fitur."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronRightIcon,
  HeartIcon,
  RotateCcwIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const IMAGES = [
  { imgelink: "/samples/products/product-03.svg" },
  { imgelink: "/samples/products/product-07.svg" },
  { imgelink: "/samples/products/product-11.svg" },
  { imgelink: "/samples/products/product-03.svg" },
]

const SIZES = ["32", "34", "36", "38", "40", "42", "44"]

const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#ffffff" },
  { name: "Gray", hex: "#e5e7eb" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Brown", hex: "#92400e" },
]

const FEATURES = [
  { icon: TruckIcon, text: "Free shipping over $150" },
  { icon: RotateCcwIcon, text: "Easy 30-day returns" },
  { icon: ShieldIcon, text: "1-year warranty" },
]

const active = ref("/samples/products/product-03.svg")
const selectedSize = ref("36")
const selectedColor = ref("Black")
const isFavorite = ref(false)
</script>

<template>
  <section class="min-h-screen bg-neutral-50 py-12">
    <div class="container mx-auto px-4">
      <nav class="mb-8 flex items-center gap-2 text-sm text-neutral-500">
        <a href="#" class="hover:text-neutral-900">
          Home
        </a>
        <ChevronRightIcon class="h-4 w-4" />
        <a href="#" class="hover:text-neutral-900">
          Women
        </a>
        <ChevronRightIcon class="h-4 w-4" />
        <a href="#" class="hover:text-neutral-900">
          Outerwear
        </a>
        <ChevronRightIcon class="h-4 w-4" />
        <span class="text-neutral-900">Premium Winter Coat</span>
      </nav>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div class="overflow-hidden rounded-2xl bg-white">
            <img
              :src="active"
              alt="Product"
              class="h-[500px] w-full object-cover object-center"
            >
          </div>
          <div class="mt-4 flex justify-center gap-3">
            <button
              v-for="({ imgelink }, index) in IMAGES"
              :key="index"
              :class="`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                active === imgelink
                  ? 'border-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`"
              @click="active = imgelink"
            >
              <img
                :src="imgelink"
                :alt="`Gallery ${index + 1}`"
                class="h-full w-full object-cover object-center"
              >
            </button>
          </div>

          <div class="mt-8 space-y-6">
            <div>
              <h3 class="mb-3 text-lg font-medium text-neutral-900">
                Product Description
              </h3>
              <p class="leading-relaxed text-neutral-600">
                Experience luxury and comfort with this premium winter coat.
                Crafted from high-quality materials with meticulous attention
                to detail, this coat features a modern silhouette that
                flatters all body types. The water-resistant outer shell keeps
                you dry in light rain, while the insulated lining provides
                warmth without bulk.
              </p>
            </div>
            <div>
              <h3 class="mb-3 text-lg font-medium text-neutral-900">
                Key Features
              </h3>
              <ul class="space-y-2 text-neutral-600">
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                  <span>
                    Water-resistant fabric with breathable membrane technology
                  </span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                  <span>
                    Premium insulation for optimal warmth in cold weather
                  </span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                  <span>Adjustable cuffs and hem for personalized fit</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                  <span>
                    Multiple interior and exterior pockets for storage
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <Badge
            variant="outline"
            class="mb-4 w-fit border-neutral-300 text-xs font-medium text-neutral-600"
          >
            Limited Edition
          </Badge>

          <h1 class="mb-2 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
            Premium Winter Coat
          </h1>

          <div class="mb-6 flex items-center gap-4">
            <span class="text-2xl font-normal text-neutral-900">
              $1,290.00
            </span>
            <div class="flex items-center gap-1">
              <div class="flex">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  :class="`h-4 w-4 ${
                    i - 1 < 4
                      ? 'fill-neutral-900 text-neutral-900'
                      : 'fill-neutral-300 text-neutral-300'
                  }`"
                />
              </div>
              <span class="text-sm text-neutral-500">(100 reviews)</span>
            </div>
          </div>

          <p class="mb-6 text-sm leading-relaxed text-neutral-600">
            Elevate your winter wardrobe with this sophisticated coat that
            seamlessly blends style and functionality. Perfect for both
            professional settings and casual outings.
          </p>

          <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="mb-3 text-sm font-medium text-neutral-900">
                Color
              </p>
              <Select v-model="selectedColor">
                <SelectTrigger aria-label="Color" class="w-full border-neutral-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="color in COLORS" :key="color.name" :value="color.name">
                    <div class="flex items-center gap-2">
                      <div
                        class="h-4 w-4 rounded-full border border-neutral-200"
                        :style="{ backgroundColor: color.hex }"
                      />
                      <span>{{ color.name }}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p class="mb-3 text-sm font-medium text-neutral-900">
                Size
              </p>
              <Select v-model="selectedSize">
                <SelectTrigger aria-label="Size" class="w-full border-neutral-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="size in SIZES" :key="size" :value="size">
                    {{ size }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              v-for="(feature, index) in FEATURES"
              :key="index"
              class="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 text-center"
            >
              <component :is="feature.icon" class="h-5 w-5 flex-shrink-0 text-neutral-900" />
              <span class="text-xs text-neutral-600">
                {{ feature.text }}
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              class="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
            >
              Add to Cart
            </Button>
            <Button
              :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
              :aria-pressed="isFavorite"
              size="lg"
              variant="outline"

              :class="`border-neutral-900 transition-colors ${
                isFavorite
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'text-neutral-900 hover:bg-neutral-900 hover:text-white'
              }`"
              @click="isFavorite = !isFavorite"
            >
              <HeartIcon
                :class="`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
