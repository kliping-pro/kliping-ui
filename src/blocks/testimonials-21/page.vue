<script lang="ts">
export const description = "Tiga testimoni tanpa kartu dengan avatar besar berlencana kutipan dan bintang."
</script>

<script setup lang="ts">
import { QuoteIcon, StarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-22.svg",
    name: "Sarah Johnson",
    role: "Product Designer",
    quote:
      "These components have transformed our design workflow. The quality and attention to detail are exceptional, making it easy to build beautiful interfaces quickly.",
    rating: 5,
  },
  {
    image:
      "/samples/avatars/avatar-23.svg",
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    quote:
      "Outstanding component library with excellent TypeScript support. The documentation is clear and the components integrate seamlessly into our enterprise applications.",
    rating: 5,
  },
  {
    image:
      "/samples/avatars/avatar-24.svg",
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    quote:
      "Production-ready components that save countless hours. The customization options are fantastic and the design system is incredibly cohesive. Highly recommend!",
    rating: 5,
  },
]

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">
          What Developers Say
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Join thousands of developers building exceptional products with our
          component library
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="{ name, image, role, quote, rating } in testimonials"
          :key="name"
          class="group border-0 bg-transparent shadow-none"
        >
          <CardContent class="p-0 text-center">
            <div class="relative mx-auto mb-6 inline-block">
              <Avatar class="border-border h-24 w-24 border-4 transition-transform group-hover:scale-105">
                <AvatarImage :src="image" :alt="`${name} profile`" />
                <AvatarFallback>{{ initials(name) }}</AvatarFallback>
              </Avatar>
              <div class="bg-primary absolute -right-2 -bottom-2 rounded-full p-2 shadow-lg">
                <QuoteIcon class="text-primary-foreground h-3 w-3" />
              </div>
            </div>

            <h3 class="mb-1 text-lg font-semibold">{{ name }}</h3>
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

            <blockquote class="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
              "{{ quote }}"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
