<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import CircularProgress from './CircularProgress.vue'
import CircularProgressIndicator from './CircularProgressIndicator.vue'
import CircularProgressRange from './CircularProgressRange.vue'
import CircularProgressTrack from './CircularProgressTrack.vue'
import CircularProgressValueText from './CircularProgressValueText.vue'
import { defaultGetValueText } from './context'

/**
 * Susunan siap pakai: lingkaran latar, busur, dan persentase di tengahnya.
 *
 * Ada karena susunan itu yang dipakai sembilan dari sepuluh kali, dan menulis
 * lima tag bersarang untuk sesuatu yang tidak diubah apa-apa cuma menambah
 * kebisingan. Yang ingin mengaturnya sendiri memakai bagian-bagiannya.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Current value, clamped to min and max; null shows the indeterminate spinner. */
  value?: number | null
  /** Lowest value of the range. */
  min?: number
  /** Highest value of the range; defaults to 100. */
  max?: number
  size?: number
  /** The stroke width of the circle, in pixels. */
  thickness?: number
  /** Label text rendered after the indicator and used as its accessible name. */
  label?: string
  /** Builds the value text, replacing the default percentage. */
  getValueText?: (value: number, min: number, max: number) => string
  class?: HTMLAttributes['class']
}>(), {
  value: null,
  min: 0,
  size: 48,
  thickness: 4,
  getValueText: defaultGetValueText,
})
</script>

<template>
  <CircularProgress v-bind="props">
    <CircularProgressIndicator>
      <CircularProgressTrack />
      <CircularProgressRange />
    </CircularProgressIndicator>
    <CircularProgressValueText />
  </CircularProgress>
</template>
