<script setup lang="ts">
import { useMouse } from '@/composables/use-mouse'

const { x, y, sourceType } = useMouse({ type: 'client' })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Mouse Position
      </h3>
      <p class="text-muted-foreground text-sm">
        Live pointer coordinates — move or touch anywhere.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">X</span>
        <span class="font-mono font-semibold text-2xl tabular-nums tracking-tight">{{ Math.round(x) }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Y</span>
        <span class="font-mono font-semibold text-2xl tabular-nums tracking-tight">{{ Math.round(y) }}</span>
      </div>
    </div>

    <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Source</span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="sourceType ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="sourceType ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ sourceType === 'mouse' ? 'Mouse' : sourceType === 'touch' ? 'Touch' : 'None yet' }}
      </span>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Relative to the window via <code class="whitespace-nowrap rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">type: 'client'</code>.
    </p>
  </div>
</template>
