<script lang="ts">
export const description = "Hero di tengah layar dengan petak kotak yang menyala bergantian."
</script>

<script setup lang="ts">
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
    <AnimatedGridPattern
      :class="cn(
        'mask-[radial-gradient(500px_circle_at_center,white,transparent)]',
        'inset-x-0 h-full skew-y-12'
      )"
      :duration="3"
      :max-opacity="0.1"
      :num-squares="30"
    />
    <div class="relative z-10 max-w-3xl text-center">
      <Badge
        as-child
        class="rounded-full border-border py-1"
        variant="secondary"
      >
        <a href="#">
          Just released v1.0.0 <ArrowUpRight class="ml-1 size-4" />
        </a>
      </Badge>
      <h1 class="mx-auto mt-6 max-w-xl font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem] md:text-6xl/[1.2]">
        Ship better UI without&nbsp;the&nbsp;hassle
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl md:text-2xl/normal">
        Instead of starting from scratch every time, use thoughtfully designed
        blocks that give you a solid foundation for any UI.
      </p>
      <div class="mt-12 flex items-center justify-center gap-4">
        <Button class="rounded-full" size="lg">
          Get Started <ArrowUpRight class="h-5! w-5!" />
        </Button>
        <Button
          class="rounded-full shadow-none"
          size="lg"
          variant="outline"
        >
          <CirclePlay class="h-5! w-5!" /> Watch Demo
        </Button>
      </div>
    </div>
  </div>
</template>
