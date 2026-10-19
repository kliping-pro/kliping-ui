<script lang="ts">
export const description = "Petak fitur berikon dengan sel yang tidak seragam ukurannya."
</script>

<script setup lang="ts">
import {
  ArrowUpRight,
  Cable,
  Code,
  Contrast,
  MonitorSmartphone,
  Smile,
  SquareDashedMousePointer,
  Zap,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: "Blazing Fast Performance",
    description:
      "Optimized for speed with minimal loading times and instant interactions, ensuring a smooth experience across devices.",
    icon: Zap,
  },
  {
    title: "Fully Customizable",
    description:
      "Tailor every component to match your brand or workflow — with built-in support for themes, layouts, and configurations.",
    icon: SquareDashedMousePointer,
  },
  {
    title: "Developer-Friendly",
    description:
      "Built with clean, modern code and best practices in mind, making it easy to integrate, extend, and scale.",
    icon: Code,
  },
  {
    title: "Responsive by Default",
    description:
      "Every component is designed to look great on all screen sizes — no extra work needed to make things mobile-friendly.",
    icon: MonitorSmartphone,
  },
  {
    title: "Accessible for Everyone",
    description:
      "Built with accessibility best practices in mind to ensure an inclusive experience for all users, regardless of ability.",
    icon: Contrast,
  },
  {
    title: "Seamless Integration",
    description:
      "Easily connect with your favorite tools, APIs, and services — whether it's authentication, databases, or third-party libraries.",
    icon: Cable,
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col px-6 py-20">
    <h2 class="text-pretty text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Designed to scale
    </h2>
    <p class="mt-3 text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Spend less time configuring and more time creating
    </p>

    <div class="mt-20 grid grid-cols-1 bg-card sm:grid-cols-2 lg:grid-cols-3">
      <div class="-mr-px flex h-16 items-center border px-6 font-medium text-lg sm:col-span-2 md:col-span-1">
        <Smile class="mr-4 text-primary" /> Features that make you happy
      </div>
      <div class="-mr-px hidden h-16 border bg-[repeating-linear-gradient(315deg,var(--muted)_0,var(--muted)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed md:block lg:col-span-2" />
      <div v-for="(feature, index) in features"
        class="-mt-px -mr-px border border-border/75 px-5 pt-7 pb-5"
        :key="index"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/7 text-primary dark:bg-primary/10">
            <component :is="feature.icon" class="h-5 w-5" />
          </div>
          <h3 class="font-medium text-lg tracking-[-0.005em]">
            {{ feature.title }}
          </h3>
        </div>
        <p class="mt-4 text-foreground/80">{{ feature.description }}</p>

        <Button as-child class="mt-4 px-0!" variant="link">
          <a href="#" target="_blank">
            Learn more <ArrowUpRight />
          </a>
        </Button>
      </div>
    </div>
  </div>
</template>
