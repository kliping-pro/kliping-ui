<script lang="ts">
export const description = "Kartu promo dua panel: showcase produk berganti via titik dan foto hero bertajuk."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'

const PRODUCTS = [
  {
    name: "Active toning essence",
    price: "$59.00",
    image:
      "/samples/photos/photo-23.svg",
  },
  {
    name: "Hydrating face serum",
    price: "$49.00",
    image:
      "/samples/photos/photo-24.svg",
  },
  {
    name: "Vitamin C moisturizer",
    price: "$65.00",
    image:
      "/samples/photos/photo-01.svg",
  },
]

const currentProduct = ref(0)
const product = computed(() => PRODUCTS[currentProduct.value]!)
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 overflow-hidden rounded-2xl shadow-xl lg:grid-cols-2">
        <!-- Left: Product Showcase -->
        <div class="flex flex-col items-center justify-center bg-[#e8e3dc] p-16">
          <div class="mb-8 flex h-80 w-80 items-center justify-center">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-full w-full object-contain drop-shadow-2xl transition-all duration-500"
            >
          </div>
          <h3 class="mb-2 text-center text-lg font-medium text-gray-800">
            {{ product.name }}
          </h3>
          <p class="mb-6 text-center text-xl font-semibold text-gray-900">
            {{ product.price }}
          </p>
          <div class="flex gap-2">
            <button
              v-for="(_, index) in PRODUCTS"
              :key="index"
              :class="`h-2.5 w-2.5 rounded-full transition-all ${
                currentProduct === index
                  ? 'w-8 bg-gray-800'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`"
              :aria-label="`View product ${index + 1}`"
              @click="currentProduct = index"
            />
          </div>
        </div>

        <!-- Right: Hero Image with Text -->
        <div class="relative flex min-h-[500px] items-center justify-center lg:min-h-[600px]">
          <img
            src="/samples/photos/photo-02.svg"
            alt="Beauty model"
            class="absolute inset-0 h-full w-full object-cover"
          >
          <div class="relative z-10 px-8 text-center lg:px-16">
            <h2 class="font-serif text-5xl leading-tight font-light text-white drop-shadow-lg lg:text-6xl">
              Glow up with
              <br>
              nature
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
