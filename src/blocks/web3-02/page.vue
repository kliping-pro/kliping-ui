<script lang="ts">
export const description = "Profil kreator NFT dengan tombol Follow dan galeri lelang berlencana waktu."
</script>

<script setup lang="ts">
import { Grid3x3Icon, HeartIcon, MenuIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const DATA = [
  {
    img: "/samples/photos/photo-06.svg",
    name: "@thedreamytrees",
    tokenId: "876",
    price: "1,6 ETH",
  },
  {
    img: "/samples/photos/photo-07.svg",
    name: "@lindemichael",
    tokenId: "877",
    price: "0,9 ETH",
  },
  {
    img: "/samples/photos/photo-08.svg",
    name: "@mishastam",
    tokenId: "878",
    price: "1,3 ETH",
  },
]
</script>

<template>
  <section class="container mx-auto py-16">
    <Card class="border shadow-sm">
      <CardHeader class="flex flex-row flex-wrap items-start justify-between gap-6 p-6">
        <div>
          <Avatar class="h-10 w-10">
            <AvatarImage
              src="/samples/avatars/avatar-06.svg"
              alt="emma"
            />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <h1 class="mt-4 mb-1 flex items-center gap-2 text-2xl font-bold">
            Emma
            <Badge
              variant="outline"
              class="border-blue-500 text-blue-500"
            >
              ✓
            </Badge>
          </h1>
          <p class="text-muted-foreground text-lg">130 Collections</p>
        </div>
        <div class="flex items-center gap-2">
          <Button aria-label="List view" variant="outline" size="icon">
            <MenuIcon class="h-4 w-4" />
          </Button>
          <Button aria-label="Grid view" variant="outline" size="icon">
            <Grid3x3Icon class="h-4 w-4" />
          </Button>
          <Button>Follow Me</Button>
        </div>
      </CardHeader>
      <CardContent class="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="({ img, name, tokenId, price }, key) in DATA" :key="key" class="py-4">
          <CardHeader class="relative gap-0 px-4">
            <img
              :src="img"
              :alt="name"
              class="h-72 w-full rounded-md object-cover object-center"
            >
            <div class="absolute top-6 right-6 flex items-center gap-2">
              <Badge
                variant="secondary"
                class="border-white/50 bg-white/70 text-black backdrop-blur"
              >
                Auction ends in 23h:03m:33s
              </Badge>
              <Button
                aria-label="Add to favorites"
                size="icon"
                variant="secondary"
                class="h-7 w-7 bg-white text-black hover:bg-white"
              >
                <HeartIcon class="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent class="px-4">
            <div class="mb-2 flex items-center justify-between gap-4">
              <p class="text-muted-foreground text-sm">
                Cosmic creatures
              </p>
              <div class="flex items-center gap-1">
                <p class="text-muted-foreground text-sm">Current bid</p>
                <div class="flex gap-1">
                  <img
                    src="/samples/logos/logo-06.svg"
                    alt="ethereum"
                    class="h-4 w-4"
                  >
                  <p class="text-sm font-semibold">{{ price }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-lg font-semibold">Picture #{{ tokenId }}</h3>
              <Button size="sm">Place a Bid</Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </section>
</template>
