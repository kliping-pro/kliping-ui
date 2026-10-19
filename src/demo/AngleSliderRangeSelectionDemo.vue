<!-- example: 2. Range Selection -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from '@/components/angle-slider'

const value = ref([90, 270])
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <AngleSlider v-model="value" :max="360" :min="0" :step="5" :size="80">
      <AngleSliderTrack>
        <AngleSliderRange />
      </AngleSliderTrack>
      <AngleSliderThumb :index="0" />
      <AngleSliderThumb :index="1" />
      <AngleSliderValue />
    </AngleSlider>
    <div class="flex flex-col gap-2 text-center text-sm">
      <p><strong>Range:</strong> {{ value[0] }}° - {{ value[1] }}°</p>
      <p><strong>Arc Length:</strong> {{ Math.abs((value[1] ?? 0) - (value[0] ?? 0)) }}°</p>
    </div>
  </div>
</template>
