<!-- example: 2. Transparency Support -->
<script setup lang="ts">
import { ColorSwatch } from '@/components/color-swatch'

const groups = [
  { label: 'Alpha Transparency', flat: false, colors: ['rgba(59, 130, 246, 1)', 'rgba(59, 130, 246, 0.8)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.2)'] },
  { label: 'HSLA Colors', flat: false, colors: ['hsla(220, 91%, 60%, 1)', 'hsla(220, 91%, 60%, 0.75)', 'hsla(220, 91%, 60%, 0.5)', 'hsla(220, 91%, 60%, 0.25)', 'hsla(220, 91%, 60%, 0.1)'] },
  { label: 'Without Transparency Pattern', flat: true, colors: ['rgba(239, 68, 68, 0.8)', 'rgba(34, 197, 94, 0.6)', 'rgba(139, 92, 246, 0.4)'] },
  { label: 'With Transparency Pattern (Default)', flat: false, colors: ['rgba(239, 68, 68, 0.8)', 'rgba(34, 197, 94, 0.6)', 'rgba(139, 92, 246, 0.4)'] },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="group in groups" :key="group.label" class="flex flex-col gap-2">
      <span class="text-sm font-medium">{{ group.label }}</span>
      <div class="flex gap-2">
        <ColorSwatch v-for="color in group.colors" :key="color" :color="color" :without-transparency="group.flat" />
      </div>
    </div>
  </div>
</template>
