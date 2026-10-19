<script lang="ts">
export const description = "Kartu tunggal besar dengan bintang dan avatar."
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
import { cn } from "@/lib/utils"
import TestimonialCard from '@/blocks/testimonials-06/components/TestimonialCard.vue'

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched! " +
      "We were struggling with productivity before, but this tool has streamlined our entire process. ",
    portraitImage:
      "/samples/avatars/avatar-23.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry. " +
      "The intuitive interface makes it easy to onboard new team members, and the automation features save us countless hours every week. ",
    portraitImage:
      "/samples/avatars/avatar-24.svg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate. " +
      "As a designer, I appreciate the attention to detail and well-thought-out UI components. " +
      "It makes designing and prototyping so much more efficient.",
    portraitImage:
      "/samples/avatars/avatar-01.svg",
  },
  {
    id: 4,
    name: "James Mitchell",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service. " +
      "The ability to track performance, analyze data, and collaborate across teams has been a game-changer.",
    portraitImage:
      "/samples/avatars/avatar-02.svg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful. " +
      "As a developer, I appreciate the well-documented API, the flexibility of integrations, and the robust security features.",
    portraitImage:
      "/samples/avatars/avatar-03.svg",
  },
  {
    id: 6,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful. " +
      "I can now generate detailed reports in minutes, which previously took days to compile. " +
      "helping us make smarter, data-backed decisions.",
    portraitImage:
      "/samples/avatars/avatar-04.svg",
  },
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
  <div class="px-6 py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      People love using it
    </h2>
    <p class="mt-4 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
      Real feedback from those who've made it part of their workflow
    </p>
    <!-- Panahnya menggantung 3rem di luar carousel. Di bawah lg panah turun
         ke baris titik (yang ikut masuk ke <Carousel>, karena panah cuma
         bekerja di dalamnya) supaya kartu memakai seluruh lebar layar sempit.
         Mulai lg, di situs ini ruang panahnya datang dari `.container` global
         kliping.css yang menimpa padding dan max-w di bawah (2rem mulai
         1024px, maks 1400px); bersama px-6 induknya itu cukup. `lg:px-12` dan
         max-w sumbernya hanya berlaku bila `.container` utility Tailwind biasa. -->
    <div class="container mx-auto mt-14 w-full lg:mt-16 lg:max-w-(--breakpoint-lg) lg:px-12 xl:max-w-(--breakpoint-xl)">
      <Carousel @init-api="setApi">
        <CarouselContent>
          <CarouselItem v-for="testimonial in testimonials" :key="testimonial.id">
            <TestimonialCard :testimonial="testimonial" />
          </CarouselItem>
        </CarouselContent>
        <!-- Baris titik setinggi 0.875rem ini menambah tinggi <Carousel>, jadi
             mulai lg pusat panah dihitung tanpa baris itu agar tetap sejajar
             dengan tengah kartu. -->
        <div class="flex items-center justify-center gap-2">
          <CarouselPrevious class="static mr-2 translate-y-0 lg:absolute lg:top-[calc((100%-0.875rem)/2)] lg:mr-0 lg:-translate-y-1/2" />
          <button v-for="(_, index) in Array.from({ length: count })"
            :class="cn('h-3.5 w-3.5 rounded-full border-2', {
              'border-primary bg-primary': current === index + 1,
            })"
            :key="index"
            :aria-label="`Go to slide ${index + 1}`"
            :aria-current="current === index + 1 ? 'true' : undefined"
            @click="api?.scrollTo(index)"

            type="button"
          />
          <CarouselNext class="static ml-2 translate-y-0 lg:absolute lg:top-[calc((100%-0.875rem)/2)] lg:ml-0 lg:-translate-y-1/2" />
        </div>
      </Carousel>
    </div>
  </div>
</template>
