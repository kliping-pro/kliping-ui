<script lang="ts">
export const description = "Grid tiga kartu promo bergambar dengan satu banner lebar di bawahnya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const CARDS = [
  {
    image:
      "/samples/photos/photo-03.svg",
    title: "New",
    subtitle: "Urban Chick Collection",
  },
  {
    image:
      "/samples/avatars/avatar-03.svg",
    title: "Shop Sales",
    subtitle: "Urban Chick Collection",
  },
  {
    image:
      "/samples/avatars/avatar-04.svg",
    title: "50% off",
    subtitle: "Urban Chick Collection",
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <p class="mb-8 font-semibold">
        Gear Up and Enjoy Savings | Get up to 50% off on select items
      </p>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="({ image, title, subtitle }, index) in CARDS"
          :key="index"
          class="group relative h-96 overflow-hidden border-0 p-0 shadow-lg transition-all hover:shadow-xl"
        >
          <img
            :src="image"
            :alt="title"
            class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-6 text-white">
            <p class="mb-2 text-sm font-semibold tracking-wider text-white/90 uppercase">
              {{ title }}
            </p>
            <h3 class="mb-4 text-2xl font-bold">{{ subtitle }}</h3>
            <Button variant="link" class="p-0 text-white">
              Read More
            </Button>
          </div>
        </Card>
      </div>
      <Card class="group relative mt-6 h-96 overflow-hidden border-0 p-0 shadow-lg transition-all hover:shadow-xl">
        <img
          src="/samples/photos/photo-04.svg"
          alt="Formal Elegance"
          class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div class="absolute inset-0 flex items-center justify-center p-8 text-white">
          <div class="text-center">
            <p class="mb-3 text-lg font-bold tracking-wider uppercase">
              UP TO 70%
            </p>
            <h3 class="mb-6 text-3xl font-bold md:text-4xl">
              Formal Elegance Series
            </h3>
            <Button variant="link" size="lg" class="p-0 text-white">
              Discover
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>
