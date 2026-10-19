<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** A label for the time picker. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Label :class="cn('font-medium text-sm leading-none', props.class)" data-slot="time-picker-label">
    <slot />
  </Label>
</template>
