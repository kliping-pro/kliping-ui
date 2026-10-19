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
  <div id="features" class="w-full py-12 xs:py-20 px-6">
    <h2 class="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
      Unleash Your Creativity
    </h2>
    <div class="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="feature in features"
        :key="feature.title"
        class="flex flex-col bg-background border rounded-xl py-6 px-5"
      >
        <div class="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
          <component :is="feature.icon" class="h-6 w-6" />
        </div>
        <span class="text-lg font-semibold">{{ feature.title }}</span>
        <p class="mt-1 text-foreground/80 text-[15px]">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>
