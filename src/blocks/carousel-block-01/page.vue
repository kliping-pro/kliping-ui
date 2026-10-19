<script lang="ts">
export const description = "Korsel gambar dengan tombol maju mundur."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const images = [
  "/samples/photos/photo-08.svg",
  "/samples/photos/photo-09.svg",
  "/samples/photos/photo-10.svg",
  "/samples/photos/photo-11.svg",
  "/samples/photos/photo-12.svg",
]
</script>

<template>
  <div class="mx-auto max-w-5xl px-14 py-20">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="font-medium text-3xl tracking-tight">dddepth</h2>
        <p class="mt-2 text-pretty text-lg text-muted-foreground leading-snug">
          A Curated Collection of AI-generated Abstract 3D Shapes
        </p>
      </div>
      <Button as-child class="max-sm:hidden" size="sm" variant="outline">
        <a href="/samples/photos/photo-13.svg" target="_blank">
          View all
        </a>
      </Button>
    </div>
    <Carousel class="mt-6 w-full" :opts="{ loop: true, align: 'start' }">
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
      <div class="mt-4 flex items-center justify-between sm:justify-end">
        <div class="flex items-center justify-end gap-1.5">
          <CarouselPrevious class="-left-10 max-md:static max-md:translate-y-0" />
          <CarouselNext class="-right-10 max-md:static max-md:translate-y-0" />
        </div>

        <Button as-child class="sm:hidden" size="sm" variant="outline">
          <a href="/samples/photos/photo-13.svg">View all</a>
        </Button>
      </div>
    </Carousel>
  </div>
</template>
