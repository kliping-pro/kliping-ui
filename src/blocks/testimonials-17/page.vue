<script lang="ts">
export const description = "Tiga kartu testimoni rata tengah dengan foto besar berlencana kutipan dan bintang."
</script>

<script setup lang="ts">
import { QuoteIcon, StarIcon } from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-23.svg",
    name: "Sarah Johnson",
    role: "Product Designer",
    quote:
      "The attention to detail and component quality is outstanding. These UI blocks have significantly accelerated our design workflow and improved consistency across our products.",
    rating: 5,
  },
  {
    image:
      "/samples/avatars/avatar-24.svg",
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    quote:
      "Exceptional component library with excellent documentation. The customization options and TypeScript support make it perfect for enterprise applications. Highly recommend!",
    rating: 5,
  },
  {
    image:
      "/samples/avatars/avatar-01.svg",
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    quote:
      "A game-changer for rapid prototyping and production. The components are production-ready, well-tested, and the design system is incredibly cohesive. Love it!",
    rating: 5,
  },
]
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">
          What Our Users Say
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Trusted by thousands of developers and designers worldwide
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="{ name, image, role, quote, rating } in testimonials"
          :key="name"
          class="group border-border/50 hover:border-border transition-all hover:shadow-lg"
        >
          <CardContent class="p-8 text-center">
            <div class="relative mx-auto mb-6 inline-block">
              <img
                :src="image"
                :alt="`${name} profile`"
                class="border-border mx-auto h-24 w-24 rounded-full border-4 object-cover transition-transform group-hover:scale-105"
              >
              <div class="bg-background absolute -right-2 -bottom-2 rounded-full p-2 shadow-md">
                <QuoteIcon class="text-primary h-4 w-4" />
              </div>
            </div>

            <h3 class="mb-1 text-xl font-semibold">{{ name }}</h3>
            <p class="text-muted-foreground mb-6 text-sm">{{ role }}</p>

            <div class="mb-6 flex items-center justify-center gap-1">
              <StarIcon
                v-for="i in 5"
                :key="i"
                :class="`h-4 w-4 ${
                  i - 1 < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-muted text-muted'
                }`"
              />
            </div>

            <blockquote class="text-foreground/80 text-sm leading-relaxed">
              "{{ quote }}"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
