<script lang="ts">
export const description = "Pemutar media: waktu berjalan di kiri, durasi di kanan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const playbackTime = ref([78])

const duration = 145

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
</script>

<template>
  <div class="w-full max-w-sm">
    <Slider
      v-model="playbackTime"
      :max="duration"
      :step="1"
    />
    <div class="mt-1 flex justify-between font-medium text-muted-foreground text-xs">
      <span>{{ formatDuration(playbackTime[0]) }}</span>
      <span>{{ formatDuration(duration) }}</span>
    </div>
  </div>
</template>
