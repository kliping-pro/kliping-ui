<!-- example: 4. Open on Focus -->
<script setup lang="ts">
import { Time } from '@internationalized/date'
import { ref, shallowRef, watch } from 'vue'
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
const time = shallowRef<Time | null>(null)
const open = ref(false)

// Membuka panel saat ruas jam difokus. Fokus yang kembali ke ruas sesudah
// panel ditutup tidak boleh langsung membukanya lagi.
let closedAt = 0
watch(open, (value) => {
  if (!value)
    closedAt = Date.now()
})

function onFocusIn() {
  if (Date.now() - closedAt > 300)
    open.value = true
}
</script>

<template>
  <TimePicker v-model="time" :hour-cycle="12" class="w-[280px]">
    <TimePickerLabel>Meeting Time</TimePickerLabel>
    <Popover v-model:open="open">
      <TimePickerInputGroup @focusin="onFocusIn">
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
</template>
