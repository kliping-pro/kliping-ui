<!-- example: 2. Vertical Orientation -->
<script setup lang="ts">
import { CompareSlider, CompareSliderAfter, CompareSliderBefore, CompareSliderHandle } from '@/components/compare-slider'
</script>

<template>
  <div class="w-full max-w-lg">
    <CompareSlider :default-value="50" orientation="vertical" class="h-80 w-full overflow-hidden rounded-lg border">
      <CompareSliderBefore label="Color">
        <div class="size-full bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600" />
      </CompareSliderBefore>
      <CompareSliderAfter label="Grayscale">
        <div class="size-full bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600 grayscale" />
      </CompareSliderAfter>
      <CompareSliderHandle />
    </CompareSlider>
  </div>
</template>
