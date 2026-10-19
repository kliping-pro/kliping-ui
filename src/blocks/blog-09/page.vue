<script lang="ts">
export const description = "Empat pos blog dua kolom, gambar persegi panjang di samping teks dan penulis."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const POSTS = [
  {
    img: "/samples/photos/photo-18.svg",
    tag: "Enterprise",
    title: "Autodesk looks to future of 3D printing with Project",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "10 September 2022",
    author: {
      img: "/samples/avatars/avatar-18.svg",
      name: "Ryan Samuel",
    },
  },
  {
    img: "/samples/photos/photo-19.svg",
    tag: "Startups",
    title: "Lyft launching cross-platform service this week",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "12 September 2022",
    author: {
      img: "/samples/avatars/avatar-19.svg",
      name: "Nora Hazel",
    },
  },
  {
    img: "/samples/photos/photo-20.svg",
    tag: "Trending",
    title: "6 insights into the French Fashion landscape",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "16 September 2022",
    author: {
      img: "/samples/avatars/avatar-20.svg",
      name: "Otto Gonzalez",
    },
  },
  {
    img: "/samples/photos/photo-21.svg",
    tag: "Lifestyle",
    title: "Autodesk looks to future of 3D printing with Project",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "18 September 2022",
    author: {
      img: "/samples/avatars/avatar-21.svg",
      name: "Ryan Samuel",
    },
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container my-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Original keys by title, which repeats; index keeps keys unique. -->
      <div v-for="({ img, tag, title, desc, date, author }, i) in POSTS" :key="i" class="grid items-center gap-4 sm:grid-cols-2">
        <div class="h-full max-h-72 overflow-hidden rounded-lg lg:max-h-full">
          <img
            :src="img"
            :alt="title"
            class="h-full w-full object-cover object-center"
          >
        </div>
        <div class="space-y-4 p-2">
          <Badge variant="secondary">{{ tag }}</Badge>
          <h3 class="text-xl font-semibold">{{ title }}</h3>
          <p class="text-muted-foreground text-sm">{{ desc }}</p>
          <div class="mt-6 flex items-center gap-3 md:mt-8">
            <Avatar>
              <AvatarImage :src="author.img" :alt="author.name" />
              <AvatarFallback>{{ author.name.charAt(0) }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col">
              <p class="mb-1 text-sm font-semibold">{{ author.name }}</p>
              <p class="text-muted-foreground text-xs">{{ date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
