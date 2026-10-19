<script lang="ts">
export const description = "Tiga card blog sederhana bergambar dengan badge kategori dan tanggal posting."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
    img: "/samples/photos/photo-02.svg",
    tag: "House",
    title: "Shared Coworking",
    desc: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.",
    date: "Posted on 26 May",
    author: {
      img: "/samples/avatars/avatar-02.svg",
      name: "Otto Gonzalez",
    },
  },
  {
    img: "/samples/photos/photo-03.svg",
    tag: "Office",
    title: "Really Housekeeping",
    desc: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.",
    date: "Posted on 03 May",
    author: {
      img: "/samples/avatars/avatar-03.svg",
      name: "Chriss Smahos",
    },
  },
  {
    img: "/samples/photos/photo-04.svg",
    tag: "Hub",
    title: "Coworking Office",
    desc: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.",
    date: "Posted on 12 April",
    author: {
      img: "/samples/avatars/avatar-04.svg",
      name: "Elijah Miller",
    },
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="{ img, tag, title, desc, date, author } in POSTS" :key="title" class="overflow-hidden py-0">
        <CardHeader class="p-4 pb-0">
          <div class="relative h-60 w-full overflow-hidden rounded-lg">
            <img
              :src="img"
              :alt="title"
              class="h-full w-full object-cover object-center"
            >
          </div>
        </CardHeader>
        <CardContent class="px-6">
          <Badge variant="secondary" class="mb-2">
            {{ tag }}
          </Badge>
          <CardTitle class="mb-2 text-xl">{{ title }}</CardTitle>
          <CardDescription>{{ desc }}</CardDescription>
        </CardContent>
        <CardFooter class="flex items-center gap-3 p-6 pt-0">
          <Avatar>
            <AvatarImage :src="author.img" :alt="author.name" />
            <AvatarFallback>{{ author.name.charAt(0) }}</AvatarFallback>
          </Avatar>
          <div class="space-y-0.5">
            <p class="text-sm font-semibold">{{ author.name }}</p>
            <p class="text-muted-foreground text-xs">{{ date }}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  </section>
</template>
