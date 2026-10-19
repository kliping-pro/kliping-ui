<script lang="ts">
export const description = "Ajakan bertindak berbingkai dengan latar papan sirkuit dan gambar ponsel."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-0 py-16 sm:px-6">
    <div class="mx-auto max-w-5xl border-y bg-muted/50 p-1 sm:rounded-xl sm:border-x">
      <div class="sm:shadow/5 relative flex flex-col justify-between gap-0 overflow-hidden border bg-background px-10 sm:rounded-lg md:flex-row md:gap-8">
        <!-- Circuit Board - Light Pattern -->
        <div
          class="max-sm:mask-b-from-75% pointer-events-none absolute inset-0 -top-0.5 -left-1 z-0 not-dark:opacity-60"
          :style="{
            backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
      radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
      radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
    `,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }"
        />

        <div class="relative isolate pt-12 pb-0 md:pb-12">
          <h2 class="font-medium text-4xl tracking-[-0.04em] lg:text-5xl/[1.2]">
            Build something you're proud of today
          </h2>
          <p class="mt-2 text-muted-foreground text-xl tracking-[-0.015em] sm:mt-4 lg:text-2xl">
            Join thousands of developers using our tools.
          </p>
          <Button class="mt-5 sm:mt-10" size="lg">
            Get Started Today <ArrowUpRight />
          </Button>
        </div>
        <img
          alt=""
          class="mask-b-from-75% relative isolate mt-auto aspect-square w-full max-w-xs md:h-76 md:w-auto md:max-w-none"
          src="/images/cta-mobile.png"
        />
      </div>
    </div>
  </div>
</template>
