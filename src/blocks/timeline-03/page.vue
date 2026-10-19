<script lang="ts">
export const description = "Riwayat pekerjaan berikon dengan daftar teknologi."
</script>

<script setup lang="ts">
import { Bot, Bug, Building2, Calendar, Database } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2023 - Present",
    description:
      "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    icon: Bot,
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Inc",
    period: "2021 - 2023",
    description:
      "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
    technologies: ["React", "Express.js", "PostgreSQL", "Docker", "Redis"],
    icon: Database,
  },
  {
    title: "Frontend Developer",
    company: "WebTech Studios",
    period: "2018 - 2021",
    description:
      "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.",
    technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"],
    icon: Bug,
  },
]
</script>

<template>
  <div class="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
    <div class="relative ml-3">
      <!-- Timeline line -->
      <div class="absolute inset-y-0 left-0 border-l-2" />

        <div v-for="({ company, description, period, technologies, title, icon: Icon }, index) in experiences" class="relative pb-12 pl-10 last:pb-0" :key="index">
          <!-- Timeline Icon -->
          <div class="absolute left-px flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-background">
            <component :is="Icon" class="h-5 w-5" />
          </div>

          <!-- Content -->
          <div class="space-y-3">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                <Building2 class="h-5 w-5 text-muted-foreground" />
              </div>
              <span class="font-medium text-base">{{ company }}</span>
            </div>
            <div>
              <h3 class="font-medium text-xl tracking-[-0.01em]">
                {{ title }}
              </h3>
              <div class="mt-2 flex items-center gap-2 text-sm">
                <Calendar class="h-4 w-4" />
                <span>{{ period }}</span>
              </div>
            </div>
            <p class="text-pretty text-muted-foreground text-sm sm:text-base">
              {{ description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="tech in technologies"
                class="rounded-full"
                :key="tech"
                variant="secondary"
              >
                {{ tech }}
              </Badge>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
