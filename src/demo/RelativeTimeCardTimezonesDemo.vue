<!-- example: 1. With Multiple Timezones -->
<script setup lang="ts">
import { RelativeTimeCard } from '@/components/relative-time-card'

// Titik waktu tetap, bukan `Date.now()`: render server dan klien terjadi pada
// saat yang berbeda.
const now = new Date('2026-08-19T09:00:00Z')
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <RelativeTimeCard
      :date="now"
      :timezones="['America/Los_Angeles', 'America/New_York', 'Europe/London', 'Asia/Singapore', 'Asia/Tokyo']"
    />
    <RelativeTimeCard
      :date="now"
      :timezones="['America/Chicago', 'Europe/Paris', 'Asia/Dubai', 'Australia/Sydney']"
    />
    <RelativeTimeCard :date="now" :timezones="['UTC']" />
  </div>
</template>
