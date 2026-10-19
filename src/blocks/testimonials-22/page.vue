<script lang="ts">
export const description = "Kisah pelanggan ringkas dengan foto di kiri, judul, kutipan, dan logo avatar."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <section class="py-4 md:py-6">
    <div class="container mx-auto px-4">
      <Card class="grid grid-cols-1 items-center gap-4 border-0 bg-transparent shadow-none md:grid-cols-12 md:gap-6">
        <div class="md:col-span-4">
          <img
            src="/samples/avatars/avatar-05.svg"
            alt="user profile"
            class="h-40 w-full rounded-lg object-cover md:h-56"
          >
        </div>
        <CardContent class="px-0 py-0 md:col-span-8 md:px-4 lg:px-8">
          <p class="text-primary mb-1.5 text-xs font-semibold md:text-sm">
            Customer Story
          </p>
          <h2 class="mb-2 text-lg font-bold md:text-xl lg:text-2xl">
            Revolutionary component library for modern design
          </h2>
          <blockquote class="text-muted-foreground mb-3 text-sm leading-relaxed font-normal md:text-base">
            "This component library has transformed how our design team
            works. The attention to detail, seamless integration, and
            production-ready components have accelerated our development
            workflow by 10x."
          </blockquote>
          <div class="flex items-center gap-2.5">
            <Avatar class="h-9 w-9 md:h-10 md:w-10">
              <AvatarImage
                alt="spotify"
                src="/samples/logos/logo-05.svg"
              />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <div>
              <p class="text-sm font-semibold md:text-base">
                Sarah Johnson
              </p>
              <p class="text-muted-foreground text-xs">
                Design Director, Spotify
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
