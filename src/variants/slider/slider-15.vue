<script lang="ts">
export const description = "Rentang dengan batas bawah dan atas tertulis di kedua ujungnya."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '@/variants/slider/components/Slider.vue'

const value = ref([20, 40, 80])

</script>

<template>
  <div class="mx-auto w-full max-w-sm">
    <div class="flex w-full items-center justify-between gap-2">
      <span class="text-muted-foreground text-sm">0</span>
      <Slider :max="100" :step="1" v-model="value" />
      <span class="text-muted-foreground text-sm">100</span>
    </div>
    <p class="mt-2 text-center text-muted-foreground text-sm">
      {{ value.join(" - ") }}
    </p>
  </div>
</template>
