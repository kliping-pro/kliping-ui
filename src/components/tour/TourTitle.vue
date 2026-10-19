<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/** The step title; defaults to the active step when the slot is empty. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectTourContext('TourTitle')
</script>

<template>
  <h3
    :class="cn('font-semibold text-base leading-none tracking-tight', props.class)"
    data-slot="tour-title"
  >
    <slot>{{ state.current?.title }}</slot>
  </h3>
</template>
