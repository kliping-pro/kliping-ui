<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar } from '@lucide/vue'

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const { title, company, period, description, technologies } = defineProps<ExperienceItemProps>()
</script>

<template>
  <div class="relative pl-8 not-last:pb-12">
    <!-- Timeline line -->
    <div class="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
      <div class="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
    </div>

    <!-- Content -->
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
          <Building2 class="size-5 text-muted-foreground" />
        </div>
        <span class="text-lg font-semibold">{{ company }}</span>
      </div>
      <div>
        <h3 class="text-xl font-medium">{{ title }}</h3>
        <div class="flex items-center gap-2 mt-1 text-sm">
          <Calendar class="size-4" />
          <span>{{ period }}</span>
        </div>
      </div>
      <p class="text-muted-foreground">{{ description }}</p>
      <div class="flex flex-wrap gap-2">
        <Badge v-for="tech in technologies" :key="tech" variant="secondary" class="rounded-full">
          {{ tech }}
        </Badge>
      </div>
    </div>
  </div>
</template>
