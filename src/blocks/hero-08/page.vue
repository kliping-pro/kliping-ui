<script lang="ts">
export const description = "Hero dengan navbar bergaris bawah dan deretan logo pelanggan."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import Logo01 from '@/blocks/hero-08/components/Logo01.vue'
import Logo02 from '@/blocks/hero-08/components/Logo02.vue'
import Logo03 from '@/blocks/hero-08/components/Logo03.vue'
import Logo04 from '@/blocks/hero-08/components/Logo04.vue'
import Navbar from '@/blocks/hero-08/components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />

    <div class="mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center">
      <h2 class="text-balance font-medium text-4xl leading-[1.4] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Beautifully Designed 
        <span class="inline-block rounded-md bg-primary px-1.5 py-0.5 text-primary-foreground leading-[1.1] tracking-tight sm:rounded-lg sm:px-3.5">
          Premium
        </span> 
        Shadcn Blocks
      </h2>
      <p class="mt-6 text-balance text-center text-muted-foreground text-xl tracking-[-0.01em] sm:text-2xl sm:leading-normal md:text-3xl">
        A collection of beautifully designed components that you can use to
        build your next project.
      </p>
      <div class="mx-auto mt-10 flex w-full max-w-xs flex-col items-center justify-center gap-4 sm:flex-row">
        <Button class="w-full sm:w-auto" size="lg">
          Get Started <ArrowUpRight />
        </Button>
        <Button class="w-full sm:w-auto" size="lg" variant="outline">
          Learn More
        </Button>
      </div>

      <div class="mt-24 flex flex-col items-center gap-4">
        <p class="font-medium text-muted-foreground text-sm uppercase">
          Trusted by engineers at
        </p>
        <div class="mx-auto mt-4 grid max-w-5xl grid-cols-2 place-items-center gap-6 text-foreground/70 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-12 md:grid-cols-4">
          <Logo01 class="h-7 sm:h-8" />
          <Logo02 class="h-7 sm:h-8" />
          <Logo03 class="h-7 sm:h-8" />
          <Logo04 class="h-7 sm:h-8" />
        </div>
      </div>
    </div>
  </div>
</template>
