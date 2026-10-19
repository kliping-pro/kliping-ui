<script lang="ts">
export const description = "Tiga paket dengan tab bulanan/tahunan, lencana hemat 20%, dan paket tengah yang disorot."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import NumberFlow from '@number-flow/vue'
import { ArrowRight, Check, Sparkles } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Period = 'monthly' | 'yearly'

const YEARLY_DISCOUNT = 20

const plans = [
  {
    name: 'Starter',
    tagline: 'For solo makers shipping their first product.',
    monthly: 15,
    cta: 'Get started',
    features: ['3 active projects', '10 GB storage', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Professional',
    tagline: 'For growing teams that need room to move.',
    monthly: 45,
    featured: true,
    cta: 'Start 14-day trial',
    features: [
      'Unlimited projects',
      '200 GB storage',
      'Advanced analytics',
      'Custom domains',
      'Priority support',
    ],
  },
  {
    name: 'Business',
    tagline: 'For organisations with compliance needs.',
    monthly: 95,
    cta: 'Talk to sales',
    features: ['Everything in Professional', '1 TB storage', 'SSO & audit logs', 'Dedicated manager'],
  },
]

const period = ref<Period>('monthly')

function priceFor(monthly: number) {
  return period.value === 'monthly'
    ? monthly
    : Math.round(monthly * (100 - YEARLY_DISCOUNT) / 100)
}
</script>

<template>
  <section class="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-3xl rounded-full bg-primary/10 blur-3xl"
    />

    <div class="relative mx-auto max-w-2xl text-center">
      <Badge variant="outline" class="gap-1.5 px-3 py-1">
        <Sparkles class="size-3.5 text-primary" />
        Simple, transparent pricing
      </Badge>
      <h2 class="mt-5 font-semibold text-4xl tracking-tight sm:text-5xl">
        Plans that grow with you
      </h2>
      <p class="mt-4 text-lg text-muted-foreground">
        Start small and upgrade whenever you are ready. Every plan includes a 14-day free trial.
      </p>

      <Tabs v-model="period" class="mt-8 items-center">
        <TabsList class="h-11 p-1">
          <TabsTrigger value="monthly" class="px-5">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" class="gap-2 px-4">
            Yearly
            <span class="rounded-full bg-primary px-2 py-0.5 font-semibold text-[0.6875rem] text-primary-foreground">
              Save {{ YEARLY_DISCOUNT }}%
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <div class="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:items-center md:gap-0">
      <article
        v-for="plan in plans"
        :key="plan.name"
        :class="cn(
          'relative flex flex-col rounded-lg border bg-card p-7 transition-transform duration-300',
          plan.featured
            ? 'z-10 border-primary/60 shadow-xl shadow-primary/10 ring-1 ring-primary/40 md:-my-4 md:py-11'
            : 'md:first:rounded-r-none md:last:rounded-l-none md:first:border-r-0 md:last:border-l-0 bg-card/70',
        )"
      >
        <div
          v-if="plan.featured"
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-primary/10 via-transparent to-transparent"
        />

        <div class="relative flex items-center justify-between gap-3">
          <h3 class="font-semibold text-lg">{{ plan.name }}</h3>
          <Badge v-if="plan.featured" class="uppercase tracking-wide">
            Most popular
          </Badge>
        </div>
        <p class="relative mt-2 min-h-10 text-muted-foreground text-sm">{{ plan.tagline }}</p>

        <div class="relative mt-6 flex items-baseline gap-1.5">
          <NumberFlow
            class="font-semibold text-5xl tracking-tight tabular-nums"
            prefix="$"
            :value="priceFor(plan.monthly)"
          />
          <span class="text-muted-foreground text-sm">/ month</span>
        </div>
        <p class="relative mt-1 h-5 text-muted-foreground text-xs">
          <template v-if="period === 'yearly'">
            Billed ${{ priceFor(plan.monthly) * 12 }} yearly
            <span class="ml-1 text-primary line-through decoration-primary/60">${{ plan.monthly * 12 }}</span>
          </template>
          <template v-else>Billed monthly, cancel anytime</template>
        </p>

        <Button
          class="relative mt-7 w-full"
          size="lg"
          :variant="plan.featured ? 'default' : 'outline'"
        >
          {{ plan.cta }}
          <ArrowRight class="size-4" />
        </Button>

        <div class="relative my-7 h-px bg-border" />

        <ul class="relative space-y-3 text-sm">
          <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
            <span
              :class="cn(
                'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                plan.featured ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
              )"
            >
              <Check class="size-3" />
            </span>
            {{ feature }}
          </li>
        </ul>
      </article>
    </div>

    <p class="relative mt-12 text-center text-muted-foreground text-sm">
      Prices in USD. Taxes may apply depending on your location.
    </p>
  </section>
</template>
