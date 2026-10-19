<script lang="ts">
export const description = "Kartu tulisan bergambar tiga kolom dengan badge kategori."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const blogPosts = [
  {
    category: "Technology",
    title: "What is the future of web development?",
    author: "John Doe",
    authorImage:
      "/samples/avatars/avatar-10.svg",
    date: "Nov 30, 2024",
    image:
      "/samples/photos/photo-10.svg",
  },
  {
    category: "Business",
    title: "Understanding React Server Components",
    author: "Jane Smith",
    authorImage:
      "/samples/avatars/avatar-11.svg",
    date: "Nov 28, 2024",
    image:
      "/samples/photos/photo-11.svg",
  },
  {
    category: "Finance",
    title: "10 Useful Shadcn UI Components You Should Know",
    author: "Akash Moradiya",
    authorImage:
      "/samples/avatars/avatar-12.svg",
    date: "Nov 25, 2024",
    image:
      "/samples/photos/photo-12.svg",
  },
  {
    category: "Health",
    title: "Building a Personal Blog with Next.js",
    author: "Chris Moore",
    authorImage:
      "/samples/avatars/avatar-13.svg",
    date: "Nov 22, 2024",
    image:
      "/samples/photos/photo-13.svg",
  },
  {
    category: "Lifestyle",
    title: "The Complete Guide to TypeScript for Beginners",
    author: "Emily Johnson",
    authorImage:
      "/samples/avatars/avatar-14.svg",
    date: "Nov 20, 2024",
    image:
      "/samples/photos/photo-14.svg",
  },
  {
    category: "Politics",
    title: "Optimizing Web Performance with Next.js",
    author: "John Doe",
    authorImage:
      "/samples/avatars/avatar-10.svg",
    date: "Nov 18, 2024",
    image:
      "/samples/photos/photo-15.svg",
  },
  {
    category: "Science",
    title: "Deploying Full-Stack Apps on Vercel",
    author: "Bob Smith",
    authorImage:
      "/samples/avatars/avatar-15.svg",
    date: "Nov 15, 2024",
    image:
      "/samples/photos/photo-16.svg",
  },
  {
    category: "Sports",
    title: "Getting Started with Modern Web Development",
    author: "Sarah Williams",
    authorImage:
      "/samples/avatars/avatar-16.svg",
    date: "Nov 12, 2024",
    image:
      "/samples/photos/photo-17.svg",
  },
]
</script>

<template>
  <div class="mx-auto max-w-(--breakpoint-xl) px-6 py-16 xl:px-0">
    <div class="flex items-end justify-between">
      <h2 class="font-medium text-[1.5rem] tracking-tight">
        Today's Posts
      </h2>
      <Select defaultValue="recommended">
        <SelectTrigger aria-label="Sort posts" class="w-[180px]">

          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">Recommended</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="post in blogPosts" class="gap-3 bg-muted/30 py-0 shadow-none" :key="post.title">
        <CardHeader class="p-1.5 pb-0">
          <div class="relative aspect-video w-full overflow-hidden rounded-lg">
            <img loading="lazy"
              :alt="post.title"
              class="object-cover"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              :src="post.image"
            />
          </div>
        </CardHeader>
        <CardContent class="px-4 pt-0 pb-5">
          <Badge variant="secondary">{{ post.category }}</Badge>

          <h3 class="mt-4 font-medium text-[1.4rem] text-xl tracking-[-0.02em]">
            {{ post.title }}
          </h3>
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img loading="lazy"
                :alt="post.author"
                class="size-8 rounded-full object-cover"
                :height="32"
                :src="post.authorImage"
                :width="32"
              />
              <span class="font-medium text-muted-foreground">
                {{ post.author }}
              </span>
            </div>

            <span class="text-muted-foreground text-sm">
              {{ post.date }}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
