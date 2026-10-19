<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import TestimonialCard from '@/templates/minimalist-landing-page/components/TestimonialCard.vue'

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched! " +
      "We were struggling with productivity before, but this tool has streamlined our entire process. ",
    avatar: "/samples/avatars/avatar-21.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry. " +
      "The intuitive interface makes it easy to onboard new team members, and the automation features save us countless hours every week. ",
    avatar: "/samples/avatars/avatar-22.svg",
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
    avatar: "/samples/avatars/avatar-23.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service. " +
      "The ability to track performance, analyze data, and collaborate across teams has been a game-changer.",
    avatar: "/samples/avatars/avatar-24.svg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful. " +
      "As a developer, I appreciate the well-documented API, the flexibility of integrations, and the robust security features.",
    avatar: "/samples/avatars/avatar-01.svg",
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
    avatar: "/samples/avatars/avatar-02.svg",
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

watch(api, (currentApi) => {
    if (!currentApi) {
      return
    }

    setCount(currentApi.scrollSnapList().length);
    setCurrent(currentApi.selectedScrollSnap() + 1);

    currentApi.on("select", () => {
      setCurrent(currentApi.selectedScrollSnap() + 1);
    });
})
</script>

<template>
  <div
    id="testimonials"
    class="w-full max-w-(--breakpoint-xl) mx-auto py-6 xs:py-12 px-6"
  >
    <h2 class="mb-8 xs:mb-14 text-4xl md:text-5xl font-semibold text-center tracking-tight">
      Testimonials
    </h2>
    <div class="container w-full mx-auto">
      <Carousel @init-api="setApi">
        <CarouselContent>
          <CarouselItem v-for="testimonial in testimonials" :key="testimonial.id">
            <TestimonialCard :testimonial="testimonial" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div class="flex items-center justify-center gap-2">
        <button v-for="(_, index) in Array.from({ length: count })"
          :key="index"
          @click="api?.scrollTo(index)"
          :class="cn('h-3.5 w-3.5 rounded-full border-2', {
            'bg-primary border-primary': current === index + 1,
          })"
        />
      </div>
    </div>
  </div>
</template>
