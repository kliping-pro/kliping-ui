<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TimeUnit } from './context'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectTimePickerContext, provideTimePickerColumnContext } from './context'
import TimePickerColumnItem from './TimePickerColumnItem.vue'

/**
 * Satu kolom angka — jam, menit, detik, atau pagi/petang.
 *
 * Isinya disusun sendiri dari `hourCycle` dan langkahnya, jadi kolom menit
 * berlangkah lima cukup ditulis `minute-step="5"` di akarnya alih-alih
 * dituliskan angkanya satu per satu.
 */
const props = defineProps<{
  /** Which part of the time this column lists: 'hour', 'minute', 'second', or 'period' (AM/PM). */
  unit: TimeUnit
  class?: HTMLAttributes['class']
}>()

const { state } = injectTimePickerContext('TimePickerColumn')

const values = computed(() => {
  if (props.unit === 'period') return [0, 1]

  const limit = props.unit === 'hour'
    ? (state.value.hourCycle === 12 ? 12 : 24)
    : 60

  const step = state.value.step[props.unit]
  const list: number[] = []
  for (let i = 0; i < limit; i += step) list.push(i)
  return list
})

provideTimePickerColumnContext(computed(() => ({ unit: props.unit })))
</script>

<template>
  <div
    :class="cn('flex max-h-56 w-14 flex-col gap-0.5 overflow-y-auto scroll-smooth', props.class)"
    data-slot="time-picker-column"
    :data-unit="props.unit"
    role="listbox"
  >
    <slot :values="values">
      <TimePickerColumnItem v-for="a in values" :key="a" :value="a" />
    </slot>
  </div>
</template>
