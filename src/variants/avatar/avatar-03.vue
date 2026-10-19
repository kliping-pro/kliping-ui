<script lang="ts">
export const description = "Namanya muncul sebagai tooltip saat disentuh kursor."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Avatar>
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-17.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent class="font-semibold">shadcn</TooltipContent>
  </Tooltip>
</template>
