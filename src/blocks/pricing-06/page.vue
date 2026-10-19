<script lang="ts">
export const description = "Tiga paket berbingkai rapat yang menyatu jadi satu papan."
</script>

<script setup lang="ts">
import { CircleCheck } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from "@/lib/utils"

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
  <div class="px-6 py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Our Plans
    </h2>
    <p class="mt-3 text-center text-muted-foreground text-xl -tracking-[0.01em] md:text-2xl">
      Choose the plan that fits your needs
    </p>

    <div class="mx-auto mt-12 grid max-w-(--breakpoint-lg) grid-cols-1 items-center gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-0">
      <div v-for="plan in plans"
        :class="cn(
          'relative rounded-xl border bg-card/50 p-7 lg:rounded-none lg:last:rounded-r-xl lg:first:rounded-l-xl',
          {
            'rounded-xl! border-2 border-primary bg-card py-12':
              plan.isPopular,
          }
        )"
        :key="plan.name"
      >
        <Badge v-if="plan.isPopular" class="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
        <h3 class="font-medium text-lg">{{ plan.name }}</h3>
        <p class="mt-4 font-satoshi font-semibold text-4xl">
          ${{ plan.price }}
        </p>
        <p class="mt-4 text-muted-foreground">{{ plan.description }}</p>
        <Separator class="my-6" />
        <ul class="space-y-2">
          <li v-for="feature in plan.features" class="flex items-start gap-2" :key="feature">
            <CircleCheck class="mt-1 h-4 w-4 text-green-600" />
            {{ feature }}
          </li>
        </ul>
        <Button
          class="mt-6 w-full"
          size="lg"
          :variant="plan.isPopular ? 'default' : 'outline'"
        >
          {{ plan.buttonText }}
        </Button>
      </div>
    </div>
  </div>
</template>
