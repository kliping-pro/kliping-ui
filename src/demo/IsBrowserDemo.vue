<script setup lang="ts">
import { isBrowser } from '@/lib/is-browser'
import { useIsHydrated } from '@/composables/use-is-hydrated'

const isHydrated = useIsHydrated()
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Browser Check
      </h3>
      <p class="text-muted-foreground text-sm">
        Is this the browser, and has the page hydrated?
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="font-mono text-muted-foreground text-sm">isBrowser</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isBrowser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isBrowser ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isBrowser ? 'True' : 'False' }}
        </span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="font-mono text-muted-foreground text-sm">useIsHydrated()</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isHydrated ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isHydrated ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isHydrated ? 'True' : 'False' }}
        </span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Both are <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">false</code> in server-rendered HTML.
      The first is read once when the module loads; the second waits for mount.
    </p>
  </div>
</template>
