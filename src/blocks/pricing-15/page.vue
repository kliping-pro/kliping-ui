<script lang="ts">
export const description = "Pemilih paket berupa baris radio dengan panel ringkasan dan tombol checkout."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NumberFlow from '@number-flow/vue'
import { Feather, Lock, Rocket, Sprout, TreePine } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

const TAX_RATE = 0.1

const plans = [
  { id: 'hobby', name: 'Hobby', icon: Feather, price: 0, blurb: '1 site · 1k visitors / month', perks: ['Community support', 'Shared SSL'] },
  { id: 'growth', name: 'Growth', icon: Sprout, price: 18, blurb: '5 sites · 50k visitors / month', perks: ['Email support', 'Custom domains', 'Form submissions'] },
  { id: 'studio', name: 'Studio', icon: TreePine, price: 42, blurb: '20 sites · 250k visitors / month', popular: true, perks: ['Priority support', 'Client billing', 'Password protection', 'Analytics'] },
  { id: 'agency', name: 'Agency', icon: Rocket, price: 89, blurb: 'Unlimited sites · 1M visitors / month', perks: ['Dedicated manager', 'White label', 'Uptime SLA', 'Staging environments'] },
]

const selectedId = ref('studio')
const yearly = ref(true)

const selected = computed(() => plans.find(p => p.id === selectedId.value) ?? plans[0]!)
/** The monthly price shown; yearly is rounded so the rows and summary always match. */
function monthlyPrice(price: number) {
  return yearly.value ? Math.round(price * 0.8) : price
}

const months = computed(() => yearly.value ? 12 : 1)
const unit = computed(() => monthlyPrice(selected.value.price))
const subtotal = computed(() => unit.value * months.value)
const tax = computed(() => subtotal.value * TAX_RATE)
const total = computed(() => subtotal.value + tax.value)

const usd = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 } as const
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-6xl">
      <div class="max-w-2xl">
        <h2 class="font-semibold text-4xl tracking-tight sm:text-5xl">Choose your plan</h2>
        <p class="mt-4 text-lg text-muted-foreground">
          Pick the plan that fits today. Upgrade, downgrade or cancel whenever you like.
        </p>
      </div>

      <div class="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <RadioGroup v-model="selectedId" class="gap-3" aria-label="Plans">
          <Label
            v-for="plan in plans"
            :key="plan.id"
            :for="`plan-${plan.id}`"
            :class="cn(
              'group relative flex cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 font-normal transition-all duration-200 hover:border-foreground/25 sm:items-center sm:p-5',
              selectedId === plan.id && 'border-primary bg-primary/5 ring-1 ring-primary hover:border-primary',
            )"
          >
            <RadioGroupItem :id="`plan-${plan.id}`" :value="plan.id" class="mt-1 sm:mt-0" />
            <span
              :class="cn(
                'hidden size-10 shrink-0 place-items-center rounded-lg border transition-colors sm:grid',
                selectedId === plan.id ? 'border-primary bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
              )"
            >
              <component :is="plan.icon" class="size-5" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-2">
                <span class="font-semibold text-base">{{ plan.name }}</span>
                <Badge v-if="plan.popular" class="text-[0.625rem] uppercase">Popular</Badge>
              </span>
              <span class="mt-1 block text-muted-foreground text-sm">{{ plan.blurb }}</span>
            </span>
            <span class="shrink-0 text-right">
              <span class="block font-semibold text-lg tabular-nums">
                {{ plan.price === 0 ? 'Free' : `$${monthlyPrice(plan.price)}` }}
              </span>
              <span v-if="plan.price > 0" class="block text-muted-foreground text-xs">per month</span>
            </span>
          </Label>
        </RadioGroup>

        <aside class="rounded-lg border bg-muted/50 p-6 lg:sticky lg:top-8">
          <p class="font-medium text-muted-foreground text-xs uppercase tracking-wider">Order summary</p>
          <div class="mt-4 flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-lg bg-background ring-1 ring-border">
              <component :is="selected.icon" class="size-5 text-primary" />
            </span>
            <div>
              <p class="font-semibold">{{ selected.name }} plan</p>
              <p class="text-muted-foreground text-sm">{{ selected.blurb }}</p>
            </div>
          </div>

          <ul class="mt-5 flex flex-wrap gap-1.5">
            <li v-for="perk in selected.perks" :key="perk">
              <Badge variant="outline" class="bg-background font-normal">{{ perk }}</Badge>
            </li>
          </ul>

          <div class="mt-6 flex items-center justify-between gap-3 rounded-lg border bg-background p-3">
            <Label for="annual-billing" class="flex flex-col items-start gap-0.5 font-normal">
              <span class="font-medium text-sm">Annual billing</span>
              <span class="text-muted-foreground text-xs">Save 20% when paying yearly</span>
            </Label>
            <Switch id="annual-billing" v-model="yearly" />
          </div>

          <dl class="mt-6 space-y-2.5 text-sm">
            <div class="flex justify-between">
              <dt class="text-muted-foreground">
                {{ selected.name }} × {{ months }} {{ months === 1 ? 'month' : 'months' }}
              </dt>
              <dd class="tabular-nums"><NumberFlow :format="usd" locales="en-US" :value="subtotal" /></dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Tax (10%)</dt>
              <dd class="tabular-nums"><NumberFlow :format="usd" locales="en-US" :value="tax" /></dd>
            </div>
          </dl>
          <Separator class="my-4" />
          <div class="flex items-baseline justify-between">
            <span class="font-medium">Due today</span>
            <NumberFlow class="font-semibold text-2xl tabular-nums" :format="usd" locales="en-US" :value="total" />
          </div>

          <Button size="lg" class="mt-6 w-full">
            <Lock class="size-4" />
            {{ selected.price === 0 ? 'Create free account' : 'Continue to checkout' }}
          </Button>
          <p class="mt-3 text-center text-muted-foreground text-xs">
            Secure payment · 30-day money-back guarantee
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>
