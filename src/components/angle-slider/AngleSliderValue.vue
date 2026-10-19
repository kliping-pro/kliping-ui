<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectAngleSliderContext } from './context'

/** The number shown in the middle of the circle. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectAngleSliderContext('AngleSliderValue')

const text = computed(() => state.value.values.map(v => Math.round(v)).join('–'))
</script>

<template>
  <div
    :class="cn(
      'pointer-events-none absolute inset-0 flex select-none items-center justify-center font-medium text-foreground text-sm',
      props.class,
    )"
    data-slot="angle-slider-value"
  >
    <slot :values="state.values">{{ text }}°</slot>
  </div>
</template>
