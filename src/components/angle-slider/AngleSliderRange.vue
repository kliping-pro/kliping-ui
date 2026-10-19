<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectAngleSliderContext } from './context'

/**
 * Busur yang menandai rentang terpilih.
 *
 * Dengan satu gagang, busurnya membentang dari `min` sampai nilainya. Dengan
 * dua gagang atau lebih, dari yang terkecil sampai yang terbesar.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, getAngle, getPoint } = injectAngleSliderContext('AngleSliderRange')

const range = computed(() => {
  const sorted = [...state.value.values].sort((a, b) => a - b)
  if (sorted.length <= 1) return { start: state.value.min, end: sorted[0] ?? state.value.min }
  return { start: sorted[0] as number, end: sorted[sorted.length - 1] as number }
})

const path = computed(() => {
  const start = getPoint(getAngle(range.value.start))
  const end = getPoint(getAngle(range.value.end))
  const sweep = (getAngle(range.value.end) - getAngle(range.value.start) + 360) % 360
  const r = state.value.radius
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${end.x} ${end.y}`
})

const isVisible = computed(() => range.value.start !== range.value.end)
</script>

<template>
  <path
    v-if="isVisible"
    :class="cn('stroke-primary', props.class)"
    :d="path"
    :data-disabled="state.disabled ? '' : undefined"
    data-slot="angle-slider-range"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    :stroke-width="state.thickness"
    vector-effect="non-scaling-stroke"
  />
</template>
