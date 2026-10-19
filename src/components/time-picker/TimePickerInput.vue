<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TimeFieldInput } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Satu ruas jam — jam, menit, detik, atau penanda pagi/petang.
 *
 * `part="literal"` untuk pemisah seperti titik dua; ruas itu tidak bisa
 * difokus dan tidak menerima ketikan.
 */
const props = defineProps<{
  /** Segment type this input renders; 'literal' is a non-focusable separator such as a colon. */
  part: 'hour' | 'minute' | 'second' | 'dayPeriod' | 'literal' | 'timeZoneName'
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TimeFieldInput
    :class="cn(
      'rounded px-0.5 text-base tabular-nums outline-none focus:bg-accent focus:text-accent-foreground data-[placeholder]:text-muted-foreground md:text-sm',
      props.part === 'literal' && 'px-0 text-muted-foreground',
      props.class,
    )"
    data-slot="time-picker-input"
    :part="props.part"
  >
    <slot />
  </TimeFieldInput>
</template>
