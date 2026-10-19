<!-- example: 2. Different Sides -->
<script setup lang="ts">
import { Stack, StackItem } from '@/components/stack'

const stacks = [
  { side: 'top', title: 'Top Stack', body: 'Items stack toward the top' },
  { side: 'bottom', title: 'Bottom Stack', body: 'Items stack toward the bottom' },
] as const
</script>

<template>
  <div class="grid w-full gap-8 sm:grid-cols-2">
    <div v-for="stack in stacks" :key="stack.side" class="flex h-56 items-center">
      <Stack expand-on-hover :side="stack.side" class="w-full">
        <StackItem class="flex flex-col gap-2">
          <h3 class="font-semibold">
            {{ stack.title }}
          </h3>
          <p class="text-muted-foreground text-sm">
            {{ stack.body }}
          </p>
        </StackItem>
        <StackItem class="flex flex-col gap-2">
          <h3 class="font-semibold">
            Item 2
          </h3>
          <p class="text-muted-foreground text-sm">
            Behind the first
          </p>
        </StackItem>
        <StackItem class="flex flex-col gap-2">
          <h3 class="font-semibold">
            Item 3
          </h3>
          <p class="text-muted-foreground text-sm">
            Behind the second
          </p>
        </StackItem>
      </Stack>
    </div>
  </div>
</template>
