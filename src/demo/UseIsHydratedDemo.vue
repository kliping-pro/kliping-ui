<script setup lang="ts">
import { CheckIcon, LoaderIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useIsHydrated } from '@/composables/use-is-hydrated'

const isHydrated = useIsHydrated()
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Hydration
      </h3>
      <p class="text-muted-foreground text-sm">
        Know when the page has come alive in the browser.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Hydrated</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isHydrated ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isHydrated ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isHydrated ? 'True' : 'False' }}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Rendered by</span>
        <span class="font-mono text-sm">{{ isHydrated ? 'client' : 'server' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" :disabled="!isHydrated">
        <component :is="isHydrated ? CheckIcon : LoaderIcon" :class="!isHydrated && 'animate-spin'" />
        {{ isHydrated ? 'Ready to use' : 'Waiting for JavaScript…' }}
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      In the server-rendered HTML it is <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">false</code> and the button is disabled.
    </p>
  </div>
</template>
