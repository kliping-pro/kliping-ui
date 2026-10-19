<!-- example: 3. Service Status List -->
<script setup lang="ts">
import { Status, StatusIndicator, StatusLabel } from '@/components/status'

const services = [
  { name: 'API Server', status: 'success', uptime: '99.9%' },
  { name: 'Cache Service', status: 'warning', uptime: '98.5%' },
  { name: 'Message Queue', status: 'success', uptime: '99.8%' },
  { name: 'CDN', status: 'error', uptime: '95.2%' },
  { name: 'Email Service', status: 'info', uptime: 'Updating...' },
] as const
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-2">
    <div
      v-for="service in services"
      :key="service.name"
      class="flex items-center justify-between rounded-lg border bg-card p-3"
    >
      <div class="flex flex-col gap-0.5">
        <span class="text-sm font-medium">{{ service.name }}</span>
        <span class="text-xs text-muted-foreground">Uptime: {{ service.uptime }}</span>
      </div>
      <Status :variant="service.status">
        <StatusIndicator />
        <StatusLabel class="capitalize">
          {{ service.status }}
        </StatusLabel>
      </Status>
    </div>
  </div>
</template>
