<script setup lang="ts">
import { useNetwork } from '@/composables/use-network'

const network = useNetwork()
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Network Info
      </h3>
      <p class="text-muted-foreground text-sm">
        Connection state and quality reported by the browser.
      </p>
    </div>

    <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Status</span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="network.online ? 'bg-primary text-primary-foreground' : 'bg-destructive/10 text-destructive'"
      >
        <span class="size-1.5 rounded-full" :class="network.online ? 'bg-primary-foreground' : 'bg-destructive'" />
        {{ network.online ? 'Online' : 'Offline' }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Effective type</span>
        <span class="font-medium font-mono text-sm">{{ network.effectiveType ?? '—' }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Downlink</span>
        <span class="font-medium font-mono text-sm tabular-nums">
          {{ network.downlink ?? '—' }}<span v-if="network.downlink != null" class="text-muted-foreground"> Mb/s</span>
        </span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Round trip</span>
        <span class="font-medium font-mono text-sm tabular-nums">
          {{ network.rtt ?? '—' }}<span v-if="network.rtt != null" class="text-muted-foreground"> ms</span>
        </span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Save data</span>
        <span class="font-medium font-mono text-sm">{{ network.saveData ?? '—' }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      “—” means no <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">navigator.connection</code>
    </p>
  </div>
</template>
