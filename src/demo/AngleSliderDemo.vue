<script setup lang="ts">
import { ref } from 'vue'
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from '@/components/angle-slider'

const angle = ref([135])
const range = ref([40, 220])
</script>

<template>
  <div class="flex flex-wrap items-center gap-10">
    <div class="flex flex-col items-center gap-2">
      <AngleSlider v-model="angle" :step="5">
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
      </AngleSlider>
      <p class="text-muted-foreground text-sm">
        Single thumb
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <AngleSlider v-model="range" :size="70">
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb :index="0" />
        <AngleSliderThumb :index="1" />
        <AngleSliderValue />
      </AngleSlider>
      <p class="text-muted-foreground text-sm">
        Range
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <AngleSlider v-model="angle" :end-angle="180" :size="70" :start-angle="0">
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
      </AngleSlider>
      <p class="text-muted-foreground text-sm">
        Half arc
      </p>
    </div>
  </div>
</template>
