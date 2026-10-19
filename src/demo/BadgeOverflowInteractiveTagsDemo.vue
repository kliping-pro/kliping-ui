<!-- example: 2. Interactive Tags -->
<script setup lang="ts">
import { X } from '@lucide/vue'
import { ref } from 'vue'
import { BadgeOverflow } from '@/components/badge-overflow'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Tag {
  label: string
  value: string
}

const tags = ref<Tag[]>([
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Tailwind CSS', value: 'tailwindcss' },
  { label: 'Reka UI', value: 'reka-ui' },
  { label: 'Pinia', value: 'pinia' },
  { label: 'TanStack Query', value: 'tanstack-query' },
  { label: 'Prisma', value: 'prisma' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'MySQL', value: 'mysql' },
  { label: 'MongoDB', value: 'mongodb' },
])
const input = ref('')

function addTag() {
  const label = input.value.trim()
  if (!label)
    return
  tags.value = [...tags.value, { label, value: label }]
  input.value = ''
}

function removeTag(value: string) {
  tags.value = tags.value.filter(tag => tag.value !== value)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        Tags with Overflow
      </h3>
      <div class="w-full max-w-80 resize-x overflow-hidden rounded-md border p-3">
        <BadgeOverflow class="gap-1.5" :items="tags" :get-badge-label="tag => tag.label" :line-count="2">
          <template #badge="{ item, label }">
            <Badge as="button" type="button" variant="secondary" class="cursor-pointer" :aria-label="`Remove ${label}`" @click="removeTag(item.value)">
              <span>{{ label }}</span>
              <X class="size-3" />
            </Badge>
          </template>
          <template #overflow="{ count }">
            <Badge variant="outline" class="bg-muted">
              +{{ count }} more
            </Badge>
          </template>
        </BadgeOverflow>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <Input v-model="input" aria-label="New tag" placeholder="Add a tag..." class="max-w-64 flex-1" @keydown.enter.prevent="addTag" />
      <Button type="button" @click="addTag">
        Add
      </Button>
    </div>
    <div class="text-muted-foreground flex flex-col gap-px text-sm text-balance">
      <p>Click on a badge to remove it.</p>
      <p>Resize the container to see overflow behavior.</p>
    </div>
  </div>
</template>
