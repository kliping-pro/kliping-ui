<script setup lang="ts">
import { MousePointerClickIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useThrottleFn } from '@/composables/use-throttle-fn'

const clicks = ref(0)
const runs = ref(0)

const { run } = useThrottleFn(() => {
  runs.value += 1
}, 1000)

function handleClick() {
  clicks.value += 1
  run()
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Throttled Function
      </h3>
      <p class="text-muted-foreground text-sm">
        However fast you click, it runs at most once per second.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Clicks</span>
        <span class="font-mono font-semibold text-2xl tabular-nums">{{ clicks }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Actual runs</span>
        <span class="font-mono font-semibold text-2xl tabular-nums">{{ runs }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="handleClick">
        <MousePointerClickIcon />
        Click rapidly
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Leading and trailing clicks run; the rest wait out <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">1s</code>.
    </p>
  </div>
</template>
