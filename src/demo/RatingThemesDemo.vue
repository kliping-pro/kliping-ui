<!-- example: 1. Themes -->
<script setup lang="ts">
import { Heart, Star, Zap } from '@lucide/vue'
import { Rating, RatingItem } from '@/components/rating'

const themes = [
  { label: 'Default', description: 'Classic star rating', value: 4, icon: Star, class: 'text-primary' },
  { label: 'Gold', description: 'Premium gold stars', value: 5, icon: Star, class: 'text-yellow-500' },
  { label: 'Heart', description: 'Love & favorites', value: 5, icon: Heart, class: 'text-pink-500' },
  { label: 'Energy', description: 'Performance rating', value: 4, icon: Zap, class: 'text-orange-500' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div
      v-for="theme in themes"
      :key="theme.label"
      class="flex flex-col items-center gap-3 rounded-lg border p-4"
    >
      <h4 class="text-sm font-medium">
        {{ theme.label }}
      </h4>
      <Rating :default-value="theme.value" class="gap-1" :class="theme.class">
        <RatingItem v-for="i in 5" :key="i" :item="i">
          <component :is="theme.icon" />
        </RatingItem>
      </Rating>
      <p class="text-xs text-muted-foreground">
        {{ theme.description }}
      </p>
    </div>
  </div>
</template>
