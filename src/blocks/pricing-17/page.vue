<script lang="ts">
export const description = "Empat paket ringkas dalam kisi dengan pilihan mata uang USD/EUR/IDR yang langsung mengubah harga."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, Globe } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Currency = 'USD' | 'EUR' | 'IDR'

const currencies: { code: Currency, label: string, locale: string }[] = [
  { code: 'USD', label: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', label: 'Euro', locale: 'de-DE' },
  { code: 'IDR', label: 'Indonesian Rupiah', locale: 'id-ID' },
]

/** Prices are set per currency so they stay round, rather than converted at an exchange rate. */
const plans: {
  name: string
  summary: string
  prices: Record<Currency, number>
  features: string[]
  featured?: boolean
}[] = [
  {
    name: 'Free',
    summary: 'Try it out',
    prices: { USD: 0, EUR: 0, IDR: 0 },
    features: ['1 user', '2 projects', 'Basic exports'],
  },
  {
    name: 'Plus',
    summary: 'For freelancers',
    prices: { USD: 9, EUR: 9, IDR: 129_000 },
    features: ['1 user', '20 projects', 'HD exports', 'Brand kit'],
  },
  {
    name: 'Team',
    summary: 'For small teams',
    prices: { USD: 29, EUR: 27, IDR: 399_000 },
    featured: true,
    features: ['Up to 10 users', 'Unlimited projects', 'Shared libraries', 'Approval flows'],
  },
  {
    name: 'Enterprise',
    summary: 'For large orgs',
    prices: { USD: 79, EUR: 75, IDR: 1_099_000 },
    features: ['Unlimited users', 'SSO & SCIM', 'Audit log', 'Dedicated support'],
  },
]

const currency = ref<Currency>('USD')

const formatter = computed(() => {
  const meta = currencies.find(c => c.code === currency.value)!
  return new Intl.NumberFormat(meta.locale, {
    style: 'currency',
    currency: meta.code,
    maximumFractionDigits: 0,
  })
})
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-xl">
          <h2 class="font-semibold text-4xl tracking-tight sm:text-5xl">Pricing for every stage</h2>
          <p class="mt-4 text-lg text-muted-foreground">
            Local prices, no conversion fees. Pick your currency to see what you will pay.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Globe class="size-4 text-muted-foreground" />
          <Select v-model="currency">
            <SelectTrigger class="w-56 bg-background" aria-label="Currency">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="c in currencies" :key="c.code" :value="c.code">
                {{ c.code }} · {{ c.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="mt-12 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="plan in plans"
          :key="plan.name"
          :class="cn(
            'relative flex flex-col bg-card p-6',
            plan.featured && 'bg-muted/60',
          )"
        >
          <span
            v-if="plan.featured"
            aria-hidden="true"
            class="absolute inset-x-0 top-0 h-1 bg-primary"
          />
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-semibold">{{ plan.name }}</h3>
            <span
              v-if="plan.featured"
              class="rounded-full bg-background px-2 py-0.5 font-medium text-primary text-xs"
            >
              Recommended
            </span>
          </div>
          <p class="mt-1 text-muted-foreground text-sm">{{ plan.summary }}</p>

          <p class="mt-6 flex flex-wrap items-baseline gap-x-1">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="-translate-y-1 opacity-0"
            >
              <span :key="currency" class="font-semibold text-3xl tracking-tight tabular-nums">
                {{ formatter.format(plan.prices[currency]) }}
              </span>
            </Transition>
            <span class="text-muted-foreground text-sm">/ mo</span>
          </p>

          <Button
            class="mt-6 w-full"
            :variant="plan.featured ? 'default' : 'outline'"
          >
            {{ plan.name === 'Enterprise' ? 'Contact sales' : plan.prices[currency] === 0 ? 'Sign up' : 'Upgrade' }}
          </Button>

          <ul class="mt-6 space-y-2.5 text-sm">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2.5">
              <Check class="size-4 shrink-0 text-primary" />
              {{ feature }}
            </li>
          </ul>
        </article>
      </div>

      <p class="mt-6 text-muted-foreground text-sm">
        Prices exclude VAT where applicable. Billed monthly in {{ currency }}.
      </p>
    </div>
  </section>
</template>
