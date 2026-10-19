<script setup lang="ts">
import { RelativeTimeCard } from '@/components/relative-time-card'

const HOUR = 60 * 60 * 1000

// Titik waktu tetap, bukan `Date.now()`. Render server dan render klien
// terjadi pada saat yang berbeda, jadi `Date.now()` menghasilkan dua tanggal
// yang berbeda untuk satu halaman yang sama.
const now = new Date('2026-08-19T09:00:00Z').getTime()
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <RelativeTimeCard :date="now - 3 * HOUR" :timezones="['UTC', 'Asia/Jakarta', 'America/New_York']" />
    <RelativeTimeCard :date="now - 40 * HOUR" variant="muted" />
    <RelativeTimeCard :date="now + 2 * HOUR" variant="ghost" />

    <p class="text-muted-foreground text-sm">
      Hover over one to see the exact time in several time zones.
    </p>
  </div>
</template>
