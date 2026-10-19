<script lang="ts">
export const description = "Tiga testimoni berlogo perusahaan dengan lencana di atas judul dan tautan Read More."
</script>

<script setup lang="ts">
import { ArrowRightIcon, SparklesIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image: "/samples/logos/logo-04.svg",
    name: "Alexandra Martinez",
    role: "Head of Design",
    quote:
      "This component library has revolutionized our design system. The quality and consistency have dramatically improved our product development workflow.",
  },
  {
    image: "/samples/logos/logo-05.svg",
    name: "David Kim",
    role: "Engineering Lead",
    quote:
      "Outstanding components with excellent TypeScript support. The documentation is thorough and implementation is seamless across our platforms.",
  },
  {
    image: "/samples/logos/logo-06.svg",
    name: "Marcus Johnson",
    role: "Product Director",
    quote:
      "A game-changer for our development team. These production-ready components have reduced our time-to-market by 50% while maintaining exceptional quality.",
  },
]
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <Badge variant="outline" class="mx-auto mb-8 w-max">
          <SparklesIcon class="mr-2 h-4 w-4" />
          Testimonials
        </Badge>
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">
          Trusted by Industry Leaders
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          See how leading companies are building exceptional products with our
          component library
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="{ name, image, quote, role } in testimonials" :key="name" class="border-0 bg-transparent shadow-none">
          <CardContent class="p-0 text-center">
            <img
              :src="image"
              alt="company logo"
              class="mx-auto mb-6 h-20"
            >
            <blockquote class="text-muted-foreground mx-auto mb-6 max-w-sm text-sm leading-relaxed">
              "{{ quote }}"
            </blockquote>
            <div class="mb-6">
              <p class="font-semibold">{{ name }}</p>
              <p class="text-muted-foreground text-sm">{{ role }}</p>
            </div>
            <Button variant="link" class="group">
              Read More
              <ArrowRightIcon class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
