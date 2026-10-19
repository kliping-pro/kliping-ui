<script lang="ts">
export const description = "Grid meteran pemakaian melingkar berbentuk cincin SVG dengan persentase, batas paket, dan pilihan siklus."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  BotIcon,
  CloudIcon,
  DatabaseIcon,
  MailIcon,
  ServerIcon,
  UsersIcon,
} from '@lucide/vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UsageRing from '@/blocks/usage-02/components/UsageRing.vue'

type Cycle = 'current' | 'previous'

const resources = [
  { key: 'compute', name: 'Compute hours', icon: ServerIcon, unit: 'hours', limit: 750, used: { current: 318, previous: 702 } },
  { key: 'storage', name: 'Storage', icon: DatabaseIcon, unit: 'GB', limit: 100, used: { current: 84, previous: 71 } },
  { key: 'bandwidth', name: 'Bandwidth', icon: CloudIcon, unit: 'GB', limit: 1000, used: { current: 1000, previous: 864 } },
  { key: 'seats', name: 'Seats', icon: UsersIcon, unit: 'seats', limit: 25, used: { current: 14, previous: 12 } },
  { key: 'ai', name: 'AI tokens', icon: BotIcon, unit: 'M tokens', limit: 20, used: { current: 6.4, previous: 18.9 } },
  { key: 'email', name: 'Emails sent', icon: MailIcon, unit: 'k emails', limit: 50, used: { current: 22.5, previous: 31 } },
] as const

const cycle = ref<Cycle>('current')
const cycleLabel = computed(() =>
  cycle.value === 'current' ? 'Oct 1 – Oct 31, 2026' : 'Sep 1 – Sep 30, 2026',
)

const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })
// Satuan berawalan "M"/"k" ditempel ke angka: "20M tokens", bukan "20 M tokens".
const withUnit = (value: number, unit: string) =>
  /^[Mk] /.test(unit) ? `${number.format(value)}${unit}` : `${number.format(value)} ${unit}`

const rows = computed(() =>
  resources.map((r) => {
    const used = r.used[cycle.value]
    const pct = Math.round((used / r.limit) * 100)
    const tone: 'ok' | 'warning' | 'danger' = pct >= 100 ? 'danger' : pct >= 80 ? 'warning' : 'ok'
    return { ...r, value: used, pct, tone, left: Math.max(0, r.limit - used) }
  }),
)
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-xl font-semibold tracking-tight">Resource usage</h2>
        <p class="text-muted-foreground mt-1 text-sm">
          Billing cycle {{ cycleLabel }}
        </p>
      </div>
      <Tabs v-model="cycle">
        <TabsList>
          <TabsTrigger value="current">Current cycle</TabsTrigger>
          <TabsTrigger value="previous">Last cycle</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="r in rows"
        :key="r.key"
        class="flex-row items-center gap-5 px-5 py-5"
      >
        <UsageRing :value="r.pct" :tone="r.tone" :size="96" :stroke="9" :label="`${r.name} usage`">
          <div>
            <p
              class="text-xl font-semibold tabular-nums"
              :class="r.tone === 'ok' ? '' : 'text-destructive'"
            >
              {{ r.pct }}%
            </p>
            <p class="text-muted-foreground text-[10px] tracking-wide uppercase">used</p>
          </div>
        </UsageRing>

        <div class="min-w-0 flex-1 space-y-2">
          <div class="flex items-center gap-2">
            <component :is="r.icon" class="text-muted-foreground size-4 shrink-0" />
            <p class="truncate text-sm font-medium">{{ r.name }}</p>
          </div>
          <p class="text-sm tabular-nums">
            <span class="font-semibold">{{ number.format(r.value) }}</span>
            <span class="text-muted-foreground"> / {{ withUnit(r.limit, r.unit) }}</span>
          </p>
          <p
            class="text-xs"
            :class="r.tone === 'ok' ? 'text-muted-foreground' : 'text-destructive'"
          >
            <template v-if="r.tone === 'danger'">Limit reached · overage billed</template>
            <template v-else-if="r.tone === 'warning'">
              Only {{ withUnit(r.left, r.unit) }} left
            </template>
            <template v-else>{{ withUnit(r.left, r.unit) }} remaining</template>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>
