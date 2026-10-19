<script setup lang="ts">
import { CircleCheckIcon, type LucideIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
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
</script>

<template>
  <div class="shadow/5 relative rounded-lg border bg-background">
    <Badge v-if="plan.isRecommended" class="absolute top-3 right-3">Most Popular</Badge>
    <div class="rounded-t-lg border-b border-dashed p-6">
      <component :is="plan.icon" class="mb-5 text-primary" />
      <div class="flex items-center gap-1">
        <h3 class="font-medium text-2xl tracking-tight">{{ plan.name }}</h3>
      </div>
      <p class="my-2 text-muted-foreground">{{ plan.description }}</p>
    </div>
    <div class="px-6 pt-5 pb-10">
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
          <CircleCheckIcon class="size-4 shrink-0 text-primary" />
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>
