<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { unrefElement } from '@vueuse/core'
import { Primitive, useDirection } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { EDGE_PADDING, provideAngleSliderContext } from './context'

/**
 * Penggeser sudut berbentuk lingkaran.
 *
 * Nilainya array, seperti Slider milik Radix dan Reka UI — satu gagang untuk
 * satu nilai, dua gagang untuk rentang. Bentuk itu dipertahankan supaya
 * berpindah antara penggeser lurus dan melingkar tidak menuntut mengubah
 * bentuk datanya.
 *
 * Sudut nol menunjuk ke kanan dan bertambah searah jarum jam — kesepakatan
 * bawaan koordinat SVG, dan di sini tidak digeser karena penggesernya memang
 * dipakai untuk sudut, bukan untuk kemajuan.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Value at the start of the arc. */
  min?: number
  /** Value at the end of the arc. */
  max?: number
  /** Increment that values snap to. */
  step?: number
  /** The track radius in pixels. */
  size?: number
  /** Stroke width of the track and range, in px. */
  thickness?: number
  /** The arc's starting angle. */
  startAngle?: number
  /** Angle in degrees where the arc ends; 0 points right and angles grow clockwise. */
  endAngle?: number
  dir?: 'ltr' | 'rtl'
  disabled?: boolean
  name?: string
  class?: HTMLAttributes['class']
}>(), {
  min: 0,
  max: 360,
  step: 1,
  size: 60,
  thickness: 8,
  startAngle: 0,
  endAngle: 360,
  disabled: false,
})

const model = defineModel<number[]>({ default: () => [0] })

const emit = defineEmits<{ valueCommit: [value: number[]] }>()

const direction = useDirection(computed(() => props.dir))

const rootRef = ref<HTMLElement>()

const center = computed(() => props.size + EDGE_PADDING)

const totalAngle = computed(() =>
  ((props.endAngle - props.startAngle + 360) % 360) || 360)

function getAngle(value: number) {
  const fraction = (value - props.min) / (props.max - props.min)
  return props.startAngle + fraction * totalAngle.value
}

function getPoint(degrees: number) {
  const radian = (degrees * Math.PI) / 180
  return {
    x: center.value + props.size * Math.cos(radian),
    y: center.value + props.size * Math.sin(radian),
  }
}

function snap(value: number) {
  const snapped = Math.round((value - props.min) / props.step) * props.step + props.min
  return Math.min(props.max, Math.max(props.min, Number(snapped.toFixed(6))))
}

function setValue(index: number, value: number) {
  if (props.disabled) return
  const next = [...model.value]
  next[index] = snap(value)
  model.value = next
}

/** Converts the pointer position into a value, via its angle from the center. */
function valueFromPointer(event: PointerEvent): number | null {
  const el = unrefElement(rootRef) as HTMLElement | undefined
  if (!el) return null

  const rect = el.getBoundingClientRect()
  const dx = event.clientX - (rect.left + rect.width / 2)
  const dy = event.clientY - (rect.top + rect.height / 2)

  let degrees = (Math.atan2(dy, dx) * 180) / Math.PI
  degrees = (degrees - props.startAngle + 360) % 360

  // Sudut di luar busurnya dijepit ke ujung terdekat, bukan dibiarkan
  // melompat ke seberang — gagang yang melompat saat tangan sedikit meleset
  // dari ujung busur terasa rusak.
  if (degrees > totalAngle.value) {
    const distanceToStart = 360 - degrees
    const distanceToEnd = degrees - totalAngle.value
    degrees = distanceToStart < distanceToEnd ? 0 : totalAngle.value
  }

  return props.min + (degrees / totalAngle.value) * (props.max - props.min)
}

let draggingIndex: number | null = null

/** Which thumb is closest to a value. */
function closestThumb(value: number) {
  let closest = 0
  let minDiff = Number.POSITIVE_INFINITY
  model.value.forEach((v, i) => {
    const diff = Math.abs(v - value)
    if (diff < minDiff) {
      minDiff = diff
      closest = i
    }
  })
  return closest
}

function onPointerDown(event: PointerEvent) {
  if (props.disabled) return

  const value = valueFromPointer(event)
  if (value === null) return

  draggingIndex = closestThumb(value)
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  setValue(draggingIndex, value)
}

function onPointerMove(event: PointerEvent) {
  if (draggingIndex === null) return
  const value = valueFromPointer(event)
  if (value !== null) setValue(draggingIndex, value)
}

function onPointerUp(event: PointerEvent) {
  if (draggingIndex === null) return
  ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
  draggingIndex = null
  emit('valueCommit', model.value)
}

provideAngleSliderContext({
  state: computed(() => ({
    values: model.value,
    min: props.min,
    max: props.max,
    step: props.step,
    size: props.size,
    thickness: props.thickness,
    startAngle: props.startAngle,
    endAngle: props.endAngle,
    disabled: props.disabled,
    dir: direction.value,
    center: center.value,
    radius: props.size,
    totalAngle: totalAngle.value,
  })),
  setValue,
  getAngle,
  getPoint,
})
</script>

<template>
  <Primitive
    ref="rootRef"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative touch-none select-none', props.disabled && 'opacity-50', props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    data-slot="angle-slider"
    :dir="direction"
    :style="{ width: `${props.size * 2 + EDGE_PADDING * 2}px`, height: `${props.size * 2 + EDGE_PADDING * 2}px` }"
    @pointercancel="onPointerUp"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </Primitive>
</template>
