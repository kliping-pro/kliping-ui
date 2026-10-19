<script lang="ts">
export const description = "Testimoni bergambar dengan garis pemisah antar sel."
</script>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer at Canva",
    avatar: "/samples/avatars/avatar-06.svg",
    testimonial:
      "This product completely changed the way I work. The interface is intuitive and the performance is top-notch.",
  },
  {
    name: "Raj Mehta",
    role: "Frontend Developer at Zomato",
    avatar: "/samples/avatars/avatar-07.svg",
    testimonial:
      "It’s rare to find a tool that blends design and usability so well. Highly recommend it to all developers!",
  },
  {
    name: "Emily Chen",
    role: "Marketing Manager at HubSpot",
    avatar: "/samples/avatars/avatar-08.svg",
    testimonial:
      "The experience has been seamless from day one. Great support, fast delivery, and amazing value.",
  },
  {
    name: "Daniel Kim",
    role: "CTO at NextLaunch",
    avatar: "/samples/avatars/avatar-09.svg",
    testimonial:
      "We integrated this solution into our workflow and saw an instant boost in productivity and collaboration.",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer at Swiggy",
    avatar: "/samples/avatars/avatar-10.svg",
    testimonial:
      "I've used several tools in this category, but nothing matches the polish and reliability of this one.",
  },
  {
    name: "Liam Garcia",
    role: "Startup Founder",
    avatar: "/samples/avatars/avatar-11.svg",
    testimonial:
      "As a founder, I care about speed and simplicity. This product delivers on both fronts beautifully.",
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-12 sm:py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Testimonials
    </h2>
    <p class="mt-2.5 text-balance text-center text-lg text-muted-foreground tracking-normal sm:text-2xl">
      What our customers say about us
    </p>

    <div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="({ name, avatar, role, testimonial }, index) in testimonials"
        class="relative flex flex-col rounded-lg border border-border/85 bg-card pb-1 shadow-xs/3"
        :key="index"
      >
        <p class="grow rounded-t-lg px-5 py-6 font-medium text-lg">
          {{ testimonial }}
        </p>
        <Separator />
        <div class="flex items-center gap-3 px-5 py-3.5">
          <img alt="" class="h-10 w-10 rounded-full" :src="avatar" />
          <div class="flex flex-col">
            <p class="font-medium">{{ name }}</p>
            <p class="text-muted-foreground text-sm">{{ role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
