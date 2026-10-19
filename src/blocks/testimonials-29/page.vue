<script lang="ts">
export const description = "Carousel testimoni latar hitam dengan logo perusahaan, thumbnail, dan panah navigasi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const slides = [
  {
    image:
      "/samples/avatars/avatar-22.svg",
    companyLogo: "/samples/logos/logo-06.svg",
    name: "Linde Michel",
    role: "Social Media Executive, Netflix",
    quote:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    image:
      "/samples/avatars/avatar-23.svg",
    companyLogo: "/samples/logos/logo-07.svg",
    name: "John Down",
    role: "Visionary, Coinbase",
    quote:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    image:
      "/samples/avatars/avatar-24.svg",
    companyLogo: "/samples/logos/logo-08.svg",
    name: "Marcell Glock",
    role: "Chief Executive, Spotify",
    quote:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
]

const currentSlide = ref(0)

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}
</script>

<template>
  <section class="grid min-h-screen place-items-center bg-black py-16">
    <div class="relative container mx-auto px-4">
      <div class="pb-16">
        <img
          :src="slides[currentSlide]!.companyLogo"
          alt="company logo"
          class="mx-auto mb-8 h-24"
        >
        <blockquote class="mx-auto mb-16 max-w-2xl text-center text-xl font-medium text-white">
          "{{ slides[currentSlide]!.quote }}"
        </blockquote>
        <p class="text-center font-medium text-white">
          {{ slides[currentSlide]!.name }}
        </p>
        <p class="text-center text-sm text-white/80">
          {{ slides[currentSlide]!.role }}
        </p>
      </div>

      <div class="mt-8 flex items-center justify-center gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="`h-8 w-8 rounded object-cover object-center transition-opacity ${
            index === currentSlide ? 'opacity-100' : 'opacity-50'
          }`"
          @click="currentSlide = index"
        >
          <img
            :src="slide.image"
            :alt="slide.name"
            class="h-full w-full rounded object-cover"
          >
        </button>
      </div>

      <Button
        size="icon"
        variant="ghost"
        class="!absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 text-white sm:inline-flex"
        aria-label="Previous testimonial"
        @click="prevSlide"
      >
        <ChevronLeftIcon class="h-7 w-7" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        class="!absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 text-white sm:inline-flex"
        aria-label="Next testimonial"
        @click="nextSlide"

      >
        <ChevronRightIcon class="h-7 w-7" />
      </Button>
    </div>
  </section>
</template>
