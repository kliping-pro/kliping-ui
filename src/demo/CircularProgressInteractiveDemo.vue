<!-- example: 1. Interactive Demo -->
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressRange,
  CircularProgressTrack,
  CircularProgressValueText,
} from '@/components/circular-progress'
import { Button } from '@/components/ui/button'

const progress = ref<number | null>(0)
const uploading = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function stop() {
  clearInterval(timer)
  timer = undefined
}

// Unggahan tiruan: maju acak tiap 200 ms sampai 100.
function start() {
  uploading.value = true
  progress.value = 0
  stop()
  timer = setInterval(() => {
    const next = Math.min(100, (progress.value ?? 0) + Math.random() * 15)
    progress.value = next
    if (next >= 100) {
      stop()
      uploading.value = false
    }
  }, 200)
}

function reset() {
  stop()
  progress.value = 0
  uploading.value = false
}

onBeforeUnmount(stop)
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="flex items-center gap-6">
      <CircularProgress :value="progress" :min="0" :max="100" :size="80" :thickness="6">
        <CircularProgressIndicator>
          <CircularProgressTrack />
          <CircularProgressRange />
        </CircularProgressIndicator>
        <CircularProgressValueText class="text-base font-semibold" />
      </CircularProgress>
      <div class="flex flex-col gap-2">
        <div class="text-sm font-medium">
          Upload Progress
        </div>
        <div class="text-muted-foreground text-xs">
          Status: {{ uploading ? 'Uploading...' : progress === 100 ? 'Complete' : 'Ready' }}
        </div>
        <div class="text-muted-foreground text-xs">
          Progress: {{ progress === null ? 'Indeterminate' : `${Math.round(progress)}%` }}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <Button size="sm" :disabled="uploading" @click="start">
        Start upload
      </Button>
      <Button size="sm" :disabled="uploading" @click="reset">
        Reset
      </Button>
      <Button variant="secondary" size="sm" :disabled="uploading" @click="progress = null">
        Indeterminate
      </Button>
    </div>
  </div>
</template>
