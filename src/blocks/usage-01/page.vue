<script lang="ts">
export const description = "Meteran pemakaian linear untuk beberapa sumber daya dengan status peringatan 80%, batas 100%, dan tanggal reset."
</script>

<script setup lang="ts">
import type { Component } from 'vue'
import {
  ActivityIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CloudIcon,
  DatabaseIcon,
  OctagonAlertIcon,
  RotateCcwIcon,
  UsersIcon,
  ZapIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

type Status = 'ok' | 'warning' | 'danger'

interface Meter {
  name: string
  hint: string
  icon: Component
  used: number
  limit: number
  unit: string
}

const meters: Meter[] = [
  { name: 'API requests', hint: 'Across all environments', icon: ActivityIcon, used: 412_800, limit: 1_000_000, unit: 'requests' },
  { name: 'Storage', hint: 'Files, images and backups', icon: DatabaseIcon, used: 43.6, limit: 50, unit: 'GB' },
  { name: 'Team seats', hint: 'Members with edit access', icon: UsersIcon, used: 10, limit: 10, unit: 'seats' },
  { name: 'Bandwidth', hint: 'Outbound data transfer', icon: CloudIcon, used: 182, limit: 500, unit: 'GB' },
  { name: 'Edge functions', hint: 'Invocations this cycle', icon: ZapIcon, used: 1_920_000, limit: 2_000_000, unit: 'runs' },
]

const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })

const format = (value: number) => (value >= 100_000 ? compact.format(value) : number.format(value))
const percent = (m: Meter) => Math.min(100, Math.round((m.used / m.limit) * 100))
const status = (m: Meter): Status => {
  const p = (m.used / m.limit) * 100
  if (p >= 100) return 'danger'
  if (p >= 80) return 'warning'
  return 'ok'
}

const barClass: Record<Status, string> = {
  ok: '',
  warning: '[&_[data-slot=progress-indicator]]:bg-warning bg-warning/20',
  danger: '[&_[data-slot=progress-indicator]]:bg-destructive bg-destructive/20',
}

const attention = meters.filter(m => status(m) !== 'ok').length
</script>

<template>
  <div class="mx-auto max-w-3xl p-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-lg">Usage this cycle</CardTitle>
        <CardDescription>
          Pro plan · Billing cycle Oct 1 – Oct 31, 2026
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Upgrade plan</Button>
        </CardAction>
      </CardHeader>

      <CardContent class="space-y-6">
        <div
          v-if="attention"
          class="bg-destructive/10 text-red-700 dark:text-destructive flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
        >
          <CircleAlertIcon class="mt-0.5 size-4 shrink-0" />
          <p>
            {{ attention }} resources are close to or over their limit. Requests beyond a hard
            limit are throttled until the cycle resets.
          </p>
        </div>

        <ul class="divide-y">
          <li
            v-for="m in meters"
            :key="m.name"
            class="space-y-3 py-4 first:pt-0 last:pb-0"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex min-w-0 items-center gap-3">
                <div class="bg-muted grid size-9 shrink-0 place-items-center rounded-lg">
                  <component :is="m.icon" class="text-muted-foreground size-4" />
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium">{{ m.name }}</p>
                  <p class="text-muted-foreground text-xs">{{ m.hint }}</p>
                </div>
              </div>
              <Badge
                v-if="status(m) === 'danger'"
                variant="destructive"
                class="shrink-0"
              >
                <OctagonAlertIcon /> Limit reached
              </Badge>
              <Badge
                v-else-if="status(m) === 'warning'"
                variant="outline"
                class="border-destructive/40 text-destructive shrink-0"
              >
                <CircleAlertIcon /> Near limit
              </Badge>
              <Badge v-else variant="secondary" class="shrink-0">
                <CircleCheckIcon class="text-primary" /> Healthy
              </Badge>
            </div>

            <Progress
              :model-value="percent(m)"
              :class="barClass[status(m)]"
              :aria-label="`${m.name} usage`"
            />

            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">
                <span class="text-foreground font-medium tabular-nums">{{ format(m.used) }}</span>
                of {{ format(m.limit) }} {{ m.unit }}
              </span>
              <span
                class="font-medium tabular-nums"
                :class="status(m) === 'ok' ? 'text-muted-foreground' : 'text-destructive'"
              >
                {{ percent(m) }}%
              </span>
            </div>
          </li>
        </ul>
      </CardContent>

      <CardFooter class="text-muted-foreground flex-col items-start gap-3 border-t text-xs sm:flex-row sm:items-center sm:justify-between">
        <span class="flex items-center gap-2">
          <RotateCcwIcon class="size-3.5" />
          <span>Usage resets on <span class="text-foreground font-medium">Nov 1, 2026</span> · in 17 days</span>
        </span>
        <span class="flex items-center gap-4">
          <span class="flex items-center gap-1.5"><span class="bg-primary size-2 rounded-full" /> Under 80%</span>
          <span class="flex items-center gap-1.5"><span class="bg-warning size-2 rounded-full" /> 80%+</span>
          <span class="flex items-center gap-1.5"><span class="bg-destructive size-2 rounded-full" /> 100%</span>
        </span>
      </CardFooter>
    </Card>
  </div>
</template>
