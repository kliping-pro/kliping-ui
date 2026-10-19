<script setup lang="ts">
import { MessageSquareIcon, TimerIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useInterval } from '@/composables/use-interval'

const delay = ref(1000)
const message = ref('hello')
const lastRead = ref('—')
const ticks = ref(0)

// Membaca `pesan` terbaru tanpa memasang ulang intervalnya. Tidak ada daftar
// dependensi yang perlu diakali, karena Vue memang tidak punya daftar itu.
useInterval(() => {
  lastRead.value = message.value
  ticks.value += 1
}, delay)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Latest Value
      </h3>
      <p class="text-muted-foreground text-sm">
        A running interval always reads the newest message.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Current message</span>
        <span class="font-mono text-sm">"{{ message }}"</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Last read by interval</span>
        <span class="font-mono font-medium text-sm">{{ lastRead === '—' ? '—' : `"${lastRead}"` }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Ticks</span>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 font-medium font-mono text-muted-foreground text-xs tabular-nums">
          <span class="size-1.5 animate-pulse rounded-full bg-primary" />
          {{ ticks }}× · every {{ delay }}ms
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button @click="message = message === 'hello' ? 'world' : 'hello'">
        <MessageSquareIcon />
        Swap text
      </Button>
      <Button variant="outline" @click="delay = delay === 1000 ? 2000 : 1000">
        <TimerIcon />
        Delay {{ delay / 1000 }}s
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Swapping text never restarts the interval — ticks keep counting.
    </p>
  </div>
</template>
