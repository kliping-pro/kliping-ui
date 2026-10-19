<!-- example: 1. With Step -->
<script setup lang="ts">
import { Time } from '@internationalized/date'
import { shallowRef } from 'vue'
import {
  TimePicker,
  TimePickerContent,
  TimePickerHour,
  TimePickerInput,
  TimePickerInputGroup,
  TimePickerLabel,
  TimePickerMinute,
  TimePickerTrigger,
} from '@/components/time-picker'
import { Popover } from '@/components/ui/popover'

// `shallowRef`, bukan `ref`: `UnwrapRef` merusak tipe kelas `Time`.
const time = shallowRef<Time | null>(new Time(10, 0))
</script>

<template>
  <TimePicker v-model="time" :minute-step="15" :second-step="10" class="w-[280px]">
    <TimePickerLabel>Meeting Time (15 min intervals)</TimePickerLabel>
    <Popover>
      <TimePickerInputGroup>
        <TimePickerInput part="hour" />
        <TimePickerInput part="literal" />
        <TimePickerInput part="minute" />
        <TimePickerTrigger />
      </TimePickerInputGroup>
      <TimePickerContent>
        <TimePickerHour />
        <TimePickerMinute />
      </TimePickerContent>
    </Popover>
  </TimePicker>
</template>
