<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/** Button that leaves the tour. */
const props = withDefaults(defineProps<{
  /** Button text when the slot is empty (default `Skip`). */
  label?: string
  class?: HTMLAttributes['class']
}>(), {
  label: 'Skip',
})

const { skip } = injectTourContext('TourSkip')
</script>

<template>
  <Button
    :class="cn('text-muted-foreground', props.class)"
    data-slot="tour-skip"
    size="sm"
    variant="ghost"
    @click="skip"
  >
    <slot>{{ props.label }}</slot>
  </Button>
</template>
