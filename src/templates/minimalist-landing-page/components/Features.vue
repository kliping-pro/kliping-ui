<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BookCheck, ChartPie, FolderSync, Goal, Users, Zap } from '@lucide/vue'

const features = [
  {
    icon: Goal,
    title: "Identify Opportunities",
    description:
      "Easily uncover untapped areas to explore and expand your reach effortlessly.",
  },
  {
    icon: BookCheck,
    title: "Build Authority",
    description:
      "Create valuable content that resonates, inspires trust, and positions you as an expert.",
  },
  {
    icon: ChartPie,
    title: "Instant Insights",
    description:
      "Gain immediate, actionable insights with a quick glance, enabling fast decision-making.",
  },
  {
    icon: Users,
    title: "Engage with Your Audience",
    description:
      "Boost audience engagement with interactive features like polls, quizzes, and forms.",
  },
  {
    icon: FolderSync,
    title: "Automate Your Workflow",
    description:
      "Streamline your processes by automating repetitive tasks, saving time and reducing effort.",
  },
  {
    icon: Zap,
    title: "Accelerate Growth",
    description:
      "Supercharge your growth by implementing strategies that drive results quickly and efficiently.",
  },
]
</script>

<template>
  <div
    id="features"
    class="max-w-(--breakpoint-xl) mx-auto w-full py-12 xs:py-20 px-6"
  >
    <h2 class="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-semibold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
      Boost Your Strategy with Smart Features
    </h2>
    <div class="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
      <Card v-for="feature in features"
        :key="feature.title"
        class="flex flex-col border rounded-xl overflow-hidden shadow-none"
      >
        <CardHeader>
          <component :is="feature.icon" />
          <h4 class="mt-3! text-xl font-semibold tracking-tight">
            {{ feature.title }}
          </h4>
          <p class="mt-1 text-muted-foreground text-sm xs:text-[17px]">
            {{ feature.description }}
          </p>
        </CardHeader>
        <CardContent class="mt-auto px-0 pb-0">
          <div class="bg-muted h-52 ml-6 rounded-tl-xl" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
