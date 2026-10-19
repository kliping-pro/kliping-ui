<!-- example: 6. Controlled State -->
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
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

// `shallowRef`, bukan `ref`: `UnwrapRef` merusak tipe kelas `Time`.
const time = shallowRef<Time | null>(new Time(14, 30))
</script>

<template>
  <div class="flex flex-col gap-4">
    <TimePicker v-model="time" class="w-[280px]">
      <TimePickerLabel>Controlled Time Picker</TimePickerLabel>
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
    <div class="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" @click="time = new Time(9, 0)">
        Set 9:00 AM
      </Button>
      <Button size="sm" variant="outline" @click="time = new Time(14, 30)">
        Set 2:30 PM
      </Button>
      <Button size="sm" variant="outline" @click="time = null">
        Clear
      </Button>
    </div>
    <div class="text-muted-foreground text-sm">
      Selected time: <span class="font-mono font-semibold">{{ time ? time.toString().slice(0, 5) : 'None' }}</span>
    </div>
  </div>
</template>
