<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/** The panel holding the time columns. */
const props = withDefaults(defineProps<{
  /** Alignment of the panel against its trigger: 'start', 'center', or 'end'. */
  align?: 'start' | 'center' | 'end'
  class?: HTMLAttributes['class']
}>(), {
  align: 'start',
})
</script>

<template>
  <PopoverContent
    :align="props.align"
    :class="cn('flex w-auto gap-1 p-2', props.class)"
    data-slot="time-picker-content"
  >
    <slot />
  </PopoverContent>
</template>
