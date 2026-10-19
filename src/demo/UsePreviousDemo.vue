<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { usePrevious } from '@/composables/use-previous'

const color = ref('red')
const previous = usePrevious(color)
const colors = ['red', 'green', 'blue', 'yellow']
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Previous Value
      </h3>
      <p class="text-muted-foreground text-sm">
        Keeps the value from before the last change.
      </p>
    </div>

    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Previous</span>
        <span class="font-mono font-semibold text-lg" :class="previous === undefined && 'text-muted-foreground'">
          {{ previous ?? '—' }}
        </span>
      </div>
      <ArrowRightIcon class="size-4 text-muted-foreground" />
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Current</span>
        <span class="font-mono font-semibold text-lg">{{ color }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button
        v-for="p in colors"
        :key="p"
        class="capitalize"
        :variant="color === p ? 'default' : 'outline'"
        @click="color = p"
      >
        {{ p }}
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Starts as <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">undefined</code> until the first change.
    </p>
  </div>
</template>
