<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectCircularProgressContext } from './context'

/**
 * Busur yang menandai bagian yang sudah terisi.
 *
 * Digambar sebagai lingkaran penuh yang garisnya dipotong: `stroke-dasharray`
 * disetel sepanjang kelilingnya, lalu `stroke-dashoffset` menggeser potongan
 * itu sejauh bagian yang belum terisi. Offset nol berarti penuh.
 *
 * Saat tak tentu, offsetnya dikunci di tiga perempat keliling — yang tersisa
 * seperempat lingkaran, dan itulah yang diputar animasinya.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectCircularProgressContext('CircularProgressRange')

const offset = computed(() => {
  const { state, circumference, percentage } = context.value
  if (state === 'indeterminate') return circumference * 0.75
  if (percentage === null) return circumference
  return circumference - percentage * circumference
})
</script>

<template>
  <circle
    :class="cn(
      'origin-center text-primary transition-all duration-300 ease-in-out',
      context.state === 'indeterminate' && 'motion-reduce:animate-none motion-safe:[animation:var(--animate-spin-around)]',
      props.class,
    )"
    :cx="context.center"
    :cy="context.center"
    :data-max="context.max"
    :data-min="context.min"
    :data-state="context.state"
    :data-value="context.value ?? undefined"
    fill="none"
    :r="context.radius"
    stroke="currentColor"
    :stroke-dasharray="context.circumference"
    :stroke-dashoffset="offset"
    stroke-linecap="round"
    :stroke-width="context.thickness"
    vector-effect="non-scaling-stroke"
  />
</template>
