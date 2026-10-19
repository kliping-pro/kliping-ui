<script lang="ts">
export const description = "Pratinjau prorata saat ganti paket: paket lama dan baru, kredit sisa periode, tagihan hari ini dibanding siklus berikutnya, dan linimasa periode."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRightIcon, InfoIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

interface Plan {
  id: string
  name: string
  price: number
  seats: number
}

const current: Plan = { id: 'pro', name: 'Pro', price: 24, seats: 5 }
const targets: Plan[] = [
  { id: 'starter', name: 'Starter', price: 12, seats: 2 },
  { id: 'business', name: 'Business', price: 49, seats: 20 },
  { id: 'scale', name: 'Scale', price: 99, seats: 50 },
]

// Periode tagihan contoh: 30 Okt – 30 Nov (31 hari), perubahan pada 12 Nov.
const period = { start: 'Oct 30', change: 'Nov 12', end: 'Nov 30', next: 'Dec 30' }
const TOTAL_DAYS = 31
const DAYS_USED = 13
const DAYS_LEFT = TOTAL_DAYS - DAYS_USED
const TAX = 0.11

const targetId = ref('business')
const target = computed(() => targets.find(t => t.id === targetId.value)!)

const round = (n: number) => Math.round(n * 100) / 100
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const credit = computed(() => round((current.price * DAYS_LEFT) / TOTAL_DAYS))
const charge = computed(() => round((target.value.price * DAYS_LEFT) / TOTAL_DAYS))
const net = computed(() => round(charge.value - credit.value))
const tax = computed(() => round(Math.max(0, net.value) * TAX))
const dueToday = computed(() => round(Math.max(0, net.value) + tax.value))
const carryCredit = computed(() => (net.value < 0 ? round(-net.value) : 0))
const nextCycle = computed(() => round(target.value.price * (1 + TAX) - carryCredit.value))
const isUpgrade = computed(() => target.value.price > current.price)

const usedPct = (DAYS_USED / TOTAL_DAYS) * 100

