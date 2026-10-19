<script lang="ts">
export const description = "Korsel bawaan, satu isi per geseran."
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
  "/samples/photos/photo-07.svg",
  "/samples/photos/photo-08.svg",
  "/samples/photos/photo-09.svg",
  "/samples/photos/photo-10.svg",
  "/samples/photos/photo-11.svg",
]
</script>

<template>
  <Carousel class="w-[calc(100%-3rem)] max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="image in images" :key="image">
        <div class="aspect-14/9 p-1">
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
