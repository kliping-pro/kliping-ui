<script lang="ts">
export const description = "Koleksi NFT trending berlatar gambar penuh dengan overlay gradien gelap."
</script>

<script setup lang="ts">
import { CuboidIcon, Grid3x3Icon, MenuIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DATA = [
  {
    price: "9,999 NFTs",
    img: "/samples/photos/photo-20.svg",
    name: "@thedreamytrees",
    title: "Dreamy Trees",
    profileImg:
      "/samples/avatars/avatar-20.svg",
    desc: "Website visitors today demand a frictionless user experience.",
  },
  {
    price: "3,000 NFTs",
    img: "/samples/photos/photo-21.svg",
    name: "@3dfaces",
    title: "Face NFTs",
    profileImg:
      "/samples/avatars/avatar-21.svg",
    desc: "Website visitors today demand a frictionless user experience.",
  },
  {
    price: "9,999 NFTs",
    img: "/samples/photos/photo-22.svg",
    name: "@theplanetsoftheuniverse",
    title: "The Planets Of The Universe",
    profileImg: "/samples/avatars/avatar-22.svg",
    desc: "Website visitors today demand a frictionless user experience.",
  },
]
</script>

<template>
  <section class="container mx-auto py-16">
    <Card class="border shadow-sm">
      <CardContent class="p-6">
        <div class="mb-6 flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 class="mb-1 text-2xl font-bold">Trending Collections</h1>
            <p class="text-muted-foreground max-w-2xl text-lg">
              The most sought-after collections across the entire ecosystem.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Select default-value="Last 24H">
              <SelectTrigger aria-label="Time range" class="w-max">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 6H">Last 6H</SelectItem>
                <SelectItem value="Last 12H">Last 12H</SelectItem>
                <SelectItem value="Last 24H">Last 24H</SelectItem>
              </SelectContent>
            </Select>
            <Button aria-label="List view" variant="outline" size="icon">
              <MenuIcon class="h-4 w-4" />
            </Button>
            <Button aria-label="Grid view" variant="outline" size="icon">
              <Grid3x3Icon class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="({ price, img, name, title, profileImg, desc }, key) in DATA" :key="key" class="relative overflow-hidden">
            <img
              :src="img"
              :alt="name"
              class="absolute inset-0 h-full w-full object-cover object-center"
            >
            <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 to-black/20" />
            <CardContent class="relative z-10 flex h-[28rem] flex-col justify-between p-6">
              <Badge
                variant="secondary"
                class="w-fit border-white/30 bg-white/20 text-white backdrop-blur"
              >
                <CuboidIcon class="mr-1 h-4 w-4" />
                Collection
              </Badge>
              <div>
                <h3 class="mb-1 flex items-center gap-2 text-xl font-semibold text-white">
                  {{ title }}
                  <Badge
                    variant="outline"
                    class="border-blue-400 text-blue-400"
                  >
                    ✓
                  </Badge>
                </h3>
                <p class="mb-4 text-sm text-gray-300">{{ desc }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Avatar class="h-8 w-8">
                      <AvatarImage :src="profileImg" :alt="name" />
                      <AvatarFallback>{{ name[1] }}</AvatarFallback>
                    </Avatar>
                    <p class="text-sm text-white">{{ name }}</p>
                  </div>
                  <p class="text-sm font-semibold text-white">
                    {{ price }}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
