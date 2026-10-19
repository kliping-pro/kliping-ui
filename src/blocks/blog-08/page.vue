<script lang="ts">
export const description = "Tiga pratinjau blog bergambar dengan nama penulis, deretan tag, dan tombol View More."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const POSTS = [
  {
    img: "/samples/photos/photo-11.svg",
    category: "Otto Gonzalez",
    title: "Autodesk looks to future of 3D printing with Project",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    tags: ["Product", "Design", "UX"],
  },
  {
    img: "/samples/photos/photo-12.svg",
    category: "Ryan Samuel",
    title: "Lyft launching cross-platform service this week",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    tags: ["Product", "Design", "UX"],
  },
  {
    img: "/samples/photos/photo-13.svg",
    category: "Nora Hazel",
    title: "6 insights into the French Fashion landscape",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    tags: ["Product", "Design", "UX"],
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto mb-16 text-center">
      <p class="text-primary mb-2 text-sm font-semibold">
        Latest Blog Posts
      </p>
      <h2 class="my-4 text-3xl font-bold">Explore Our Places</h2>
      <p class="text-muted-foreground mx-auto max-w-3xl text-lg">
        This is the paragraph where you can write more details about blogs.
        Keep you user engaged by providing meaningful information.
      </p>
    </div>
    <div class="container mx-auto grid grid-cols-1 items-start gap-16 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="{ img, category, title, desc, tags } in POSTS" :key="title" class="space-y-6">
        <div class="relative h-56 w-full overflow-hidden rounded-lg shadow-lg">
          <img
            :src="img"
            :alt="title"
            class="h-full w-full object-cover object-center"
          >
        </div>
        <div class="space-y-4">
          <p class="text-primary text-sm font-semibold">{{ category }}</p>
          <h3 class="text-2xl font-bold">{{ title }}</h3>
          <p class="text-muted-foreground">{{ desc }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Badge v-for="tag in tags" :key="tag" variant="secondary">
            {{ tag }}
          </Badge>
        </div>
      </div>
    </div>
    <div class="mt-24 text-center">
      <Button>View More</Button>
    </div>
  </section>
</template>
