<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectCircularProgressContext } from './context'

/** The full circle behind the arc — the unfilled part. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectCircularProgressContext('CircularProgressTrack')
</script>

<template>
  <circle
    :class="cn('text-muted-foreground/20', props.class)"
    :cx="context.center"
    :cy="context.center"
    :data-state="context.state"
    fill="none"
    :r="context.radius"
    stroke="currentColor"
    stroke-linecap="round"
    :stroke-width="context.thickness"
    vector-effect="non-scaling-stroke"
  />
</template>
