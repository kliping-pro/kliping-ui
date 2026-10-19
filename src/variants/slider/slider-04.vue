<script lang="ts">
export const description = "Tiga warna isian berbeda."
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
      thumb-class="bg-white"
    />
    <Slider
      :default-value="[50]"
      :max="100"
      range-class="bg-indigo-500"
      :step="1"
      thumb-class="bg-white"
    />
    <Slider
      :default-value="[50]"
      :max="100"
      range-class="bg-rose-500"
      :step="1"
      thumb-class="bg-white"
    />
  </div>
</template>
