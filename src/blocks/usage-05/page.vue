<script lang="ts">
export const description = "Tabel pemakaian terperinci per hari dan per proyek dengan pengelompokan yang bisa dilipat, baris total, pilihan periode, dan tombol ekspor CSV."
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CheckIcon, ChevronRightIcon, DownloadIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Entry {
  day: string
  project: string
  requests: number
  compute: number
  storage: number
  cost: number
}

const projects = ['Storefront', 'Mobile API', 'Analytics']

const periods = {
  'this-week': { label: 'Oct 9 – Oct 15, 2026', start: 9, month: 'Oct', seed: 3 },
  'last-week': { label: 'Oct 2 – Oct 8, 2026', start: 2, month: 'Oct', seed: 11 },
  'two-weeks': { label: 'Sep 25 – Oct 1, 2026', start: 25, month: 'Sep', seed: 23 },
} as const
type PeriodKey = keyof typeof periods

// Angka contoh yang deterministik supaya render server dan klien sama.
function wave(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function buildEntries(key: PeriodKey): Entry[] {
  const p = periods[key]
  const out: Entry[] = []
  // Hari terbaru di atas.
  for (let d = 6; d >= 0; d--) {
    const date = p.month === 'Sep' && p.start + d > 30 ? `Oct ${p.start + d - 30}` : `${p.month} ${p.start + d}`
    projects.forEach((project, i) => {
      const r = wave(p.seed + d * 7 + i * 3)
      const scale = [1, 2.4, 0.6][i] ?? 1
      const requests = Math.round((40_000 + r * 60_000) * scale)
      const compute = Math.round((6 + r * 10) * scale * 10) / 10
      const storage = Math.round((12 + i * 18 + d * 0.4) * 10) / 10
      const cost = requests * 0.0000015 + compute * 0.08 + storage * 0.003
      out.push({ day: date, project, requests, compute, storage, cost })
    })
  }
  return out
}

function groupEntries(items: Entry[], by: 'day' | 'project') {
  const map = new Map<string, Entry[]>()
  for (const e of items) {
    const key = by === 'day' ? e.day : e.project
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(e)
  }
  return [...map.entries()].map(([key, rows]) => ({
    key,
    items: rows,
    requests: rows.reduce((s, e) => s + e.requests, 0),
    compute: rows.reduce((s, e) => s + e.compute, 0),
    // Per hari: total yang tersimpan semua proyek. Per proyek: puncaknya.
    storage: by === 'day'
      ? rows.reduce((s, e) => s + e.storage, 0)
      : Math.max(...rows.map(e => e.storage)),
    cost: rows.reduce((s, e) => s + e.cost, 0),
  }))
}

const period = ref<PeriodKey>('this-week')
const groupBy = ref<'day' | 'project'>('day')
const open = ref<Set<string>>(new Set())
const exported = ref(false)

const entries = computed(() => buildEntries(period.value))
const groups = computed(() => groupEntries(entries.value, groupBy.value))

const totals = computed(() => {
  const days = groupEntries(entries.value, 'day')
  return {
    requests: days.reduce((s, g) => s + g.requests, 0),
    compute: days.reduce((s, g) => s + g.compute, 0),
    storage: Math.max(...days.map(g => g.storage)),
    cost: days.reduce((s, g) => s + g.cost, 0),
  }
})

// Hanya kelompok pertama yang terbuka setiap kali periode atau pengelompokan berganti.
watch([period, groupBy], () => {
  open.value = new Set(groups.value[0] ? [groups.value[0].key] : [])
}, { immediate: true })

function toggle(key: string) {
  const next = new Set(open.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  open.value = next
}

function onGroupChange(value: string | number) {
  groupBy.value = value === 'project' ? 'project' : 'day'
}

function exportCsv() {
  exported.value = true
  setTimeout(() => (exported.value = false), 2000)
}

const num = new Intl.NumberFormat('en-US')
const dec = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card>
      <CardHeader class="gap-4 sm:grid-cols-[1fr_auto]">
        <div class="space-y-1.5">
          <CardTitle>Usage breakdown</CardTitle>
          <CardDescription>{{ periods[period].label }} · {{ entries.length }} records</CardDescription>
        </div>
        <div class="flex items-center gap-2">
          <Select v-model="period">
            <SelectTrigger class="min-w-0 flex-1 sm:w-36 sm:flex-none" aria-label="Billing period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
              <SelectItem value="two-weeks">2 weeks ago</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" @click="exportCsv">
            <CheckIcon v-if="exported" class="text-primary" />
            <DownloadIcon v-else />
            {{ exported ? 'CSV ready' : 'Export CSV' }}
          </Button>
        </div>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="flex items-center justify-between gap-3">
          <span class="text-muted-foreground text-sm">Group by</span>
          <Tabs :model-value="groupBy" @update:model-value="onGroupChange">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="project">Project</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{{ groupBy === 'day' ? 'Date / project' : 'Project / date' }}</TableHead>
              <TableHead class="text-right">Requests</TableHead>
              <TableHead class="hidden text-right sm:table-cell">Compute (h)</TableHead>
              <TableHead class="hidden text-right md:table-cell">Storage (GB)</TableHead>
              <TableHead class="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-for="g in groups" :key="g.key">
              <TableRow class="bg-muted/40 hover:bg-muted/60 cursor-pointer" @click="toggle(g.key)">
                <TableCell class="font-medium">
                  <button
                    type="button"
                    class="flex items-center gap-2 text-left"
                    :aria-expanded="open.has(g.key)"
                    @click.stop="toggle(g.key)"
                  >
                    <ChevronRightIcon
                      class="text-muted-foreground size-4 transition-transform"
                      :class="open.has(g.key) ? 'rotate-90' : ''"
                    />
                    {{ g.key }}
                    <span class="text-muted-foreground text-xs font-normal">({{ g.items.length }})</span>
                  </button>
                </TableCell>
                <TableCell class="text-right font-medium tabular-nums">{{ num.format(g.requests) }}</TableCell>
                <TableCell class="hidden text-right font-medium tabular-nums sm:table-cell">{{ dec.format(g.compute) }}</TableCell>
                <TableCell class="hidden text-right font-medium tabular-nums md:table-cell">{{ dec.format(g.storage) }}</TableCell>
                <TableCell class="text-right font-medium tabular-nums">{{ usd.format(g.cost) }}</TableCell>
              </TableRow>
              <template v-if="open.has(g.key)">
                <TableRow v-for="e in g.items" :key="`${e.day}-${e.project}`">
                  <TableCell class="text-muted-foreground pl-10">
                    {{ groupBy === 'day' ? e.project : e.day }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums">{{ num.format(e.requests) }}</TableCell>
                  <TableCell class="hidden text-right tabular-nums sm:table-cell">{{ dec.format(e.compute) }}</TableCell>
                  <TableCell class="hidden text-right tabular-nums md:table-cell">{{ dec.format(e.storage) }}</TableCell>
                  <TableCell class="text-right tabular-nums">{{ usd.format(e.cost) }}</TableCell>
                </TableRow>
              </template>
            </template>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell class="font-semibold">Total</TableCell>
              <TableCell class="text-right font-semibold tabular-nums">{{ num.format(totals.requests) }}</TableCell>
              <TableCell class="hidden text-right font-semibold tabular-nums sm:table-cell">{{ dec.format(totals.compute) }}</TableCell>
              <TableCell class="hidden text-right font-semibold tabular-nums md:table-cell">{{ dec.format(totals.storage) }} peak</TableCell>
              <TableCell class="text-right font-semibold tabular-nums">{{ usd.format(totals.cost) }}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <p class="text-muted-foreground text-xs">
          Storage per day is the total across projects; project rows and the total show the peak. Costs are pre-tax.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
