<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectGaugeContext } from './context'

/** The SVG canvas where the track and filled arcs are drawn. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectGaugeContext('GaugeIndicator')
</script>

<template>
  <svg
    aria-hidden="true"
    :class="cn('transform', props.class)"
    :data-max="context.max"
    :data-min="context.min"
    :data-percentage="context.percentage"
    :data-state="context.state"
    :data-value="context.value ?? undefined"
    focusable="false"
    :height="context.size"
    :viewBox="`0 0 ${context.size} ${context.size}`"
    :width="context.size"
  >
    <slot />
  </svg>
</template>
