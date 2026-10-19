<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectAngleSliderContext } from './context'

/**
 * Lintasan lingkarannya.
 *
 * Lingkaran penuh digambar sebagai `<circle>`, bukan sebagai busur — busur
 * yang titik awal dan akhirnya berimpit tidak tergambar sama sekali di SVG.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, getPoint } = injectAngleSliderContext('AngleSliderTrack')

const isFullCircle = computed(() => state.value.totalAngle >= 359)

const path = computed(() => {
  const start = getPoint(state.value.startAngle)
  const end = getPoint(state.value.endAngle)
  const largeArc = state.value.totalAngle > 180 ? 1 : 0
  const r = state.value.radius
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
})
</script>

<template>
  <svg
    aria-hidden="true"
    :class="cn('absolute inset-0', props.class)"
    :data-disabled="state.disabled ? '' : undefined"
    data-slot="angle-slider-track"
    focusable="false"
    :height="state.center * 2"
    :width="state.center * 2"
  >
    <circle
      v-if="isFullCircle"
      class="stroke-muted"
      :cx="state.center"
      :cy="state.center"
      data-slot="angle-slider-track-rail"
      fill="none"
      :r="state.radius"
      stroke="currentColor"
      stroke-linecap="round"
      :stroke-width="state.thickness"
      vector-effect="non-scaling-stroke"
    />
    <path
      v-else
      class="stroke-muted"
      :d="path"
      data-slot="angle-slider-track-rail"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      :stroke-width="state.thickness"
      vector-effect="non-scaling-stroke"
    />
    <slot />
  </svg>
</template>
