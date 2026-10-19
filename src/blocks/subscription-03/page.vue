<script lang="ts">
export const description = "Dialog ganti paket langganan dengan daftar paket, penanda paket aktif, pilihan bulanan atau tahunan, dan ringkasan selisih harga."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRightIcon, CircleCheckIcon, SparklesIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type Cycle = 'monthly' | 'yearly'

interface Plan {
  id: string
  name: string
  tagline: string
  monthly: number
  yearly: number
  highlights: string[]
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For individuals getting started',
    monthly: 12,
    yearly: 120,
    highlights: ['3 projects', '5 GB storage'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing creators and freelancers',
    monthly: 24,
    yearly: 240,
    highlights: ['Unlimited projects', '50 GB storage'],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For teams that need control',
    monthly: 49,
    yearly: 490,
    highlights: ['10 seats included', 'SSO & audit log'],
  },
]

const current = { planId: 'pro', cycle: 'monthly' as Cycle }

const open = ref(true)
const cycle = ref<Cycle>('monthly')
const selectedId = ref('business')
const done = ref(false)

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

function priceOf(plan: Plan, c: Cycle) {
  return c === 'monthly' ? plan.monthly : plan.yearly
}
function perMonth(plan: Plan, c: Cycle) {
  return c === 'monthly' ? plan.monthly : plan.yearly / 12
}

const currentPlan = computed(() => plans.find(p => p.id === current.planId)!)
const selectedPlan = computed(() => plans.find(p => p.id === selectedId.value)!)
const isUnchanged = computed(() => selectedId.value === current.planId && cycle.value === current.cycle)

const diff = computed(() => perMonth(selectedPlan.value, cycle.value) - perMonth(currentPlan.value, current.cycle))
const direction = computed(() => {
  if (isUnchanged.value)
    return 'same'
  const a = plans.findIndex(p => p.id === selectedId.value)
  const b = plans.findIndex(p => p.id === current.planId)
  if (a > b)
    return 'upgrade'
  if (a < b)
    return 'downgrade'
  return 'switch'
})

const yearlySavings = computed(() => selectedPlan.value.monthly * 12 - selectedPlan.value.yearly)

function onCycleChange(value: string | number) {
  cycle.value = value as Cycle
}

