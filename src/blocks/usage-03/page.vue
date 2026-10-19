<script lang="ts">
export const description = "Kalkulator harga berbasis pemakaian dengan slider volume, rincian biaya per tingkat, dan estimasi bulanan langsung."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ActivityIcon, DatabaseIcon, InfoIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'

interface Tier {
  from: number
  to: number | null
  price: number
}

// Harga per unit: per juta request dan per GB penyimpanan.
const requestTiers: Tier[] = [
  { from: 0, to: 1, price: 0 },
  { from: 1, to: 10, price: 1.5 },
  { from: 10, to: 50, price: 1 },
  { from: 50, to: null, price: 0.6 },
]
const storageTiers: Tier[] = [
  { from: 0, to: 50, price: 0 },
  { from: 50, to: 500, price: 0.1 },
  { from: 500, to: null, price: 0.06 },
]
const platformFee = 20

const requests = ref([18])
const storage = ref([240])

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
const num = new Intl.NumberFormat('en-US')

function breakdown(tiers: Tier[], volume: number) {
  return tiers.map((t) => {
    const top = t.to ?? Number.POSITIVE_INFINITY
    const units = Math.max(0, Math.min(volume, top) - t.from)
    return { ...t, units, cost: units * t.price, active: units > 0 }
  })
}

const requestRows = computed(() => breakdown(requestTiers, requests.value[0] ?? 0))
const storageRows = computed(() => breakdown(storageTiers, storage.value[0] ?? 0))
const requestCost = computed(() => requestRows.value.reduce((s, r) => s + r.cost, 0))
const storageCost = computed(() => storageRows.value.reduce((s, r) => s + r.cost, 0))
const total = computed(() => platformFee + requestCost.value + storageCost.value)

const tierLabel = (t: Tier, unit: string) =>
  t.to === null ? `${num.format(t.from)}+ ${unit}` : `${num.format(t.from)} – ${num.format(t.to)} ${unit}`
const priceLabel = (t: Tier, unit: string) => (t.price === 0 ? 'Included' : `${usd.format(t.price)} / ${unit}`)
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="mb-8 max-w-2xl">
      <Badge variant="secondary">Pay as you grow</Badge>
      <h2 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Estimate your monthly bill</h2>
      <p class="text-muted-foreground mt-2 text-sm sm:text-base">
        Usage is billed in graduated tiers — each unit is priced by the tier it falls into, so the
        more you use, the less you pay per unit.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardContent class="space-y-10">
          <section class="space-y-5">
            <div class="flex items-center justify-between gap-4">
              <Label class="flex items-center gap-2 text-sm font-medium">
                <ActivityIcon class="text-muted-foreground size-4" /> API requests
              </Label>
              <span class="text-lg font-semibold tabular-nums">{{ num.format(requests[0] ?? 0) }}M <span class="text-muted-foreground text-sm font-normal">/ mo</span></span>
            </div>
            <Slider v-model="requests" :min="0" :max="100" :step="1" aria-label="API requests per month" />
            <div class="text-muted-foreground flex justify-between text-xs tabular-nums">
              <span>0</span><span>25M</span><span>50M</span><span>75M</span><span>100M</span>
            </div>
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div
                v-for="row in requestRows"
                :key="row.from"
                class="rounded-lg border px-3 py-2.5 transition-colors"
                :class="row.active ? 'border-primary/40 bg-primary/5' : 'text-muted-foreground'"
              >
                <p class="text-muted-foreground text-xs">{{ tierLabel(row, 'M') }}</p>
                <p class="mt-1 text-sm font-medium">{{ priceLabel(row, 'M') }}</p>
                <p class="mt-1 text-xs tabular-nums">{{ usd.format(row.cost) }}</p>
              </div>
            </div>
          </section>

          <Separator />

          <section class="space-y-5">
            <div class="flex items-center justify-between gap-4">
              <Label class="flex items-center gap-2 text-sm font-medium">
                <DatabaseIcon class="text-muted-foreground size-4" /> Storage
              </Label>
              <span class="text-lg font-semibold tabular-nums">{{ num.format(storage[0] ?? 0) }} GB</span>
            </div>
            <Slider v-model="storage" :min="0" :max="2000" :step="10" aria-label="Storage in gigabytes" />
            <div class="text-muted-foreground flex justify-between text-xs tabular-nums">
              <span>0</span><span>500</span><span>1,000</span><span>1,500</span><span>2,000</span>
            </div>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div
                v-for="row in storageRows"
                :key="row.from"
                class="rounded-lg border px-3 py-2.5 transition-colors"
                :class="row.active ? 'border-primary/40 bg-primary/5' : 'text-muted-foreground'"
              >
                <p class="text-muted-foreground text-xs">{{ tierLabel(row, 'GB') }}</p>
                <p class="mt-1 text-sm font-medium">{{ priceLabel(row, 'GB') }}</p>
                <p class="mt-1 text-xs tabular-nums">{{ usd.format(row.cost) }}</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      <Card class="lg:sticky lg:top-6 lg:self-start">
        <CardHeader>
          <CardDescription>Estimated monthly cost</CardDescription>
          <CardTitle class="text-4xl font-semibold tabular-nums">{{ usd.format(total) }}</CardTitle>
          <p class="text-muted-foreground text-xs tabular-nums">≈ {{ usd.format(total * 12) }} per year</p>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Platform fee</span>
            <span class="tabular-nums">{{ usd.format(platformFee) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">API requests</span>
            <span class="tabular-nums">{{ usd.format(requestCost) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Storage</span>
            <span class="tabular-nums">{{ usd.format(storageCost) }}</span>
          </div>
          <Separator />
          <div class="flex justify-between font-medium">
            <span>Total</span>
            <span class="tabular-nums">{{ usd.format(total) }}</span>
          </div>
          <Button class="mt-3 w-full">Start with this plan</Button>
          <p class="text-muted-foreground flex items-start gap-2 pt-1 text-xs">
            <InfoIcon class="mt-0.5 size-3.5 shrink-0" />
            Estimates exclude taxes. You're only charged for what you actually use.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
