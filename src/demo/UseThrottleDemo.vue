<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'
import { useThrottle } from '@/composables/use-throttle'

const value = ref([50])
const throttled = useThrottle(() => value.value[0], 500)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Throttled Slider
      </h3>
      <p class="text-muted-foreground text-sm">
        Drag fast — the copy updates once per 500 ms.
      </p>
    </div>

    <div class="rounded-lg border px-4 py-5">
      <Slider v-model="value" :max="100" :step="1" aria-label="Value" />
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Live</span>
        <span class="font-mono font-semibold text-2xl tabular-nums">{{ value[0] }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Throttled</span>
        <span class="font-mono font-semibold text-2xl tabular-nums">{{ throttled }}</span>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Interval: <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">500ms</code>
    </p>
  </div>
</template>
