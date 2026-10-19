<!-- example: 4. Sides -->
<script setup lang="ts">
import { Copy, Heart, Plus, Share2 } from '@lucide/vue'
import { ref } from 'vue'
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from '@/components/speed-dial'

const actions = [
  { label: 'Share', done: 'Shared', icon: Share2 },
  { label: 'Copy', done: 'Copied', icon: Copy },
  { label: 'Like', done: 'Liked', icon: Heart },
]

const lastAction = ref('No action yet')

const sides = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="relative grid w-full grid-cols-2 gap-4">
    <div v-for="side in sides" :key="side" class="flex h-56 flex-col items-center justify-center gap-2">
      <span class="text-muted-foreground text-sm capitalize">{{ side }}</span>
      <SpeedDial :side="side">
        <SpeedDialContent>
          <SpeedDialItem v-for="action in actions" :key="action.label">
            <SpeedDialLabel class="sr-only">{{ action.label }}</SpeedDialLabel>
            <SpeedDialAction @select="lastAction = action.done">
              <component :is="action.icon" />
            </SpeedDialAction>
          </SpeedDialItem>
        </SpeedDialContent>
        <SpeedDialTrigger class="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
          <Plus />
        </SpeedDialTrigger>
      </SpeedDial>
    </div>
    <p class="absolute top-2 left-2 text-muted-foreground text-xs" aria-live="polite">
      {{ lastAction }}
    </p>
  </div>
</template>
