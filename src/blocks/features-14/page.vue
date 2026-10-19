<script lang="ts">
export const description = "Fitur satu kolom dengan judul panjang dan tombol ajakan."
</script>

<script setup lang="ts">
import {
  ArrowUpRightIcon,
  BinocularsIcon,
  CogIcon,
  ShieldCheckIcon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import BackgroundPattern from '@/blocks/features-14/components/BackgroundPattern.vue'

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
    class="mx-auto max-w-(--breakpoint-xl) px-6 py-24 text-center"
    id="why-choose-us"
  >
    <strong class="font-medium text-muted-foreground text-sm uppercase tracking-wide">
      Why Choose Us
    </strong>
    <h2 class="mx-auto mt-5 max-w-4xl text-balance font-medium text-4xl/tight tracking-[-0.04em] sm:text-[2.75rem]">
      We are Leading in Smart Assistants with Nearly 20 Years of Experience
    </h2>
    <p class="mt-5 text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      We are constantly always keep pace with the time.
    </p>

    <div class="mt-16 flex flex-wrap justify-center gap-4">
      <div v-for="plusPoint in plusPoints"
        class="relative w-full overflow-hidden rounded-lg border bg-linear-to-b from-foreground/3 px-6 py-10 sm:max-w-xs"
        :key="plusPoint.title"
      >
        <BackgroundPattern />

        <div class="isolate flex flex-col items-center gap-2">
          <component :is="plusPoint.icon" class="size-14 stroke-[1.5px] text-foreground" />
          <h3 class="mt-8 font-medium text-xl tracking-[-0.005em]">
            {{ plusPoint.title }}
          </h3>
          <p class="text-balance text-base text-muted-foreground">
            {{ plusPoint.description }}
          </p>
          <Button class="mt-6">
            Learn More <ArrowUpRightIcon />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
