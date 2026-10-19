<script lang="ts">
export const description = "Jalur testimoni bergulir dalam kartu berbingkai."
</script>

<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'
import TestimonialList from '@/blocks/testimonials-13/components/TestimonialList.vue'
</script>

<template>
  <div class="px-6 py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Success Stories
    </h2>
    <p class="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
      Real stories from people who use and love our product every day
    </p>
    <div class="mask-x-from-80% mt-14 space-y-px border bg-muted">
      <Marquee class="py-0 [--duration:60s] [--gap:0px]" pauseOnHover>
        <TestimonialList />
      </Marquee>
    </div>
  </div>
</template>
