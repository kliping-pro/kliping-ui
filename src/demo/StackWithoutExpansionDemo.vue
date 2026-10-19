<!-- example: 1. Without Expansion -->
<script setup lang="ts">
import { Stack, StackItem } from '@/components/stack'

const items = [
  { title: 'Static Stack', body: 'This stack doesn\'t expand on hover' },
  { title: 'Item 2', body: 'The stacking effect remains constant' },
  { title: 'Item 3', body: 'Perfect for permanent visual hierarchy' },
]
</script>

<template>
  <div class="h-56 w-full max-w-sm">
    <Stack :expand-on-hover="false">
      <StackItem v-for="item in items" :key="item.title" class="flex flex-col gap-2">
        <h3 class="font-semibold">
          {{ item.title }}
        </h3>
        <p class="text-muted-foreground text-sm">
          {{ item.body }}
        </p>
      </StackItem>
    </Stack>
  </div>
</template>
