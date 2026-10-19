<script lang="ts">
export const description = "Kartu profil singkat muncul saat kursor berhenti di atasnya."
</script>

<script setup lang="ts">
import { CalendarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger class="cursor-pointer">
      <Avatar>
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-19.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </HoverCardTrigger>
    <HoverCardContent class="w-full max-w-xs">
      <div class="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-19.svg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <h4 class="font-semibold text-sm">@shadcn</h4>
          <p class="text-sm">
            The founder of Shadcn UI. I own a computer.
          </p>
          <div class="flex items-center pt-2">
            <CalendarIcon class="mr-2 h-4 w-4 opacity-70" /> 
            <span class="text-muted-foreground text-xs">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
