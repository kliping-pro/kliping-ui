<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Clock } from '@lucide/vue'
import { PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectTimePickerContext } from './context'

/** The button that opens the time list. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectTimePickerContext('TimePickerTrigger')
</script>

<template>
  <PopoverTrigger as-child>
    <Button
      aria-label="Choose a time from the list"
      :class="cn('size-7 shrink-0', props.class)"
      data-slot="time-picker-trigger"
      :disabled="state.disabled || state.readonly"
      size="icon"
      type="button"
      variant="ghost"
    >
      <slot>
        <Clock class="size-4" />
      </slot>
    </Button>
  </PopoverTrigger>
</template>
