<script lang="ts">
export const description = "Empat ukuran, dari kecil sampai besar."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar class="size-8">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-20.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar class="size-10">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-20.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar class="size-11">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-20.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar class="size-12">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-20.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar class="size-14">
      <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-20.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>
