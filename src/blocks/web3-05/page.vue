<script lang="ts">
export const description = "Kreator NFT teratas dengan tombol filter waktu dan tiga thumbnail koleksi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const DATA = [
  {
    tokenId: "#1",
    profileImg:
      "/samples/avatars/avatar-03.svg",
    name: "Tina Andrew",
    desc: "Creator",
    imgs: [
      "/samples/photos/photo-03.svg",
      "/samples/photos/photo-04.svg",
      "/samples/photos/photo-05.svg",
    ],
  },
  {
    tokenId: "#2",
    profileImg:
      "/samples/avatars/avatar-04.svg",
    name: "Linde Michael",
    desc: "Creator",
    imgs: [
      "/samples/photos/photo-06.svg",
      "/samples/photos/photo-07.svg",
      "/samples/photos/photo-08.svg",
    ],
  },
  {
    tokenId: "#3",
    profileImg: "/samples/avatars/avatar-05.svg",
    name: "Misha Stam",
    desc: "Creator",
    imgs: [
      "/samples/photos/photo-09.svg",
      "/samples/photos/photo-09.svg",
      "/samples/photos/photo-09.svg",
    ],
  },
]

const timeFrame = ref("month")
</script>

<template>
  <section class="container mx-auto py-16">
    <Card class="border shadow-sm">
      <CardHeader class="flex flex-row flex-wrap items-start justify-between gap-6 p-6">
        <div>
          <h1 class="mb-1 text-2xl font-bold">Top Creators</h1>
          <p class="text-muted-foreground max-w-2xl text-lg">
            The most sought-after collections across the entire ecosystem.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            :variant="timeFrame === 'hour' ? 'default' : 'outline'"
            @click="timeFrame = 'hour'"
          >
            Last 24h
          </Button>
          <Button
            size="sm"
            :variant="timeFrame === 'week' ? 'default' : 'outline'"
            @click="timeFrame = 'week'"
          >
            Last week
          </Button>
          <Button
            size="sm"
            :variant="timeFrame === 'month' ? 'default' : 'outline'"
            @click="timeFrame = 'month'"
          >
            Last month
          </Button>
        </div>
      </CardHeader>
      <CardContent class="grid grid-cols-1 gap-6 px-6 pt-0 pb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="({ tokenId, profileImg, name, desc, imgs }, key) in DATA" :key="key" class="flex flex-col justify-between py-4">
          <CardHeader class="gap-0 px-4">
            <p class="font-semibold">{{ tokenId }}</p>
            <div class="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div class="flex items-start gap-3">
                <Avatar>
                  <AvatarImage :src="profileImg" :alt="name" />
                  <AvatarFallback>{{ name[0] }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="font-semibold">{{ name }}</p>
                  <p class="text-muted-foreground text-sm">{{ desc }}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                See Collection
              </Button>
            </div>
          </CardHeader>
          <CardContent class="grid grid-cols-3 gap-4 px-4">
            <img
              v-for="(img, idx) in imgs"
              :key="idx"
              :src="img"
              :alt="`nft-${idx}`"
              class="h-full min-h-24 w-full rounded-lg object-cover object-center"
            >
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </section>
</template>
