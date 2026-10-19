<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  size?: number
  stroke?: number
  tone?: 'ok' | 'warning' | 'danger'
  label?: string
}>(), {
  size: 112,
  stroke: 10,
  tone: 'ok',
})

const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const clamped = computed(() => Math.max(0, Math.min(100, props.value)))
const dash = computed(() => `${(clamped.value / 100) * circumference.value} ${circumference.value}`)

const toneClass = computed(() => ({
  ok: 'text-primary',
  warning: 'text-warning',
  danger: 'text-destructive',
}[props.tone]))
</script>

<template>
  <div
    class="relative inline-grid shrink-0 place-items-center"
    :style="{ width: `${size}px`, height: `${size}px` }"
    role="meter"
    :aria-valuenow="clamped"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      class="-rotate-90"
      aria-hidden="true"
    >
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="currentColor"
        :stroke-width="stroke"
        :class="tone === 'ok' ? 'text-primary/15' : 'text-destructive/15'"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="currentColor"
        :stroke-width="stroke"
        stroke-linecap="round"
        :stroke-dasharray="dash"
        class="transition-[stroke-dasharray] duration-700 ease-out"
        :class="toneClass"
      />
    </svg>
    <div class="absolute inset-0 grid place-items-center text-center">
      <slot />
    </div>
  </div>
</template>
