<!-- example: 1. Controlled State -->
<script setup lang="ts">
import { RotateCcwIcon, ShuffleIcon } from '@lucide/vue'
import { onBeforeUnmount, ref } from 'vue'
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from '@/components/angle-slider'
import { Button } from '@/components/ui/button'

const value = ref([180])
let frame = 0

// Bergerak lewat jalur terpendek di lingkaran (mis. 350° → 10° lewat 0°),
// dengan easing, tanpa pustaka animasi.
function animateTo(target: number) {
  cancelAnimationFrame(frame)
  const from = value.value[0] ?? 0
  let diff = target - from
  if (diff > 180)
    diff -= 360
  else if (diff < -180)
    diff += 360
  const start = performance.now()
  const duration = 400
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - (1 - t) ** 3
    value.value = [Math.round((((from + diff * eased) % 360) + 360) % 360)]
    if (t < 1)
      frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <Button variant="outline" size="sm" @click="animateTo(0)">
        <RotateCcwIcon />
        Reset
      </Button>
      <Button size="sm" @click="animateTo(Math.floor(Math.random() * 360))">
        <ShuffleIcon />
        Randomize
      </Button>
    </div>
    <AngleSlider v-model="value" :max="360" :min="0" :step="1" :size="80">
      <AngleSliderTrack>
        <AngleSliderRange />
      </AngleSliderTrack>
      <AngleSliderThumb />
      <AngleSliderValue />
    </AngleSlider>
  </div>
</template>
