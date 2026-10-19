<script lang="ts">
export const description = "Tiga angka di tengah dengan latar blok warna."
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Built with scale in mind
    </h2>
    <p class="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] sm:text-lg md:text-2xl">
      A quick look at the impact and adoption of our UI components
    </p>

    <div class="mt-14 rounded-2xl border bg-muted p-1">
      <div
        :class="cn(
          'grid grid-cols-1 gap-1 overflow-hidden rounded-xl sm:grid-cols-2 md:grid-cols-3',
          '*:rounded *:border *:first:rounded-t-xl *:last:rounded-b-xl sm:*:nth-2:rounded-tr-xl sm:*:first:rounded-tl-xl sm:*:first:rounded-tr md:*:nth-2:rounded-tr md:*:last:rounded-e-xl md:*:last:rounded-bl md:*:first:rounded-s-xl dark:*:border-foreground/20'
        )"
      >
        <div class="bg-background p-10">
          <span class="font-medium text-5xl">70%</span>
          <p class="mt-4 text-foreground/80 text-xl">
            Faster UI development
          </p>
        </div>
        <div class="bg-background p-10">
          <span class="font-medium text-5xl">5x</span>
          <p class="mt-4 text-foreground/80 text-xl">
            Increase in productivity
          </p>
        </div>
        <div class="bg-background p-10 sm:col-span-2 md:col-span-1">
          <span class="font-medium text-5xl">98%</span>
          <p class="mt-4 text-foreground/80 text-xl">
            Customer satisfaction
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
