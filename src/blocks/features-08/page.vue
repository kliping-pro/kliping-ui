<script lang="ts">
export const description = "Enam fitur berikon dalam petak bergaris pemisah."
</script>

<script setup lang="ts">
import {
  Cable,
  Code,
  Contrast,
  MonitorSmartphone,
  SquareDashedMousePointer,
  Zap,
} from '@lucide/vue'

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
      Everything in one place
    </h2>
    <p class="mt-3.5 text-pretty text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Designed for speed, flexibility, and ease of use
    </p>

    <div class="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(feature, index) in features" class="rounded-xl border bg-card px-6 py-7" :key="index">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-primary/15">
          <component :is="feature.icon" />
        </div>
        <h3 class="mt-5 font-medium text-lg tracking-[-0.005em]">
          {{ feature.title }}
        </h3>
        <p class="mt-2 text-base text-foreground/70">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>
