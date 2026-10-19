<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectTimePickerColumnContext, injectTimePickerContext } from './context'

/** A single number in its column. */
const props = defineProps<{
  /** Number this item sets for its column's unit; for the period column 0 is AM and 1 is PM. */
  value: number
  class?: HTMLAttributes['class']
}>()

const { state, setUnit } = injectTimePickerContext('TimePickerColumnItem')
const column = injectTimePickerColumnContext('TimePickerColumnItem')

const label = computed(() => {
  if (column.value.unit === 'period') return props.value === 0 ? 'AM' : 'PM'

  // Jam 0 dalam format 12 jam ditulis 12, bukan 0.
  if (column.value.unit === 'hour' && state.value.hourCycle === 12 && props.value === 0)
    return '12'

  return String(props.value).padStart(2, '0')
})

const isSelected = computed(() => {
  const time = state.value.value
  if (!time) return false

  if (column.value.unit === 'period') return (time.hour < 12 ? 0 : 1) === props.value
  if (column.value.unit === 'hour') {
    return state.value.hourCycle === 12 ? time.hour % 12 === props.value : time.hour === props.value
  }
  return time[column.value.unit] === props.value
})
</script>

<template>
  <button
    :aria-selected="isSelected"
    :class="cn(
      'shrink-0 rounded px-2 py-1 text-center text-sm tabular-nums transition-colors hover:bg-accent hover:text-accent-foreground data-[selected]:bg-primary data-[selected]:text-primary-foreground',
      props.class,
    )"
    :data-selected="isSelected ? '' : undefined"
    data-slot="time-picker-column-item"
    role="option"
    type="button"
    @click="setUnit(column.unit, props.value)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>
