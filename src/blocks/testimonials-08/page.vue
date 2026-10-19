<script lang="ts">
export const description = "Testimoni bergambar dua kolom dengan bingkai rapat."
</script>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer at Canva",
    avatar: "/samples/avatars/avatar-13.svg",
    testimonial:
      "This product completely changed the way I work. The interface is intuitive and the performance is top-notch.",
  },
  {
    name: "Raj Mehta",
    role: "Frontend Developer at Zomato",
    avatar: "/samples/avatars/avatar-14.svg",
    testimonial:
      "It’s rare to find a tool that blends design and usability so well. Highly recommend it to all developers!",
  },
  {
    name: "Emily Chen",
    role: "Marketing Manager at HubSpot",
    avatar: "/samples/avatars/avatar-15.svg",
    testimonial:
      "The experience has been seamless from day one. Great support, fast delivery, and amazing value.",
  },
  {
    name: "Daniel Kim",
    role: "CTO at NextLaunch",
    avatar: "/samples/avatars/avatar-16.svg",
    testimonial:
      "We integrated this solution into our workflow and saw an instant boost in productivity and collaboration.",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer at Swiggy",
    avatar: "/samples/avatars/avatar-17.svg",
    testimonial:
      "I've used several tools in this category, but nothing matches the polish and reliability of this one.",
  },
  {
    name: "Liam Garcia",
    role: "Startup Founder",
    avatar: "/samples/avatars/avatar-18.svg",
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
    <p class="mt-2.5 text-balance text-center text-lg text-muted-foreground tracking-[-0.015em] sm:text-2xl">
      What our customers say about us
    </p>

    <div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="({ name, avatar, role, testimonial }, index) in testimonials"
        class="relative flex flex-col rounded-lg border bg-muted/70 px-5 pt-10 pb-3"
        :key="index"
      >
        <!-- Quote -->
        <span class="absolute top-2 left-4 font-satoshi text-8xl text-foreground/30">
          &ldquo;
        </span>

        <p class="grow py-6 font-medium text-lg">{{ testimonial }}</p>
        <Separator />
        <div class="flex items-center gap-3 py-3.5">
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
