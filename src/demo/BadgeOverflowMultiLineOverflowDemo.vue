<!-- example: 1. Multi-line Overflow -->
<script setup lang="ts">
import { BadgeOverflow } from '@/components/badge-overflow'
import { Badge } from '@/components/ui/badge'

const technologies = [
  'Vue', 'TypeScript', 'Nuxt', 'Tailwind CSS', 'Reka UI', 'Pinia', 'TanStack Query',
  'Prisma', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Vercel', 'GitHub Actions',
]
const examples = [
  { title: 'Single Line (default)', lineCount: 1, variant: 'secondary' },
  { title: 'Two Lines', lineCount: 2, variant: 'outline' },
  { title: 'Three Lines', lineCount: 3, variant: 'default' },
] as const
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-for="example in examples" :key="example.title" class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        {{ example.title }}
      </h3>
      <div class="w-64 rounded-md border p-3">
        <BadgeOverflow class="gap-1.5" :items="technologies" :line-count="example.lineCount">
          <template #badge="{ label }">
            <Badge :variant="example.variant">
              {{ label }}
            </Badge>
          </template>
        </BadgeOverflow>
      </div>
    </div>
  </div>
</template>
