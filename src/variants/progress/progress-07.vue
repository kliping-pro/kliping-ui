<script lang="ts">
export const description = "Lingkaran kemajuan, digeser dengan slider di bawahnya."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'
import CircularProgress from '@/variants/progress/components/CircularProgress.vue'

const progress = ref([13])

</script>

<template>
  <div class="mx-auto flex w-full max-w-xs flex-col items-center">
    <CircularProgress :size="120" :stroke-width="10" :value="progress[0]" />
    <Slider
      class="mt-6"
      v-model="progress"
      :max="100"
      :step="1"
    />
  </div>
</template>
