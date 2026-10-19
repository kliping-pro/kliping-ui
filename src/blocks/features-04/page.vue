<script lang="ts">
export const description = "Daftar fitur akordeon di sebelah panel gambar."
</script>

<script setup lang="ts">
import { BookCheck, ChartPie, FolderSync, Goal, Users, Zap } from '@lucide/vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const features = [
  {
    icon: Goal,
    title: "Identify Opportunities",
    description:
      "Easily uncover untapped areas to explore and expand your reach effortlessly and effectively.",
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
  <div class="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-20">
    <h2 class="max-w-lg text-pretty font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem] md:leading-14">
      Build scalable interfaces with minimal effort
    </h2>
    <div class="mx-auto mt-8 grid w-full gap-12 md:mt-12 md:grid-cols-2">
      <div>
        <Accordion class="w-full" defaultValue="item-0" type="single">
          <AccordionItem v-for="({ title, description, icon: Icon }, index) in features"
            class="group/accordion-item data-[state=open]:border-primary data-[state=open]:border-b-2"
            :key="index"
            :value="`item-${index}`"
          >
            <AccordionTrigger class="text-lg group-first/accordion-item:pt-0 [&>svg]:hidden">
              <div class="flex items-center gap-4">
                <component :is="Icon" />
                {{ title }}
              </div>
            </AccordionTrigger>
            <AccordionContent class="text-[17px] text-muted-foreground leading-relaxed">
              {{ description }}
              <div class="mt-6 mb-2 aspect-video w-full rounded-xl bg-muted md:hidden" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <!-- Media -->
      <div class="hidden h-full w-full rounded-xl bg-muted md:block" />
    </div>
  </div>
</template>
