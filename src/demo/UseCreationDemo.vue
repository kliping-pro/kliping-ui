<script setup lang="ts">
import { RefreshCwIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'

const renders = ref(0)

// Lahir sekali. Tidak ada render kedua yang membuatnya lahir lagi.
const createdAt = new Date().toLocaleTimeString('en-US', { hour12: false })

// Yang memang perlu dihitung ulang saat sumbernya berubah: computed.
const squared = computed(() => renders.value ** 2)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Created Once
      </h3>
      <p class="text-muted-foreground text-sm">
        Values made in setup never get recreated on re-render.
      </p>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border bg-muted/40 px-4 py-5">
      <span class="text-muted-foreground text-xs">Object created at</span>
      <span class="font-mono font-semibold text-3xl tabular-nums tracking-tight">{{ createdAt }}</span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Re-renders</span>
        <span class="font-mono font-semibold text-xl tabular-nums">{{ renders }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">computed(n²)</span>
        <span class="font-mono font-semibold text-xl tabular-nums">{{ squared }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="renders += 1">
        <RefreshCwIcon />
        Re-render
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      The timestamp stays fixed — only <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">computed()</code> follows.
    </p>
  </div>
</template>
