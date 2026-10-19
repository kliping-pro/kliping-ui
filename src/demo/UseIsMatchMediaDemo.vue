<script setup lang="ts">
import { useIsMatchMedia } from '@/composables/use-is-match-media'

const isWide = useIsMatchMedia('(min-width: 768px)')
const prefersDark = useIsMatchMedia('(prefers-color-scheme: dark)')
const reducedMotion = useIsMatchMedia('(prefers-reduced-motion: reduce)')
const isTouch = useIsMatchMedia('(pointer: coarse)')

const queries = [
  { label: 'Wide screen', query: 'min-width: 768px', matches: isWide },
  { label: 'Prefers dark', query: 'prefers-color-scheme: dark', matches: prefersDark },
  { label: 'Reduced motion', query: 'prefers-reduced-motion: reduce', matches: reducedMotion },
  { label: 'Touch pointer', query: 'pointer: coarse', matches: isTouch },
]
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Media Queries
      </h3>
      <p class="text-muted-foreground text-sm">
        Live answers to CSS media queries, updated on change.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div v-for="item in queries" :key="item.query" class="flex items-center justify-between gap-4 px-4 py-3">
        <div class="flex min-w-0 flex-col gap-0.5">
          <span class="font-medium text-sm">{{ item.label }}</span>
          <code class="truncate font-mono text-muted-foreground text-xs">({{ item.query }})</code>
        </div>
        <span
          class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="item.matches.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="item.matches.value ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ item.matches.value ? 'True' : 'False' }}
        </span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Resize the window or change system settings to see it react.
    </p>
  </div>
</template>
