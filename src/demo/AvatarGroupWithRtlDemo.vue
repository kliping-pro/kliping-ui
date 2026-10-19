<!-- example: 2. With RTL -->
<script setup lang="ts">
import { AvatarGroup } from '@/components/avatar-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const people = ['CN', 'EN', 'GR', 'LR']
const variants = [
  { title: 'RTL', orientation: 'horizontal', reverse: false },
  { title: 'Reverse RTL', orientation: 'horizontal', reverse: true },
  { title: 'Vertical RTL', orientation: 'vertical', reverse: false },
  { title: 'Vertical reverse RTL', orientation: 'vertical', reverse: true },
] as const
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <div v-for="v in variants" :key="v.title" class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        {{ v.title }}
      </h3>
      <div :class="v.orientation === 'vertical' ? 'flex justify-center' : undefined">
        <AvatarGroup dir="rtl" :orientation="v.orientation" :reverse="v.reverse">
          <Avatar v-for="initials in people" :key="initials">
            <AvatarFallback>{{ initials }}</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  </div>
</template>
