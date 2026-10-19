<script lang="ts">
export const description = "Grid enam card blog bergambar dengan badge, penulis, dan tombol View More."
</script>

<script setup lang="ts">
import { ArrowDownIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const POSTS = [
  {
    img: "/samples/photos/photo-04.svg",
    tag: "Enterprise",
    title:
      "Autodesk and Figma looks to future of 3D printing with Project Escher",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "10 September 2022",
    author: {
      img: "/samples/avatars/avatar-04.svg",
      name: "Ryan Samuel",
    },
  },
  {
    img: "/samples/photos/photo-05.svg",
    tag: "Startups",
    title: "Bolt launching cross-platform service this week",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "12 September 2022",
    author: {
      img: "/samples/avatars/avatar-05.svg",
      name: "Nora Hazel",
    },
  },
  {
    img: "/samples/photos/photo-06.svg",
    tag: "Trending",
    title: "6 insights into the French Fashion landscape view",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "16 September 2022",
    author: {
      img: "/samples/avatars/avatar-06.svg",
      name: "Otto Gonzalez",
    },
  },
  {
    img: "/samples/photos/photo-07.svg",
    tag: "Enterprise",
    title: "Autodesk looks to future of 3D printing with Project Escher",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "18 September 2022",
    author: {
      img: "/samples/avatars/avatar-07.svg",
      name: "Ryan Samuel",
    },
  },
  {
    img: "/samples/photos/photo-08.svg",
    tag: "Lifestyle",
    title: "Lyft launching cross-platform service this week",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "18 September 2022",
    author: {
      img: "/samples/avatars/avatar-08.svg",
      name: "Nora Hazel",
    },
  },
  {
    img: "/samples/photos/photo-09.svg",
    tag: "Startups",
    title: "6 insights into the French Fashion landscape",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "22 September 2022",
    author: {
      img: "/samples/avatars/avatar-09.svg",
      name: "Otto Gonzalez",
    },
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto mb-12 text-center">
      <p class="text-primary mb-2 text-sm font-semibold">
        Latest Blog Posts
      </p>
      <h2 class="my-4 text-3xl font-bold">Blog Posts</h2>
      <p class="text-muted-foreground mx-auto max-w-3xl text-lg">
        This is the paragraph where you can write more details about blogs.
        Keep you user engaged by providing meaningful information.
      </p>
    </div>
    <div class="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="{ img, tag, title, desc, date, author } in POSTS" :key="title" class="overflow-hidden py-0">
        <CardHeader class="p-3 pb-0">
          <img
            :src="img"
            :alt="title"
            class="h-56 w-full rounded-lg object-cover object-center"
          >
        </CardHeader>
        <CardContent class="px-6">
          <Badge variant="secondary" class="mb-2">
            {{ tag }}
          </Badge>
          <CardTitle class="mb-2 text-xl">{{ title }}</CardTitle>
          <CardDescription>{{ desc }}</CardDescription>
        </CardContent>
        <CardFooter class="flex items-center gap-3 p-6 pt-0">
          <Avatar class="h-8 w-8">
            <AvatarImage :src="author.img" :alt="author.name" />
            <AvatarFallback>{{ author.name.charAt(0) }}</AvatarFallback>
          </Avatar>
          <div class="flex flex-col">
            <p class="text-sm font-semibold">{{ author.name }}</p>
            <p class="text-muted-foreground text-xs">{{ date }}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
    <div class="mt-12 text-center">
      <Button variant="ghost">
        <ArrowDownIcon class="mr-2 h-4 w-4" />
        View More
      </Button>
    </div>
  </section>
</template>
