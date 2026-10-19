<!-- example: 2. With Variants -->
<script setup lang="ts">
import { Calendar, Clock } from '@lucide/vue'
import { RelativeTimeCard } from '@/components/relative-time-card'
import { Button } from '@/components/ui/button'

// Titik waktu tetap, bukan `Date.now()`: render server dan klien terjadi pada
// saat yang berbeda.
const now = new Date('2026-08-19T09:00:00Z')
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted-foreground">Style variants</span>
      <div class="flex items-center gap-4">
        <RelativeTimeCard :date="now" variant="default" />
        <RelativeTimeCard :date="now" variant="muted" />
        <RelativeTimeCard :date="now" variant="ghost" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted-foreground">Custom styling</span>
      <div class="flex items-center gap-4">
        <RelativeTimeCard :date="now" class="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" />
        <RelativeTimeCard :date="now" class="font-semibold text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" />
        <RelativeTimeCard :date="now" class="italic text-purple-700 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted-foreground">Hover card positions</span>
      <div class="flex items-center gap-4">
        <RelativeTimeCard :date="now" side="top" align="start" :side-offset="10">
          Top aligned
        </RelativeTimeCard>
        <RelativeTimeCard :date="now" side="right" align="center" :side-offset="10">
          Right aligned
        </RelativeTimeCard>
        <RelativeTimeCard :date="now" side="bottom" align="end" :side-offset="10">
          Bottom aligned
        </RelativeTimeCard>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted-foreground">Custom trigger</span>
      <div class="flex items-center gap-4">
        <RelativeTimeCard :date="now" as-child>
          <Button variant="outline" size="sm">
            <Clock />
            Time details
          </Button>
        </RelativeTimeCard>
        <RelativeTimeCard :date="now">
          <span class="flex items-center gap-2 text-primary">
            <Calendar class="size-4" />
            <span>View date</span>
          </span>
        </RelativeTimeCard>
      </div>
    </div>
  </div>
</template>
