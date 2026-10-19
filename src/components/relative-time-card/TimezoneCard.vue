<script setup lang="ts">
import { computed } from 'vue'
import { getBrowserLocale } from './time'

/** A single time zone row inside the card. */
const props = defineProps<{
  /** The moment to format in this row's time zone. */
  date: Date
  /** An IANA zone name — `Asia/Jakarta`. Empty means this device's zone. */
  timezone?: string
}>()

const locale = getBrowserLocale()

const zoneName = computed(() =>
  props.timezone
  ?? new Intl.DateTimeFormat(locale, { timeZoneName: 'shortOffset' })
    .formatToParts(props.date)
    .find(part => part.type === 'timeZoneName')?.value)

const formattedDate = computed(() => new Intl.DateTimeFormat(locale, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: props.timezone,
}).format(props.date))

const formattedTime = computed(() => new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  timeZone: props.timezone,
}).format(props.date))

const iso = computed(() => props.date.toISOString())
</script>

<template>
  <div
    :aria-label="`Time in ${zoneName}: ${formattedDate} ${formattedTime}`"
    class="flex items-center justify-between gap-2 text-muted-foreground text-sm"
    role="region"
  >
    <span class="w-fit rounded bg-accent px-1 font-medium text-xs" data-allow-mismatch="text">{{ zoneName }}</span>
    <div class="flex items-center gap-2">
      <time data-allow-mismatch="text" :datetime="iso">{{ formattedDate }}</time>
      <time class="tabular-nums" data-allow-mismatch="text" :datetime="iso">{{ formattedTime }}</time>
    </div>
  </div>
</template>
