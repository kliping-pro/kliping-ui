<!-- example: 2. RGB Color Input -->
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { SegmentedInput, SegmentedInputItem } from '@/components/segmented-input'

const rgb = reactive({ r: '255', g: '128', b: '0' })

// Kanal di luar 0–255 atau bukan angka diabaikan pada pratinjau warna.
const channel = (value: string) => {
  const n = Number.parseInt(value, 10)
  return Number.isNaN(n) ? 0 : Math.min(255, Math.max(0, n))
}
const color = computed(() => `rgb(${channel(rgb.r)}, ${channel(rgb.g)}, ${channel(rgb.b)})`)
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-sm leading-none font-medium">RGB Color</span>
    <div class="flex items-center gap-3">
      <SegmentedInput class="w-fit" aria-label="RGB color input">
        <SegmentedInputItem v-model="rgb.r" placeholder="255" class="w-16" inputmode="numeric" pattern="[0-9]*" aria-label="Red channel (0-255)" />
        <SegmentedInputItem v-model="rgb.g" placeholder="128" class="w-16" inputmode="numeric" pattern="[0-9]*" aria-label="Green channel (0-255)" />
        <SegmentedInputItem v-model="rgb.b" placeholder="0" class="w-16" inputmode="numeric" pattern="[0-9]*" aria-label="Blue channel (0-255)" />
      </SegmentedInput>
      <div class="size-9 rounded-md border" :style="{ backgroundColor: color }" aria-hidden="true" />
    </div>
  </div>
</template>
