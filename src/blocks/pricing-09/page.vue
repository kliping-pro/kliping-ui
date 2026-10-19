<script lang="ts">
export const description = "Kartu paket dengan sinar berjalan di tepi paket unggulan."
</script>

<script setup lang="ts">
import { Box, Gem, type LucideIcon, Users } from '@lucide/vue'
import PlanCard from '@/blocks/pricing-09/components/PlanCard.vue'

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  icon: LucideIcon;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individuals.",
    price: 29,
    isRecommended: false,
    icon: Box,
    features: [
      "1 Project",
      "Basic Components",
      "Email Support",
      "Access to Updates for 6 Months",
      "Community Access",
    ],
  },
  {
    name: "Pro",
    description: "Ideal for professionals.",
    price: 79,
    isRecommended: true,
    icon: Gem,
    features: [
      "Unlimited Projects",
      "Premium Components",
      "Priority Support",
      "Access to Updates for 1 Year",
      "Code Snippets & Templates",
    ],
  },
  {
    name: "Team",
    description: "Best for growing teams.",
    price: 199,
    isRecommended: false,
    icon: Users,
    features: [
      "Everything in Pro",
      "Team License (up to 5 users)",
      "Collaboration Features",
      "Extended Support",
      "Lifetime Updates",
    ],
  },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Pick your plan
    </h2>
    <p class="mt-2 text-balance text-center text-lg text-muted-foreground -tracking-[0.01em] sm:mt-4 sm:text-2xl">
      Flexible pricing designed to grow with you ready
    </p>

    <div class="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 overflow-clip sm:mt-16 sm:grid-cols-2 md:grid-cols-3">
      <PlanCard v-for="plan in pricingPlans" :key="plan.name" :plan="plan" />
    </div>
  </section>
</template>
