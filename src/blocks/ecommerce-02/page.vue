<script lang="ts">
export const description = "Detail produk mantel dengan thumbnail vertikal, pilihan warna dan ukuran, serta accordion info."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon, PackageIcon, RefreshCwIcon, ShieldIcon, StarIcon, TruckIcon } from '@lucide/vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const IMAGES = [
  "/samples/products/product-03.svg",
  "/samples/products/product-07.svg",
  "/samples/products/product-11.svg",
  "/samples/products/product-03.svg",
]

const SIZES = ["XS", "S", "M", "L", "XL"]

const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#ffffff" },
  { name: "Gray", hex: "#e5e7eb" },
]

const FEATURES = [
  { icon: PackageIcon, text: "Premium quality materials" },
  { icon: TruckIcon, text: "Free shipping on orders $100+" },
  { icon: RefreshCwIcon, text: "30-day return policy" },
  { icon: ShieldIcon, text: "2-year warranty included" },
]

const ACCORDION_DATA = [
  {
    value: "one",
    title: "Features",
    desc: "This premium coat is crafted from weather-resistant fabric with advanced Gore-Tex technology, ensuring you stay dry and comfortable in all conditions. Features include adjustable cuffs, reinforced seams, and breathable lining.",
  },
  {
    value: "two",
    title: "Product Care",
    desc: "Machine wash cold with like colors. Use mild detergent and avoid bleach. Tumble dry on low heat or hang to dry. For best results, store in a cool, dry place and avoid direct sunlight to maintain color and fabric integrity.",
  },
  {
    value: "three",
    title: "Shipping & Returns",
    desc: "Free standard shipping on orders over $100. Express shipping available at checkout. We offer a 30-day return policy with free returns. Items must be unworn, unwashed, and in original packaging with tags attached.",
  },
  {
    value: "four",
    title: "Warranty",
    desc: "All our products come with a comprehensive 2-year warranty covering manufacturing defects. This includes issues with stitching, zippers, and fabric quality. Contact our customer service for warranty claims and support.",
  },
]

const selectedImage = ref(0)
const selectedColor = ref(0)
const selectedSize = ref("M")
const isFavorite = ref(false)
</script>

<template>
  <section class="min-h-screen bg-neutral-50 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div class="flex flex-col-reverse lg:flex-row lg:gap-4">
          <div class="mt-4 flex gap-2 lg:mt-0 lg:flex-col">
            <button
              v-for="(img, index) in IMAGES"
              :key="index"
              :class="`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? 'border-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`"
              @click="selectedImage = index"
            >
              <img
                :src="img"
                :alt="`Product view ${index + 1}`"
                class="h-full w-full object-cover"
              >
            </button>
          </div>

          <div class="flex-1">
            <div class="aspect-square overflow-hidden rounded-2xl bg-white">
              <img
                :src="IMAGES[selectedImage]"
                alt="Product main view"
                class="h-full w-full object-cover object-center"
              >
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <Badge
            variant="outline"
            class="mb-4 w-fit border-neutral-300 text-xs font-medium text-neutral-600"
          >
            New Arrival
          </Badge>

          <h1 class="mb-2 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
            Premium Winter Coat
          </h1>

          <div class="mb-6 flex items-center gap-4">
            <span class="text-2xl font-normal text-neutral-900">
              $1,490.00
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
            Experience unparalleled comfort and style with our premium winter
            coat. Meticulously crafted with attention to detail, this coat
            features weather-resistant fabric and a timeless design that
            complements any wardrobe. Perfect for both casual and formal
            occasions.
          </p>

          <div class="mb-6">
            <p class="mb-3 text-sm font-medium text-neutral-900">
              Color:
              <span class="font-normal">
                {{ COLORS[selectedColor]!.name }}
              </span>
            </p>
            <div class="flex gap-2">
              <button
                v-for="(color, index) in COLORS"
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

          <div class="mb-6">
            <p class="mb-3 text-sm font-medium text-neutral-900">
              Size: <span class="font-normal">{{ selectedSize }}</span>
            </p>
            <div class="flex gap-2">
              <button
                v-for="size in SIZES"
                :key="size"
                :class="`flex h-10 w-12 items-center justify-center rounded-md border-2 text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
                }`"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="mb-6 flex flex-col gap-3 sm:flex-row">
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

          <div class="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              v-for="(feature, index) in FEATURES"
              :key="index"
              class="flex items-center gap-2 text-sm text-neutral-600"
            >
              <component :is="feature.icon" class="h-4 w-4 flex-shrink-0" />
              <span>{{ feature.text }}</span>
            </div>
          </div>

          <Accordion
            type="single"
            default-value="one"
            collapsible
            class="w-full border-t border-neutral-200"
          >
            <AccordionItem v-for="{ value, title, desc } in ACCORDION_DATA" :key="value" :value="value">
              <AccordionTrigger class="text-sm font-medium text-neutral-900 hover:text-neutral-600">
                {{ title }}
              </AccordionTrigger>
              <AccordionContent class="text-sm leading-relaxed text-neutral-600">
                {{ desc }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  </section>
</template>
