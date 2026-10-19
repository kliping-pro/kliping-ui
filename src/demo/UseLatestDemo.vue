<script setup lang="ts">
import { TimerIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

const message = ref('hello')
const readValue = ref<string>()
const isWaiting = ref(false)

// Ditulis sekali di setup, dan selalu membaca nilai terbaru.
// Tidak ada penampung, tidak ada `.current`.
function readLater() {
  isWaiting.value = true
  setTimeout(() => {
    readValue.value = message.value
    isWaiting.value = false
  }, 1500)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Always Latest
      </h3>
      <p class="text-muted-foreground text-sm">
        Delayed reads always see the newest value.
      </p>
    </div>

    <Input v-model="message" placeholder="Type, press the button, keep typing" aria-label="Message" />

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="shrink-0 text-muted-foreground text-sm">Current</span>
        <span class="truncate font-mono text-sm">{{ message ? `"${message}"` : '—' }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="shrink-0 text-muted-foreground text-sm">Read after 1.5 s</span>
        <span v-if="isWaiting" class="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
          <Spinner class="size-3.5" />
          Waiting…
        </span>
        <span v-else class="truncate font-mono text-sm">{{ readValue !== undefined ? `"${readValue}"` : '—' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" :disabled="isWaiting" @click="readLater">
        <TimerIcon />
        Read in 1.5 s
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Edit the text while it waits — the read value is the newest one.
    </p>
  </div>
</template>
