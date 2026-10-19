<!-- example: 3. Controlled State -->
<script setup lang="ts">
import { Copy, Heart, Plus, Share2, X } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
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

const open = ref(false)
</script>

<template>
  <div class="relative flex h-72 w-full items-end justify-center gap-4 p-4">
    <SpeedDial v-model:open="open">
      <SpeedDialContent>
        <SpeedDialItem v-for="action in actions" :key="action.label">
          <SpeedDialLabel class="sr-only">{{ action.label }}</SpeedDialLabel>
          <SpeedDialAction @select="lastAction = action.done">
            <component :is="action.icon" />
          </SpeedDialAction>
        </SpeedDialItem>
      </SpeedDialContent>
      <SpeedDialTrigger class="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
        <X v-if="open" />
        <Plus v-else />
      </SpeedDialTrigger>
    </SpeedDial>
    <Button variant="outline" @click="open = !open">
      Toggle
    </Button>
    <p class="absolute top-2 left-2 text-muted-foreground text-xs" aria-live="polite">
      {{ lastAction }}
    </p>
  </div>
</template>
