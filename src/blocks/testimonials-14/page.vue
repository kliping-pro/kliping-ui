<script lang="ts">
export const description = "Tiga testimoni berfoto bundar, rata tengah, dengan lencana di atas judul."
</script>

<script setup lang="ts">
import { SparklesIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-02.svg",
    name: "Sarah Johnson",
    role: "Product Designer",
    quote:
      "The attention to detail and component quality is outstanding. These UI blocks have significantly accelerated our design workflow and improved consistency across our products.",
  },
  {
    image:
      "/samples/avatars/avatar-03.svg",
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    quote:
      "Exceptional component library with excellent documentation. The customization options and TypeScript support make it perfect for enterprise applications. Highly recommend!",
  },
  {
    image:
      "/samples/avatars/avatar-04.svg",
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    quote:
      "A game-changer for rapid prototyping and production. The components are production-ready, well-tested, and the design system is incredibly cohesive. Love it!",
  },
]

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="mb-20 text-center">
        <Badge variant="outline" class="mx-auto mb-8 w-max">
          <SparklesIcon class="mr-2 h-4 w-4" />
          Testimonials
        </Badge>
        <h2 class="mb-4 text-3xl font-bold">What Clients Say</h2>
        <p class="text-muted-foreground mx-auto max-w-lg text-lg">
          We're constantly trying to express ourselves and actualize our
          dreams. If you have the opportunity to play.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="{ name, image, role, quote } in testimonials" :key="name" class="border-0 bg-transparent shadow-none">
          <CardContent class="p-0 text-center">
            <Avatar class="mx-auto mb-4 h-20 w-20">
              <AvatarImage :src="image" :alt="`${name} image`" />
              <AvatarFallback>{{ initials(name) }}</AvatarFallback>
            </Avatar>
            <p class="mb-1 text-lg font-semibold">{{ name }}</p>
            <p class="text-muted-foreground mb-4 text-sm">{{ role }}</p>
            <blockquote class="text-muted-foreground mx-auto max-w-lg">
              "{{ quote }}"
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
