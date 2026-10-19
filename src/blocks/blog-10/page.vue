<script lang="ts">
export const description = "Card sorotan berwarna primary di samping empat card bergambar berikon."
</script>

<script setup lang="ts">
import { GlobeIcon, HeartIcon, MicIcon, PuzzleIcon } from '@lucide/vue'
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
    img: "/samples/photos/photo-20.svg",
    icon: HeartIcon,
    title: "Cultural",
    desc: "257 spots",
  },
  {
    img: "/samples/photos/photo-21.svg",
    icon: PuzzleIcon,
    title: "Modern Life",
    desc: "117 spots",
  },
  {
    img: "/samples/photos/photo-22.svg",
    icon: GlobeIcon,
    title: "Popularity",
    desc: "363 spots",
  },
  {
    img: "/samples/photos/photo-23.svg",
    icon: MicIcon,
    title: "Good Vibes",
    desc: "215 spots",
  },
]
</script>

<template>
  <section class="container mx-auto py-16">
    <div class="mb-16 grid place-items-center text-center">
      <h2 class="my-4 text-3xl font-bold">Check out what's new</h2>
      <p class="text-muted-foreground mx-auto max-w-xl">
        We get insulted by others, lose trust for those others. We get back
        freezes every winter
      </p>
    </div>
    <div class="grid grid-cols-1 gap-x-0 gap-y-6 md:grid-cols-3 md:gap-x-6">
      <Card class="bg-primary text-primary-foreground flex flex-col justify-between py-0">
        <CardHeader class="p-6 sm:p-8">
          <p class="block text-center font-semibold">
            Landscape
          </p>
        </CardHeader>
        <CardContent class="p-6 sm:p-8">
          <CardTitle class="text-center text-2xl">
            Nature's Light
          </CardTitle>
          <CardDescription class="py-6 text-center text-primary-foreground">
            It really matters and then like it really doesn't matter.
            What matters is the people who are sparked by it.
          </CardDescription>
        </CardContent>
        <CardFooter class="p-6 text-center sm:p-8">
          <Button
            size="sm"
            variant="secondary"
            class="bg-background text-foreground hover:bg-background/90"
          >
            Read More
          </Button>
        </CardFooter>
      </Card>
      <div class="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card
          v-for="{ img, icon, title, desc } in POSTS"
          :key="title"
          class="relative grid min-h-48 w-full overflow-hidden border-0 py-0"
        >
          <img
            :src="img"
            :alt="title"
            class="absolute inset-0 h-full w-full object-cover object-center"
          >
          <div class="absolute inset-0 h-full w-full bg-black/60" />
          <CardContent class="relative flex h-full flex-col justify-between p-6">
            <component :is="icon" class="h-8 w-8 stroke-2 text-white" />
            <div class="space-y-0.5">
              <CardTitle class="text-xl text-white">{{ title }}</CardTitle>
              <CardDescription class="text-sm text-white/80">
                {{ desc }}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
