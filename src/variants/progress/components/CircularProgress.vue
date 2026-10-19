<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

/**
 * Lingkaran kemajuan, digambar sendiri dengan SVG.
 *
 * Enam varian progress memakainya, dan di sumbernya keenam berkas membawa
 * salinannya masing-masing. Di sini ia tinggal sekali.
 */
const props = withDefaults(defineProps<{
  value: number
  renderLabel?: (progress: number) => number | string
  size?: number
  strokeWidth?: number
  circleStrokeWidth?: number
  progressStrokeWidth?: number
  shape?: 'square' | 'round'
  class?: HTMLAttributes['class']
  progressClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  showLabel?: boolean
}>(), {
  shape: 'round',
  size: 100,
  circleStrokeWidth: 10,
  progressStrokeWidth: 10,
})

const radius = computed(() => props.size / 2 - 10)

const circumference = computed(() => Math.ceil(3.14 * radius.value * 2))

const remaining = computed(() => Math.ceil(circumference.value * ((100 - props.value) / 100)))

// 1:1 dengan bidang gambarnya: lingkaran tetap seukuran `size`, dan SVG-nya bisa
// diskalakan bila dipersempit (progress-12). viewBox sumbernya, selebar
// size × 1,25, mengecilkan lingkaran 20%.
const viewBox = computed(() => `0 0 ${props.size} ${props.size}`)
</script>

<template>
  <div class="relative">
    <svg
      class="relative"
      :height="size"
      style="transform: rotate(-90deg)"
      version="1.1"
      :viewBox="viewBox"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Lingkaran dasar -->
      <circle
        :class="cn('stroke-primary/25', props.class)"
        :cx="size / 2"
        :cy="size / 2"
        fill="transparent"
        :r="radius"
        :stroke-dasharray="circumference"
        stroke-dashoffset="0"
        :stroke-width="strokeWidth ?? circleStrokeWidth"
      />

      <!-- Kemajuannya -->
      <circle
        :class="cn('stroke-primary', progressClass)"
        :cx="size / 2"
        :cy="size / 2"
        fill="transparent"
        :r="radius"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="remaining"
        :stroke-linecap="shape"
        :stroke-width="strokeWidth ?? progressStrokeWidth"
      />
    </svg>
    <div
      v-if="showLabel"
      :class="cn('absolute inset-0 flex items-center justify-center text-md', labelClass)"
    >
      {{ renderLabel ? renderLabel(value) : value }}
    </div>
  </div>
</template>
