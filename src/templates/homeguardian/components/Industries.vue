<script setup lang="ts">
import {
  ArrowUpRightIcon,
  Cctv,
  CpuIcon,
  HeartHandshakeIcon,
  HousePlugIcon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import CtaBanner from '@/templates/homeguardian/components/CtaBanner.vue'
import PatternDashedTop from '@/templates/homeguardian/components/PatternDashedTop.vue'

const industries = [
  {
    icon: Cctv,
    title: "Security Cameras",
    description:
      "Keep all eyes on your home with our customized security video surveillance systems.",
  },
  {
    icon: HousePlugIcon,
    title: "Home Automation",
    description:
      "Discover the easy-to-use automation system that offers total control of your home.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Fire and Life Safety",
    description:
      "Prepare your home for the unexpected with our fire and life safety appliances.",
  },
  {
    icon: CpuIcon,
    title: "Adjustment Systems",
    description:
      "Keep all eyes on your home with our customized security video surveillance systems.",
  },
]
</script>

<template>
  <div id="industries" class="bg-primary/4">
    <div class="max-w-(--breakpoint-xl) mx-auto px-6 text-center py-24">
      <strong class="font-semibold text-muted-foreground">
        Best for You
      </strong>
      <h2 class="mt-5 max-w-4xl mx-auto text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tighter text-balance">
        Industries in Which We Show the Highest Class
      </h2>
      <p class="mt-5 text-lg text-muted-foreground">
        On the other hand, we denounce with righteous
      </p>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div v-for="industry in industries"
          :key="industry.title"
          class="rounded-lg border bg-muted p-1"
        >
          <div class="relative px-6 py-10 bg-card rounded-md border h-full overflow-hidden">
            <div class="relative z-1 flex flex-col items-center">
              <component :is="industry.icon"
                class="size-12 text-primary"
                :stroke-width="1.75"
              />
              <h3 class="mt-8 text-xl font-semibold tracking-tight">
                {{ industry.title }}
              </h3>
              <p class="mt-3">{{ industry.description }}</p>

              <Button class="mt-6">
                Learn More <ArrowUpRightIcon />
              </Button>
            </div>

            <PatternDashedTop />
          </div>
        </div>
      </div>

      <CtaBanner class="mt-24" />
    </div>
  </div>
</template>
