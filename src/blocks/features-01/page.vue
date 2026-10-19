<script lang="ts">
export const description = "Enam fitur berikon dalam petak berbingkai tiga kolom."
</script>

<script setup lang="ts">
import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from '@lucide/vue'

const features = [
  {
    icon: Settings2,
    title: "Customizable Layouts",
    description:
      "Design your space with drag-and-drop simplicity—create grids, lists, or galleries in seconds.",
  },
  {
    icon: Blocks,
    title: "Interactive Widgets",
    description:
      "Embed polls, quizzes, or forms to keep your audience engaged.",
  },
  {
    icon: Bot,
    title: "AI-Powered Tools",
    description:
      "Generate summaries, auto-format content, or translate into multiple languages seamlessly.",
  },
  {
    icon: Film,
    title: "Media Integrations",
    description:
      "Connect with Spotify, Instagram, or your own media library for dynamic visuals and sound.",
  },
  {
    icon: ChartPie,
    title: "Advanced Analytics",
    description:
      "Track engagement, clicks, and user activity with intuitive charts and reports.",
  },
  {
    icon: MessageCircle,
    title: "Seamless Collaboration",
    description:
      "Comment, tag, and assign tasks directly within your documents.",
  },
]
</script>

<template>
  <div class="px-6 py-20">
    <h2 class="mx-auto max-w-3xl text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]">
      Ready out of the box
    </h2>
    <p class="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
      Simple, customizable, and easy to drop into your workflow
    </p>
    <div class="mx-auto mt-10 grid max-w-(--breakpoint-lg) gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="feature in features"
        class="flex flex-col rounded-xl border bg-card p-6"
        :key="feature.title"
      >
        <div class="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <component :is="feature.icon" class="size-5" />
        </div>
        <span class="font-medium text-lg">{{ feature.title }}</span>
        <p class="mt-1 text-[15px] text-foreground/80">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>
