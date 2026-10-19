<script lang="ts">
export const description = "Foto ruangan besar dengan hotspot produk dan card vas berpengatur jumlah di kanan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  EyeIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const quantity = ref(1)
const isFavorite = ref(false)
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto text-center">
      <Badge
        variant="outline"
        class="border-primary/30 bg-primary/10 text-primary mb-4"
      >
        Room Previewer
      </Badge>
      <h2 class="my-4 text-4xl font-bold tracking-tight">
        Visualize Your Space
      </h2>
      <p class="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
        Easily preview furniture, decor, and more in your space, ensuring
        everything fits perfectly and looks just right. It's the ultimate
        tool for hassle-free home customization and design!
      </p>
    </div>

    <div class="container mx-auto mt-14">
      <div class="relative">
        <img
          src="/samples/photos/photo-10.svg"
          alt="Room preview"
          class="h-[680px] w-full rounded-2xl object-cover object-center shadow-2xl"
        >
        <div class="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-tr from-black/30 via-black/10 to-transparent" />

        <div class="absolute top-6 right-6 bottom-6 left-6 !ml-auto flex max-w-[26rem] flex-col justify-between rounded-2xl border border-white/30 bg-white/90 px-6 py-6 shadow-2xl backdrop-blur-xl dark:bg-gray-900/90">
          <div>
            <div class="mb-4 flex items-start justify-between">
              <Badge class="bg-green-700 text-white">New Arrival</Badge>
              <Button
                variant="ghost"
                size="icon"
                :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
                :aria-pressed="isFavorite"
                :class="`h-9 w-9 transition-colors ${
                  isFavorite
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-muted-foreground hover:text-red-500'
                }`"
                @click="isFavorite = !isFavorite"
              >
                <HeartIcon
                  :class="`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`"
                />
              </Button>
            </div>

            <div class="mx-auto mb-6 grid place-items-center">
              <div class="bg-muted/50 mb-4 rounded-xl p-6">
                <img
                  src="/samples/products/product-04.svg"
                  alt="Vase"
                  class="h-32 w-32"
                >
              </div>
              <h3 class="text-2xl font-bold">Elegant Ceramic Vase</h3>

              <div class="mt-3 flex items-center gap-2">
                <div class="flex items-center gap-1">
                  <StarIcon
                    v-for="star in [1, 2, 3, 4, 5]"
                    :key="star"
                    class="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                </div>
                <span class="text-muted-foreground text-sm">
                  (127 reviews)
                </span>
              </div>

              <div class="mt-4 flex items-baseline gap-2">
                <p class="text-3xl font-bold">$149.90</p>
                <span class="text-muted-foreground text-sm line-through">
                  $199.90
                </span>
              </div>
            </div>

            <p class="text-muted-foreground mx-auto max-w-xs text-center text-sm leading-relaxed">
              Add a touch of sophistication to your home with our handcrafted
              ceramic vase.
            </p>

            <div class="bg-muted/50 mb-2 flex items-center justify-center gap-2 rounded-lg py-3">
              <TruckIcon class="h-4 w-4 text-green-600 dark:text-green-400" />
              <span class="text-sm font-medium">
                Free shipping on orders over $100
              </span>
            </div>

            <div class="mb-4 flex items-center justify-center gap-3">
              <span class="text-sm font-medium">Quantity:</span>
              <div class="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  class="h-8 w-8"
                  aria-label="Decrease quantity"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  <MinusIcon class="h-3 w-3" />
                </Button>
                <span class="w-8 text-center font-semibold">
                  {{ quantity }}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  class="h-8 w-8"
                  aria-label="Increase quantity"
                  @click="quantity = quantity + 1"
                >
                  <PlusIcon class="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <Button class="flex-1 gap-2" size="lg">
                <ShoppingCartIcon class="h-4 w-4" />
                Add to Cart
              </Button>
              <Button aria-label="Quick view" variant="outline" size="lg" class="shrink-0 gap-2">
                <EyeIcon class="h-4 w-4" />

              </Button>
            </div>
          </div>
        </div>

        <div class="absolute hidden lg:flex">
          <div class="group relative grid h-12 w-12 translate-x-[17rem] -translate-y-[30rem] cursor-pointer place-content-center rounded-full border-2 border-white bg-white shadow-xl transition-all hover:scale-110">
            <div class="bg-primary h-4 w-4 animate-pulse rounded-full" />
            <div class="absolute -top-12 left-1/2 hidden -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-lg group-hover:block dark:bg-gray-900">
              Ceramic Vase
            </div>
          </div>
          <div class="group relative grid h-12 w-12 translate-x-[26rem] -translate-y-[26rem] cursor-pointer place-content-center rounded-full border-2 border-white bg-white shadow-xl transition-all hover:scale-110">
            <div class="bg-primary h-4 w-4 animate-pulse rounded-full" />
            <div class="absolute -top-12 left-1/2 hidden -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-lg group-hover:block dark:bg-gray-900">
              Wall Art
            </div>
          </div>
          <div class="group relative grid h-12 w-12 translate-x-[5rem] -translate-y-[21rem] cursor-pointer place-content-center rounded-full border-2 border-white bg-white shadow-xl transition-all hover:scale-110">
            <div class="bg-primary h-4 w-4 animate-pulse rounded-full" />
            <div class="absolute -top-12 left-1/2 hidden -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-lg group-hover:block dark:bg-gray-900">
              Table Lamp
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
