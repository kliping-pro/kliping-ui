<!-- example: 1. With Truncation -->
<script setup lang="ts">
import { AvatarGroup } from '@/components/avatar-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const people = ['CN', 'EN', 'GR', 'LR', 'ER', 'TN', 'DO', 'SD']
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="max in [3, 5]" :key="max" class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        Max {{ max }} items
      </h3>
      <AvatarGroup :max="max">
        <Avatar v-for="initials in people" :key="initials">
          <AvatarFallback>{{ initials }}</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  </div>
</template>
