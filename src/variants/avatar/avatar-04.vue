<script lang="ts">
export const description = "Nama dan lencana terverifikasi di sampingnya."
</script>

<script setup lang="ts">
import { BadgeCheckIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex items-start gap-3">
    <Avatar class="size-9">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-18.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-1 font-semibold leading-none tracking-tight">
        shadcn 
        <BadgeCheckIcon class="size-4.5 fill-blue-500 text-white" />
      </div>
      <span class="text-muted-foreground text-sm leading-none">
        I own a computer
      </span>
    </div>
  </div>
</template>
