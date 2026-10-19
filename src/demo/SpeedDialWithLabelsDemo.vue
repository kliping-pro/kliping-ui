<!-- example: 1. With Labels -->
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
</script>

<template>
  <div class="relative flex h-72 w-full items-end justify-center p-4">
    <SpeedDial>
      <SpeedDialContent>
        <SpeedDialItem v-for="action in actions" :key="action.label">
          <SpeedDialLabel>{{ action.label }}</SpeedDialLabel>
          <SpeedDialAction @select="lastAction = action.done">
            <component :is="action.icon" />
          </SpeedDialAction>
        </SpeedDialItem>
      </SpeedDialContent>
      <SpeedDialTrigger class="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
        <Plus />
      </SpeedDialTrigger>
    </SpeedDial>
    <p class="absolute top-2 left-2 text-muted-foreground text-xs" aria-live="polite">
      {{ lastAction }}
    </p>
  </div>
</template>
