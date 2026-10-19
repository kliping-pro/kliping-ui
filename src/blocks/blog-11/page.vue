<script lang="ts">
export const description = "Satu pratinjau blog besar: gambar di kiri, judul, ringkasan, dan penulis di kanan."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="container mx-auto grid h-full w-full grid-cols-1 items-center gap-x-16 gap-y-6 py-16 lg:grid-cols-2">
    <img
      alt="blog preview"
      src="/samples/photos/photo-19.svg"
      class="h-full w-full rounded-lg object-cover object-center shadow-lg"
    >
    <div>
      <p class="text-primary block font-semibold">Business</p>
      <h2 class="my-4 text-3xl font-bold lg:text-4xl">
        Autodesk looks to future of 3D with Project Escher
      </h2>
      <p class="text-muted-foreground mb-6 w-full max-w-lg text-lg">
        Warner Music Group announced today it's acquiring the selected
        assets of the music platform Songkick, including its app for finding
        concerts and the company's trademark. Songkick has been involved
        in a lawsuit against the major…
        <a
          href="#"
          class="text-foreground ml-2 inline-block font-semibold hover:underline"
        >
          Read More
        </a>
      </p>
      <div class="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src="/samples/avatars/avatar-19.svg"
            alt="Otto Gonzalez"
          />
          <AvatarFallback>OG</AvatarFallback>
        </Avatar>
        <div class="space-y-0.5">
          <p class="text-sm font-semibold">Otto Gonzalez</p>
          <p class="text-muted-foreground text-xs">10 October 2024</p>
        </div>
      </div>
    </div>
  </div>
</template>
