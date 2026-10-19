<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CircleCheck } from '@lucide/vue'

const plans = [
  {
    name: "Starter",
    price: 19,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      "5 hours turnaround time",
      "20 AI portraits",
      "Choice of 2 styles",
      "Choice of 2 filters",
      "2 retouch credits",
    ],
    buttonText: "Get 20 portraits in 5 hours",
  },
  {
    name: "Advanced",
    price: 29,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      "3 hours turnaround time",
      "50 AI portraits",
      "Choice of 5 styles",
      "Choice of 5 filters",
      "5 retouch credits",
    ],
    buttonText: "Get 50 portraits in 3 hours",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 49,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      "1-hour turnaround time",
      "100 AI portraits",
      "Choice of 10 styles",
      "Choice of 10 filters",
      "10 retouch credits",
    ],
    buttonText: "Get 100 portraits in 1 hour",
  },
]
</script>

<template>
  <div
    id="pricing"
    class="max-w-(--breakpoint-lg) mx-auto py-12 xs:py-20 px-6"
  >
    <h1 class="text-4xl xs:text-5xl font-semibold text-center tracking-tight">
      Pricing
    </h1>
    <div class="mt-8 xs:mt-14 grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-0">
      <div v-for="plan in plans"
        :key="plan.name"
        :class="cn(
          'relative bg-accent/50 border p-7 rounded-xl lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl',
          {
            'bg-background border-[2px] border-primary py-12 rounded-xl!':
              plan.isPopular,
          }
        )"
      >
        <Badge v-if="plan.isPopular" class="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
        <h3 class="text-lg font-medium">{{ plan.name }}</h3>
        <p class="mt-2 text-4xl font-bold">${{ plan.price }}</p>
        <p class="mt-4 font-medium text-muted-foreground">
          {{ plan.description }}
        </p>
        <Separator class="my-6" />
        <ul class="space-y-2">
          <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
            <CircleCheck class="h-4 w-4 mt-1 text-green-600" />
            {{ feature }}
          </li>
        </ul>
        <Button
          :variant="plan.isPopular ? 'default' : 'outline'"
          size="lg"
          class="w-full mt-6 rounded-full"
        >
          {{ plan.buttonText }}
        </Button>
      </div>
    </div>
  </div>
</template>
