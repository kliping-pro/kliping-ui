<script lang="ts">
export const description = "Jalur dan tuasnya persegi, tanpa sudut membulat."
</script>

<script setup lang="ts">
import Slider from '@/variants/slider/components/Slider.vue'
</script>

<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <Slider
      :default-value="[50]"
      :max="100"
      range-class="bg-green-500"
      :step="1"
      thumb-class="rounded-none bg-white"
      track-class="h-2 rounded-none"
    />
    <Slider
      :default-value="[50]"
      :max="100"
      range-class="bg-indigo-500"
      :step="1"
      thumb-class="rounded-[2px] bg-white"
      track-class="h-2 rounded-[2px]"
    />
    <Slider
      :default-value="[50]"
      :max="100"
      range-class="bg-rose-500"
      :step="1"
      thumb-class="bg-white"
      track-class="h-2"
    />
  </div>
</template>
