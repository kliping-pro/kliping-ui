<script lang="ts">
export const description = "Halaman 404 dengan petak kartu tujuan yang mungkin dicari."
</script>

<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRightIcon,
  BookOpenIcon,
  HomeIcon,
  MailIcon,
  OctagonXIcon,
  TagIcon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'

const pages = [
  {
    icon: HomeIcon,
    title: "Home",
    description: "Back to the main page",
    href: "/",
  },
  {
    icon: BookOpenIcon,
    title: "Blog",
    description: "Read our latest articles",
    href: "#",
  },
  {
    icon: TagIcon,
    title: "Pricing",
    description: "View our plans and pricing",
    href: "#",
  },
  {
    icon: MailIcon,
    title: "Contact",
    description: "Get in touch with us",
    href: "#",
  },
]
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="flex size-12 items-center justify-center rounded-2xl border bg-muted">
      <OctagonXIcon class="size-6 text-muted-foreground" />
    </div>
    <h1 class="mt-6 font-medium text-[2rem] tracking-tight">
      Page not found
    </h1>
    <p class="mt-2 max-w-sm text-muted-foreground">
      Here are some pages that might help you find what you're looking
      for.
    </p>
    <div class="mt-10 grid w-full max-w-lg gap-3 sm:grid-cols-2">
      <a v-for="page in pages"
        class="group flex items-center gap-4 rounded-xl border p-4 text-left transition-colors hover:bg-muted/50"
        :href="page.href"
        :key="page.href"
      >
        <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
          <component :is="page.icon" class="size-4 text-muted-foreground" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-medium text-sm">{{ page.title }}</p>
          <p class="truncate text-muted-foreground text-xs">
            {{ page.description }}
          </p>
        </div>
        <ArrowRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
    <Button as-child class="mt-8" variant="outline">
      <a href="/">
        <ArrowLeft /> Go home
      </a>
    </Button>
  </div>
</template>
