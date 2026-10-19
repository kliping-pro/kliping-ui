<script lang="ts">
export const description = "Bilah kemajuan di bawahnya, ikut bergerak tiap geseran."
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress'

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

const count = ref(0)

function setCount(value: typeof count['value']) {
  count.value = value
}

const progress = computed(() => (current.value * 100) / count.value)

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
  <div class="mx-auto w-full max-w-xs py-4">
    <Carousel class="w-full max-w-xs" @init-api="setApi">
      <CarouselContent>
        <CarouselItem v-for="image in images" :key="image">
          <img
            alt="dddepth-248"
            class="size-full rounded-xl object-cover"
            :src="image"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="top-[calc(100%+0.5rem)] left-0 translate-y-0" />
      <CarouselNext class="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0" />
    </Carousel>
    <Progress class="mt-5 ml-auto w-24" :value="progress" />
  </div>
</template>
