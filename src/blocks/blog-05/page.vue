<script lang="ts">
export const description = "Daftar tulisan dua kolom dengan gambar besar."
</script>

<script setup lang="ts">
import { CalendarDays, Dot, Mails, User } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const blogPosts = [
  {
    title: "Understanding React Server Components",
    link: "https://example.com/blog/react-server-components",
    publishedDate: "2025-06-18",
    author: "Jane Doe",
    image:
      "/samples/photos/photo-14.svg",
    tags: ["React", "Server Components", "Performance"],
  },
  {
    title: "10 Useful Shadcn UI Components You Should Know",
    link: "https://example.com/blog/shadcn-ui-components",
    publishedDate: "2025-05-30",
    author: "Akash Moradiya",
    image:
      "/samples/photos/photo-15.svg",
    tags: ["Shadcn UI", "Components", "Design"],
  },
  {
    title: "Building a Personal Blog with Next.js and Contentlayer",
    link: "https://example.com/blog/nextjs-contentlayer-blog",
    publishedDate: "2025-05-15",
    author: "Chris Moore",
    image:
      "/samples/photos/photo-16.svg",
    tags: ["Next.js", "Contentlayer", "Blog"],
  },
  {
    title: "The Complete Guide to TypeScript for Beginners",
    link: "https://example.com/blog/typescript-beginners-guide",
    publishedDate: "2025-04-25",
    author: "Emily Johnson",
    image:
      "/samples/photos/photo-17.svg",
    tags: ["TypeScript", "Guide"],
  },
  {
    title: "Optimizing Web Performance with Next.js",
    link: "https://example.com/blog/nextjs-performance",
    publishedDate: "2025-04-10",
    author: "Akash Moradiya",
    image:
      "/samples/photos/photo-18.svg",
    tags: ["Next.js", "Performance", "Optimization"],
  },
  {
    title: "Deploying Full-Stack Apps on Vercel with Supabase",
    link: "https://example.com/blog/vercel-supabase-deployment",
    publishedDate: "2025-03-28",
    author: "John Smith",
    image:
      "/samples/photos/photo-19.svg",
    tags: ["Supabase", "Deployment", "Full-Stack"],
  },
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-16">
    <!-- Header -->
    <div class="flex items-end justify-between gap-4">
      <div>
        <h2 class="text-balance font-medium text-2xl tracking-tight">
          Welcome to our blog!
        </h2>
        <p class="mt-0.5 text-pretty text-lg text-muted-foreground tracking-normal">
          Stay updated with the latest news and insights.
        </p>
      </div>
      <Button
        class="hidden gap-3 sm:inline-flex"
        size="lg"
        variant="secondary"
      >
        <Mails />
        <span class="hidden lg:inline">Subscribe to our newsletter</span>
        <span class="hidden md:inline lg:hidden">Subscribe</span>
      </Button>
    </div>

    <Separator class="mt-7 mb-10" />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <a v-for="post in blogPosts" :href="post.link" :key="post.link">
        <div class="flex flex-col gap-x-6 gap-y-4 rounded-xl bg-muted p-2.5 pb-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:pe-4 sm:pb-3">
          <img
            :alt="post.title"
            class="aspect-video w-full rounded-lg bg-muted object-cover sm:aspect-square sm:max-w-40"
            :src="post.image"
          />
          <div class="px-1 sm:px-0">
            <h3 class="font-medium text-xl tracking-[-0.015em]">
              {{ post.title }}
            </h3>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <Badge v-for="tag in post.tags"
                class="bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
                :key="tag"
              >
                {{ tag }}
              </Badge>
            </div>
            <div class="mt-4 flex items-center gap-1">
              <div class="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CalendarDays class="h-4 w-4" /> 
                {{ formatDate(post.publishedDate) }}
              </div>
              <Dot class="text-muted-foreground" />
              <div class="flex items-center gap-1.5 text-muted-foreground text-sm">
                <User class="h-4 w-4" /> {{ post.author }}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>

    <Button class="mx-auto mt-16 flex" size="lg" variant="secondary">
      Load more articles
    </Button>
  </section>
</template>
