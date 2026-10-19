<!-- example: 3. With Icons -->
<script setup lang="ts">
import { Bell, Heart, MessageCircle, Settings, Star, User } from '@lucide/vue'
import { AvatarGroup } from '@/components/avatar-group'

const icons = [
  { icon: User, color: 'bg-blue-600' },
  { icon: Heart, color: 'bg-red-600' },
  { icon: Star, color: 'bg-yellow-600' },
  { icon: MessageCircle, color: 'bg-green-600' },
  { icon: Settings, color: 'bg-purple-600' },
  { icon: Bell, color: 'bg-orange-600' },
]
const groups = [
  { title: 'Icon Group', items: icons.slice(0, 4), reverse: false },
  { title: 'Icon Group with Truncation', items: icons, max: 3, reverse: false },
  { title: 'Reverse Icon Group', items: icons.slice(0, 4), reverse: true },
  { title: 'Reverse with Truncation', items: icons, max: 3, reverse: true },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div v-for="group in groups" :key="group.title" class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        {{ group.title }}
      </h3>
      <AvatarGroup :max="group.max" :reverse="group.reverse">
        <div
          v-for="(item, i) in group.items"
          :key="i"
          :class="['flex size-10 items-center justify-center rounded-full text-white', item.color]"
        >
          <component :is="item.icon" :size="16" />
        </div>
      </AvatarGroup>
    </div>
  </div>
</template>
