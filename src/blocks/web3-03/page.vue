<script lang="ts">
export const description = "Grid lelang kripto teratas dengan filter Select, tawaran BTC, dan sisa waktu."
</script>

<script setup lang="ts">
import { Grid3x3Icon, MenuIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

const DATA = [
  {
    img: "/samples/photos/photo-13.svg",
    name: "@thedreamytrees",
    desc: "Owner",
    profileImg:
      "/samples/avatars/avatar-13.svg",
    price: "1,3 BTC",
    time: "23h:03m:33s",
  },
  {
    img: "/samples/photos/photo-14.svg",
    name: "@lindemichael",
    desc: "Creator",
    profileImg:
      "/samples/avatars/avatar-14.svg",
    price: "0,4 BTC",
    time: "23h:03m:33s",
  },
  {
    img: "/samples/photos/photo-15.svg",
    name: "@mishastam",
    desc: "Owner",
    profileImg: "/samples/avatars/avatar-15.svg",
    price: "0,3 BTC",
    time: "23h:03m:33s",
  },
]
</script>

<template>
  <section class="container mx-auto py-16">
    <Card class="border shadow-sm">
      <CardHeader class="flex flex-row flex-wrap items-start justify-between gap-6 p-6">
        <div>
          <h1 class="mb-1 text-2xl font-bold">Top Auctions</h1>
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
          <Select default-value="Category 1">
            <SelectTrigger aria-label="Category" class="w-max">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Category 1">Category 1</SelectItem>
              <SelectItem value="Category 2">Category 2</SelectItem>
              <SelectItem value="Category 3">Category 3</SelectItem>
            </SelectContent>
          </Select>
          <Button aria-label="List view" variant="outline" size="icon">
            <MenuIcon class="h-4 w-4" />
          </Button>
          <Button aria-label="Grid view" variant="outline" size="icon">
            <Grid3x3Icon class="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent class="grid grid-cols-1 gap-6 px-6 pt-0 pb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="({ img, name, desc, profileImg, price, time }, key) in DATA" :key="key" class="overflow-hidden py-0">
          <CardHeader class="relative p-0">
            <img
              :src="img"
              :alt="name"
              class="h-80 w-full object-cover object-center"
            >
            <Badge
              variant="secondary"
              class="absolute bottom-4 left-4 flex items-center gap-2 border-white/50 bg-white/70 backdrop-blur"
            >
              <Avatar class="h-7 w-7">
                <AvatarImage :src="profileImg" :alt="name" />
                <AvatarFallback>{{ name[1] }}</AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-black">
                  {{ name }}
                </span>
                <span class="text-muted-foreground text-xs">
                  {{ desc }}
                </span>
              </div>
            </Badge>
          </CardHeader>
          <CardContent class="px-4 pb-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-muted-foreground text-sm">Current bid</p>
                <p class="text-lg font-bold">{{ price }}</p>
              </div>
              <div>
                <p class="text-muted-foreground text-sm">
                  Auction ends in
                </p>
                <p class="text-sm font-semibold">{{ time }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </section>
</template>
