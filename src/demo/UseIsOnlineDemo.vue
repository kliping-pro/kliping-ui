<script setup lang="ts">
import { WifiIcon, WifiOffIcon } from '@lucide/vue'
import { useIsOnline } from '@/composables/use-is-online'

const isOnline = useIsOnline()
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Connection Status
      </h3>
      <p class="text-muted-foreground text-sm">
        Reacts the moment the browser goes online or offline.
      </p>
    </div>

    <div class="flex flex-col items-center gap-3 rounded-lg border bg-muted/40 px-4 py-6">
      <div
        class="flex size-12 items-center justify-center rounded-full border bg-background transition-colors"
        :class="isOnline ? 'text-primary' : 'text-destructive'"
      >
        <WifiIcon v-if="isOnline" class="size-5" />
        <WifiOffIcon v-else class="size-5" />
      </div>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="isOnline ? 'bg-primary text-primary-foreground' : 'bg-destructive/10 text-destructive'"
      >
        <span class="size-1.5 rounded-full" :class="isOnline ? 'bg-primary-foreground' : 'bg-destructive'" />
        {{ isOnline ? 'Online' : 'Offline' }}
      </span>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Network only, not internet access. Try <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">Offline</code> in DevTools.
    </p>
  </div>
</template>
