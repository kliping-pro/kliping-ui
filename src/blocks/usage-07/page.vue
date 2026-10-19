<script lang="ts">
export const description = "Saldo kredit prabayar dengan pilihan nominal top-up, isi ulang otomatis, dan riwayat transaksi kredit terbaru."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CoinsIcon,
  RefreshCwIcon,
  SparklesIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const balance = 18_420
const monthlyGrant = 50_000
const dailyBurn = 1_150

const packs = [
  { amount: 10, credits: 10_000, bonus: 0 },
  { amount: 25, credits: 25_000, bonus: 1_250 },
  { amount: 50, credits: 50_000, bonus: 5_000 },
  { amount: 100, credits: 100_000, bonus: 15_000 },
]

const selected = ref('50')
const autoRecharge = ref(true)
const threshold = ref('5000')

const pack = computed(() => packs.find(p => String(p.amount) === selected.value))

const transactions = [
  { id: 1, label: 'Image generation', meta: 'Workspace · Marketing', date: 'Oct 15, 09:42', amount: -2_340 },
  { id: 2, label: 'Auto-recharge', meta: 'Visa ending 4242', date: 'Oct 13, 18:05', amount: 25_000 },
  { id: 3, label: 'Transcription API', meta: '412 minutes', date: 'Oct 13, 11:20', amount: -4_120 },
  { id: 4, label: 'Bonus credits', meta: 'Referral · Ana Ruiz', date: 'Oct 10, 14:00', amount: 2_500 },
  { id: 5, label: 'Chat completions', meta: '1.2M tokens', date: 'Oct 9, 08:31', amount: -6_010 },
]

const num = new Intl.NumberFormat('en-US')
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const runway = Math.floor(balance / dailyBurn)
const balancePct = Math.round((balance / monthlyGrant) * 100)

function onSelect(value: unknown) {
  // Satu nominal harus selalu terpilih; klik ulang pada item aktif diabaikan.
  if (typeof value === 'string' && value) selected.value = value
}
</script>

<template>
  <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 lg:grid-cols-[1.1fr_1fr]">
    <div class="space-y-6">
      <!-- Saldo -->
      <Card class="from-primary/10 bg-gradient-to-br to-transparent">
        <CardHeader>
          <CardDescription class="flex items-center gap-2">
            <CoinsIcon class="size-4" /> Credit balance
          </CardDescription>
          <CardTitle class="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
            {{ num.format(balance) }}
            <span class="text-muted-foreground text-base font-normal">credits</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <Progress :model-value="balancePct" aria-label="Balance compared to monthly grant" />
          <div class="text-muted-foreground flex flex-wrap justify-between gap-2 text-xs">
            <span>{{ balancePct }}% of your {{ num.format(monthlyGrant) }} monthly grant</span>
            <span>≈ {{ runway }} days at {{ num.format(dailyBurn) }} / day</span>
          </div>
        </CardContent>
      </Card>

      <!-- Top-up -->
      <Card>
        <CardHeader>
          <CardTitle>Top up credits</CardTitle>
          <CardDescription>1,000 credits = $1. Larger packs include bonus credits.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-5">
          <ToggleGroup
            type="single"
            variant="outline"
            :spacing="2"
            :model-value="selected"
            class="grid w-full grid-cols-2 sm:grid-cols-4"
            aria-label="Top-up amount"
            @update:model-value="onSelect"
          >
            <ToggleGroupItem
              v-for="p in packs"
              :key="p.amount"
              :value="String(p.amount)"
              class="data-[state=on]:border-primary data-[state=on]:bg-primary/10 h-auto min-w-0 flex-col gap-0.5 rounded-lg py-3"
            >
              <span class="text-base font-semibold">{{ usd.format(p.amount) }}</span>
              <span class="text-muted-foreground text-[11px] font-normal">
                {{ p.bonus ? `+${num.format(p.bonus)} bonus` : 'No bonus' }}
              </span>
            </ToggleGroupItem>
          </ToggleGroup>

          <div v-if="pack" class="bg-muted/50 flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm">
            <span class="text-muted-foreground">You'll receive</span>
            <span class="flex items-center gap-2 font-medium tabular-nums">
              {{ num.format(pack.credits + pack.bonus) }} credits
              <Badge v-if="pack.bonus" variant="secondary"><SparklesIcon /> +{{ Math.round((pack.bonus / pack.credits) * 100) }}%</Badge>
            </span>
          </div>

          <Button class="w-full">Buy {{ pack ? usd.format(pack.amount) : '' }} of credits</Button>

          <Separator />

          <div class="space-y-4">
            <div class="flex items-start justify-between gap-4">
              <div class="space-y-1">
                <Label for="auto-recharge" class="flex items-center gap-2">
                  <RefreshCwIcon class="text-muted-foreground size-4" /> Auto-recharge
                </Label>
                <p class="text-muted-foreground text-xs">
                  Automatically buy the selected pack when your balance runs low.
                </p>
              </div>
              <Switch id="auto-recharge" v-model="autoRecharge" />
            </div>
            <div
              v-if="autoRecharge"
              class="flex flex-col gap-2 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span class="text-sm">When balance falls below</span>
              <Select v-model="threshold">
                <SelectTrigger class="w-full sm:w-40" aria-label="Recharge threshold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1,000 credits</SelectItem>
                  <SelectItem value="5000">5,000 credits</SelectItem>
                  <SelectItem value="10000">10,000 credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Riwayat -->
    <Card class="lg:self-start">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Credits added and spent in the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="divide-y">
          <li v-for="t in transactions" :key="t.id" class="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div
              class="grid size-9 shrink-0 place-items-center rounded-lg"
              :class="t.amount > 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'"
            >
              <ArrowDownLeftIcon v-if="t.amount > 0" class="size-4" />
              <ArrowUpRightIcon v-else class="size-4" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ t.label }}</p>
              <p class="text-muted-foreground truncate text-xs">{{ t.meta }} · {{ t.date }}</p>
            </div>
            <span
              class="shrink-0 text-sm font-medium tabular-nums"
              :class="t.amount > 0 ? 'text-primary' : ''"
            >
              {{ t.amount > 0 ? '+' : '−' }}{{ num.format(Math.abs(t.amount)) }}
            </span>
          </li>
        </ul>
        <Button variant="ghost" size="sm" class="mt-4 w-full">View all transactions</Button>
      </CardContent>
    </Card>
  </div>
</template>
