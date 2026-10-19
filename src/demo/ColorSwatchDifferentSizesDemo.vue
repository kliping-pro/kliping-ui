<!-- example: 1. Different Sizes -->
<script setup lang="ts">
import { ColorSwatch } from '@/components/color-swatch'

const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6']
const sizes = [
  { label: 'Small (sm)', size: 'sm' },
  { label: 'Default', size: 'default' },
  { label: 'Large (lg)', size: 'lg' },
] as const
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="s in sizes" :key="s.size" class="flex flex-col gap-2">
      <span class="text-sm font-medium">{{ s.label }}</span>
      <div class="flex gap-2">
        <ColorSwatch v-for="color in colors" :key="color" :color="color" :size="s.size" />
      </div>
    </div>
  </div>
</template>
