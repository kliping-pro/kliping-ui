<script lang="ts">
export const description = "Slider testimoni di kartu berlatar foto gelap dengan logo, titik, dan panah."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const slides = [
  {
    image: "/samples/logos/logo-08.svg",
    name: "Louis Miriam",
    role: "COO @ Netflix",
    quote:
      "Knowledge is either from direct experience or from verifiable, falsifiable science. There is knowledge that is transmitted but not verifiable / falsifiable. They're slowed down by their perception of themselves.",
  },
  {
    image: "/samples/logos/logo-01.svg",
    name: "John Down",
    role: "CEO @ Coinbase",
    quote:
      "Knowledge is either from direct experience or from verifiable, falsifiable science. There is knowledge that is transmitted but not verifiable / falsifiable. They're slowed down by their perception of themselves.",
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
  <section class="py-20">
    <div class="container mx-auto px-4">
      <Card class="relative overflow-hidden rounded-2xl bg-[url('/samples/photos/photo-24.svg')] bg-cover bg-center p-6">
        <span class="absolute inset-0 h-full w-full bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm" />

        <CardContent class="relative grid w-full grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-12 md:px-12 md:py-16">
          <div class="col-span-full md:col-span-8">
            <QuoteIcon class="mb-6 h-12 w-12 text-white/30" />
            <blockquote class="mb-8 text-xl leading-relaxed font-medium text-white md:text-2xl">
              "{{ slides[currentSlide]!.quote }}"
            </blockquote>
            <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <p class="text-lg font-semibold text-white">
                {{ slides[currentSlide]!.name }}
              </p>
              <span class="hidden text-white/50 md:inline">•</span>
              <p class="text-sm text-white/70">
                {{ slides[currentSlide]!.role }}
              </p>
            </div>
          </div>

          <div class="col-span-full flex items-center justify-center md:col-span-4">
            <div class="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <img
                :src="slides[currentSlide]!.image"
                alt="company logo"
                class="h-16 md:h-20"
              >
            </div>
          </div>
        </CardContent>

        <div class="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <button
            v-for="(_, index) in slides"
            :key="index"
            :aria-label="`Go to slide ${index + 1}`"
            :class="`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`"
            @click="currentSlide = index"
          />
        </div>

        <Button
          size="icon"
          variant="ghost"
          aria-label="Previous testimonial"
          class="!absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white transition-all hover:bg-white/20 hover:text-white"
          @click="prevSlide"
        >
          <ChevronLeftIcon class="h-8 w-8" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Next testimonial"
          class="!absolute top-1/2 right-4 z-10 -translate-y-1/2 text-white transition-all hover:bg-white/20 hover:text-white"
          @click="nextSlide"
        >
          <ChevronRightIcon class="h-8 w-8" />
        </Button>
      </Card>
    </div>
  </section>
</template>
