<script setup lang="ts">
import { Moon, Pause, Play, Sun, Volume2, VolumeX } from '@lucide/vue'
import { Swap, SwapOff, SwapOn } from '@/components/swap'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Swap animation="rotate" aria-label="Toggle dark mode" class="size-10 rounded-md border">
      <SwapOn><Moon class="size-5" /></SwapOn>
      <SwapOff><Sun class="size-5" /></SwapOff>
    </Swap>

    <Swap animation="flip" aria-label="Play" class="size-10 rounded-md border">
      <SwapOn><Pause class="size-5" /></SwapOn>
      <SwapOff><Play class="size-5" /></SwapOff>
    </Swap>

    <Swap activation-mode="hover" animation="scale" class="size-10 rounded-md border">
      <SwapOn><VolumeX class="size-5" /></SwapOn>
      <SwapOff><Volume2 class="size-5" /></SwapOff>
    </Swap>

    <Swap aria-label="Toggle dark mode" class="size-10 rounded-md border" disabled>
      <SwapOn><Moon class="size-5" /></SwapOn>
      <SwapOff><Sun class="size-5" /></SwapOff>
    </Swap>
  </div>
</template>
