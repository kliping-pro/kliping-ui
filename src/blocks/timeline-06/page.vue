<script lang="ts">
export const description = "Lini masa bertahap dengan penanda langkah yang sudah selesai."
</script>

<script setup lang="ts">
import { Check } from '@lucide/vue'
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Research",
    description:
      "Gather information and analyze requirements to understand the problem and define objectives.",
    completed: true,
  },
  {
    title: "Planning",
    description:
      "Create a roadmap, define the scope, and outline the necessary steps to achieve the goal.",
    completed: true,
  },
  {
    title: "Design",
    description:
      "Develop wireframes, mockups, and prototypes to visualize the structure and user experience.",
    completed: true,
  },
  {
    title: "Development",
    description:
      "Write code, integrate features, and build the core functionality of the application.",
  },
  {
    title: "Testing",
    description:
      "Perform quality assurance, fix bugs, and optimize performance before release.",
  },
  {
    title: "Deployment",
    description:
      "Launch the project in a live environment and ensure smooth deployment.",
  },
  {
    title: "Maintenance",
    description:
      "Monitor performance, update features, and provide ongoing support and improvements.",
  },
]
</script>

<template>
  <div class="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
    <div class="relative ml-6">
      <!-- Timeline line -->
      <div class="absolute inset-y-0 left-0 border-l" />

      <div v-for="({ title, description, completed }, index) in steps" class="relative pb-10 pl-10 last:pb-0" :key="index">
        <!-- Timeline Icon -->
        <div
          :class="cn(
            'absolute left-px flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-muted-foreground/40 bg-accent ring-8 ring-background',
            {
              'border-primary bg-primary text-primary-foreground':
                completed,
            }
          )"
        >
          <Check v-if="completed" class="h-5 w-5" />
          <span v-else class="font-medium text-lg">{{ index + 1 }}</span>
        </div>

        <!-- Content -->
        <div class="space-y-1.5 pt-1">
          <h3 class="font-medium text-xl tracking-[-0.01em]">
            {{ title }}
          </h3>
          <p class="text-lg text-muted-foreground">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
