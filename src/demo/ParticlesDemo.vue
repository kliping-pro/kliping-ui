<script setup lang="ts">
import { Particles } from '@/components/ui/particles'
</script>

<template>
  <div class="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
    <p class="z-10 text-3xl font-medium tracking-tight">
      Particles
    </p>
    <Particles class="absolute inset-0" color="#71717a" :quantity="120" :ease="80" />
  </div>
</template>
