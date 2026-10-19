<script lang="ts">
export const description = "Dua lingkaran berwarna berbeda."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'
import CircularProgress from '@/variants/progress/components/CircularProgress.vue'

const progress = ref([13])

</script>

<template>
  <div class="mx-auto flex w-full max-w-xs flex-col items-center">
    <div class="flex items-center gap-1">
      <CircularProgress
        class="stroke-indigo-500/25"
        label-class="text-xl font-bold"
        progress-class="stroke-indigo-600"
        :render-label="(progress) => `${progress}%`"
        showLabel
        :size="120"
        :stroke-width="10"
        :value="progress[0]"
      />
      <CircularProgress
        class="stroke-orange-500/25"
        label-class="text-xl font-bold"
        progress-class="stroke-orange-600"
        :render-label="(progress) => `${progress}%`"
        showLabel
        :size="120"
        :stroke-width="10"
        :value="progress[0]"
      />
    </div>
    <Slider
      class="mt-6"
      v-model="progress"
      :max="100"
      :step="1"
    />
  </div>
</template>
