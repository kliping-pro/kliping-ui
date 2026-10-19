<script lang="ts">
export const description = "Detail produk dengan carousel gambar berpanah dan info rata tengah berpilihan ukuran."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const IMAGES = [
  "/samples/products/product-03.svg",
  "/samples/products/product-07.svg",
  "/samples/products/product-11.svg",
]

const SIZES = ["XS", "S", "M", "L"]

const selectedSize = ref("S")
const currentIndex = ref(0)

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % IMAGES.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + IMAGES.length) % IMAGES.length
}
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <nav class="mb-4 flex text-sm">
        <a href="#" class="text-muted-foreground hover:text-foreground">
          Store
        </a>
        <span class="mx-2">/</span>
        <a href="#" class="text-muted-foreground hover:text-foreground">
          Designers
        </a>
        <span class="mx-2">/</span>
        <span class="text-foreground">Pink Blouse</span>
      </nav>
      <div class="mt-4 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <Card class="py-10">
            <CardContent class="relative p-0">
              <div class="overflow-hidden">
                <img
                  :src="IMAGES[currentIndex]"
                  :alt="`Product ${currentIndex + 1}`"
                  class="mx-auto h-[30rem] object-cover transition-transform duration-300"
                >
              </div>
              <Button
                variant="ghost"
                size="icon"
                class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full"
                aria-label="Previous image"
                @click="prevSlide"
              >
                <ChevronLeftIcon class="h-7 w-7" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
                aria-label="Next image"
                @click="nextSlide"
              >
                <ChevronRightIcon class="h-7 w-7" />
              </Button>
            </CardContent>
          </Card>
        </div>
        <div class="text-center">
          <h2 class="mb-6 text-2xl font-bold">Pink Blouse</h2>
          <p class="text-primary text-2xl font-semibold">$1,290</p>
          <div class="my-8 flex items-center justify-center gap-2">
            <div class="flex">
              <svg
                v-for="star in [1, 2, 3, 4]"
                :key="star"
                class="h-5 w-5 fill-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg class="h-5 w-5 fill-gray-300" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
            <span class="text-sm font-semibold">100 Reviews</span>
          </div>
          <p class="text-muted-foreground [text-wrap:_balance]">
            There's nothing I really wanted to do in life that I
            wasn't able to get good at. That's my skill. I'm
            not really specifically talented at anything except for the
            ability to learn.
          </p>
          <h3 class="mt-8 mb-4 text-center text-lg font-semibold">
            Color
          </h3>
          <div class="flex justify-center gap-2">
            <div class="h-5 w-5 cursor-pointer rounded bg-black" />
            <div class="h-5 w-5 cursor-pointer rounded border bg-white" />
            <div class="h-5 w-5 cursor-pointer rounded border bg-gray-200" />
          </div>
          <h3 class="mt-8 mb-4 text-center text-lg font-semibold">
            Size
          </h3>
          <div class="flex items-center justify-center gap-4">
            <Button
              v-for="size in SIZES"
              :key="size"
              :variant="size === selectedSize ? 'default' : 'outline'"
              @click="selectedSize = size"
            >
              {{ size }}
            </Button>
          </div>
          <div class="my-6 flex items-center justify-center gap-2">
            <Button size="lg" class="w-full max-w-60">
              Add to Cart
            </Button>
            <Button aria-label="Add to favorites" size="lg" variant="outline" class="text-red-500">

              <HeartIcon class="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
