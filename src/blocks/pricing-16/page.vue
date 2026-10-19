<script lang="ts">
export const description = "Harga berjenjang sesuai volume pemakaian dengan tabel tingkat kecil dan isian perkiraan biaya."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NumberFlow from '@number-flow/vue'
import { Activity, Calculator } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

/** Price per 1,000 requests; each tier applies only to the volume within its range. */
const tiers = [
  { label: 'First 100k', from: 0, to: 100_000, rate: 0 },
  { label: '100k – 1M', from: 100_000, to: 1_000_000, rate: 0.5 },
  { label: '1M – 10M', from: 1_000_000, to: 10_000_000, rate: 0.35 },
  { label: '10M – 50M', from: 10_000_000, to: 50_000_000, rate: 0.2 },
  { label: '50M +', from: 50_000_000, to: Infinity, rate: 0.12 },
]

const presets = [
  { label: '250k', value: 250_000 },
  { label: '2M', value: 2_000_000 },
  { label: '15M', value: 15_000_000 },
  { label: '80M', value: 80_000_000 },
]

const volume = ref<number | string>(2_000_000)

const requests = computed(() => {
  const n = Number(volume.value)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
})

const breakdown = computed(() => tiers.map((tier) => {
  const used = Math.max(0, Math.min(requests.value, tier.to) - tier.from)
  return { ...tier, used, cost: (used / 1000) * tier.rate }
}))

const total = computed(() => breakdown.value.reduce((sum, t) => sum + t.cost, 0))
const effective = computed(() => requests.value ? (total.value / requests.value) * 1000 : 0)
const activeIndex = computed(() => {
  let i = breakdown.value.length - 1
  while (i > 0 && breakdown.value[i]!.used === 0) i--
  return i
})

const maxRate = Math.max(...tiers.map(t => t.rate))
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const usd = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 } as const
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p class="flex items-center gap-2 font-medium text-primary text-sm">
            <Activity class="size-4" />
            Usage-based pricing
          </p>
          <h2 class="mt-3 font-semibold text-4xl tracking-tight sm:text-5xl">
            The more you use, the less you pay
          </h2>
        </div>
        <p class="text-lg text-muted-foreground lg:pb-1">
          Billed per 1,000 API requests. Each tier applies only to the volume inside it, so your
          price per request keeps dropping as you scale.
        </p>
      </div>

      <div class="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div class="rounded-lg border bg-card p-5 sm:p-6">
          <!-- Tangga harga: tinggi batang mengikuti tarif tiap tingkat -->
          <div class="flex h-44 items-end gap-2 sm:h-52 sm:gap-3" aria-hidden="true">
            <div
              v-for="(tier, i) in tiers"
              :key="tier.label"
              class="flex flex-1 flex-col items-center justify-end gap-2"
            >
              <span class="font-medium text-muted-foreground text-xs tabular-nums">
                {{ tier.rate === 0 ? 'Free' : `$${tier.rate.toFixed(2)}` }}
              </span>
              <div
                :class="cn(
                  'w-full rounded-t-md transition-colors duration-300',
                  i <= activeIndex && requests > 0 ? 'bg-primary' : 'bg-muted',
                  i === activeIndex && requests > 0 && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-card',
                )"
                :style="{ height: `${Math.max(8, (tier.rate / maxRate) * 128)}px` }"
              />
            </div>
          </div>

          <Table class="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Monthly volume</TableHead>
                <TableHead class="text-right">Per 1k</TableHead>
                <TableHead class="hidden text-right sm:table-cell">Your usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(tier, i) in breakdown"
                :key="tier.label"
                :class="cn(i === activeIndex && requests > 0 && 'bg-primary/5 hover:bg-primary/10')"
              >
                <TableCell class="font-medium">
                  <span class="flex items-center gap-2">
                    <span
                      :class="cn(
                        'size-2 rounded-full',
                        tier.used > 0 ? 'bg-primary' : 'bg-muted-foreground/30',
                      )"
                    />
                    {{ tier.label }}
                  </span>
                </TableCell>
                <TableCell class="text-right tabular-nums">
                  {{ tier.rate === 0 ? 'Free' : `$${tier.rate.toFixed(2)}` }}
                </TableCell>
                <TableCell class="hidden text-right text-muted-foreground tabular-nums sm:table-cell">
                  {{ tier.used ? compact.format(tier.used) : '—' }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p class="mt-4 text-muted-foreground text-xs">
            Volume resets on the first day of each month. Failed requests are never billed.
          </p>
        </div>

        <div class="flex flex-col rounded-lg border bg-muted/50 p-5 sm:p-6">
          <div class="flex items-center gap-2">
            <Calculator class="size-4 text-muted-foreground" />
            <h3 class="font-semibold">Estimate your bill</h3>
          </div>

          <Label for="usage-volume" class="mt-6 text-muted-foreground text-sm font-normal">
            Requests per month
          </Label>
          <Input
            id="usage-volume"
            v-model="volume"
            type="number"
            inputmode="numeric"
            min="0"
            step="1000"
            class="mt-2 h-11 bg-background text-base tabular-nums"
          />
          <div class="mt-3 flex flex-wrap gap-2">
            <Button
              v-for="preset in presets"
              :key="preset.label"
              size="sm"
              :variant="requests === preset.value ? 'default' : 'outline'"
              class="h-7 rounded-full px-3 text-xs"
              @click="volume = preset.value"
            >
              {{ preset.label }}
            </Button>
          </div>

          <div class="mt-8 rounded-lg border bg-background p-5">
            <p class="text-muted-foreground text-sm">Estimated monthly cost</p>
            <NumberFlow
              class="mt-1 font-semibold text-5xl tracking-tight tabular-nums"
              :format="usd"
              locales="en-US"
              :value="total"
            />
            <dl class="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <dt class="text-muted-foreground">Requests</dt>
                <dd class="mt-0.5 font-medium tabular-nums">{{ compact.format(requests) }}</dd>
              </div>
              <div>
                <dt class="text-muted-foreground">Effective rate / 1k</dt>
                <dd class="mt-0.5 font-medium tabular-nums">${{ effective.toFixed(3) }}</dd>
              </div>
            </dl>
          </div>

          <div class="mt-auto pt-6">
            <Button size="lg" class="w-full">Get an API key</Button>
          </div>
          <p class="mt-3 text-center text-muted-foreground text-xs">
            No minimums. Billed at the end of each month.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
