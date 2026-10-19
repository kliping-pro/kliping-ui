<!-- example: 3. Variants -->
<script setup lang="ts">
import { Gauge, GaugeIndicator, GaugeLabel, GaugeRange, GaugeTrack, GaugeValueText } from '@/components/gauge'

const variants = [
  { startAngle: -90, endAngle: 90, label: 'Semi Circle' },
  { startAngle: -135, endAngle: 135, label: 'Three Quarter' },
  { startAngle: 0, endAngle: 360, label: 'Full Circle' },
]
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-12">
    <Gauge
      v-for="variant in variants"
      :key="variant.label"
      :value="72"
      :size="140"
      :thickness="10"
      :start-angle="variant.startAngle"
      :end-angle="variant.endAngle"
    >
      <GaugeIndicator>
        <GaugeTrack />
        <GaugeRange />
      </GaugeIndicator>
      <GaugeValueText />
      <GaugeLabel>{{ variant.label }}</GaugeLabel>
    </Gauge>
  </div>
</template>
