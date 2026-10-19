<script lang="ts">
export const description = "Avatar yang bisa diklik, menuju profilnya."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <a href="https://github.com/shadcn" target="_blank">
    <Avatar>
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-16.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </a>
</template>
