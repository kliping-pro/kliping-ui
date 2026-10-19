<!-- example: 2. Colors -->
<script setup lang="ts">
import { Gauge, GaugeIndicator, GaugeLabel, GaugeRange, GaugeTrack, GaugeValueText } from '@/components/gauge'
import { cn } from '@/lib/utils'

const themes = [
  { name: 'CPU', value: 45, trackClass: 'text-emerald-200 dark:text-emerald-900', rangeClass: 'text-emerald-500', textClass: 'text-emerald-700 dark:text-emerald-300' },
  { name: 'Memory', value: 68, trackClass: 'text-amber-200 dark:text-amber-900', rangeClass: 'text-amber-500', textClass: 'text-amber-700 dark:text-amber-300' },
  { name: 'Disk', value: 92, trackClass: 'text-red-200 dark:text-red-900', rangeClass: 'text-red-500', textClass: 'text-red-700 dark:text-red-300' },
  { name: 'Network', value: 28, trackClass: 'text-sky-200 dark:text-sky-900', rangeClass: 'text-sky-500', textClass: 'text-sky-700 dark:text-sky-300' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
    <Gauge v-for="theme in themes" :key="theme.name" :value="theme.value" :size="120" :thickness="10">
      <GaugeIndicator>
        <GaugeTrack :class="theme.trackClass" />
        <GaugeRange :class="theme.rangeClass" />
      </GaugeIndicator>
      <GaugeValueText :class="cn('text-xl', theme.textClass)" />
      <GaugeLabel>{{ theme.name }}</GaugeLabel>
    </Gauge>
  </div>
</template>
