<script setup lang="ts">
import { PlusIcon } from '@lucide/vue'
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'

const count = ref(0)
const log = ref<string[]>([])

// Tanpa `immediate`, watch memang tidak jalan di awal.
watch(count, (next, prev) => {
  log.value.unshift(`${prev} → ${next}`)
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Skip First Run
      </h3>
      <p class="text-muted-foreground text-sm">
        The effect only fires on updates, never on mount.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 py-2 pr-2 pl-4">
        <span class="font-mono font-semibold text-4xl tabular-nums tracking-tight">{{ count }}</span>
        <Button size="icon" aria-label="Increment" @click="count += 1">
          <PlusIcon />
        </Button>
      </div>

      <div class="divide-y rounded-lg border bg-muted/40">
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <span class="text-muted-foreground text-sm">Effect runs</span>
          <span class="font-mono text-sm tabular-nums">{{ log.length }}</span>
        </div>
        <div class="flex min-h-11 flex-wrap items-center gap-1.5 px-4 py-3">
          <span v-if="!log.length" class="text-muted-foreground text-sm">
            None yet — skipped on mount.
          </span>
          <span
            v-for="(c, i) in log.slice(0, 4)"
            :key="log.length - i"
            class="rounded-full px-2.5 py-0.5 font-mono text-xs"
            :class="i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
          >
            {{ c }}
          </span>
        </div>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">watch</code> skips mount unless <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">immediate</code>.
    </p>
  </div>
</template>
