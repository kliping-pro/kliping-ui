<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import TimePickerColumn from './TimePickerColumn.vue'

/** The hour column; shorthand for `<TimePickerColumn unit="hour">`. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TimePickerColumn :class="props.class" unit="hour">
    <slot />
  </TimePickerColumn>
</template>
