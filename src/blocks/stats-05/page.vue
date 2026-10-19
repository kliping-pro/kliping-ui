<script lang="ts">
export const description = "Tiga angka berikon warna dalam kartu berlatar abu."
</script>

<script setup lang="ts">
import { FastForward, HeartHandshake, MonitorSmartphone } from '@lucide/vue'
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Built with scale in mind
    </h2>
    <p class="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] sm:text-lg md:text-2xl">
      Trusted by thousands to build modern UIs faster
    </p>

    <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div class="rounded-xl border bg-muted p-6 py-7">
        <MonitorSmartphone class="mb-8 h-10 w-10 stroke-[1.75px] text-blue-500" />
        <span class="font-medium text-5xl tracking-[-0.01em]">70%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Faster UI development
        </p>
      </div>
      <div class="rounded-xl border bg-muted p-6 py-7">
        <FastForward class="mb-8 h-10 w-10 stroke-[1.75px] text-green-600" />
        <span class="font-medium text-5xl tracking-[-0.01em]">5x</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Increase in productivity
        </p>
      </div>
      <div class="rounded-xl border bg-muted p-6 py-7">
        <HeartHandshake class="mb-8 h-10 w-10 stroke-[1.75px] text-red-500" />
        <span class="font-medium text-5xl tracking-[-0.01em]">98%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Customer satisfaction
        </p>
      </div>
    </div>
  </div>
</template>
