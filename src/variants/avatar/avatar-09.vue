<script lang="ts">
export const description = "Ikon sebagai cadangan, bukan inisial."
</script>

<script setup lang="ts">
import { BuildingIcon, StoreIcon, UserRoundIcon } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
</script>

<template>
  <div class="grid gap-5">
    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarFallback class="bg-indigo-500/25 text-indigo-500">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-indigo-500/25 text-indigo-500">
          CN
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-indigo-500/25 text-indigo-500">
          <UserRoundIcon class="size-4.5" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-indigo-500/25 text-indigo-500">
          <BuildingIcon class="size-4.5" />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-indigo-500/25 text-indigo-500">
          <StoreIcon class="size-4.5" />
        </AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>
