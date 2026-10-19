<script setup lang="ts">
import { Time } from '@internationalized/date'
import { shallowRef } from 'vue'
import {
  TimePicker,
  TimePickerClear,
  TimePickerContent,
  TimePickerHour,
  TimePickerInput,
  TimePickerInputGroup,
  TimePickerLabel,
  TimePickerMinute,
  TimePickerTrigger,
} from '@/components/time-picker'
import { Popover } from '@/components/ui/popover'

// `shallowRef`, bukan `ref`. `ref` menerapkan `UnwrapRef` pada isinya, dan
// itu memetakan properti kelas satu per satu — medan privat `Time` hilang di
// jalan, dan tipenya tidak lagi cocok dengan `Time` yang asli.
const time = shallowRef<Time | null>(new Time(9, 30))
</script>

<template>
  <div class="flex flex-col gap-4">
    <TimePicker v-model="time" :minute-step="5">
      <TimePickerLabel>Start time</TimePickerLabel>
      <Popover>
        <TimePickerInputGroup>
          <TimePickerInput part="hour" />
          <TimePickerInput part="literal" />
          <TimePickerInput part="minute" />
          <TimePickerClear class="ml-1" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
        </TimePickerContent>
      </Popover>
    </TimePicker>

    <p class="text-muted-foreground text-sm">
      Value: <code>{{ time ? time.toString() : '—' }}</code>
    </p>
  </div>
</template>
