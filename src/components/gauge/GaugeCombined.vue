<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import Gauge from './Gauge.vue'
import GaugeIndicator from './GaugeIndicator.vue'
import GaugeRange from './GaugeRange.vue'
import GaugeTrack from './GaugeTrack.vue'
import GaugeValueText from './GaugeValueText.vue'
import { defaultGetValueText } from './context'

/** A ready-made composition: the track arc, the value arc, and the number in the middle. */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Current value, clamped to min and max; null shows the indeterminate state. */
  value?: number | null
  /** Lowest value of the range. */
  min?: number
  /** Highest value of the range; defaults to 100. */
  max?: number
  size?: number
  /** Stroke width of the arc, in pixels. */
  thickness?: number
  /** The arc's starting angle in degrees; zero is 12 o'clock and angles grow clockwise. */
  startAngle?: number
  /** The arc's ending angle in degrees, measured like startAngle. */
  endAngle?: number
  /** Builds the value text and aria-valuetext; defaults to a rounded percentage without the sign. */
  getValueText?: (value: number, min: number, max: number) => string
  class?: HTMLAttributes['class']
}>(), {
  value: null,
  min: 0,
  size: 120,
  thickness: 8,
  startAngle: 0,
  endAngle: 360,
  getValueText: defaultGetValueText,
})
</script>

<template>
  <Gauge v-bind="props">
    <GaugeIndicator>
      <GaugeTrack />
      <GaugeRange />
    </GaugeIndicator>
    <GaugeValueText />
  </Gauge>
</template>
