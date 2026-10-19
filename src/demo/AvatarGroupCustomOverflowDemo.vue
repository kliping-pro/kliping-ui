<!-- example: 4. Custom Overflow -->
<script setup lang="ts">
import { AvatarGroup } from '@/components/avatar-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const people = ['CN', 'EN', 'GR', 'LR', 'ER', 'TN', 'JK', 'SM']
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        Default Overflow
      </h3>
      <AvatarGroup :max="4">
        <Avatar v-for="initials in people" :key="initials">
          <AvatarFallback>{{ initials }}</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
    <div class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        Custom Overflow with Badge
      </h3>
      <AvatarGroup :max="4">
        <Avatar v-for="initials in people" :key="initials">
          <AvatarFallback>{{ initials }}</AvatarFallback>
        </Avatar>
        <template #overflow="{ count }">
          <div class="border-primary bg-primary/10 text-primary flex size-full items-center justify-center rounded-full border-2 border-dashed text-xs font-semibold">
            {{ count }}+
          </div>
        </template>
      </AvatarGroup>
    </div>
  </div>
</template>
