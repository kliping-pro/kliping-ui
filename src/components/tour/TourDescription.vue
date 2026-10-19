<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/** The step description. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectTourContext('TourDescription')
</script>

<template>
  <p
    :class="cn('text-muted-foreground text-sm', props.class)"
    data-slot="tour-description"
  >
    <slot>{{ state.current?.description }}</slot>
  </p>
</template>
