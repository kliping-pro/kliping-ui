<script lang="ts">
export const description = "Bergeser ke bawah, bukan ke samping."
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
  "/samples/photos/photo-09.svg",
  "/samples/photos/photo-10.svg",
  "/samples/photos/photo-11.svg",
  "/samples/photos/photo-12.svg",
  "/samples/photos/photo-13.svg",
]
</script>

<template>
  <Carousel
    class="my-14 w-full max-w-xs"
    :opts="{
      align: 'start',
    }"
    orientation="vertical"
  >
    <CarouselContent class="-mt-1 h-[250px]">
      <CarouselItem v-for="image in images" class="pt-1 md:basis-1/2" :key="image">
        <div class="aspect-video p-1">
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
