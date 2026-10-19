<script setup lang="ts">
import { BadgeOverflow } from '@/components/badge-overflow'
import { Badge } from '@/components/ui/badge'

const technologies = [
  'Vue', 'TypeScript', 'Vite', 'Tailwind CSS', 'VitePress', 'Reka UI',
  'Vitest', 'Playwright', 'Cloudflare Pages', 'Shiki',
]
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <BadgeOverflow class="gap-1.5" :items="technologies">
      <template #badge="{ label }">
        <Badge variant="secondary">
          {{ label }}
        </Badge>
      </template>
    </BadgeOverflow>

    <BadgeOverflow class="gap-1.5" :items="technologies" :line-count="2">
      <template #badge="{ label }">
        <Badge variant="outline">
          {{ label }}
        </Badge>
      </template>
      <template #overflow="{ count }">
        <Badge>+{{ count }} more</Badge>
      </template>
    </BadgeOverflow>
  </div>
</template>
