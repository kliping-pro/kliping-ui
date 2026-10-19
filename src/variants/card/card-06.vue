<script lang="ts">
export const description = "Kartu unggahan sosial: avatar, gambar, dan tombol suka-komentar-bagikan."
</script>

<script setup lang="ts">
import {
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  ShareIcon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Card class="w-full max-w-xs gap-0 py-0 shadow-none">
    <CardHeader class="-mr-1 flex flex-row items-center justify-between py-2.5">
      <Item class="w-full gap-2.5 p-0">
        <ItemMedia>
          <img loading="lazy"
            alt=""
            class="h-8 w-8 rounded-full bg-secondary object-contain"
            :height="32"
            src="/samples/avatars/avatar-20.svg"
            :width="32"
          />
        </ItemMedia>
        <ItemContent class="gap-0">
          <ItemTitle>shadcn</ItemTitle>
          <ItemDescription class="text-xs">@shadcn</ItemDescription>
        </ItemContent>
        <ItemActions class="-me-1">
          <Button size="icon" variant="ghost">
            <MoreHorizontalIcon />
          </Button>
        </ItemActions>
      </Item>
    </CardHeader>
    <CardContent class="p-0">
      <div class="relative aspect-14/9 border-y">
        <img
          alt=""
          class="size-full object-cover"
          src="/samples/photos/photo-20.svg"
        />
      </div>
      <div class="px-4 py-4">
        <h2 class="font-semibold">Exploring New Horizons</h2>
        <p class="mt-1 text-muted-foreground text-sm">
          Had an amazing time discovering hidden gems! 🌄 Can't wait to
          share more from this journey. 
          <span class="text-blue-500">#Wanderlust</span> 
          <span class="text-blue-500">#NatureLovers</span>
        </p>
      </div>
    </CardContent>
    <CardFooter class="flex items-center justify-between border-t px-2 py-2! pb-0">
      <Button class="shrink-0 text-muted-foreground" variant="ghost">
        <HeartIcon /> <span class="hidden sm:inline">Like</span>
      </Button>
      <Button class="shrink-0 text-muted-foreground" variant="ghost">
        <MessageCircleIcon />
        <span class="hidden sm:inline">Comment</span>
      </Button>
      <Button class="shrink-0 text-muted-foreground" variant="ghost">
        <ShareIcon /> <span class="hidden sm:inline">Share</span>
      </Button>
    </CardFooter>
  </Card>
</template>
