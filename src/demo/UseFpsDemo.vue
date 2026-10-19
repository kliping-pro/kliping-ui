<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFps } from '@/composables/use-fps'

const fps = useFps({ every: 15 })

const lowest = ref(0)
const highest = ref(0)

watch(fps, (n) => {
  if (n <= 0)
    return
  lowest.value = lowest.value === 0 ? n : Math.min(lowest.value, n)
  highest.value = Math.max(highest.value, n)
})

const status = computed(() => {
  if (fps.value === 0)
    return { label: 'Measuring', isGood: false }
  if (fps.value >= 50)
    return { label: 'Smooth', isGood: true }
  if (fps.value >= 30)
    return { label: 'Okay', isGood: false }
  return { label: 'Choppy', isGood: false }
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Frame Rate
      </h3>
      <p class="text-muted-foreground text-sm">
        Frames per second the browser is drawing right now.
      </p>
    </div>

    <div class="flex flex-col items-center gap-2 rounded-lg border bg-muted/40 px-4 py-6">
      <div class="flex items-baseline gap-1.5">
        <span class="font-semibold font-mono text-5xl tabular-nums tracking-tight">{{ fps }}</span>
        <span class="text-muted-foreground text-sm">fps</span>
      </div>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="status.isGood ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="status.isGood ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ status.label }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Lowest</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ lowest || '—' }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Highest</span>
        <span class="font-medium font-mono text-sm tabular-nums">{{ highest || '—' }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Recalculated every <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">15</code> frames.
    </p>
  </div>
</template>
