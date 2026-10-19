<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import TimePickerColumn from './TimePickerColumn.vue'

/** The second column; shorthand for `<TimePickerColumn unit="second">`. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <TimePickerColumn :class="props.class" unit="second">
    <slot />
  </TimePickerColumn>
</template>
