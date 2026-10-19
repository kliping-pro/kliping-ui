<script lang="ts">
export const description = "Satu paket tunggal untuk produk berharga tetap."
</script>

<script setup lang="ts">
import { Box, Gem, type LucideIcon, Users } from '@lucide/vue'
import PlanCard from '@/blocks/pricing-10/components/PlanCard.vue'

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
    description: "Perfect for individuals who are just getting started.",
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
    description: "Ideal for professionals who need more power.",
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
    description: "Best for growing teams and small businesses.",
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
      Plans & Pricing
    </h2>
    <p class="mt-2 text-balance text-center text-lg text-muted-foreground -tracking-[0.01em] sm:mt-4 sm:text-2xl">
      Flexible pricing designed to grow with you ready
    </p>

    <div class="mt-12 grid grid-cols-1 gap-1 rounded-xl border bg-muted/40 p-1 sm:mt-16 sm:mt-16 sm:grid-cols-2 md:mt-15 md:grid-cols-3">
      <PlanCard v-for="plan in pricingPlans" :key="plan.name" :plan="plan" />
    </div>
  </section>
</template>