function onTarget(value: unknown) {
  if (typeof value === 'string' && value)
    targetId.value = value
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl p-4 sm:p-6">
    <Card class="gap-0 rounded-lg py-0">
      <CardHeader class="gap-4 border-b p-6">
        <div class="space-y-1.5">
          <CardTitle class="text-lg">
            Review plan change
          </CardTitle>
          <CardDescription>
            You only pay for the days left in this billing period.
          </CardDescription>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-muted-foreground text-sm">Switch to</span>
          <ToggleGroup
            :model-value="targetId"
            type="single"
            variant="outline"
            size="sm"
            @update:model-value="onTarget"
          >
            <ToggleGroupItem
              v-for="t in targets"
              :key="t.id"
              :value="t.id"
              class="data-[state=on]:bg-muted px-3"
            >
              {{ t.name }}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent class="space-y-6 p-6">
        <!-- Before / after -->
        <div class="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-4">
          <div class="rounded-lg border p-4">
            <p class="text-muted-foreground text-xs">
              Current
            </p>
            <p class="mt-1 font-medium">
              {{ current.name }}
            </p>
            <p class="text-muted-foreground text-sm tabular-nums">
              ${{ current.price }}/mo · {{ current.seats }} seats
            </p>
          </div>
          <div class="grid place-items-center">
            <div class="bg-muted grid size-8 place-items-center rounded-full">
              <ArrowRightIcon class="size-4" />
            </div>
          </div>
          <div class="border-primary bg-primary/5 rounded-lg border p-4">
            <div class="flex items-center justify-between gap-2">
              <p class="text-muted-foreground text-xs">
                New
              </p>
              <Badge :variant="isUpgrade ? 'default' : 'outline'" class="px-1.5 text-[10px] leading-4">
                {{ isUpgrade ? 'Upgrade' : 'Downgrade' }}
              </Badge>
            </div>
            <p class="mt-1 font-medium">
              {{ target.name }}
            </p>
            <p class="text-muted-foreground text-sm tabular-nums">
              ${{ target.price }}/mo · {{ target.seats }} seats
            </p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span class="font-medium">Billing period</span>
            <span class="text-muted-foreground tabular-nums">{{ DAYS_LEFT }} of {{ TOTAL_DAYS }} days left</span>
          </div>
          <div class="relative pt-6">
            <div class="flex h-2.5 w-full overflow-hidden rounded-full">
              <div class="bg-muted-foreground/30 h-full" :style="{ width: `${usedPct}%` }" />
              <div class="bg-primary h-full flex-1" />
            </div>
            <div
              class="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              :style="{ left: `${usedPct}%` }"
            >
              <span class="bg-foreground text-background rounded px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap">
                Today
              </span>
              <span class="bg-foreground h-4 w-px" />
            </div>
          </div>
          <div class="text-muted-foreground relative h-4 text-xs tabular-nums">
            <span class="absolute left-0">{{ period.start }}</span>
            <span class="absolute -translate-x-1/2" :style="{ left: `${usedPct}%` }">{{ period.change }}</span>
            <span class="absolute right-0">{{ period.end }}</span>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span class="text-muted-foreground inline-flex items-center gap-1.5">
              <span class="bg-muted-foreground/30 size-2 rounded-full" />
              {{ DAYS_USED }} days on {{ current.name }}
            </span>
            <span class="text-muted-foreground inline-flex items-center gap-1.5">
              <span class="bg-primary size-2 rounded-full" />
              {{ DAYS_LEFT }} days on {{ target.name }}
            </span>
          </div>
        </div>

        <!-- Breakdown -->
        <div class="space-y-2.5 rounded-lg border p-4 text-sm">
          <dl class="space-y-2.5">
            <div class="flex justify-between gap-4">
              <dt class="text-muted-foreground">
                {{ target.name }} · {{ DAYS_LEFT }} days remaining
              </dt>
              <dd class="tabular-nums">
                {{ usd.format(charge) }}
              </dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="text-muted-foreground">
                Credit for unused {{ current.name }} time
              </dt>
              <dd class="text-primary tabular-nums">
                −{{ usd.format(credit) }}
              </dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="text-muted-foreground">
                Tax (11%)
              </dt>
              <dd class="tabular-nums">
                {{ usd.format(tax) }}
              </dd>
            </div>
            <div class="flex justify-between gap-4 border-t pt-2.5 font-medium">
              <dt>Due today</dt>
              <dd class="tabular-nums">
                {{ usd.format(dueToday) }}
              </dd>
            </div>
          </dl>
          <p
            v-if="carryCredit > 0"
            class="text-muted-foreground flex items-start gap-1.5 text-xs"
          >
            <InfoIcon class="mt-px size-3.5 shrink-0" />
            {{ usd.format(carryCredit) }} of credit carries over to your next invoice.
          </p>
        </div>

        <!-- Today vs next cycle -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-primary text-primary-foreground rounded-lg p-4">
            <p class="text-xs opacity-95">
              Amount due today
            </p>
            <p class="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
              {{ usd.format(dueToday) }}
            </p>
            <p class="text-xs opacity-95">
              {{ period.change }}
            </p>
          </div>
          <div class="bg-muted/50 rounded-lg border p-4">
            <p class="text-muted-foreground text-xs">
              Next cycle
            </p>
            <p class="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
              {{ usd.format(nextCycle) }}
            </p>
            <p class="text-muted-foreground text-xs">
              {{ period.end }} – {{ period.next }}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter :class="cn('flex flex-col-reverse items-stretch gap-2 border-t p-6 sm:flex-row sm:justify-end')">
        <Button variant="outline">
          Back
        </Button>
        <Button>
          {{ dueToday > 0 ? `Pay ${usd.format(dueToday)} and switch` : `Switch to ${target.name}` }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
