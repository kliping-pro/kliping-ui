<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import TimePickerColumn from './TimePickerColumn.vue'

/** The period column; shorthand for `<TimePickerColumn unit="period">`. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TimePickerColumn :class="props.class" unit="period">
    <slot />
  </TimePickerColumn>
</template>
