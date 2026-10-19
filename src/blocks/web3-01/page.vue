<script lang="ts">
export const description = "Card koleksi NFT pixel art dengan tiga kartu karya, avatar pemilik, dan peran."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const DATA = [
  {
    img: "/samples/photos/photo-23.svg",
    name: "yqaw...09v",
    tokenId: "475",
    profession: "trader",
    profileImg:
      "/samples/avatars/avatar-23.svg",
  },
  {
    img: "/samples/photos/photo-24.svg",
    name: "yqaw...09v",
    tokenId: "476",
    profession: "owner",
    profileImg:
      "/samples/avatars/avatar-24.svg",
  },
  {
    img: "/samples/photos/photo-01.svg",
    name: "yqaw...09v",
    tokenId: "477",
    profession: "trader",
    profileImg:
      "/samples/avatars/avatar-24.svg",
  },
]
</script>

<template>
  <section class="container mx-auto py-16">
    <Card class="border shadow-sm">
      <CardHeader class="p-6">
        <Avatar class="h-12 w-12">
          <AvatarImage
            src="/samples/photos/photo-23.svg"
            alt="pixel art collection"
          />
          <AvatarFallback>PA</AvatarFallback>
        </Avatar>
        <h1 class="mt-4 mb-1 text-2xl font-bold">Pixelated Art</h1>
        <p class="text-muted-foreground max-w-2xl text-lg">
          These NFTs capture the essence of imagination and innovation,
          offering a glimpse into the boundless potential of the digital
          world.
        </p>
      </CardHeader>
      <CardContent class="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="({ img, name, tokenId, profession, profileImg }, key) in DATA" :key="key" class="py-4">
          <CardHeader class="gap-0 px-4">
            <img
              :src="img"
              :alt="name"
              class="h-64 w-full rounded-md object-cover object-center"
            >
          </CardHeader>
          <CardContent class="px-4">
            <p class="text-muted-foreground mb-1 text-sm">
              Pixelated Art
            </p>
            <h3 class="text-lg font-semibold">Picture #{{ tokenId }}</h3>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <Avatar class="h-6 w-6">
                  <AvatarImage :src="profileImg" :alt="name" />
                  <AvatarFallback>{{ name[0] }}</AvatarFallback>
                </Avatar>
                <p class="text-muted-foreground text-sm">{{ name }}</p>
              </div>
              <p class="text-primary text-sm capitalize">
                {{ profession }}
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </section>
</template>
