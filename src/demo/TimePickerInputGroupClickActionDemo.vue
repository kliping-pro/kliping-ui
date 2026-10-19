<!-- example: 5. Input Group Click Action -->
<script setup lang="ts">
import { Time } from '@internationalized/date'
import { ref, shallowRef } from 'vue'
import {
  TimePicker,
  TimePickerContent,
  TimePickerHour,
  TimePickerInput,
  TimePickerInputGroup,
  TimePickerLabel,
  TimePickerMinute,
  TimePickerPeriod,
  TimePickerTrigger,
} from '@/components/time-picker'
import { Popover } from '@/components/ui/popover'

// `shallowRef`, bukan `ref`: `UnwrapRef` merusak tipe kelas `Time`.
const first = shallowRef<Time | null>(null)
const second = shallowRef<Time | null>(null)
const open = ref(false)

// Klik di ruang kosong kotaknya (bukan di ruas atau tombol): yang pertama
// memfokus ruas jam, yang kedua membuka panel.
function focusFirstSegment(event: MouseEvent) {
  const group = event.currentTarget as HTMLElement
  group.querySelector<HTMLElement>('[data-slot="time-picker-input"][tabindex]')?.focus()
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <TimePicker v-model="first" :hour-cycle="12" class="w-[280px]">
      <TimePickerLabel>Click empty space to focus</TimePickerLabel>
      <Popover>
        <TimePickerInputGroup @click.self="focusFirstSegment">
          <TimePickerInput part="hour" />
          <TimePickerInput part="literal" />
          <TimePickerInput part="minute" />
          <TimePickerInput part="dayPeriod" class="ml-1" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
          <TimePickerPeriod />
        </TimePickerContent>
      </Popover>
    </TimePicker>

    <TimePicker v-model="second" :hour-cycle="12" class="w-[280px]">
      <TimePickerLabel>Click empty space to open popover</TimePickerLabel>
      <Popover v-model:open="open">
        <TimePickerInputGroup @click.self="open = true">
          <TimePickerInput part="hour" />
          <TimePickerInput part="literal" />
          <TimePickerInput part="minute" />
          <TimePickerInput part="dayPeriod" class="ml-1" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
          <TimePickerPeriod />
        </TimePickerContent>
      </Popover>
    </TimePicker>
  </div>
</template>
