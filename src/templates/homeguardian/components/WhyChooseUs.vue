<script setup lang="ts">
import {
  ArrowUpRightIcon,
  BinocularsIcon,
  CogIcon,
  ShieldCheckIcon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import LogoCloud from '@/templates/homeguardian/components/LogoCloud.vue'
import BackgroundPattern from '@/templates/homeguardian/components/BackgroundPattern.vue'

const plusPoints = [
  {
    icon: ShieldCheckIcon,
    title: "Real-Time Protection",
    description:
      "Stay alert with instant notifications and smart security monitoring.",
  },
  {
    icon: CogIcon,
    title: "Smart & Simple Setup",
    description: "Install easily in minutes with no complex tools or wiring.",
  },
  {
    icon: BinocularsIcon,
    title: "Peace of Mind Anywhere",
    description: "Monitor and control your home from anywhere, anytime.",
  },
]
</script>

<template>
  <div
    id="why-choose-us"
    class="max-w-(--breakpoint-xl) mx-auto px-6 text-center py-24"
  >
    <strong class="font-semibold text-muted-foreground">
      Why Choose Us
    </strong>
    <h2 class="mt-5 max-w-4xl mx-auto text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tighter text-balance">
      We are Leading in Smart Assistants with Nearly 20 Years of Experience
    </h2>
    <p class="mt-5 text-lg text-muted-foreground">
      We are constantly always keep pace with the time.
    </p>

    <div class="mt-12 flex flex-wrap gap-4 justify-center">
      <div v-for="plusPoint in plusPoints"
        :key="plusPoint.title"
        class="relative overflow-hidden border rounded-lg px-6 py-10 w-full sm:max-w-xs flex flex-col items-center gap-2 bg-gradient-to-b from-primary/3"
      >
        <BackgroundPattern />

        <component :is="plusPoint.icon" class="size-14 stroke-[1.5px] text-primary" />
        <h3 class="mt-6 text-xl font-semibold">{{ plusPoint.title }}</h3>
        <p class="text-muted-foreground text-balance">
          {{ plusPoint.description }}
        </p>
        <Button class="mt-6">
          Learn More <ArrowUpRightIcon />
        </Button>
      </div>
    </div>

    <div class="mt-32 space-y-12">
      <p class="text-3xl font-medium tracking-tight">
        Trusted by over 30,000 businesses and 1,500,000 users
      </p>
      <LogoCloud />
    </div>
  </div>
</template>
