<script lang="ts">
export const description = "Deretan gambar kecil di bawahnya sebagai penunjuk sekaligus pemilih."
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
import { cn } from '@/lib/utils'

const images = [
  '/samples/photos/photo-15.svg',
  '/samples/photos/photo-16.svg',
  '/samples/photos/photo-17.svg',
  '/samples/photos/photo-18.svg',
  '/samples/photos/photo-19.svg',
]

const api = ref<CarouselApi>()
const current = ref(0)

watch(api, (newApi) => {
  if (!newApi) return

  current.value = newApi.selectedScrollSnap() + 1
  newApi.on('select', () => {
    current.value = newApi.selectedScrollSnap() + 1
  })
})

/**
 * Sumbernya membungkus ini dengan `React.useCallback` supaya identitas
 * fungsinya bertahan antar-render. Vue tidak merender ulang komponennya untuk
 * tiap perubahan, jadi fungsinya memang cuma dibuat sekali — pembungkusnya
 * tidak punya pekerjaan di sini.
 */
function scrollToThumb(index: number) {
  api.value?.scrollTo(index)
}
</script>

<template>
  <div class="mx-auto w-[calc(100%-3rem)] max-w-xs">
    <Carousel class="w-full max-w-xs" @init-api="api = $event">
      <CarouselContent>
        <CarouselItem v-for="image in images" :key="image">
          <img
            alt="dddepth-248"
            class="size-full rounded-xl object-cover"
            loading="lazy"
            :src="image"
          >
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <Carousel class="mt-4 w-full max-w-xs">
      <div class="mask-x-from-90%">
        <CarouselContent class="my-1 flex">
          <CarouselItem
            v-for="(image, index) in images"
            :key="image"
            :class="cn(
              'basis-1/4 cursor-pointer transition-opacity',
              current === index + 1 ? 'opacity-100' : 'opacity-50',
            )"
            @click="scrollToThumb(index)"
          >
            <img
              alt="dddepth-248"
              class="size-full rounded-xl object-cover"
              loading="lazy"
              :src="image"
            >
          </CarouselItem>
        </CarouselContent>
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
