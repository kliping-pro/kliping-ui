<script lang="ts">
export const description = "Rincian tagihan mendatang berisi item biaya, pajak, kredit, total, tanggal jatuh tempo, dan linimasa siklus tagihan."
</script>

<script setup lang="ts">
import { CalendarClockIcon, CreditCardIcon, GiftIcon, ReceiptTextIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const items = [
  { name: 'Pro plan', detail: 'Monthly subscription', amount: 49 },
  { name: 'Additional seats', detail: '4 seats × $12.00', amount: 48 },
  { name: 'API requests overage', detail: '2.4M requests × $1.50 / M', amount: 3.6 },
  { name: 'Storage overage', detail: '38 GB × $0.10 / GB', amount: 3.8 },
  { name: 'Dedicated IP', detail: 'Add-on · prorated from Oct 12', amount: 12.9 },
]

const credits = [
  { name: 'Referral credit', amount: 20 },
  { name: 'Service credit · Oct 4 incident', amount: 5.5 },
]

const taxRate = 0.085

const subtotal = items.reduce((s, i) => s + i.amount, 0)
const creditTotal = credits.reduce((s, c) => s + c.amount, 0)
const taxable = Math.max(0, subtotal - creditTotal)
const tax = Math.round(taxable * taxRate * 100) / 100
const total = taxable + tax

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const timeline = [
  { label: 'Cycle start', date: 'Oct 1', done: true, short: 'Start' },
  { label: 'Today', date: 'Oct 15', done: true, current: true },
  { label: 'Invoice', date: 'Oct 31', done: false },
  { label: 'Due date', date: 'Nov 3', done: false },
]
// Empat titik berjarak sama; garis terisi sampai titik "Today".
const position = (i: number) => (i / (timeline.length - 1)) * 100
const progress = position(timeline.findIndex(s => s.current))
</script>

<template>
  <div class="mx-auto max-w-2xl p-6">
    <Card>
      <CardHeader>
        <div class="flex flex-wrap items-center gap-2">
          <CardTitle class="text-lg">Upcoming charges</CardTitle>
          <Badge variant="secondary">Draft invoice</Badge>
        </div>
        <CardDescription>
          Estimated for Oct 1 – Oct 31, 2026. Usage charges update hourly.
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-8">
        <!-- Ringkasan total -->
        <div class="bg-muted/50 flex flex-col gap-4 rounded-lg p-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-muted-foreground text-sm">Amount due</p>
            <p class="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{{ usd.format(total) }}</p>
          </div>
          <div class="space-y-1 text-sm sm:text-right">
            <p class="flex items-center gap-2 sm:justify-end">
              <CalendarClockIcon class="text-muted-foreground size-4" />
              Due <span class="font-medium">Nov 3, 2026</span>
            </p>
            <p class="text-muted-foreground flex items-center gap-2 sm:justify-end">
              <CreditCardIcon class="size-4" /> Visa ending 4242
            </p>
          </div>
        </div>

        <!-- Linimasa -->
        <div>
          <div class="relative mx-2">
            <div class="bg-muted absolute inset-x-0 top-1.5 h-0.5 rounded-full" />
            <div class="bg-primary absolute left-0 top-1.5 h-0.5 rounded-full" :style="{ width: `${progress}%` }" />
            <ol class="relative h-14">
              <li
                v-for="(step, i) in timeline"
                :key="step.label"
                class="absolute top-0 flex flex-col whitespace-nowrap"
                :class="i === 0 ? 'items-start' : i === timeline.length - 1 ? '-translate-x-full items-end text-right' : '-translate-x-1/2 items-center text-center'"
                :style="{ left: `${position(i)}%` }"
              >
                <span
                  class="size-3.5 rounded-full border-2"
                  :class="step.current
                    ? 'border-primary bg-background ring-primary/20 ring-4'
                    : step.done ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-background'"
                />
                <span class="mt-3 text-xs font-medium" :class="step.current ? 'text-primary' : ''">
                  <template v-if="step.short"><span class="sm:hidden">{{ step.short }}</span><span class="hidden sm:inline">{{ step.label }}</span></template>
                  <template v-else>{{ step.label }}</template>
                </span>
                <span class="text-muted-foreground text-xs">{{ step.date }}</span>
              </li>
            </ol>
          </div>
        </div>

        <!-- Rincian -->
        <div class="space-y-3">
          <h3 class="flex items-center gap-2 text-sm font-medium">
            <ReceiptTextIcon class="text-muted-foreground size-4" /> Line items
          </h3>
          <ul class="space-y-3">
            <li v-for="item in items" :key="item.name" class="flex items-start justify-between gap-4 text-sm">
              <div class="min-w-0">
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-muted-foreground text-xs">{{ item.detail }}</p>
              </div>
              <span class="shrink-0 tabular-nums">{{ usd.format(item.amount) }}</span>
            </li>
          </ul>

          <Separator />

          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Subtotal</span>
            <span class="tabular-nums">{{ usd.format(subtotal) }}</span>
          </div>
          <div v-for="c in credits" :key="c.name" class="flex justify-between gap-4 text-sm">
            <span class="text-primary flex min-w-0 items-center gap-2">
              <GiftIcon class="size-3.5 shrink-0" /> <span class="truncate">{{ c.name }}</span>
            </span>
            <span class="text-primary shrink-0 tabular-nums">−{{ usd.format(c.amount) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Sales tax (8.5%)</span>
            <span class="tabular-nums">{{ usd.format(tax) }}</span>
          </div>

          <Separator />

          <div class="flex justify-between font-semibold">
            <span>Total due</span>
            <span class="tabular-nums">{{ usd.format(total) }}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter class="flex-col gap-2 border-t sm:flex-row sm:justify-end">
        <Button variant="outline" class="w-full sm:w-auto">Download preview</Button>
        <Button class="w-full sm:w-auto">Pay now</Button>
      </CardFooter>
    </Card>
  </div>
</template>
