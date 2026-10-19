<script setup lang="ts">
import { CircleCheckIcon, type LucideIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
  <div
    :class="cn('border bg-card', {
      'relative border border-primary bg-card ring ring-primary ring-inset':
        plan.isRecommended,
    })"
  >
    <Badge v-if="plan.isRecommended" class="absolute top-0 right-0 rounded-none">
      Most Popular
    </Badge>
    <div
      :class="cn('p-6', {
        'bg-linear-to-bl from-primary/15': plan.isRecommended,
      })"
    >
      <component :is="plan.icon" class="mb-5 text-primary" />
      <div class="flex items-center gap-1">
        <h3 class="font-medium text-2xl tracking-tight">{{ plan.name }}</h3>
      </div>
      <p class="my-2 text-muted-foreground">{{ plan.description }}</p>
    </div>
    <Separator />
    <div class="px-6 pt-5 pb-10">
      <p class="mt-4 font-satoshi font-semibold text-4xl">
        ${{ plan.price }}
      </p>
      <p class="mt-1 text-muted-foreground text-sm tracking-normal">
        one-time payment
      </p>
      <Button class="my-6 w-full" size="lg">
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