function onOpenChange(value: boolean) {
  open.value = value
  if (!value) {
    setTimeout(() => {
      done.value = false
    }, 200)
  }
}
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center p-6">
    <Dialog :open="open" @update:open="onOpenChange">
      <DialogTrigger as-child>
        <Button>Change plan</Button>
      </DialogTrigger>
      <DialogContent class="max-h-[calc(100dvh-2rem)] grid-cols-1 gap-0 overflow-x-hidden overflow-y-auto p-0 [&>*]:min-w-0 sm:max-w-xl">
        <template v-if="!done">
          <DialogHeader class="space-y-1.5 p-6 pb-4 text-left">
            <DialogTitle>Change your plan</DialogTitle>
            <DialogDescription>
              Pick a new plan. Changes apply right away and are prorated.
            </DialogDescription>
          </DialogHeader>

          <div class="flex flex-wrap items-center justify-between gap-3 px-6">
            <Tabs :model-value="cycle" @update:model-value="onCycleChange">
              <TabsList>
                <TabsTrigger value="monthly" class="px-3">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" class="px-3">
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p class="text-muted-foreground text-xs">
              Save 2 months with yearly billing
            </p>
          </div>

          <RadioGroup v-model="selectedId" class="gap-2 p-6">
            <Label
              v-for="plan in plans"
              :key="plan.id"
              :for="`plan-${plan.id}`"
              :class="cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border p-4 font-normal transition-colors',
                selectedId === plan.id ? 'border-primary bg-primary/5 ring-primary/20 ring-1' : 'hover:bg-muted/50',
              )"
            >
              <RadioGroupItem :id="`plan-${plan.id}`" :value="plan.id" class="mt-0.5" />
              <div class="min-w-0 flex-1 space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-medium">{{ plan.name }}</span>
                  <Badge
                    v-if="plan.id === current.planId"
                    variant="outline"
                    class="rounded-md"
                  >
                    Current{{ current.cycle !== cycle ? ` · ${current.cycle}` : '' }}
                  </Badge>
                </div>
                <p class="text-muted-foreground text-sm">
                  {{ plan.tagline }}
                </p>
                <p class="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs">
                  <span
                    v-for="h in plan.highlights"
                    :key="h"
                    class="inline-flex items-center gap-1"
                  >
                    <CircleCheckIcon class="text-primary size-3" />
                    {{ h }}
                  </span>
                </p>
              </div>
              <div class="shrink-0 text-right">
                <p class="text-base font-semibold tabular-nums">
                  {{ usd.format(priceOf(plan, cycle)) }}
                </p>
                <p class="text-muted-foreground text-xs">
                  {{ cycle === 'monthly' ? 'per month' : 'per year' }}
                </p>
              </div>
            </Label>
          </RadioGroup>

          <!-- Summary -->
          <div class="bg-muted/50 mx-6 rounded-lg border p-4">
            <div class="flex items-center gap-3 text-sm">
              <div class="min-w-0 flex-1">
                <p class="text-muted-foreground text-xs">
                  Current
                </p>
                <p class="truncate font-medium">
                  {{ currentPlan.name }}
                </p>
                <p class="text-muted-foreground truncate text-xs tabular-nums">
                  {{ usd.format(priceOf(currentPlan, current.cycle)) }}/{{ current.cycle === 'monthly' ? 'mo' : 'yr' }}
                </p>
              </div>
              <ArrowRightIcon class="text-muted-foreground size-4 shrink-0" />
              <div class="min-w-0 flex-1 text-right">
                <p class="text-muted-foreground text-xs">
                  New
                </p>
                <p class="truncate font-medium">
                  {{ selectedPlan.name }}
                </p>
                <p class="text-muted-foreground truncate text-xs tabular-nums">
                  {{ usd.format(priceOf(selectedPlan, cycle)) }}/{{ cycle === 'monthly' ? 'mo' : 'yr' }}
                </p>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between gap-3 border-t pt-3 text-sm">
              <span class="text-muted-foreground">Difference per month</span>
              <span
                :class="cn(
                  'font-semibold tabular-nums',
                  diff < 0 && 'text-primary',
                )"
              >
                <template v-if="isUnchanged">No change</template>
                <template v-else>{{ diff > 0 ? '+' : diff < 0 ? '−' : '' }}{{ usd.format(Math.abs(diff)) }}</template>
              </span>
            </div>
            <p
              v-if="cycle === 'yearly' && !isUnchanged"
              class="text-primary mt-2 flex items-center gap-1.5 text-xs"
            >
              <SparklesIcon class="size-3.5" />
              You save {{ usd.format(yearlySavings) }} a year compared to monthly billing.
            </p>
          </div>

          <DialogFooter class="gap-2 p-6">
            <Button variant="outline" @click="onOpenChange(false)">
              Cancel
            </Button>
            <Button :disabled="isUnchanged" @click="done = true">
              <template v-if="direction === 'upgrade'">
                Upgrade to {{ selectedPlan.name }}
              </template>
              <template v-else-if="direction === 'downgrade'">
                Downgrade to {{ selectedPlan.name }}
              </template>
              <template v-else-if="direction === 'switch'">
                Switch to {{ cycle }} billing
              </template>
              <template v-else>
                Current plan
              </template>
            </Button>
          </DialogFooter>
        </template>

        <div v-else class="flex flex-col items-center gap-4 p-8 text-center">
          <div class="bg-primary/10 text-primary grid size-12 place-items-center rounded-full">
            <CircleCheckIcon class="size-6" />
          </div>
          <DialogHeader class="items-center text-center">
            <DialogTitle>You're now on {{ selectedPlan.name }}</DialogTitle>
            <DialogDescription>
              Billed {{ usd.format(priceOf(selectedPlan, cycle)) }} {{ cycle === 'monthly' ? 'per month' : 'per year' }}. A prorated invoice has been sent to your email.
            </DialogDescription>
          </DialogHeader>
          <Button class="w-full" @click="onOpenChange(false)">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
