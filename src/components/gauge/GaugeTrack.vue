<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { getArcPath } from './arc'
import { injectGaugeContext } from './context'

/** The full arc behind it — the available range. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectGaugeContext('GaugeTrack')

const path = computed(() => {
  const { center, radius, startAngle, endAngle } = context.value
  return getArcPath(center, center, radius, startAngle, endAngle)
})
</script>

<template>
  <path
    :class="cn('text-muted-foreground/20', props.class)"
    :d="path"
    :data-state="context.state"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    :stroke-width="context.thickness"
    vector-effect="non-scaling-stroke"
  />
</template>
