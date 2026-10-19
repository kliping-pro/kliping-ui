<script lang="ts">
export const description = "Grid enam kartu testimoni bergaya tweet dengan centang verifikasi dan tanggal."
</script>

<script setup lang="ts">
import { BadgeCheckIcon } from '@lucide/vue'
import { IconBrandTwitter } from '@tabler/icons-vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-09.svg",
    name: "Jessica Devis",
    username: "@jessicadevis",
    quote:
      "The utility-first approach and extensive component library make it a breeze to create beautiful and responsive interfaces. 🎉",
    date: "Jan 17, 2024",
  },
  {
    image:
      "/samples/avatars/avatar-10.svg",
    name: "Lucian Eurel",
    username: "@lucianeurel",
    quote:
      "It's like having a superpower in your toolkit. The ability to craft custom designs quickly and efficiently with simple classes is unparalleled.",
    date: "Jan 18, 2024",
  },
  {
    image:
      "/samples/avatars/avatar-11.svg",
    name: "Marcell Glock",
    username: "@marcelglock",
    quote:
      "The utility-first approach and extensive component library make it a breeze to create beautiful and responsive interfaces. 😍",
    date: "Jan 19, 2024",
  },
  {
    image: "/samples/avatars/avatar-12.svg",
    name: "Linde Michele",
    username: "@lindemichele",
    quote:
      "With its clear and concise classes, I can easily communicate design intentions to my colleagues. It's a must-have tool for any web developer. 👨🏻‍💻",
    date: "Jan 20, 2024",
  },
  {
    image: "/samples/avatars/avatar-13.svg",
    name: "Mary Joshiash",
    username: "@maryjoshiash",
    quote:
      "I've tried several CSS frameworks, but this is on a whole different level. It strikes the perfect balance between flexibility and design.",
    date: "Jan 21, 2024",
  },
  {
    image: "/samples/avatars/avatar-14.svg",
    name: "Misha Stam",
    username: "@mishastam",
    quote:
      "Active community support make it easy to get started. It's the ideal framework for achieving design excellence in web applications.",
    date: "Jan 22, 2024",
  },
]

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="mb-16">
        <p class="mb-2 text-sm font-semibold tracking-wide uppercase">
          Testimonials
        </p>
        <h2 class="mb-4 text-3xl font-bold">Think about us</h2>
        <p class="text-muted-foreground max-w-lg text-lg">
          That's the main thing people are controlled by! Thoughts -
          their perception of themselves!
        </p>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="{ name, image, username, quote, date } in testimonials" :key="name">
          <CardHeader class="flex flex-row items-center gap-4 px-6">
            <Avatar>
              <AvatarImage :src="image" :alt="`${name} image`" />
              <AvatarFallback>{{ initials(name) }}</AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <div class="flex items-center gap-1.5">
                <p class="font-semibold">{{ name }}</p>
                <BadgeCheckIcon class="h-4 w-4 text-blue-500" />
              </div>
              <p class="text-muted-foreground text-sm">{{ username }}</p>
            </div>
          </CardHeader>
          <CardContent class="px-6">
            <blockquote class="text-muted-foreground">
              {{ quote }}
            </blockquote>
          </CardContent>
          <CardFooter class="flex items-center justify-between gap-4 px-6">
            <a
              href="#"
              class="flex items-center gap-1.5 text-sm font-semibold hover:underline"
            >
              See on <IconBrandTwitter class="h-3.5 w-3.5" />
            </a>
            <p class="text-muted-foreground text-sm">{{ date }}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>
</template>
