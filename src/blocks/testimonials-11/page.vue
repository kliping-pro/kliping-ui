<script lang="ts">
export const description = "Testimoni dalam korsel yang bisa digeser."
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

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer at Canva",
    avatar: "/samples/avatars/avatar-05.svg",
    testimonial:
      "This product completely changed the way I work. The interface is intuitive and the performance is top-notch.",
  },
  {
    name: "Raj Mehta",
    role: "Frontend Developer at Zomato",
    avatar: "/samples/avatars/avatar-06.svg",
    testimonial:
      "It's rare to find a tool that blends design and usability so well. Highly recommend it to all developers!",
  },
  {
    name: "Emily Chen",
    role: "Marketing Manager at HubSpot",
    avatar: "/samples/avatars/avatar-07.svg",
    testimonial:
      "The experience has been seamless from day one. Great support, fast delivery, and amazing value.",
  },
  {
    name: "Daniel Kim",
    role: "CTO at NextLaunch",
    avatar: "/samples/avatars/avatar-08.svg",
    testimonial:
      "We integrated this solution into our workflow and saw an instant boost in productivity and collaboration.",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer at Swiggy",
    avatar: "/samples/avatars/avatar-09.svg",
    testimonial:
      "I've used several tools in this category, but nothing matches the polish and reliability of this one.",
  },
  {
    name: "Liam Garcia",
    role: "Startup Founder",
    avatar: "/samples/avatars/avatar-10.svg",
    testimonial:
      "As a founder, I care about speed and simplicity. This product delivers on both fronts beautifully.",
  },
]

const api = ref<CarouselApi | null>(null)

function setApi(value: CarouselApi | null) {
  api.value = value
}

const count = ref(0)

function setCount(value: typeof count['value']) {
  count.value = value
}

const current = ref(0)

function setCurrent(value: typeof current['value']) {
  current.value = value
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
  <div class="mx-auto max-w-7xl px-6 py-12 sm:py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      What others think
    </h2>
    <p class="mt-2 text-balance text-center text-lg text-muted-foreground tracking-[-0.015em] sm:mt-4 sm:text-2xl">
      Real stories from real users who've seen real results
    </p>

    <div class="mx-auto mt-20 max-w-248 md:mt-16 md:px-12">
      <Carousel
        :opts="{
          align: 'start',
        }"
        @init-api="setApi"
      >
        <CarouselContent>
          <CarouselItem v-for="({ name, avatar, role, testimonial }, index) in testimonials" :key="index">
            <div class="relative flex gap-8 rounded-lg border bg-muted/70 p-8 pt-16 pr-8 md:pt-8">
              <!-- Quote -->
              <span class="absolute top-3 left-6.5 font-satoshi text-8xl md:hidden">
                &ldquo;
              </span>

              <div class="flex flex-col gap-2">
                <p class="grow font-medium text-xl leading-relaxed tracking-tight sm:text-2xl sm:leading-[1.45] lg:text-3xl">
                  {{ testimonial }}
                </p>
                <div class="mt-6 flex items-center gap-2 md:mt-0">
                  <img
                    alt=""
                    class="aspect-square h-12 rounded-full md:hidden"
                    :src="avatar"
                  />
                  <div class="flex flex-col">
                    <p class="font-medium text-lg">{{ name }}</p>
                    <p class="text-muted-foreground">{{ role }}</p>
                  </div>
                </div>
              </div>
              <img
                alt=""
                class="hidden aspect-square max-w-60 rounded-lg md:block"
                :src="avatar"
              />
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious class="-top-2.5 right-2 ml-auto -translate-x-full -translate-y-full md:top-1/2 md:-left-12 md:m-0 md:translate-x-0 md:-translate-y-1/2 lg:md:-left-16" />
        <CarouselNext class="-top-2.5 right-0 ml-auto -translate-y-full md:top-1/2 md:-right-12 md:m-0 md:-translate-y-1/2 lg:md:-right-16" />
      </Carousel>

      <!-- Pagination -->
      <div class="mt-6 flex items-center justify-center gap-2">
        <div v-for="(_, index) in Array.from({ length: count })"
          :class="cn(
            'h-2 w-2 rounded-full',
            current === index + 1 ? 'bg-primary' : 'bg-primary/20'
          )"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
