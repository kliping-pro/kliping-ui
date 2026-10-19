<script lang="ts">
export const description = "Lencana kecil di pojok kanan bawah, tiga keadaan."
</script>

<script setup lang="ts">
import { BadgeCheck, BadgeMinus, BadgeX } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="relative">
      <Avatar class="size-10">
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-01.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="absolute -right-0.5 -bottom-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground leading-none ring-2 ring-background">
        3
      </div>
    </div>
    <div class="relative">
      <Avatar class="size-10">
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-01.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <BadgeCheck class="absolute -right-1 -bottom-1 size-4.5 rounded-full fill-blue-500 text-white" />
    </div>
    <div class="relative">
      <Avatar class="size-10">
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-01.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <BadgeMinus class="absolute -right-1 -bottom-1 size-4.5 rounded-full fill-amber-500 text-white" />
    </div>
    <div class="relative">
      <Avatar class="size-10">
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-01.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <BadgeX class="absolute -right-1 -bottom-1 size-4.5 rounded-full fill-red-500 text-white" />
    </div>
  </div>
</template>
