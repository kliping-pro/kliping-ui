<script lang="ts">
export const description = "Testimoni tiga kolom dengan baris statistik, bintang, dan ikon kutipan."
</script>

<script setup lang="ts">
import { QuoteIcon, StarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image:
      "/samples/avatars/avatar-16.svg",
    quote:
      "The attention to detail and user experience is exceptional. This has transformed how we approach design decisions in our team.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Lead",
    image:
      "/samples/avatars/avatar-17.svg",
    quote:
      "Outstanding component library that saves us countless hours. The quality and customization options are exactly what we needed.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    image:
      "/samples/avatars/avatar-18.svg",
    quote:
      "A game-changer for rapid prototyping and production builds. The documentation is clear and the components are production-ready.",
    rating: 5,
  },
]

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">
          Loved by Developers &amp; Designers
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Join thousands of professionals who trust our components for their
          projects
        </p>
      </div>

      <div class="mb-12 flex flex-wrap items-center justify-center gap-8 text-center md:gap-12">
        <div>
          <p class="text-3xl font-bold">1,679,700+</p>
          <p class="text-muted-foreground text-sm">Active Users</p>
        </div>
        <div class="bg-border hidden h-12 w-px md:block"></div>
        <div>
          <p class="text-3xl font-bold">4.9/5</p>
          <p class="text-muted-foreground text-sm">Average Rating</p>
        </div>
        <div class="bg-border hidden h-12 w-px md:block"></div>
        <div>
          <p class="text-3xl font-bold">50K+</p>
          <p class="text-muted-foreground text-sm">Companies</p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="border-border/50 hover:border-border transition-all hover:shadow-lg"
        >
          <CardContent class="px-6">
            <div class="mb-4 flex items-center gap-1">
              <StarIcon
                v-for="i in testimonial.rating"
                :key="i"
                class="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            </div>

            <QuoteIcon class="text-muted-foreground/30 mb-3 h-8 w-8" />

            <blockquote class="text-foreground/90 mb-6 text-sm leading-relaxed">
              {{ testimonial.quote }}
            </blockquote>

            <div class="flex items-center gap-3">
              <Avatar class="border-border h-12 w-12 border-2">
                <AvatarImage
                  :src="testimonial.image"
                  :alt="testimonial.name"
                />
                <AvatarFallback>{{ initials(testimonial.name) }}</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-foreground font-semibold">
                  {{ testimonial.name }}
                </p>
                <p class="text-muted-foreground text-sm">
                  {{ testimonial.role }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
