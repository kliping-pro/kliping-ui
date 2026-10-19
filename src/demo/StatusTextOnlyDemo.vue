<!-- example: 2. Text Only -->
<script setup lang="ts">
import { Status, StatusLabel } from '@/components/status'

const statuses = [
  { variant: 'success', label: 'Active' },
  { variant: 'error', label: 'Inactive' },
  { variant: 'warning', label: 'Pending' },
  { variant: 'info', label: 'Processing' },
  { variant: 'default', label: 'Draft' },
] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-2.5">
    <Status v-for="status in statuses" :key="status.variant" :variant="status.variant">
      <StatusLabel>{{ status.label }}</StatusLabel>
    </Status>
  </div>
</template>
