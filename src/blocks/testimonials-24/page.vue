<script lang="ts">
export const description = "Tiga kartu testimoni dengan kartu tengah disorot warna primary dan bintang."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-19.svg",
    name: "Lucian Eurel",
    date: "Posted on 27 February",
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    rating: 4,
    isHighlighted: false,
  },
  {
    image:
      "/samples/avatars/avatar-20.svg",
    name: "Lucian Eurel",
    date: "Posted on 28 February",
    quote:
      "If you have the opportunity to play this game of life you need to appreciate every moment.",
    rating: 4,
    isHighlighted: true,
  },
  {
    image:
      "/samples/avatars/avatar-21.svg",
    name: "Mathew Glock",
    date: "Posted on 29 February",
    quote:
      "Artist is a term applied to a person who engages in an activity deemed to be an art.",
    rating: 5,
    isHighlighted: false,
  },
]

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-center text-3xl font-bold">
          Think about us
        </h2>
        <p class="text-muted-foreground mx-auto max-w-lg text-center text-lg">
          That's the main thing people are controlled by! Thoughts -
          their perception of themselves!
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="({ name, image, date, quote, rating, isHighlighted }, key) in testimonials"
          :key="key"
          :class="
            isHighlighted
              ? 'bg-primary text-primary-foreground'
              : 'bg-transparent'
          "
        >
          <CardContent class="px-6">
            <Avatar class="mb-4 h-16 w-16 rounded-lg">
              <AvatarImage :src="image" :alt="`${name} image`" />
              <AvatarFallback class="text-foreground">{{ initials(name) }}</AvatarFallback>
            </Avatar>
            <p
              :class="`text-lg font-semibold ${isHighlighted ? 'text-primary-foreground' : ''}`"
            >
              {{ name }}
            </p>
            <p
              :class="`text-sm ${isHighlighted ? 'opacity-95' : 'text-muted-foreground'}`"
            >
              {{ date }}
            </p>
            <blockquote
              :class="`my-4 max-w-lg ${isHighlighted ? 'opacity-95' : 'text-muted-foreground'}`"
            >
              "{{ quote }}"
            </blockquote>
            <div class="flex items-center gap-1">
              <StarIcon
                v-for="i in 5"
                :key="i"
                :class="`h-5 w-5 ${
                  i - 1 < rating
                    ? 'fill-yellow-500 text-yellow-500'
                    : isHighlighted
                      ? 'fill-white/30 text-white/30'
                      : 'fill-gray-300 text-gray-300'
                }`"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
