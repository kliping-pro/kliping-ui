<!-- example: 1. Variants -->
<script setup lang="ts">
import { Status, StatusIndicator, StatusLabel } from '@/components/status'

const groups = [
  { title: 'Success Variants', variant: 'success', labels: ['Online', 'Active', 'Connected'] },
  { title: 'Error Variants', variant: 'error', labels: ['Offline', 'Disconnected', 'Failed'] },
  { title: 'Warning Variants', variant: 'warning', labels: ['Away', 'Busy', 'Pending'] },
  { title: 'Info Variants', variant: 'info', labels: ['Idle', 'In Progress', 'Syncing'] },
  { title: 'Default Variants', variant: 'default', labels: ['Unknown', 'Not Set', 'N/A'] },
] as const
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="group in groups" :key="group.variant" class="flex flex-col gap-3">
      <h3 class="text-sm font-medium">
        {{ group.title }}
      </h3>
      <div class="flex flex-wrap items-center gap-2.5">
        <Status
          v-for="(label, index) in group.labels"
          :key="label"
          :variant="group.variant"
          :class="index === 2 ? 'hidden sm:inline-flex' : undefined"
        >
          <StatusIndicator />
          <StatusLabel>{{ label }}</StatusLabel>
        </Status>
      </div>
    </div>
  </div>
</template>
