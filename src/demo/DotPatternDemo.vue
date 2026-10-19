<script setup lang="ts">
import { DotPattern } from '@/components/ui/dot-pattern'
</script>

<template>
  <div class="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
    <p class="z-10 text-3xl font-medium tracking-tight">
      Dot Pattern
    </p>
    <DotPattern glow class="mask-[radial-gradient(300px_circle_at_center,white,transparent)]" />
  </div>
</template>
