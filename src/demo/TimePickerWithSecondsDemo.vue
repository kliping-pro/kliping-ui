<!-- example: 2. With Seconds -->
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
  TimePickerSecond,
  TimePickerTrigger,
} from '@/components/time-picker'
import { Popover } from '@/components/ui/popover'

// `shallowRef`, bukan `ref`: `UnwrapRef` merusak tipe kelas `Time`.
const time = shallowRef<Time | null>(new Time(14, 30, 45))
</script>

<template>
  <TimePicker v-model="time" granularity="second" class="w-[280px]">
    <TimePickerLabel>Select Time with Seconds</TimePickerLabel>
    <Popover>
      <TimePickerInputGroup>
        <TimePickerInput part="hour" />
        <TimePickerInput part="literal" />
        <TimePickerInput part="minute" />
        <TimePickerInput part="literal" />
        <TimePickerInput part="second" />
        <TimePickerTrigger />
      </TimePickerInputGroup>
      <TimePickerContent>
        <TimePickerHour />
        <TimePickerMinute />
        <TimePickerSecond />
      </TimePickerContent>
    </Popover>
  </TimePicker>
</template>
