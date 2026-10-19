<script lang="ts">
export const description = "Ajakan bertindak dua kolom dengan gambar ponsel di sebelah kanan."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-0 py-16 sm:px-6">
    <div class="relative mx-auto flex max-w-5xl flex-col justify-between gap-0 overflow-hidden bg-linear-to-r from-muted px-10 ring-2 ring-border/60 sm:rounded-xl sm:shadow-lg/4 md:flex-row md:gap-8">
      <div class="pt-14 pb-0 md:pb-14">
        <h2 class="font-medium text-4xl tracking-[-0.04em] lg:text-[2.75rem]">
          Step Into Something Better
        </h2>
        <p class="mt-4 max-w-md text-muted-foreground text-xl/normal tracking-[-0.015em] lg:text-2xl/normal">
          Get seamless access to everything you need, right from your phone.
        </p>
        <Button class="mt-10" size="lg">
          Download Now <ArrowUpRight />
        </Button>
      </div>
      <img
        alt=""
        class="mt-auto aspect-square w-full max-w-xs md:h-72 md:w-auto md:max-w-none"
        src="/images/cta-mobile.png"
      />
    </div>
  </div>
</template>
