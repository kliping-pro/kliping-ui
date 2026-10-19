<!-- example: 2. Custom Position -->
<script setup lang="ts">
import { ref } from 'vue'
import { Fps } from '@/components/fps'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const positions: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
const position = ref<Position>('bottom-left')
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4">
    <ToggleGroup
      :model-value="position"
      type="single"
      variant="outline"
      size="sm"
      aria-label="Position"
      @update:model-value="(value) => value && (position = value as Position)"
    >
      <ToggleGroupItem v-for="item in positions" :key="item" :value="item">
        {{ item }}
      </ToggleGroupItem>
    </ToggleGroup>
    <div class="relative h-40 w-full rounded-lg border bg-muted/50">
      <Fps strategy="absolute" :position="position" />
    </div>
  </div>
</template>
