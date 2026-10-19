<script setup lang="ts">
import { SendIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useLockFn } from '@/composables/use-lock-fn'

const sentCount = ref(0)
const clicks = ref(0)
const isRunning = ref(false)

const send = useLockFn(async () => {
  isRunning.value = true
  await new Promise(r => setTimeout(r, 1500))
  sentCount.value += 1
  isRunning.value = false
})

function handleClick() {
  clicks.value += 1
  send()
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Locked Submit
      </h3>
      <p class="text-muted-foreground text-sm">
        Extra clicks are ignored while the async call is still running.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Status</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isRunning ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isRunning ? 'animate-pulse bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isRunning ? 'Locked' : 'Idle' }}
        </span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Clicks</span>
        <span class="font-mono text-sm tabular-nums">{{ clicks }}</span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Requests sent</span>
        <span class="font-mono font-semibold text-sm tabular-nums">{{ sentCount }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="handleClick">
        <Spinner v-if="isRunning" />
        <SendIcon v-else />
        {{ isRunning ? 'Sending… (keep clicking)' : 'Send' }}
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Each request takes <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">1.5s</code> — spam the button and compare the counts.
    </p>
  </div>
</template>
