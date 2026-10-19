<script setup lang="ts">
import { MinusIcon, PlusIcon, RotateCcwIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useCounter } from '@/composables/use-counter'

const { count, inc, dec, set, reset } = useCounter(10)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Counter
      </h3>
      <p class="text-muted-foreground text-sm">
        A number with increment, decrement, set and reset.
      </p>
    </div>

    <div class="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 p-2">
      <Button variant="outline" size="icon" aria-label="Decrement" @click="dec">
        <MinusIcon />
      </Button>
      <span class="font-semibold font-mono text-4xl tabular-nums tracking-tight">{{ count }}</span>
      <Button variant="outline" size="icon" aria-label="Increment" @click="inc">
        <PlusIcon />
      </Button>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="secondary" @click="set(n => n * 2)">
        Double
      </Button>
      <Button variant="outline" @click="reset">
        <RotateCcwIcon />
        Reset
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Starts at <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">10</code> — reset returns there.
    </p>
  </div>
</template>
