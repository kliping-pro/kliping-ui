<!-- example: 3. Custom Thresholds -->
<script setup lang="ts">
import { Fps } from '@/components/fps'
</script>

<template>
  <div class="relative flex h-40 w-full flex-col items-center justify-center gap-1 rounded-lg border bg-muted/50 p-4 text-center">
    <Fps strategy="absolute" position="top-right" :warning-threshold="45" :error-threshold="30" />
    <div>Warning below 45 FPS, error below 30 FPS</div>
    <div class="text-sm text-muted-foreground">
      The counter changes color when the frame rate drops under a threshold.
    </div>
  </div>
</template>
