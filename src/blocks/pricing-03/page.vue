<script lang="ts">
export const description = "Tiga paket dengan tab bulanan/tahunan; angkanya berubah beranimasi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import NumberFlow from '@number-flow/vue'
import { CircleCheck, CircleHelp } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const tooltipContent = {
  styles: "Choose from a variety of styles to suit your preferences.",
  filters: "Choose from a variety of filters to enhance your portraits.",
  credits: "Use these credits to retouch your portraits.",
}

const plans = [
  {
    name: "Starter",
    price: 20,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      { title: "5 hours turnaround time" },
      { title: "20 AI portraits" },
      { title: "Choice of 2 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 2 filters", tooltip: tooltipContent.filters },
      { title: "2 retouch credits", tooltip: tooltipContent.credits },
    ],
    buttonText: "Get 20 portraits in 5 hours",
  },
  {
    name: "Advanced",
    price: 40,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      { title: "3 hours turnaround time" },
      { title: "50 AI portraits" },
      { title: "Choice of 5 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 5 filters", tooltip: tooltipContent.filters },
      { title: "5 retouch credits", tooltip: tooltipContent.credits },
    ],
    buttonText: "Get 50 portraits in 3 hours",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 80,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      { title: "1-hour turnaround time" },
      { title: "100 AI portraits" },
      { title: "Choice of 10 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 10 filters", tooltip: tooltipContent.filters },
      { title: "10 retouch credits", tooltip: tooltipContent.credits },
    ],
    buttonText: "Get 100 portraits in 1 hour",
  },
]

const YEARLY_DISCOUNT = 20

const selectedBillingPeriod = ref("monthly")

</script>

<template>
  <div class="px-6 py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Our Plans
    </h2>
    <p class="mt-3 text-center text-muted-foreground text-xl -tracking-[0.01em] md:text-2xl">
      Choose the plan that fits your needs
    </p>

    <Tabs
      class="mx-auto mt-8 max-w-max"
      v-model="selectedBillingPeriod"
    >
      <TabsList class="h-11 rounded-full">
        <TabsTrigger
          class="rounded-full px-4 data-[state=active]:shadow-none"
          value="monthly"
        >
          Monthly
        </TabsTrigger>
        <TabsTrigger
          class="rounded-full px-4 data-[state=active]:shadow-none"
          value="yearly"
        >
          Yearly (Save {{ YEARLY_DISCOUNT }}%)
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <div class="mx-auto mt-12 grid max-w-(--breakpoint-lg) grid-cols-1 items-center gap-8 lg:grid-cols-3">
      <div v-for="plan in plans"
        :class="cn('relative rounded-xl border p-6', {
          'border-2 border-primary py-10': plan.isPopular,
        })"
        :key="plan.name"
      >
        <Badge v-if="plan.isPopular" class="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
        <h3 class="font-medium text-lg">{{ plan.name }}</h3>
        <p class="mt-4 font-semibold text-4xl">
          <NumberFlow
            class="font-satoshi"
            prefix="$"
            :value="selectedBillingPeriod === 'monthly'
                ? plan.price
                : plan.price * ((100 - YEARLY_DISCOUNT) / 100)"
          />
          <span class="ml-1.5 font-normal text-muted-foreground text-sm">
            /month
          </span>
        </p>
        <p class="mt-4 text-muted-foreground text-sm">
          {{ plan.description }}
        </p>

        <Button
          class="mt-6 w-full"
          size="lg"
          :variant="plan.isPopular ? 'default' : 'outline'"
        >
          {{ plan.buttonText }}
        </Button>
        <Separator class="my-8" />
        <ul class="space-y-2">
          <li v-for="feature in plan.features" class="flex items-start gap-1.5" :key="feature.title">
            <CircleCheck class="mt-1 h-4 w-4 text-green-600" />
            {{ feature.title }}
            <Tooltip v-if="feature.tooltip">
              <TooltipTrigger :aria-label="`About ${feature.title}`" class="cursor-help">

                <CircleHelp class="mt-1 h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>{{ feature.tooltip }}</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
