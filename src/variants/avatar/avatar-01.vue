<script lang="ts">
export const description = "Avatar bawaan: foto, dengan inisial sebagai cadangannya."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-15.svg" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
