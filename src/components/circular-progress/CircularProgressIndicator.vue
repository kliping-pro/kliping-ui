<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectCircularProgressContext } from './context'

/**
 * Kanvas SVG tempat lingkaran latar dan busurnya digambar.
 *
 * Diputar -90° supaya busurnya mulai dari atas. Tanpa itu ia mulai dari kanan,
 * karena nol derajat pada koordinat SVG menunjuk ke kanan.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectCircularProgressContext('CircularProgressIndicator')
</script>

<template>
  <svg
    aria-hidden="true"
    :class="cn('-rotate-90 transform', props.class)"
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
