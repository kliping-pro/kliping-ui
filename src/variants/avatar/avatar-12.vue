<script lang="ts">
export const description = "Tumpukan avatar yang saling menindih."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AvatarGroup from '@/variants/avatar/components/AvatarGroup.vue'
</script>

<template>
  <AvatarGroup>
    <Avatar class="-ml-2 cursor-pointer first:ml-0">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-23.svg" />
      <AvatarFallback class="bg-indigo-500 text-white">CN</AvatarFallback>
    </Avatar>
    <Avatar class="-ml-2 cursor-pointer first:ml-0">
      <AvatarFallback class="bg-green-600 text-white">CN</AvatarFallback>
    </Avatar>
    <Avatar class="-ml-2 cursor-pointer first:ml-0">
      <AvatarFallback class="bg-red-500 text-white">AB</AvatarFallback>
    </Avatar>
    <Avatar class="-ml-2 cursor-pointer first:ml-0">
      <AvatarFallback class="bg-indigo-500 text-white">VK</AvatarFallback>
    </Avatar>
    <Avatar class="-ml-2 cursor-pointer first:ml-0">
      <AvatarFallback class="bg-orange-500 text-white">RS</AvatarFallback>
    </Avatar>
  </AvatarGroup>
</template>
