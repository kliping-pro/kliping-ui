<script lang="ts">
export const description = "Korsel gambar tanpa tombol, digeser langsung."
</script>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const images = [
  "/samples/photos/photo-15.svg",
  "/samples/photos/photo-16.svg",
  "/samples/photos/photo-17.svg",
  "/samples/photos/photo-18.svg",
  "/samples/photos/photo-19.svg",
]
</script>

<template>
  <div class="px-6 py-20">
    <Carousel
      class="mx-auto w-full max-w-5xl"
      :opts="{ loop: true, align: 'start' }"
    >
      <div class="mb-3 flex items-center justify-end gap-1 md:hidden">
        <CarouselPrevious class="static translate-y-0" />
        <CarouselNext class="static translate-y-0" />
      </div>
      <div class="rounded-xl bg-card p-6 shadow-xl/3 ring ring-border/80">
        <div class="mb-5 flex items-end justify-between">
          <div>
            <h2 class="font-medium text-3xl tracking-tight">dddepth</h2>
            <p class="mt-2 text-lg text-muted-foreground leading-snug">
              A Curated Collection of AI-generated Abstract 3D Shapes
            </p>
          </div>

          <div class="hidden space-x-2 md:block">
            <CarouselPrevious class="static translate-y-0" />
            <CarouselNext class="static translate-y-0" />
          </div>
        </div>

        <CarouselContent>
          <CarouselItem v-for="(image, index) in images"
            class="basis-1/2 md:basis-1/3 lg:basis-1/4"
            :key="index"
          >
            <div class="p-1">
              <div class="aspect-square">
                <img class="rounded-lg object-cover" :src="image" :alt="`Image ${index + 1} of ${images.length}`" />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </div>
    </Carousel>
  </div>
</template>
