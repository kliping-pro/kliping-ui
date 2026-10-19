<script lang="ts">
export const description = "Fitur berikon dengan gambar pendukung di tiap sel."
</script>

<script setup lang="ts">
import { BookCheck, ChartPie, FolderSync, Goal, Users, Zap } from '@lucide/vue'

const features = [
  {
    icon: Goal,
    title: "Identify Opportunities",
    description:
      "Easily uncover untapped areas to explore and expand your reach.",
    image: "/samples/photos/photo-15.svg",
  },
  {
    icon: BookCheck,
    title: "Build Authority",
    description: "Create valuable content that resonates and inspires trust.",
    image: "/samples/photos/photo-16.svg",
  },
  {
    icon: ChartPie,
    title: "Instant Insights",
    description: "Gain immediate, actionable insights with a quick glance.",
    image: "/samples/photos/photo-17.svg",
  },
  {
    icon: Users,
    title: "Engage with Your Audience",
    description: "Boost audience engagement with interactive features.",
    image: "/samples/photos/photo-18.svg",
  },
  {
    icon: FolderSync,
    title: "Automate Your Workflow",
    description: "Streamline your processes by automating repetitive tasks.",
    image: "/samples/photos/photo-19.svg",
  },
  {
    icon: Zap,
    title: "Accelerate Growth",
    description: "Supercharge your growth by implementing strategies.",
    image: "/samples/photos/photo-20.svg",
  },
  {
    icon: BookCheck,
    title: "Build Authority",
    description: "Create valuable content that resonates and inspires trust.",
    image: "/samples/photos/photo-21.svg",
  },
  {
    icon: ChartPie,
    title: "Instant Insights",
    description: "Gain immediate, actionable insights with a quick glance.",
    image: "/samples/photos/photo-22.svg",
  },
  {
    icon: Goal,
    title: "Identify Opportunities",
    description:
      "Easily uncover untapped areas to explore and expand your reach.",
    image: "/samples/photos/photo-23.svg",
  },
]
</script>

<template>
  <div class="px-6 py-20">
    <div class="mx-auto w-full max-w-(--breakpoint-xl)">
      <h2 class="text-pretty font-medium text-4xl tracking-[-0.04em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
        Strengthen your strategy
      </h2>
      <p class="mt-3 text-pretty text-muted-foreground text-xl -tracking-[0.01em] sm:text-center md:text-2xl">
        No complex configs. Just copy, paste, and start building
      </p>
      <div class="mt-12 grid gap-6 sm:mt-18 sm:gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        <a v-for="(feature, index) in features" href="#" :key="index">
          <div class="-mx-2 flex max-w-lg items-center gap-6 rounded-lg sm:mx-0">
            <div class="aspect-square h-24 shrink-0 overflow-hidden rounded-lg border border-border/20 bg-muted">
              <img
                alt=""
                class="size-full object-cover"
                :height="96"
                :src="feature.image"
                :width="96"
              />
            </div>
            <div class="">
              <span class="font-medium text-lg tracking-[-0.015em]">
                {{ feature.title }}
              </span>
              <p class="mt-1 text-pretty text-muted-foreground">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
