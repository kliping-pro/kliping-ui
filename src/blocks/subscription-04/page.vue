<script lang="ts">
export const description = "Kartu pengalih paket langsung di halaman dengan lencana naik atau turun paket dan ringkasan kapan perubahan berlaku."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarClockIcon,
  CheckIcon,
  ZapIcon,
} from '@lucide/vue'
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

type Cycle = 'monthly' | 'yearly'

const plans = [
  { id: 'free', name: 'Free', monthly: 0, yearly: 0, limits: ['1 seat', '3 projects', '2 GB'] },
  { id: 'starter', name: 'Starter', monthly: 12, yearly: 10, limits: ['2 seats', '10 projects', '20 GB'] },
  { id: 'pro', name: 'Pro', monthly: 24, yearly: 20, limits: ['5 seats', 'Unlimited projects', '100 GB'] },
  { id: 'business', name: 'Business', monthly: 49, yearly: 41, limits: ['20 seats', 'SSO & roles', '1 TB'] },
]

const currentId = 'pro'
const periodEnd = 'November 30, 2026'

const cycle = ref<Cycle>('monthly')
const selectedId = ref(currentId)
const appliedId = ref(currentId)

const selectedIndex = computed(() => plans.findIndex(p => p.id === selectedId.value))
const selected = computed(() => plans[selectedIndex.value]!)
const kind = computed(() => {
  const appliedIndex = plans.findIndex(p => p.id === appliedId.value)
  if (selectedIndex.value > appliedIndex)
    return 'upgrade'
  if (selectedIndex.value < appliedIndex)
    return 'downgrade'
  return 'current'
})

function relation(index: number) {
  const appliedIndex = plans.findIndex(p => p.id === appliedId.value)
  if (index === appliedIndex)
    return 'current'
  return index > appliedIndex ? 'upgrade' : 'downgrade'
}

function price(plan: typeof plans[number]) {
  return cycle.value === 'monthly' ? plan.monthly : plan.yearly
}

function onCycle(value: unknown) {
  if (value === 'monthly' || value === 'yearly')
    cycle.value = value
}

function apply() {
  appliedId.value = selectedId.value
}
</script>

<template>
  <div class="mx-auto w-full max-w-4xl p-4 sm:p-6">
    <Card class="gap-0 rounded-lg py-0">
      <CardHeader class="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1.5">
          <CardTitle class="text-lg">
            Plan
          </CardTitle>
          <CardDescription>
            Switch plans anytime. Upgrades apply now, downgrades at the end of the period.
          </CardDescription>
        </div>
        <ToggleGroup
          :model-value="cycle"
          type="single"
          variant="outline"
          size="sm"
          class="shrink-0"
          @update:model-value="onCycle"
        >
          <ToggleGroupItem value="monthly" class="data-[state=on]:bg-muted px-3">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="yearly" class="data-[state=on]:bg-muted gap-1.5 px-3">
            Yearly
            <span class="text-primary text-xs font-medium">−17%</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>

      <CardContent class="p-6">
        <div
          role="radiogroup"
          aria-label="Plans"
          class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <button
            v-for="(plan, index) in plans"
            :key="plan.id"
            type="button"
            role="radio"
            :aria-checked="selectedId === plan.id"
            :class="cn(
              'focus-visible:ring-ring/50 relative flex flex-col rounded-lg border p-4 text-left transition-colors outline-none focus-visible:ring-3',
              selectedId === plan.id ? 'border-primary bg-primary/5 ring-primary ring-1' : 'hover:bg-muted/50',
            )"
            @click="selectedId = plan.id"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-medium">{{ plan.name }}</span>
              <Badge
                v-if="relation(index) === 'current'"
                variant="secondary"
                class="rounded-md"
              >
                Current
              </Badge>
              <Badge
                v-else-if="relation(index) === 'upgrade'"
                class="rounded-md"
              >
                <ArrowUpIcon />
                Upgrade
              </Badge>
              <Badge
                v-else
                variant="outline"
                class="text-muted-foreground rounded-md"
              >
                <ArrowDownIcon />
                Downgrade
              </Badge>
            </div>
            <p class="mt-3 flex items-baseline gap-1">
              <span class="text-2xl font-semibold tracking-tight tabular-nums">${{ price(plan) }}</span>
              <span class="text-muted-foreground text-xs">/mo</span>
            </p>
            <p class="text-muted-foreground h-4 text-xs">
              <template v-if="cycle === 'yearly' && plan.yearly">
                ${{ plan.yearly * 12 }} billed yearly
              </template>
            </p>
            <ul class="mt-4 space-y-1.5 border-t pt-3">
              <li
                v-for="limit in plan.limits"
                :key="limit"
                class="text-muted-foreground flex items-center gap-2 text-xs"
              >
                <CheckIcon class="text-primary size-3.5 shrink-0" />
                {{ limit }}
              </li>
            </ul>
          </button>
        </div>
      </CardContent>

      <CardFooter class="bg-muted/40 flex flex-col items-stretch gap-4 border-t p-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-start gap-3 text-sm">
          <div
            :class="cn(
              'grid size-9 shrink-0 place-items-center rounded-md border',
              kind === 'upgrade' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background',
            )"
          >
            <ZapIcon v-if="kind === 'upgrade'" class="size-4" />
            <CalendarClockIcon v-else class="size-4" />
          </div>
          <div>
            <p class="font-medium">
              <template v-if="kind === 'upgrade'">
                Upgrade to {{ selected.name }} · ${{ price(selected) }}/mo
              </template>
              <template v-else-if="kind === 'downgrade'">
                Downgrade to {{ selected.name }} · ${{ price(selected) }}/mo
              </template>
              <template v-else>
                You're on {{ selected.name }}
              </template>
            </p>
            <p class="text-muted-foreground">
              <template v-if="kind === 'upgrade'">
                Takes effect immediately. You'll be charged a prorated amount today.
              </template>
              <template v-else-if="kind === 'downgrade'">
                Takes effect on {{ periodEnd }}. No refund for the current period.
              </template>
              <template v-else>
                Renews on {{ periodEnd }}. Select another plan to switch.
              </template>
            </p>
          </div>
        </div>
        <Button
          :variant="kind === 'downgrade' ? 'outline' : 'default'"
          :disabled="kind === 'current'"
          class="shrink-0"
          @click="apply"
        >
          {{ kind === 'upgrade' ? 'Upgrade now' : kind === 'downgrade' ? 'Schedule downgrade' : 'Current plan' }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
