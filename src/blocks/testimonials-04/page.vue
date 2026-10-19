<script lang="ts">
export const description = "Dua jalur testimoni bergulir berlawanan arah."
</script>

<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'
import TestimonialList from '@/blocks/testimonials-04/components/TestimonialList.vue'
</script>

<template>
  <div class="px-6 py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Success Stories
    </h2>
    <p class="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
      Real stories from people who use and love our product every day
    </p>
    <div class="mask-x-from-80% mt-14">
      <Marquee class="[--duration:60s]" pauseOnHover>
        <TestimonialList />
      </Marquee>
      <Marquee class="mt-0 [--duration:60s]" pauseOnHover reverse>
        <TestimonialList />
      </Marquee>
    </div>
  </div>
</template>
