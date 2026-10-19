<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { getArcPath } from './arc'
import { injectGaugeContext } from './context'

/**
 * Busur yang menandai nilai saat ini.
 *
 * Jalurnya sama persis dengan path latarnya; yang berbeda cuma seberapa
 * panjang garisnya digambar. `stroke-dasharray` disetel sepanjang busur, lalu
 * `stroke-dashoffset` memotongnya sesuai bagian yang belum tercapai.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectGaugeContext('GaugeRange')

const path = computed(() => {
  const { center, radius, startAngle, endAngle } = context.value
  return getArcPath(center, center, radius, startAngle, endAngle)
})

const dashOffset = computed(() => {
  const { state, arcLength, percentage } = context.value
  if (state === 'indeterminate') return 0
  if (percentage === null) return arcLength
  return arcLength - percentage * arcLength
})
</script>

<template>
  <path
    :class="cn('text-primary transition-[stroke-dashoffset] duration-700 ease-out', props.class)"
    :d="path"
    :data-max="context.max"
    :data-min="context.min"
    :data-state="context.state"
    :data-value="context.value ?? undefined"
    fill="none"
    stroke="currentColor"
    :stroke-dasharray="context.arcLength"
    :stroke-dashoffset="dashOffset"
    stroke-linecap="round"
    :stroke-width="context.thickness"
    vector-effect="non-scaling-stroke"
  />
</template>
