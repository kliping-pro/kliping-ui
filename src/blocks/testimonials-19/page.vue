<script lang="ts">
export const description = "Kisah sukses klien dengan logo perusahaan di kiri dan kutipan besar."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <Card class="grid grid-cols-12 items-center border-0 bg-transparent shadow-none">
        <div class="col-span-full md:col-span-4">
          <img
            src="/samples/logos/logo-05.svg"
            alt="user profile"
            class="h-full max-h-96 w-full max-w-96 rounded-xl object-cover lg:max-h-[30rem] lg:max-w-full"
          >
        </div>
        <CardContent class="col-span-full px-0 py-6 md:col-span-8 md:px-8 lg:px-12">
          <p class="mb-2 text-sm font-semibold tracking-wide uppercase lg:mb-4">
            Client Success Story
          </p>
          <h2 class="mb-6 text-3xl font-bold">
            Transforming Our Design System
          </h2>
          <blockquote class="text-muted-foreground mb-8 text-lg font-normal lg:mb-12">
            "This component library has revolutionized how we build
            products at scale. The quality, consistency, and developer
            experience are exceptional. We've reduced our
            design-to-development time by 60% and our entire team loves
            working with these components."
          </blockquote>
          <div class="flex items-center gap-4">
            <Avatar class="h-12 w-12">
              <AvatarImage
                alt="Alexandra Martinez"
                src="/samples/avatars/avatar-13.svg"
              />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
              <p class="text-lg font-semibold">Alexandra Martinez</p>
              <p class="text-muted-foreground text-sm">
                Head of Design, Spotify
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
