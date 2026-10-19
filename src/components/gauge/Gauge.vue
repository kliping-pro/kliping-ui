<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GaugeState } from './context'
import { Primitive } from 'reka-ui'
import { computed, ref, useId } from 'vue'
import { cn } from '@/lib/utils'
import { getArcCenterY } from './arc'
import { defaultGetValueText, provideGaugeContext } from './context'

/**
 * Akar penunjuk nilai berbentuk busur.
 *
 * Bedanya dari `CircularProgress` bukan tampilan, melainkan seberapa jauh
 * busurnya boleh dipotong. `startAngle` dan `endAngle` menentukan berapa
 * derajat yang dipakai, jadi setengah lingkaran, tiga perempat, dan lingkaran
 * penuh sama-sama bisa — dan tiap bentuk itu menaruh teks nilainya di tempat
 * yang berbeda.
 */
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
  /** The arc's starting angle; zero is 12 o'clock and angles grow clockwise. */
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

const DEFAULT_MAX = 100

const labelId = useId()
const valueTextId = useId()

// `aria-labelledby` hanya menunjuk ke GaugeLabel yang benar-benar terpasang —
// menunjuk ke id yang tidak ada membuat meter tanpa nama. Tanpa GaugeLabel,
// nama bawaannya "Gauge" (bisa ditimpa `aria-label` dari pemakai).
const labelCount = ref(0)
function registerLabel() {
  labelCount.value++
  return () => {
    labelCount.value--
  }
}

const isValidNumber = (n: unknown): n is number => typeof n === 'number' && Number.isFinite(n)

const min = computed(() => (isValidNumber(props.min) ? props.min : 0))
const max = computed(() => {
  const requested = isValidNumber(props.max) && props.max > 0 ? props.max : DEFAULT_MAX
  return requested <= min.value ? min.value + 1 : requested
})

const value = computed(() => {
  const v = props.value
  if (!isValidNumber(v)) return null
  return Math.min(max.value, Math.max(min.value, v))
})

const state = computed<GaugeState>(() => {
  if (value.value === null) return 'indeterminate'
  return value.value === max.value ? 'complete' : 'loading'
})

const valueText = computed(() =>
  value.value === null ? undefined : props.getValueText(value.value, min.value, max.value))

const radius = computed(() => Math.max(0, (props.size - props.thickness) / 2))
const center = computed(() => props.size / 2)

const percentage = computed(() =>
  value.value === null
    ? null
    : (max.value === min.value ? 1 : (value.value - min.value) / (max.value - min.value)))

const arcLength = computed(() => {
  const diff = Math.abs(props.endAngle - props.startAngle)
  return (Math.min(diff, 360) / 360) * (2 * Math.PI * radius.value)
})

const context = computed(() => ({
  value: value.value,
  valueText: valueText.value,
  max: max.value,
  min: min.value,
  state: state.value,
  radius: radius.value,
  thickness: props.thickness,
  size: props.size,
  center: center.value,
  percentage: percentage.value,
  startAngle: props.startAngle,
  endAngle: props.endAngle,
  arcLength: arcLength.value,
  arcCenterY: getArcCenterY(center.value, radius.value, props.startAngle, props.endAngle),
  valueTextId,
  labelId,
  registerLabel,
}))

provideGaugeContext(context)
</script>

<template>
  <Primitive
    :aria-describedby="valueText ? valueTextId : undefined"
    :aria-label="labelCount ? undefined : 'Gauge'"
    :aria-labelledby="labelCount ? labelId : undefined"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="value ?? undefined"
    :aria-valuetext="valueText"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative inline-flex w-fit flex-col items-center justify-center', props.class)"
    :data-max="max"
    :data-min="min"
    :data-percentage="percentage"
    :data-state="state"
    :data-value="value ?? undefined"
    role="meter"
  >
    <slot />
  </Primitive>
</template>
