<script lang="ts">
export const description = "Menempel di baris menu, menandai yang baru dan yang percobaan."
</script>

<script setup lang="ts">
import { CheckIcon, FlaskConicalIcon, SparklesIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    title: "Unlimited Projects",
  },
  {
    title: "Custom Integrations",
    isNew: true,
  },
  {
    title: "Advanced Analytics",
    isExperimental: true,
  },
  {
    title: "Priority Support",
  },
  {
    title: "Team Collaboration",
  },
]
</script>

<template>
  <ul class="space-y-2.5">
    <li v-for="feature in features" class="flex items-center gap-2 text-sm" :key="feature.title">
      <CheckIcon class="size-4" />
      {{ feature.title }}
      <Badge v-if="feature.isExperimental"
        class="ms-1 border-amber-600/30 bg-amber-600/10 text-amber-600 dark:bg-amber-600/15"
        variant="outline"
      >
        <FlaskConicalIcon /> Experimental
      </Badge>
      <Badge v-if="feature.isNew"
        class="ms-1 border-blue-600/30 bg-blue-600/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400"
        variant="outline"
      >
        <SparklesIcon /> New
      </Badge>
    </li>
  </ul>
</template>
