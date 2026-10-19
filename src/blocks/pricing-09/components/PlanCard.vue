<script setup lang="ts">
import { CircleCheckIcon, type LucideIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  icon: LucideIcon;
  features: string[];
}

defineProps<{
  plan: PricingPlan
}>()

// Circuit Board - Light Pattern
const circuitBoardPattern = {
  backgroundImage: [
    "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px)",
    "repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px)",
    "radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)",
    "radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)",
  ].join(", "),
  backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
}
</script>

<template>
  <div
    :class="cn(
      'relative flex flex-col rounded-xl border bg-muted/50 p-1 dark:bg-muted/75',
      {
        'shadow/5': plan.isRecommended,
      },
    )"
  >
    <BorderBeam v-if="plan.isRecommended" :duration="8" :size="150" />

    <div class="shadow/5 dark:shadow/45 relative overflow-hidden rounded-lg border bg-background px-6 pt-5 pb-4">
      <Badge v-if="plan.isRecommended" class="absolute top-3 right-3 bg-primary/20 text-primary dark:bg-primary/30">
        Most Popular
      </Badge>
      <!-- Circuit Board - Light Pattern -->
      <div v-if="plan.isRecommended"
        class="pointer-events-none absolute inset-0 -top-px -left-2 z-0 not-dark:opacity-50"
        :style="circuitBoardPattern"
      />
      <component :is="plan.icon" class="mb-5 text-primary" />
      <div class="flex items-center gap-1">
        <h3 class="font-medium text-2xl tracking-tight">{{ plan.name }}</h3>
      </div>
      <p class="mt-1 mb-2 text-muted-foreground">{{ plan.description }}</p>
    </div>

    <div class="shadow/5 dark:shadow/45 mt-1 grow rounded-lg border bg-background px-6 pt-5 pb-10">
      <p class="mt-4 font-satoshi font-semibold text-4xl">
        ${{ plan.price }}
      </p>
      <p class="mt-1 text-muted-foreground text-sm tracking-normal">
        one-time payment
      </p>
      <Button
        class="my-6 w-full"
        size="lg"
        :variant="plan.isRecommended ? 'default' : 'outline'"
      >
        Get Started
      </Button>
      <ul class="mt-4 space-y-2">
        <li v-for="feature in plan.features" class="flex items-center gap-2" :key="feature">
          <CircleCheckIcon class="size-4 shrink-0 fill-primary/10 text-primary dark:fill-primary/15" />
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>
