<script setup lang="ts">
import { RefreshCwIcon } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'

const log = ref<string[]>([])
const renders = ref(0)

onMounted(() => {
  log.value.push('onMounted() ran once')
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Run on Mount
      </h3>
      <p class="text-muted-foreground text-sm">
        A callback that runs once, however often it renders.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Mount calls</span>
          <span class="font-mono font-semibold text-2xl tabular-nums">{{ log.length }}</span>
        </div>
        <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
          <span class="text-muted-foreground text-xs">Re-renders</span>
          <span class="font-mono font-semibold text-2xl tabular-nums">{{ renders }}</span>
        </div>
      </div>
      <ul class="flex min-h-11 flex-col justify-center gap-1 rounded-lg border bg-muted/40 px-4 py-3">
        <li v-if="!log.length" class="text-muted-foreground text-sm">
          Not mounted yet…
        </li>
        <li v-for="(c, i) in log" :key="i" class="flex items-center gap-2 font-mono text-xs">
          <span class="size-1.5 shrink-0 rounded-full bg-primary" />
          {{ c }}
        </li>
      </ul>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="renders += 1">
        <RefreshCwIcon />
        Re-render
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Re-render all you like — the log stays at one line.
    </p>
  </div>
</template>
