<script lang="ts">
export const description = "Beberapa isi terlihat sekaligus, jumlahnya ikut lebar layar."
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
  "/samples/photos/photo-08.svg",
  "/samples/photos/photo-09.svg",
  "/samples/photos/photo-10.svg",
  "/samples/photos/photo-11.svg",
  "/samples/photos/photo-12.svg",
]
</script>

<template>
  <Carousel
    class="w-[calc(100%-3rem)] max-w-sm"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent class="-ml-2">
      <CarouselItem v-for="image in images" class="pl-2 md:basis-1/2 lg:basis-1/3" :key="image">
        <div class="aspect-square p-1">
          <img
            alt="dddepth-248"
            class="size-full rounded-xl object-cover"
            :src="image"
          />
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
