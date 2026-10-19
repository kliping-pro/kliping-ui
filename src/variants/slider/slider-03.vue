<script lang="ts">
export const description = "Tiga ukuran, dari tipis sampai tebal."
</script>

<script setup lang="ts">
import Slider from '@/variants/slider/components/Slider.vue'
</script>

<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <Slider :default-value="[50]" :max="100" size="base" :step="1" />
    <Slider :default-value="[50]" :max="100" size="medium" :step="1" />
    <Slider :default-value="[50]" :max="100" size="large" :step="1" />
  </div>
</template>
