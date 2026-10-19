<script lang="ts">
export const description = "Ujung busurnya bulat atau tegak lurus."
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
        label-class="text-xl font-bold"
        :render-label="(progress) => `${progress}%`"
        shape="round"
        showLabel
        :size="120"
        :stroke-width="10"
        :value="progress[0]"
      />
      <CircularProgress
        label-class="text-xl font-bold"
        :render-label="(progress) => `${progress}%`"
        shape="square"
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
