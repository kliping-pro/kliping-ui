<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectTimePickerContext } from './context'

/** A button that clears the time. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, clear } = injectTimePickerContext('TimePickerClear')
</script>

<template>
  <Button
    v-if="state.value"
    aria-label="Clear time"
    :class="cn('size-7 shrink-0', props.class)"
    data-slot="time-picker-clear"
    :disabled="state.disabled || state.readonly"
    size="icon"
    type="button"
    variant="ghost"
    @click="clear"
  >
    <slot>
      <X class="size-4" />
    </slot>
  </Button>
</template>
