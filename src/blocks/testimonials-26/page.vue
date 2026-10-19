<script lang="ts">
export const description = "Satu testimoni dalam kartu hitam dengan logo, kutipan besar, dan avatar bundar."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <Card class="rounded-xl bg-black text-white">
        <CardContent class="grid w-full grid-cols-1 items-center gap-8 p-10 md:grid-cols-12">
          <div class="col-span-full text-center md:col-span-8 md:pl-4 md:text-left">
            <img
              src="/samples/logos/logo-01.svg"
              alt="spotify logo"
              class="mr-auto mb-2 ml-auto w-32 md:mr-0 md:-ml-3"
            >
            <blockquote class="mb-12 text-2xl !leading-snug">
              "We're not always in the position that we want to be
              at. We're constantly growing. We're constantly making
              mistakes. We're constantly trying to express ourselves and
              actualize our dreams. "
            </blockquote>
            <div>
              <p class="mb-1 text-xl font-semibold">Marcell Glock</p>
              <p class="text-white/80">Chief Executive, Spotify</p>
            </div>
          </div>
          <div class="col-span-full grid justify-items-center md:col-span-4 md:justify-items-end">
            <Avatar class="h-24 w-24 md:h-64 md:w-64">
              <AvatarImage
                src="/samples/avatars/avatar-09.svg"
                alt="user profile"
              />
              <AvatarFallback class="text-foreground">MG</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
