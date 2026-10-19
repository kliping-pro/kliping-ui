<!-- example: 1. Animations -->
<script setup lang="ts">
import { Check, Moon, Pause, Play, Sun, Volume2, VolumeX, X } from '@lucide/vue'
import { Swap, SwapOff, SwapOn } from '@/components/swap'

const swaps = [
  { animation: 'fade', label: 'Fade', on: Check, off: X },
  { animation: 'rotate', label: 'Rotate', on: Sun, off: Moon },
  { animation: 'flip', label: 'Flip', on: Play, off: Pause },
  { animation: 'scale', label: 'Scale', on: Volume2, off: VolumeX },
] as const
</script>

<template>
  <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
    <div v-for="swap in swaps" :key="swap.animation" class="flex flex-col items-center gap-3">
      <Swap :animation="swap.animation" :aria-label="`${swap.label} animation`" class="size-12 rounded-lg border bg-muted/50">
        <SwapOn>
          <component :is="swap.on" class="size-5" />
        </SwapOn>
        <SwapOff>
          <component :is="swap.off" class="size-5" />
        </SwapOff>
      </Swap>
      <span class="text-center text-muted-foreground text-sm">{{ swap.label }}</span>
    </div>
  </div>
</template>
