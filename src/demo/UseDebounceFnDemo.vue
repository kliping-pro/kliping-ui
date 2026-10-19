<script setup lang="ts">
import { MousePointerClickIcon, XIcon, ZapIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useDebounceFn } from '@/composables/use-debounce-fn'

const clicks = ref(0)
const runs = ref(0)
const isScheduled = ref(false)

const { run, cancel, flush } = useDebounceFn(() => {
  runs.value += 1
  isScheduled.value = false
}, 800)

function handleClick() {
  clicks.value += 1
  isScheduled.value = true
  run()
}

function handleCancel() {
  cancel()
  isScheduled.value = false
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Debounced Function
      </h3>
      <p class="text-muted-foreground text-sm">
        Rapid clicks collapse into a single call after a pause.
      </p>
    </div>

    <div class="flex flex-col gap-2">
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
      <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
        <span class="text-muted-foreground text-sm">Pending call</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isScheduled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isScheduled ? 'animate-pulse bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isScheduled ? 'Scheduled' : 'None' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="handleClick">
        <MousePointerClickIcon />
        Click rapidly
      </Button>
      <Button variant="outline" :disabled="!isScheduled" @click="flush">
        <ZapIcon />
        Run now
      </Button>
      <Button variant="secondary" :disabled="!isScheduled" @click="handleCancel">
        <XIcon />
        Cancel
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Waits <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">800ms</code> of silence before running.
    </p>
  </div>
</template>
