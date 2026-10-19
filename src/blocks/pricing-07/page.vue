<script lang="ts">
export const description = "Kartu paket berikon dengan tab dan angka beranimasi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Box, Gem, type LucideIcon, Users } from '@lucide/vue'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PlanCard from '@/blocks/pricing-07/components/PlanCard.vue'

type BillingPeriod = "monthly" | "yearly"

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
    name: "Basic",
    description: "Perfect for individuals getting started.",
    price: 0,
    isRecommended: false,
    icon: Box,
    features: [
      "1 Project",
      "Community Support",
      "Basic Analytics",
      "Limited Components",
    ],
  },
  {
    name: "Pro",
    description: "Ideal for professionals who need more power.",
    price: 19,
    isRecommended: true,
    icon: Gem,
    features: [
      "Unlimited Projects",
      "Priority Support",
      "Advanced Analytics",
      "Access to Premium Components",
      "Custom Branding",
    ],
  },
  {
    name: "Team",
    description: "Best for growing teams and small businesses.",
    price: 49,
    isRecommended: false,
    icon: Users,
    features: [
      "Everything in Pro",
      "Team Collaboration",
      "Role-based Access",
      "Usage Insights",
      "Dedicated Support",
    ],
  },
]

const billingPeriod = ref<BillingPeriod>("yearly")

</script>

<template>
  <section class="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
    <Tabs
      class="mx-auto"
      defaultValue="yearly"
      v-model="billingPeriod"
    >
      <TabsList>
        <TabsTrigger class="px-4" value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger class="px-4" value="yearly">
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
      <PlanCard v-for="plan in pricingPlans" :billing-period="billingPeriod" :key="plan.name" :plan="plan" />
    </div>
  </section>
</template>
