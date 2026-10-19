<script setup lang="ts">
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useInterval } from '@/composables/use-interval'

const seconds = ref(0)
const { isActive, pause, resume } = useInterval(() => {
  seconds.value += 1
}, 1000)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Interval
      </h3>
      <p class="text-muted-foreground text-sm">
        A one-second tick you can pause and resume.
      </p>
    </div>

    <div class="flex flex-col items-center gap-3 rounded-lg border bg-muted/40 px-4 py-6">
      <span class="font-mono font-semibold text-5xl tabular-nums tracking-tight">{{ seconds }}<span class="text-muted-foreground text-2xl">s</span></span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="isActive ? 'animate-pulse bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ isActive ? 'Running' : 'Paused' }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button :variant="isActive ? 'secondary' : 'default'" @click="isActive ? pause() : resume()">
        <component :is="isActive ? PauseIcon : PlayIcon" />
        {{ isActive ? 'Pause' : 'Resume' }}
      </Button>
      <Button variant="outline" :disabled="seconds === 0" @click="seconds = 0">
        <RotateCcwIcon />
        Reset
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Ticks every <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">1000ms</code>, cleared when the component unmounts.
    </p>
  </div>
</template>
