<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CircularProgressState } from './context'
import { Primitive } from 'reka-ui'
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'
import { defaultGetValueText, isValidNumber, provideCircularProgressContext } from './context'

/**
 * Akar penunjuk kemajuan melingkar.
 *
 * Seluruh perhitungan geometrinya tinggal di sini dan dibagikan lewat context:
 * jari-jari, titik pusat, keliling, dan bagian yang sudah terisi. Bagian
 * lainnya — lingkaran latar, busur terisi, dan teksnya — cuma membacanya.
 * Itu yang membuat susunannya bisa diatur ulang pemakainya tanpa satu pun
 * angka dihitung dua kali.
 *
 * `value` yang `null` berarti tak tentu: busurnya berputar terus tanpa pernah
 * penuh. Itu keadaan yang berbeda dari nol, dan keduanya harus bisa dibedakan.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Current value, clamped to min and max; null shows the indeterminate spinner. */
  value?: number | null
  /** Lowest value of the range. */
  min?: number
  /** Highest value of the range; defaults to 100. */
  max?: number
  /** The side length of the drawing box, in pixels. */
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

const DEFAULT_MAX = 100

const labelId = useId()
const valueTextId = useId()

const min = computed(() => (isValidNumber(props.min) ? props.min : 0))

const max = computed(() => {
  const requested = isValidNumber(props.max) && props.max > 0 ? props.max : DEFAULT_MAX
  // `max` yang tidak lebih besar dari `min` membuat pembaginya nol, dan
  // seluruh persentasenya jadi `NaN` — yang tergambar sebagai busur kosong
  // tanpa satu pun keluhan.
  return requested <= min.value ? min.value + 1 : requested
})

const value = computed(() => {
  const v = props.value
  if (!isValidNumber(v)) return null
  return Math.min(max.value, Math.max(min.value, v))
})

const state = computed<CircularProgressState>(() => {
  if (value.value === null) return 'indeterminate'
  return value.value === max.value ? 'complete' : 'loading'
})

const valueText = computed(() =>
  value.value === null ? undefined : props.getValueText(value.value, min.value, max.value))

const radius = computed(() => Math.max(0, (props.size - props.thickness) / 2))
const fraction = computed(() =>
  value.value === null
    ? null
    : (max.value === min.value ? 1 : (value.value - min.value) / (max.value - min.value)))

const context = computed(() => ({
  value: value.value,
  valueText: valueText.value,
  max: max.value,
  min: min.value,
  state: state.value,
  radius: radius.value,
  thickness: props.thickness,
  size: props.size,
  center: props.size / 2,
  circumference: 2 * Math.PI * radius.value,
  percentage: fraction.value,
  valueTextId,
}))

provideCircularProgressContext(context)
</script>

<template>
  <Primitive
    :aria-describedby="valueText ? valueTextId : undefined"
    :aria-label="props.label ? undefined : 'Progress'"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="value ?? undefined"
    :aria-valuetext="valueText"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative inline-flex w-fit items-center justify-center', props.class)"
    :data-max="max"
    :data-min="min"
    :data-percentage="fraction"
    :data-state="state"
    :data-value="value ?? undefined"
    role="progressbar"
  >
    <slot />
    <div v-if="props.label" :id="labelId">
      {{ props.label }}
    </div>
  </Primitive>
</template>
