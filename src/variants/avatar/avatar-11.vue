<script lang="ts">
export const description = "Titik status di pojok: daring, sibuk, dan luring."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Online -->
    <div class="relative">
      <Avatar>
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-22.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="absolute right-0 bottom-0 size-2 rounded-full bg-green-500 ring-2 ring-background" />
    </div>

    <!-- DND -->
    <div class="relative">
      <Avatar>
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-22.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="absolute right-0 bottom-0 size-2 rounded-full bg-red-500 ring-2 ring-background" />
    </div>

    <!-- Busy -->
    <div class="relative">
      <Avatar>
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-22.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="absolute right-0 bottom-0 size-2 rounded-full bg-yellow-500 ring-2 ring-background" />
    </div>

    <!-- Offline -->
    <div class="relative">
      <Avatar>
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-22.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="absolute right-0 bottom-0 size-2 rounded-full border-2 border-muted-foreground bg-background ring-2 ring-background" />
    </div>
  </div>
</template>
