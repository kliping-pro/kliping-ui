<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

/** The separator between segments — usually a colon. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span :class="cn('text-muted-foreground', props.class)" data-slot="time-picker-separator">
    <slot>:</slot>
  </span>
</template>
