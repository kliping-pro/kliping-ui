<script setup lang="ts">
import { BellIcon, HandIcon, RotateCcwIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useTimeout } from '@/composables/use-timeout'

const isVisible = ref(true)
// Kunci untuk memulai ulang animasi bilah waktunya.
const cycle = ref(0)

const { isPending, start, stop } = useTimeout(() => {
  isVisible.value = false
}, 3000)

function showAgain() {
  isVisible.value = true
  cycle.value += 1
  start()
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Auto Dismiss
      </h3>
      <p class="text-muted-foreground text-sm">
        A message that disappears three seconds after it appears.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div class="h-[4.5rem]">
        <div
          v-if="isVisible"
          class="flex h-full flex-col justify-between overflow-hidden rounded-lg border bg-muted/40"
        >
          <div class="flex items-center gap-3 px-4 pt-3">
            <BellIcon class="size-4 shrink-0 text-muted-foreground" />
            <span class="text-sm">Gone in 3 seconds.</span>
          </div>
          <div class="h-1 bg-muted">
            <div
              :key="cycle"
              class="timeout-bar h-full bg-primary"
              :style="{ animationPlayState: isPending ? 'running' : 'paused' }"
            />
          </div>
        </div>
        <div
          v-else
          class="flex h-full items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm"
        >
          Dismissed.
        </div>
      </div>

      <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
        <span class="text-muted-foreground text-sm">Timer</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isPending ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isPending ? 'animate-pulse bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isPending ? 'Pending' : isVisible ? 'Held' : 'Done' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button @click="showAgain">
        <RotateCcwIcon />
        Show again
      </Button>
      <Button variant="outline" :disabled="!isPending" @click="stop">
        <HandIcon />
        Hold
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">start()</code> restarts the countdown from the top.
    </p>
  </div>
</template>

<style scoped>
.timeout-bar {
  animation: timeout-shrink 3s linear forwards;
  transform-origin: left;
}

@keyframes timeout-shrink {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
