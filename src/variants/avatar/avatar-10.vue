<script lang="ts">
export const description = "Bercincin, dengan jarak antara cincin dan fotonya."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar class="ring-2 ring-ring ring-offset-2 ring-offset-background">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-21.svg" />
      <AvatarFallback class="rounded-none">ER</AvatarFallback>
    </Avatar>
    <Avatar class="ring-2 ring-green-500 ring-offset-2 ring-offset-background">
      <AvatarImage alt="@evilrabbit" src="/samples/avatars/avatar-22.svg" />
      <AvatarFallback class="rounded-md">LR</AvatarFallback>
    </Avatar>
    <div class="rounded-full bg-gradient-to-b from-red-500 to-blue-500 p-1">
      <Avatar class="ring-2 ring-background">
        <AvatarImage
          alt="@evilrabbit"
          src="/samples/avatars/avatar-23.svg"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>
