<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
</script>

<template>
  <div class="flex flex-row flex-wrap items-center gap-12">
    <Avatar>
      <AvatarImage src="/samples/avatars/avatar-23.svg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="/samples/avatars/avatar-24.svg" alt="@evilrabbit" />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
    <div class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
      <Avatar>
        <AvatarImage src="/samples/avatars/avatar-23.svg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/samples/avatars/avatar-01.svg" alt="@leerob" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/samples/avatars/avatar-24.svg"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>
