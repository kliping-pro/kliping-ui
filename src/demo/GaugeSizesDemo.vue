<!-- example: 1. Sizes -->
<script setup lang="ts">
import { Gauge, GaugeIndicator, GaugeLabel, GaugeRange, GaugeTrack, GaugeValueText } from '@/components/gauge'

const sizes = [
  { size: 100, thickness: 6, label: 'Small', valueTextClass: 'text-xl' },
  { size: 140, thickness: 10, label: 'Medium', valueTextClass: 'text-3xl' },
  { size: 180, thickness: 12, label: 'Large', valueTextClass: 'text-4xl' },
]
</script>

<template>
  <div class="flex flex-wrap items-end justify-center gap-8">
    <div v-for="config in sizes" :key="config.label" class="flex flex-col items-center gap-2">
      <Gauge :value="68" :size="config.size" :thickness="config.thickness">
        <GaugeIndicator>
          <GaugeTrack />
          <GaugeRange />
        </GaugeIndicator>
        <GaugeValueText :class="config.valueTextClass" />
        <GaugeLabel class="sr-only">
          {{ config.label }}
        </GaugeLabel>
      </Gauge>
      <p class="text-sm text-muted-foreground">
        {{ config.label }}
      </p>
    </div>
  </div>
</template>
