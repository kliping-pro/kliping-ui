<script lang="ts">
export const description = "Hero di tengah layar dengan latar gradien yang dikaburkan."
</script>

<script setup lang="ts">
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import DreamyBackground from '@/blocks/hero-01/components/DreamyBackground.vue'
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
    <DreamyBackground class="absolute inset-0 m-auto" />

    <div class="relative isolate max-w-3xl text-center">
      <Badge
        as-child
        class="rounded-full bg-background/30 py-1 backdrop-blur-lg"
        variant="secondary"
      >
        <a href="#">
          Just released v1.0.0 <ArrowUpRight class="ml-1 size-4" />
        </a>
      </Badge>
      <h1 class="mx-auto mt-6 max-w-xl font-medium text-4xl tracking-tighter sm:text-[2.75rem] md:text-6xl/[1.2]">
        Ship better UI without&nbsp;the&nbsp;hassle
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-foreground/70 text-xl md:text-2xl/normal">
        Instead of starting from scratch every time, use thoughtfully designed
        blocks that give you a solid foundation for any UI.
      </p>
      <div class="mt-12 flex items-center justify-center gap-4">
        <Button class="rounded-full" size="lg">
          Get Started <ArrowUpRight class="size-5" />
        </Button>
        <Button
          class="rounded-full shadow-none"
          size="lg"
          variant="outline"
        >
          <CirclePlay class="size-5" /> Watch Demo
        </Button>
      </div>
    </div>
  </div>
</template>
