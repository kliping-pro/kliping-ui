<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer at Canva",
    avatar: "/samples/avatars/avatar-03.svg",
    testimonial:
      "This product completely changed the way I work. The interface is intuitive and the performance is top-notch.",
  },
  {
    name: "Raj Mehta",
    role: "Frontend Developer at Zomato",
    avatar: "/samples/avatars/avatar-04.svg",
    testimonial:
      "It's rare to find a tool that blends design and usability so well. Highly recommend it to all developers!",
  },
  {
    name: "Emily Chen",
    role: "Marketing Manager at HubSpot",
    avatar: "/samples/avatars/avatar-05.svg",
    testimonial:
      "The experience has been seamless from day one. Great support, fast delivery, and amazing value at a great price.",
  },
  {
    name: "Daniel Kim",
    role: "CTO at NextLaunch",
    avatar: "/samples/avatars/avatar-06.svg",
    testimonial:
      "We integrated this solution into our workflow and saw an instant boost in productivity and collaboration.",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer at Swiggy",
    avatar: "/samples/avatars/avatar-07.svg",
    testimonial:
      "I've used several tools in this category, but nothing matches the polish, performance, and reliability of this one.",
  },
  {
    name: "Liam Garcia",
    role: "Startup Founder",
    avatar: "/samples/avatars/avatar-08.svg",
    testimonial:
      "As a founder, I care about speed and simplicity. This product delivers on both fronts beautifully and the support is top-notch.",
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
  <div class="dark isolate mx-auto my-auto flex h-full w-full max-w-7xl flex-col justify-center bg-black/70 px-10 py-12 sm:py-14">
    <h2 class="text-balance text-center font-medium text-4xl text-foreground tracking-tight">
      Trusted by Thousands
    </h2>
    <p class="mt-2 text-balance text-center text-foreground/80 text-lg tracking-normal sm:mt-3 sm:text-2xl">
      Real stories from real users who've seen real results
    </p>

    <div class="mx-auto mt-20 w-full max-w-3xl md:mt-16">
      <Carousel
        :opts="{
          align: 'start',
        }"
        @init-api="setApi"
      >
        <CarouselContent class="select-none">
          <CarouselItem v-for="({ name, avatar, role, testimonial }, index) in testimonials" :key="index">
            <div class="relative flex h-full gap-8 rounded-lg border bg-white/30 p-8 pt-16 pr-8 md:pt-8">
              <!-- Quote -->
              <span class="absolute top-4 left-6 font-mono text-7xl md:hidden">
                &#8220;
              </span>

              <div class="flex flex-col items-center gap-2 text-white">
                <p class="grow text-pretty text-center font-medium text-xl leading-relaxed tracking-normal sm:text-2xl sm:leading-[1.45]">
                  {{ testimonial }}
                </p>
                <div class="mt-6 flex items-center gap-2">
                  <img
                    alt=""
                    class="aspect-square h-12 rounded-full"
                    :src="avatar"
                  />
                  <div class="flex flex-col">
                    <p class="font-medium text-lg">{{ name }}</p>
                    <p class="text-sm text-white/80">{{ role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
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
