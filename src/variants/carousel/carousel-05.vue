<script lang="ts">
export const description = "Nomor geseran dalam bentuk pecahan."
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const images = [
  "/samples/photos/photo-11.svg",
  "/samples/photos/photo-12.svg",
  "/samples/photos/photo-13.svg",
  "/samples/photos/photo-14.svg",
  "/samples/photos/photo-15.svg",
]

const api = ref<CarouselApi>()

function setApi(value: CarouselApi) {
  api.value = value
}

const current = ref(0)

function setCurrent(value: typeof current['value']) {
  current.value = value
}

const count = ref(0)

function setCount(value: typeof count['value']) {
  count.value = value
}

watch(api, (newApi) => {
    if (!newApi) {
      return
    }

    setCount(newApi.scrollSnapList().length);
    setCurrent(newApi.selectedScrollSnap() + 1);

    newApi.on("select", () => {
      setCurrent(newApi.selectedScrollSnap() + 1);
    });
})
</script>

<template>
  <div class="mx-auto w-[calc(100%-3rem)] max-w-xs">
    <Carousel class="w-full max-w-xs" @init-api="setApi">
      <CarouselContent>
        <CarouselItem v-for="image in images" class="aspect-video" :key="image">
          <img
            alt="dddepth-248"
            class="size-full rounded-xl object-cover"
            :src="image"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <div class="mt-4 text-center text-muted-foreground text-sm">
      {{ current }} / {{ count }}
    </div>
  </div>
</template>
