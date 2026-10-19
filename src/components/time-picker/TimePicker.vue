<script setup lang="ts">
import type { PrimitiveProps, TimeValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TimeUnit } from './context'
import { Time } from '@internationalized/date'
import { TimeFieldRoot } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { provideTimePickerContext } from './context'

/**
 * Pemilih waktu yang bisa diketik maupun dipilih dari daftar.
 *
 * Ditulis di atas `TimeFieldRoot` milik Reka UI, yang membawa bagian yang
 * paling melelahkan: pemisahan jam-menit-detik jadi ruas yang bisa dikemudikan
 * panah, format 12 atau 24 jam yang mengikuti lokal pembacanya, dan penjagaan
 * batas tiap ruas.
 *
 * Nilainya `Time` dari `@internationalized/date`, bukan `Date`. `Date` selalu
 * membawa tanggal dan zona waktu, dan keduanya tidak punya arti untuk sebuah
 * jam — "14:30" di zona mana pun tetap "14:30".
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** 12- or 24-hour clock for the field and hour column; follows the locale when omitted. */
  hourCycle?: 12 | 24
  /** Smallest unit shown in the field: 'hour', 'minute', or 'second'. */
  granularity?: 'hour' | 'minute' | 'second'
  /** The step of each unit in its option list. */
  hourStep?: number
  /** Interval between minutes in the minute column. */
  minuteStep?: number
  /** Interval between seconds in the second column. */
  secondStep?: number
  /** BCP 47 locale used to format the time segments, e.g. 'en-US'. */
  locale?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  name?: string
  id?: string
  class?: HTMLAttributes['class']
}>(), {
  granularity: 'minute',
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  disabled: false,
  readonly: false,
})

// `TimeValue` milik Reka UI, bukan `Time` saja: `TimeFieldRoot` juga menerima
// `CalendarDateTime` dan `ZonedDateTime`, dan menyempitkannya di sini membuat
// `v-model` pemakainya ditolak tanpa alasan yang terlihat.
const model = defineModel<TimeValue | null>({ default: null })

function setUnit(unit: TimeUnit, value: number) {
  const current = model.value ?? new Time(0, 0, 0)

  if (unit === 'period') {
    // Siang dan malam digeser dua belas jam, bukan disetel langsung — jam 0
    // dalam format 12 jam ditulis sebagai 12, dan menyetelnya apa adanya
    // akan melompat ke tengah hari.
    const isAm = current.hour < 12
    const hour = value === 0 ? (isAm ? current.hour : current.hour - 12) : (isAm ? current.hour + 12 : current.hour)
    model.value = current.set({ hour })
    return
  }

  model.value = current.set({ [unit]: value })
}

provideTimePickerContext({
  state: computed(() => ({
    value: model.value,
    hourCycle: props.hourCycle,
    granularity: props.granularity,
    step: { hour: props.hourStep, minute: props.minuteStep, second: props.secondStep },
    disabled: props.disabled,
    readonly: props.readonly,
  })),
  setUnit,
  clear: () => {
    model.value = null
  },
})
</script>

<template>
  <TimeFieldRoot
    v-slot="{ segments }"
    v-model="model"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative flex w-fit flex-col gap-2', props.class)"
    data-slot="time-picker"
    :disabled="props.disabled"
    :granularity="props.granularity"
    :hour-cycle="props.hourCycle"
    :id="props.id"
    :locale="props.locale"
    :name="props.name"
    :readonly="props.readonly"
    :required="props.required"
  >
    <slot :segments="segments" />
  </TimeFieldRoot>
</template>
