<script lang="ts">
export const description = "Ajakan bertindak berlatar aurora dengan deretan ubin ikon."
</script>

<script setup lang="ts">
import { ArrowUpRight, ComponentIcon, CpuIcon, Package, Zap } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-0 py-16 sm:px-6">
    <div class="relative mx-auto max-w-5xl overflow-hidden border-border/60 border-y p-14 sm:rounded-xl sm:border-x dark:bg-foreground">
      <!-- Aurora Silk Fade Gradient -->
      <div
        class="absolute inset-0 z-0 opacity-70"
        :style="{
          background:
            'linear-gradient(150deg, #FFAB91 0%, #FFCDD2 20%, #FCE4EC 40%, #e2daf1 60%, #b39ddb 80%, #8b6ac8 100%)',
        }"
      />

      <!-- Circuit Board - Light Pattern -->
      <div
        class="pointer-events-none absolute inset-0 z-0 opacity-60"
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

      <div class="absolute top-1/2 right-20 -translate-y-1/2">
        <div class="relative flex size-20 items-center justify-center border border-white/40 bg-white/10 max-md:hidden">
          <Zap class="size-12 fill-white/10 stroke-[1px] text-white/80" />
          <div class="mask-y-from-75% absolute -inset-y-12 -left-px border-white/60 border-s border-dashed" />
          <div class="mask-y-from-75% absolute -inset-y-12 -right-px border-white/60 border-e border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -top-px border-white/80 border-t border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -bottom-px border-white/80 border-b border-dashed" />
        </div>
        <div class="relative flex size-20 -translate-x-full items-center justify-center border border-white/40 bg-white/10 max-md:hidden">
          <Package class="size-12 fill-white/10 stroke-[1px] text-white/80" />
          <div class="mask-y-from-75% absolute -inset-y-12 -left-px border-white/60 border-s border-dashed" />
          <div class="mask-y-from-75% absolute -inset-y-12 -right-px border-white/60 border-e border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -top-px border-white/80 border-t border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -bottom-px border-white/80 border-b border-dashed" />
        </div>
        <div class="relative flex size-20 items-center justify-center border border-white/40 bg-white/10 max-md:hidden">
          <ComponentIcon class="size-12 fill-white/10 stroke-[1px] text-white/80" />
          <div class="mask-y-from-75% absolute -inset-y-12 -left-px border-white/60 border-s border-dashed" />
          <div class="mask-y-from-75% absolute -inset-y-12 -right-px border-white/60 border-e border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -top-px border-white/80 border-t border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -bottom-px border-white/80 border-b border-dashed" />
        </div>
      </div>

      <div class="absolute top-1/2 right-20 -translate-y-1/2">
        <div class="mask-r-from-75% relative flex size-20 translate-x-full items-center justify-center border border-white/40 bg-white/10 max-md:hidden">
          <CpuIcon class="size-12 fill-white/10 stroke-[1px] text-white/80" />
          <div class="mask-y-from-75% absolute -inset-y-12 -left-px border-white/60 border-s border-dashed" />
          <div class="mask-y-from-75% absolute -inset-y-12 -right-px border-white/60 border-e border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -top-px border-white/80 border-t border-dashed" />
          <div class="mask-x-from-75% absolute -inset-x-12 -bottom-px border-white/80 border-b border-dashed" />
        </div>
      </div>

      <div class="relative isolate">
        <h2 class="text-balance font-medium text-4xl text-black/85 tracking-[-0.04em] md:leading-tight lg:text-[2.75rem]">
          Turn your vision into reality
        </h2>
        <p class="mt-4 text-balance text-black/70 text-xl/normal md:mt-2.5 lg:text-[1.4rem]/normal">
          Join thousands of developers using our premium component library to
          ship beautiful UIs in minutes, not hours.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button
            class="bg-neutral-950 text-white hover:bg-neutral-950/90"
            size="lg"
          >
            Get Started <ArrowUpRight />
          </Button>
          <Button
            class="border-white/60 bg-white/50 text-black hover:bg-white/80 dark:border-white/60 dark:bg-white/50 dark:text-black dark:hover:bg-white/80"
            size="lg"
            variant="outline"
          >
            View Components
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
