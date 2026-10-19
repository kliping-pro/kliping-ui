<script lang="ts">
export const description = "Empat kolom: tiga kartu testimoni berbintang dan satu kartu putus-putus Add Testimonial."
</script>

<script setup lang="ts">
import { PlusIcon, QuoteIcon, StarIcon } from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-23.svg",
    name: "Lucian Eurel",
    role: "CEO Discord",
    quote:
      "Web Summit will increase your appetite, your inspiration, your skills, your motivation and your network.",
    rating: 4,
  },
  {
    image:
      "/samples/avatars/avatar-24.svg",
    name: "Linde Michel",
    role: "CFO Slack",
    quote:
      "Do not go where the path may lead, go instead where there is no path and leave a trail. You will succeed on it.",
    rating: 4,
  },
  {
    image: "/samples/avatars/avatar-01.svg",
    name: "Misha Stam",
    role: "COO Dribbble",
    quote:
      "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.",
    rating: 5,
  },
]
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          v-for="{ name, image, role, quote, rating } in testimonials"
          :key="name"
          class="group border-border/50 hover:border-border transition-all hover:shadow-lg"
        >
          <CardContent class="p-6 text-center">
            <div class="relative mx-auto mb-4 inline-block">
              <img
                :src="image"
                :alt="`${name} profile`"
                class="border-border mx-auto h-20 w-20 rounded-full border-4 object-cover transition-transform group-hover:scale-105"
              >
              <div class="bg-primary absolute -right-1 -bottom-1 rounded-full p-1.5 shadow-lg">
                <QuoteIcon class="text-primary-foreground h-3 w-3" />
              </div>
            </div>

            <h3 class="mb-1 text-lg font-semibold">{{ name }}</h3>
            <p class="text-muted-foreground mb-4 text-sm">{{ role }}</p>

            <blockquote class="text-muted-foreground mb-4 text-sm leading-relaxed">
              "{{ quote }}"
            </blockquote>

            <div class="flex items-center justify-center gap-1">
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
          </CardContent>
        </Card>
        <Card class="group border-border/50 hover:border-border hover:bg-muted/50 cursor-pointer border-2 border-dashed transition-all">
          <CardContent class="grid h-full min-h-[280px] w-full place-items-center p-6">
            <div class="text-center">
              <div class="bg-muted group-hover:bg-muted/80 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                <PlusIcon class="text-muted-foreground h-8 w-8" />
              </div>
              <p class="text-muted-foreground text-sm font-medium">
                Add Testimonial
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
