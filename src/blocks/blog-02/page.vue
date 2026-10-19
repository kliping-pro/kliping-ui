<script lang="ts">
export const description = "Kartu tulisan bergambar dengan tombol baca selengkapnya."
</script>

<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    title: "A beginner's guide to blockchain for engineers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "5 min read",
    image:
      "/samples/photos/photo-17.svg",
  },
  {
    category: "Business",
    title: "Understanding React Server Components",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "8 min read",
    image:
      "/samples/photos/photo-18.svg",
  },
  {
    category: "Finance",
    title: "10 Useful Shadcn UI Components You Should Know",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "6 min read",
    image:
      "/samples/photos/photo-19.svg",
  },
  {
    category: "Health",
    title: "Building a Personal Blog with Next.js",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "10 min read",
    image:
      "/samples/photos/photo-20.svg",
  },
  {
    category: "Lifestyle",
    title: "The Complete Guide to TypeScript for Beginners",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "12 min read",
    image:
      "/samples/photos/photo-21.svg",
  },
  {
    category: "Politics",
    title: "Optimizing Web Performance with Next.js",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "7 min read",
    image:
      "/samples/photos/photo-22.svg",
  },
  {
    category: "Science",
    title: "Deploying Full-Stack Apps on Vercel",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "9 min read",
    image:
      "/samples/photos/photo-23.svg",
  },
  {
    category: "Sports",
    title: "Getting Started with Modern Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    readTime: "11 min read",
    image:
      "/samples/photos/photo-24.svg",
  },
]
</script>

<template>
  <div class="mx-auto max-w-(--breakpoint-xl) px-6 py-16 xl:px-0">
    <!-- Judul dan pemilih urutan tidak muat sebaris di layar terkecil;
         pemilihnya turun ke bawah judul alih-alih meluap. -->
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h2 class="font-medium text-[1.5rem] tracking-tight">
        Recommended Posts
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

    <div class="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="post in blogPosts"
        class="gap-0 overflow-hidden rounded-lg py-0 shadow-none"
        :key="post.title"
      >
        <CardHeader class="relative p-0">
          <!-- `<Image fill>` milik Next menempelkan gambarnya penuh ke kotak
               aspect-video ini; tanpa absolute gambarnya memakai rasionya
               sendiri dan kotaknya ikut memanjang. -->
          <div class="relative aspect-video w-full border-b">
            <img loading="lazy"
              :alt="post.title"
              class="absolute inset-0 size-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              :src="post.image"
            />
          </div>
        </CardHeader>
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <Badge class="bg-primary/5 text-primary shadow-none hover:bg-primary/5">
              {{ post.category }}
            </Badge>
            <span class="font-medium text-muted-foreground text-xs">
              {{ post.readTime }}
            </span>
          </div>

          <h3 class="mt-4 font-medium text-[1.4rem] text-xl tracking-[-0.02em]">
            {{ post.title }}
          </h3>
          <p class="mt-2 text-muted-foreground">{{ post.description }}</p>

          <Button class="mt-6 shadow-none">
            Read more <ChevronRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
