<script lang="ts">
export const description = "Tabel pemakaian ringkas berisi sumber daya, terpakai, batas, persentase dengan bar mini, dan lencana status."
</script>

<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const rows = [
  { resource: 'API requests', used: 742_310, limit: 1_000_000, unit: '' },
  { resource: 'Storage', used: 48.2, limit: 50, unit: 'GB' },
  { resource: 'Bandwidth', used: 212, limit: 500, unit: 'GB' },
  { resource: 'Team seats', used: 12, limit: 10, unit: '' },
  { resource: 'Webhooks', used: 18_400, limit: 100_000, unit: '' },
  { resource: 'Build minutes', used: 2_710, limit: 3_000, unit: 'min' },
]

const fmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })
const pct = (r: (typeof rows)[number]) => Math.round((r.used / r.limit) * 100)
const amount = (v: number, unit: string) => (unit ? `${fmt.format(v)} ${unit}` : fmt.format(v))
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <Card>
      <CardHeader>
        <CardTitle>Plan limits</CardTitle>
        <CardDescription>Current cycle · resets Nov 1, 2026</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            View details <ArrowUpRightIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resource</TableHead>
              <TableHead class="hidden text-right sm:table-cell">Used</TableHead>
              <TableHead class="hidden text-right sm:table-cell">Limit</TableHead>
              <TableHead class="hidden sm:table-cell sm:w-40">Usage</TableHead>
              <TableHead class="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="r in rows" :key="r.resource">
              <TableCell>
                <p class="font-medium">{{ r.resource }}</p>
                <p class="text-muted-foreground text-xs tabular-nums sm:hidden">
                  {{ amount(r.used, r.unit) }} / {{ amount(r.limit, r.unit) }} ·
                  <span :class="pct(r) >= 80 ? 'text-destructive font-medium' : ''">{{ pct(r) }}%</span>
                </p>
              </TableCell>
              <TableCell class="hidden text-right tabular-nums sm:table-cell">{{ amount(r.used, r.unit) }}</TableCell>
              <TableCell class="text-muted-foreground hidden text-right tabular-nums sm:table-cell">
                {{ amount(r.limit, r.unit) }}
              </TableCell>
              <TableCell class="hidden sm:table-cell">
                <div class="flex items-center gap-2">
                  <Progress
                    :model-value="Math.min(100, pct(r))"
                    class="h-1.5 min-w-12"
                    :class="pct(r) >= 100
                      ? 'bg-destructive/20 [&_[data-slot=progress-indicator]]:bg-destructive'
                      : pct(r) >= 80
                        ? 'bg-warning/20 [&_[data-slot=progress-indicator]]:bg-warning'
                        : ''"
                    :aria-label="`${r.resource} usage`"
                  />
                  <span
                    class="w-10 text-right text-xs tabular-nums"
                    :class="pct(r) >= 80 ? 'text-destructive font-medium' : 'text-muted-foreground'"
                  >{{ pct(r) }}%</span>
                </div>
              </TableCell>
              <TableCell class="text-right">
                <Badge v-if="pct(r) >= 100" variant="destructive">Over limit</Badge>
                <Badge v-else-if="pct(r) >= 80" variant="outline" class="border-destructive/40 text-destructive">Near limit</Badge>
                <Badge v-else variant="secondary">Normal</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
