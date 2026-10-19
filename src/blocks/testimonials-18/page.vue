<script lang="ts">
export const description = "Tiga kartu testimoni transparan di latar hitam dengan avatar dan bintang."
</script>

<script setup lang="ts">
import { QuoteIcon, StarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-06.svg",
    name: "Sarah Johnson",
    role: "Product Designer",
    quote:
      "The component library has transformed our design process. The quality and attention to detail in every component is exceptional.",
    rating: 5,
  },
  {
    image:
      "/samples/avatars/avatar-07.svg",
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    quote:
      "Outstanding documentation and TypeScript support. These components integrate seamlessly into our enterprise applications.",
    rating: 5,
  },
  {
    image:
      "/samples/avatars/avatar-08.svg",
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    quote:
      "Production-ready components with excellent customization. The design system is cohesive and well-thought-out.",
    rating: 5,
  },
]

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="bg-black py-20">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          Trusted by Professionals
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-white/70">
          Hear what developers and designers say about our component library
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="{ name, image, role, quote, rating } in testimonials"
          :key="name"
          class="border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
        >
          <CardContent class="p-8 text-center">
            <div class="relative mx-auto mb-6 inline-block">
              <Avatar class="h-20 w-20 border-4 border-white/20">
                <AvatarImage :src="image" :alt="`${name} profile`" />
                <AvatarFallback class="bg-white/10 text-white">
                  {{ initials(name) }}
                </AvatarFallback>
              </Avatar>
              <div class="bg-primary absolute -right-1 -bottom-1 rounded-full p-1.5 shadow-lg">
                <QuoteIcon class="text-primary-foreground h-3 w-3" />
              </div>
            </div>

            <h3 class="mb-1 text-lg font-semibold text-white">
              {{ name }}
            </h3>
            <p class="mb-6 text-sm text-white/60">{{ role }}</p>

            <div class="mb-6 flex items-center justify-center gap-1">
              <StarIcon
                v-for="i in 5"
                :key="i"
                :class="`h-4 w-4 ${
                  i - 1 < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-white/20 text-white/20'
                }`"
              />
            </div>

            <blockquote class="text-sm leading-relaxed text-white/80">
              "{{ quote }}"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
