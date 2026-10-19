<script lang="ts">
export const description = "Harga per kursi dengan slider jumlah anggota tim dan total yang dihitung langsung."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NumberFlow from '@number-flow/vue'
import { ArrowRight, Check, Minus, Plus, Users } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MIN_SEATS = 1
const MAX_SEATS = 200

/** The per-seat price drops once the team passes a given threshold. */
const bands = [
  { from: 1, to: 10, price: 14, label: '1–10 seats' },
  { from: 11, to: 50, price: 12, label: '11–50 seats' },
  { from: 51, to: MAX_SEATS, price: 9, label: '51+ seats' },
]

const included = [
  'Unlimited boards and docs',
  'Admin roles and permissions',
  'Shared team calendar',
  'Integrations with 80+ apps',
  'Priority chat support',
]

const seatsModel = ref([12])
const period = ref<'monthly' | 'yearly'>('yearly')

const seats = computed(() => seatsModel.value[0] ?? MIN_SEATS)
const band = computed(() => bands.find(b => seats.value >= b.from && seats.value <= b.to) ?? bands[0]!)
const perSeat = computed(() => period.value === 'yearly' ? band.value.price * 0.85 : band.value.price)
const monthlyTotal = computed(() => perSeat.value * seats.value)
const listTotal = computed(() => bands[0]!.price * seats.value)
const savings = computed(() => Math.max(0, listTotal.value - monthlyTotal.value))

function step(delta: number) {
  seatsModel.value = [Math.min(MAX_SEATS, Math.max(MIN_SEATS, seats.value + delta))]
}

const currency = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 } as const
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
      <div>
        <Badge variant="secondary" class="gap-1.5">
          <Users class="size-3.5" />
          Pay per seat
        </Badge>
        <h2 class="mt-4 font-semibold text-4xl tracking-tight sm:text-5xl">
          Only pay for the people who use it
        </h2>
        <p class="mt-4 max-w-xl text-lg text-muted-foreground">
          Drag to match your team size. The per-seat price drops automatically as your team grows.
        </p>

        <div class="mt-10 rounded-lg border bg-card p-5 sm:p-7">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="font-medium text-muted-foreground text-sm">Team size</p>
              <p class="mt-1 flex items-baseline gap-2">
                <NumberFlow class="font-semibold text-5xl tracking-tight tabular-nums" :value="seats" />
                <span class="text-muted-foreground">{{ seats === 1 ? 'seat' : 'seats' }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Remove a seat"
                :disabled="seats <= MIN_SEATS"
                @click="step(-1)"
              >
                <Minus class="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Add a seat"
                :disabled="seats >= MAX_SEATS"
                @click="step(1)"
              >
                <Plus class="size-4" />
              </Button>
            </div>
          </div>

          <Slider
            v-model="seatsModel"
            class="mt-8 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-track]]:h-2"
            :min="MIN_SEATS"
            :max="MAX_SEATS"
            :step="1"
            aria-label="Number of seats"
          />
          <div class="mt-3 flex justify-between text-muted-foreground text-xs tabular-nums">
            <span>{{ MIN_SEATS }}</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>{{ MAX_SEATS }}</span>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-2">
            <div
              v-for="b in bands"
              :key="b.label"
              :class="cn(
                'rounded-lg border px-3 py-3 text-center transition-colors duration-200',
                b === band ? 'border-primary bg-primary/5' : 'bg-muted/40',
              )"
            >
              <p :class="cn('font-semibold tabular-nums', b === band && 'text-primary')">${{ b.price }}</p>
              <p class="mt-0.5 text-[0.6875rem] text-muted-foreground sm:text-xs">{{ b.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="rounded-lg border bg-muted/40 p-2 lg:sticky lg:top-8">
        <div class="rounded-lg border bg-card p-6 shadow-sm sm:p-7">
          <div class="flex items-center justify-between gap-3">
            <h3 class="whitespace-nowrap font-semibold text-lg">Team plan</h3>
            <Tabs v-model="period">
              <TabsList>
                <TabsTrigger value="monthly" class="px-3 text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" class="px-3 text-xs">Yearly −15%</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div class="mt-6 flex items-baseline gap-1.5">
            <NumberFlow
              class="font-semibold text-5xl tracking-tight tabular-nums"
              :format="currency"
              locales="en-US"
              :value="monthlyTotal"
            />
            <span class="text-muted-foreground text-sm">/ month</span>
          </div>
          <p class="mt-1 text-muted-foreground text-sm tabular-nums">
            {{ seats }} × ${{ perSeat.toFixed(2).replace(/\.00$/, '') }} per seat
            <template v-if="period === 'yearly'">· billed yearly</template>
          </p>

          <div
            :class="cn(
              'mt-5 flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-opacity',
              savings > 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
            )"
          >
            <span>{{ savings > 0 ? 'You save' : 'Add seats to unlock volume pricing' }}</span>
            <NumberFlow
              v-if="savings > 0"
              class="font-semibold tabular-nums"
              :format="currency"
              locales="en-US"
              :value="savings"
              suffix=" / mo"
            />
          </div>

          <Button size="lg" class="mt-6 w-full">
            Get started with {{ seats }} {{ seats === 1 ? 'seat' : 'seats' }}
            <ArrowRight class="size-4" />
          </Button>

          <ul class="mt-7 space-y-3 border-t pt-6 text-sm">
            <li v-for="item in included" :key="item" class="flex items-center gap-3">
              <Check class="size-4 shrink-0 text-primary" />
              {{ item }}
            </li>
          </ul>
        </div>
        <p class="px-4 py-3 text-center text-muted-foreground text-xs">
          Add or remove seats anytime — changes are prorated.
        </p>
      </aside>
    </div>
  </section>
</template>
