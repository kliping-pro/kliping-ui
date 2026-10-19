<script lang="ts">
export const description = "Yang di tengah membesar, sisanya mengecil di kiri dan kanannya."
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
  "/samples/photos/photo-14.svg",
  "/samples/photos/photo-15.svg",
  "/samples/photos/photo-16.svg",
  "/samples/photos/photo-17.svg",
  "/samples/photos/photo-18.svg",
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
  <div class="mx-auto w-[calc(100%-3rem)] max-w-xs">
    <Carousel
      class="w-full max-w-xs"
      :opts="{ loop: true }"
      @init-api="setApi"
    >
      <CarouselContent class="py-3">
        <CarouselItem v-for="(image, index) in images"
          :class="cn('aspect-square basis-[33%]', {})"
          :key="image"
        >
          <img
            alt="dddepth-248"
            :class="cn(
              'size-full rounded-xl object-cover transition-transform',
              {
                'scale-[0.6]': index !== current - 1,
              }
            )"
            :src="image"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
