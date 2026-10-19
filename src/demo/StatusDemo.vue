<script setup lang="ts">
import { Status, StatusIndicator, StatusLabel } from '@/components/status'

const statuses = [
  { variant: 'default', label: 'Offline' },
  { variant: 'success', label: 'Online' },
  { variant: 'warning', label: 'Degraded' },
  { variant: 'error', label: 'Outage' },
  { variant: 'info', label: 'Maintenance' },
] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Status v-for="status in statuses" :key="status.variant" :variant="status.variant">
      <StatusIndicator />
      <StatusLabel>{{ status.label }}</StatusLabel>
    </Status>
  </div>
</template>
