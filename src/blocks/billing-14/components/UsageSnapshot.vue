<script setup lang="ts">
import { computed } from 'vue'
import { DatabaseIcon, UsersIcon, ZapIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const METERS = [
  { label: "API requests", icon: ZapIcon, used: 212_400, limit: 250_000, unit: "" },
  { label: "Storage", icon: DatabaseIcon, used: 41.6, limit: 100, unit: " GB" },
  { label: "Seats", icon: UsersIcon, used: 8, limit: 10, unit: "" },
]

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })

const meters = computed(() =>
  METERS.map(m => ({
    ...m,
    percent: Math.round((m.used / m.limit) * 100),
    usedLabel: `${compact.format(m.used)}${m.unit}`,
    limitLabel: `${compact.format(m.limit)}${m.unit}`,
  })),
)

// Pemakaian harian 14 hari terakhir, dalam ribuan request.
const DAILY = [9, 12, 11, 14, 13, 8, 6, 15, 17, 16, 18, 14, 19, 21]
const peak = Math.max(...DAILY)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Usage this period</CardTitle>
      <CardDescription>Oct 1 – Oct 31, 2026 · resets in 16 days</CardDescription>
      <CardAction>
        <span class="text-muted-foreground text-sm">Est. overage <span class="text-foreground font-medium">$0.00</span></span>
      </CardAction>
    </CardHeader>
    <CardContent class="grid gap-6 md:grid-cols-[1fr_14rem]">
      <ul class="space-y-5">
        <li v-for="meter in meters" :key="meter.label" class="space-y-2">
          <div class="flex items-center justify-between gap-3 text-sm">
            <span class="flex items-center gap-2 font-medium">
              <component :is="meter.icon" class="text-muted-foreground size-4" />
              {{ meter.label }}
            </span>
            <span class="text-muted-foreground tabular-nums">
              <span class="text-foreground font-medium">{{ meter.usedLabel }}</span>
              / {{ meter.limitLabel }}
            </span>
          </div>
          <Progress
            :model-value="meter.percent"
            :aria-label="`${meter.label} usage`"
            :class="cn(meter.percent >= 85 && '[&>[data-slot=progress-indicator]]:bg-destructive bg-destructive/20')"
          />
        </li>
      </ul>

      <div class="bg-muted/40 flex flex-col rounded-lg border p-4">
        <p class="text-muted-foreground text-xs">Daily API requests</p>
        <p class="text-lg font-semibold tabular-nums">21k <span class="text-primary text-xs font-medium">+12%</span></p>
        <div class="mt-auto flex h-20 items-end gap-1 pt-3" role="img" aria-label="Daily API requests over the last 14 days">
          <span
            v-for="(value, index) in DAILY"
            :key="index"
            :class="cn('flex-1 rounded-sm', index === DAILY.length - 1 ? 'bg-primary' : 'bg-primary/30')"
            :style="{ height: `${(value / peak) * 100}%` }"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
