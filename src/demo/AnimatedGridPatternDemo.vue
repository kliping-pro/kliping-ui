<script setup lang="ts">
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
</script>

<template>
  <div class="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
    <p class="z-10 text-3xl font-medium tracking-tight">
      Animated Grid Pattern
    </p>
    <AnimatedGridPattern
      :num-squares="30"
      :max-opacity="0.1"
      :duration="3"
      class="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 mask-[radial-gradient(400px_circle_at_center,white,transparent)]"
    />
  </div>
</template>
