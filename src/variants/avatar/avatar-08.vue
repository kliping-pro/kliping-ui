<script lang="ts">
export const description = "Empat bentuk sudut, dari persegi sampai bulat penuh."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
</script>

<template>
  <div class="grid gap-5">
    <div class="flex items-center gap-4">
      <Avatar class="rounded-none">
        <AvatarFallback class="rounded-none bg-indigo-500 text-white">
          A
        </AvatarFallback>
      </Avatar>
      <Avatar class="rounded-md">
        <AvatarFallback class="rounded-lg bg-indigo-500 text-white">
          A
        </AvatarFallback>
      </Avatar>
      <Avatar class="rounded-full">
        <AvatarFallback class="rounded-full bg-indigo-500 text-white">
          A
        </AvatarFallback>
      </Avatar>
    </div>
    <div class="flex items-center gap-4">
      <Avatar class="rounded-none">
        <AvatarFallback class="rounded-none bg-indigo-500/25 text-indigo-500">
          A
        </AvatarFallback>
      </Avatar>
      <Avatar class="rounded-md">
        <AvatarFallback class="rounded-lg bg-indigo-500/25 text-indigo-500">
          A
        </AvatarFallback>
      </Avatar>
      <Avatar class="rounded-full">
        <AvatarFallback class="rounded-full bg-indigo-500/25 text-indigo-500">
          A
        </AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>
