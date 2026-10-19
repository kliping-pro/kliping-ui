<script lang="ts">
export const description = "Ajakan bertindak di atas gambar gelap dengan gradien."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-0 py-20 sm:px-6">
    <div class="relative mx-auto max-w-5xl overflow-hidden sm:rounded-xl sm:shadow-lg dark:border dark:border-border/80">
      <img
        alt=""
        class="absolute inset-0 size-full object-cover"
        src="/images/ascii-art.png"
      />

      <div class="relative isolate bg-linear-to-r from-black to-black/50 px-10 py-14">
        <h2 class="font-medium text-4xl text-white tracking-[-0.04em] sm:text-[2.85rem]">
          Step Into Something Better
        </h2>
        <p class="mt-4 max-w-md text-lg text-white/85 md:text-xl/normal">
          Get seamless access to everything you need, right from your phone.
        </p>
        <Button
          class="mt-10 bg-white text-black ring-4 ring-white/30 hover:bg-white/90"
          size="lg"
        >
          Download Now <ArrowUpRight />
        </Button>
      </div>
    </div>
  </div>
</template>
