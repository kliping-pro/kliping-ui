<!-- example: 7. With Form -->
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
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

// `shallowRef`, bukan `ref`: `UnwrapRef` merusak tipe kelas `Time`.
const time = shallowRef<Time | null>(new Time(9, 0))
const error = ref('')
const result = ref('')

function submit() {
  error.value = time.value ? '' : 'Please select an appointment time.'
  result.value = time.value ? `Appointment scheduled for: ${time.value.toString().slice(0, 5)}` : ''
}
</script>

<template>
  <form class="flex w-[280px] flex-col gap-4" novalidate @submit.prevent="submit">
    <div class="flex flex-col gap-2">
      <TimePicker v-model="time" :hour-cycle="12" name="appointmentTime" required>
        <TimePickerLabel>Appointment time</TimePickerLabel>
        <Popover>
          <TimePickerInputGroup :aria-invalid="!!error || undefined">
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
      <p class="text-muted-foreground text-sm">
        Select your preferred appointment time.
      </p>
      <p v-if="error" class="text-destructive text-sm" role="alert">
        {{ error }}
      </p>
    </div>
    <Button type="submit">
      Schedule appointment
    </Button>
    <p v-if="result" class="text-sm" aria-live="polite">
      {{ result }}
    </p>
  </form>
</template>
