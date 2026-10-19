<script setup lang="ts">
import { LockIcon, LockOpenIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useScrollLock } from '@/composables/use-scroll-lock'

const { isLocked, lock, unlock } = useScrollLock({ autoLock: false })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Scroll Lock
      </h3>
      <p class="text-muted-foreground text-sm">
        Freezes page scrolling, like a modal would.
      </p>
    </div>

    <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Page scroll</span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="isLocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="isLocked ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ isLocked ? 'Locked' : 'Free' }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button :disabled="isLocked" @click="lock">
        <LockIcon />
        Lock
      </Button>
      <Button variant="outline" :disabled="!isLocked" @click="unlock">
        <LockOpenIcon />
        Unlock
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Notice the content doesn't shift when the scrollbar disappears.
    </p>
  </div>
</template>
