<script lang="ts">
export const description = "Berdiri tegak, digeser ke atas dan ke bawah."
</script>

<script setup lang="ts">
import Slider from '@/variants/slider/components/Slider.vue'
</script>

<template>
  <Slider
    class="mx-auto h-40 w-fit"
    :default-value="[50]"
    :max="100"
    orientation="vertical"
    :step="1"
  />
</template>
