<script setup lang="ts">
import { Gauge, GaugeCombined, GaugeIndicator, GaugeLabel, GaugeRange, GaugeTrack, GaugeValueText } from '@/components/gauge'
</script>

<template>
  <div class="flex flex-wrap items-end gap-10">
    <GaugeCombined aria-label="Score" :value="68" />

    <Gauge :end-angle="270" :size="140" :start-angle="-90" :value="82">
      <GaugeIndicator>
        <GaugeTrack />
        <GaugeRange class="text-emerald-500" />
      </GaugeIndicator>
      <GaugeValueText />
      <GaugeLabel>Availability</GaugeLabel>
    </Gauge>

    <Gauge :end-angle="90" :size="140" :start-angle="-90" :value="34">
      <GaugeIndicator>
        <GaugeTrack />
        <GaugeRange class="text-orange-500" />
      </GaugeIndicator>
      <GaugeValueText />
      <GaugeLabel>Capacity</GaugeLabel>
    </Gauge>
  </div>
</template>
