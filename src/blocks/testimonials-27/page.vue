<script lang="ts">
export const description = "Tiga kartu testimoni rata tengah dengan avatar besar, nama, dan jabatan."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-16.svg",
    name: "Jessica Devis",
    role: "CEO @ Marketing Digital LTD",
    quote:
      "The connections you make at Web Summit are unparalleled, we met users all over the world.",
  },
  {
    image:
      "/samples/avatars/avatar-17.svg",
    name: "Mary Joshiash",
    role: "Marketing @ Apple INC",
    quote:
      "Web Summit will increase your appetite, your inspiration, your skills, your motivation and your network.",
  },
  {
    image:
      "/samples/avatars/avatar-16.svg",
    name: "Marcell Glock",
    role: "CFO @ Apple INC",
    quote:
      "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.",
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
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="{ name, image, role, quote } in testimonials" :key="name">
          <CardContent class="p-6 text-center">
            <Avatar class="mx-auto mb-6 h-24 w-24">
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
