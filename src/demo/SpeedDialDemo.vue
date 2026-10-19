<script setup lang="ts">
import { FileText, Image, Link2, Mic } from '@lucide/vue'
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from '@/components/speed-dial'

const actions = [
  { label: 'Upload file', icon: FileText },
  { label: 'Insert image', icon: Image },
  { label: 'Record audio', icon: Mic },
  { label: 'Paste link', icon: Link2 },
]
</script>

<template>
  <div class="flex h-72 w-full items-end justify-end rounded-md border bg-muted/30 p-4">
    <SpeedDial side="top">
      <SpeedDialContent>
        <SpeedDialItem v-for="action in actions" :key="action.label">
          <SpeedDialLabel>{{ action.label }}</SpeedDialLabel>
          <SpeedDialAction>
            <component :is="action.icon" />
          </SpeedDialAction>
        </SpeedDialItem>
      </SpeedDialContent>
      <SpeedDialTrigger />
    </SpeedDial>
  </div>
</template>
