<script setup lang="ts">
import { computed } from 'vue'
import NumberFlow from '@number-flow/vue'
import { CircleCheckIcon, type LucideIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type BillingPeriod = "monthly" | "yearly"

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  icon: LucideIcon;
  features: string[];
}

const props = defineProps<{
  plan: PricingPlan
  billingPeriod: BillingPeriod
}>()

const YEARLY_DISCOUNT_PERCENTAGE = 20

const price = computed(() =>
  props.billingPeriod === "yearly"
    ? Math.floor((props.plan.price * (100 - YEARLY_DISCOUNT_PERCENTAGE)) / 100)
    : props.plan.price,
)
</script>

<template>
  <div
    :class="cn('rounded-lg bg-card p-6 shadow-xs/3 ring ring-border/85', {
      'relative bg-primary/5 ring-2 ring-primary': plan.isRecommended,
    })"
  >
    <Badge v-if="plan.isRecommended" class="absolute -top-3 left-1/2 -translate-x-1/2">
      Most Popular
    </Badge>
    <component :is="plan.icon" class="mb-4 text-primary" />
    <div class="flex items-center gap-1">
      <h3 class="font-medium text-2xl tracking-tight">{{ plan.name }}</h3>
    </div>
    <p class="mt-2 min-h-[2lh] text-muted-foreground">
      {{ plan.description }}
    </p>
    <p class="mt-4 font-semibold text-4xl">
      <NumberFlow class="font-satoshi" prefix="$" :value="price" />
      <span class="ms-0.5 font-normal text-lg text-muted-foreground tracking-tight">
        /month
      </span>
    </p>
    <Button class="mt-6 mb-8 h-10 w-full" size="lg">
      Get Started
    </Button>
    <ul class="space-y-2">
      <li v-for="feature in plan.features" class="flex items-center gap-2" :key="feature">
        <CircleCheckIcon class="size-4 shrink-0 text-primary" />
        {{ feature }}
      </li>
    </ul>
  </div>
</template>
