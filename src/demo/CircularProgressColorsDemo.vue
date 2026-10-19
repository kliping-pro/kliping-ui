<!-- example: 2. Colors -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressRange,
  CircularProgressTrack,
  CircularProgressValueText,
} from '@/components/circular-progress'
import { cn } from '@/lib/utils'

const themes = [
  { name: 'Default', trackClass: 'text-muted-foreground/20', rangeClass: 'text-primary', textClass: 'text-foreground' },
  { name: 'Success', trackClass: 'text-green-200 dark:text-green-900', rangeClass: 'text-green-500', textClass: 'text-green-700 dark:text-green-300' },
  { name: 'Warning', trackClass: 'text-yellow-200 dark:text-yellow-900', rangeClass: 'text-yellow-500', textClass: 'text-yellow-700 dark:text-yellow-300' },
  { name: 'Destructive', trackClass: 'text-red-200 dark:text-red-900', rangeClass: 'text-red-500', textClass: 'text-red-700 dark:text-red-300' },
  { name: 'Purple', trackClass: 'text-purple-200 dark:text-purple-900', rangeClass: 'text-purple-500', textClass: 'text-purple-700 dark:text-purple-300' },
  { name: 'Orange', trackClass: 'text-orange-200 dark:text-orange-900', rangeClass: 'text-orange-500', textClass: 'text-orange-700 dark:text-orange-300' },
  { name: 'Blue', trackClass: 'text-blue-200 dark:text-blue-900', rangeClass: 'text-blue-500', textClass: 'text-blue-700 dark:text-blue-300' },
  { name: 'Pink', trackClass: 'text-pink-200 dark:text-pink-900', rangeClass: 'text-pink-500', textClass: 'text-pink-700 dark:text-pink-300' },
]

// Tiap lingkaran naik 0 → 75 dengan easing, bergiliran 150 ms — tanpa pustaka
// animasi.
const values = ref(themes.map(() => 0))
let frame = 0

onMounted(() => {
  const start = performance.now()
  const tick = (now: number) => {
    values.value = themes.map((_, i) => {
      const t = Math.min(Math.max((now - start - i * 150) / 900, 0), 1)
      return Math.round(75 * (1 - (1 - t) ** 3))
    })
    if (values.value.some(v => v < 75))
      frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div
      v-for="(theme, i) in themes"
      :key="theme.name"
      :class="cn('flex flex-col items-center gap-3', i >= 4 && 'max-sm:hidden')"
    >
      <CircularProgress :value="values[i]" :size="80" :thickness="6">
        <CircularProgressIndicator>
          <CircularProgressTrack :class="theme.trackClass" />
          <CircularProgressRange :class="theme.rangeClass" />
        </CircularProgressIndicator>
        <CircularProgressValueText :class="cn('text-sm font-semibold', theme.textClass)" />
      </CircularProgress>
      <div class="flex flex-col items-center gap-1 text-center">
        <h4 class="text-sm font-medium">
          {{ theme.name }}
        </h4>
        <p class="text-muted-foreground text-xs">
          {{ values[i] }}% complete
        </p>
      </div>
    </div>
  </div>
</template>
