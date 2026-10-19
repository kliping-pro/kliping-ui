<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import TimePickerColumn from './TimePickerColumn.vue'

/** The minute column; shorthand for `<TimePickerColumn unit="minute">`. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TimePickerColumn :class="props.class" unit="minute">
    <slot />
  </TimePickerColumn>
</template>
