<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  CircularProgress,
  CircularProgressCombined,
  CircularProgressIndicator,
  CircularProgressRange,
  CircularProgressTrack,
  CircularProgressValueText,
} from '@/components/circular-progress'

const progress = ref(18)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    progress.value = progress.value >= 100 ? 0 : progress.value + 2
  }, 120)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <CircularProgressCombined :value="progress" />

    <CircularProgressCombined :size="64" :thickness="6" :value="72" />

    <CircularProgress :size="64" :thickness="6" :value="null">
      <CircularProgressIndicator>
        <CircularProgressTrack />
        <CircularProgressRange />
      </CircularProgressIndicator>
    </CircularProgress>

    <CircularProgress :size="72" :thickness="8" :value="41">
      <CircularProgressIndicator>
        <CircularProgressTrack class="text-primary/10" />
        <CircularProgressRange class="text-emerald-500" />
      </CircularProgressIndicator>
      <CircularProgressValueText class="font-semibold text-xs" />
    </CircularProgress>
  </div>
</template>
