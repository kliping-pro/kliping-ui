<script lang="ts">
export const description = "Berputar tanpa ujung; yang bukan tengah dipudarkan."
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { cn } from "@/lib/utils"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const images = [
  "/samples/photos/photo-13.svg",
  "/samples/photos/photo-14.svg",
  "/samples/photos/photo-15.svg",
  "/samples/photos/photo-16.svg",
  "/samples/photos/photo-17.svg",
]

const api = ref<CarouselApi>()

function setApi(value: CarouselApi) {
  api.value = value
}

const current = ref(0)

function setCurrent(value: typeof current['value']) {
  current.value = value
}

watch(api, (newApi) => {
    if (!newApi) {
      return
    }

    setCurrent(newApi.selectedScrollSnap() + 1);

    newApi.on("select", () => {
      setCurrent(newApi.selectedScrollSnap() + 1);
    });
})
</script>

<template>
  <Carousel
    class="mx-2 w-[calc(100%-3rem)] max-w-md"
    :opts="{ loop: true }"
    @init-api="setApi"
  >
    <div class="mask-x-from-90%">
      <CarouselContent>
        <CarouselItem v-for="(image, index) in images"
          :class="cn('basis-3/5 transition-opacity', {
            'opacity-30': index !== current - 1,
          })"
          :key="image"
        >
          <img
            alt="dddepth-248"
            class="size-full rounded-xl object-cover"
            :src="image"
          />
        </CarouselItem>
      </CarouselContent>
    </div>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
