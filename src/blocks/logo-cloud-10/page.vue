<script lang="ts">
export const description = "Logo bergulir dengan tepi yang memudar ke kiri dan kanan."
</script>

<script setup lang="ts">
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
} from "@/components/logos"
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="px-6 py-12 sm:px-12">
    <p class="text-balance text-center font-medium text-foreground/80 text-lg">
      Trusted by teams and companies around the world
    </p>
    <div class="relative mx-auto mt-10 max-w-4xl">
      <div
        :class="cn(
          'grid grid-cols-2 place-items-center border shadow-xs/1 sm:grid-cols-3',
          '*:border-e *:border-b *:nth-last-[2]:border-b-0 *:last:border-b-0 *:odd:bg-muted/60 max-sm:*:nth-[2n]:border-e-0 sm:*:nth-[3n]:border-e-0 sm:*:nth-last-[3]:border-b-0'
        )"
      >
        <div class="flex w-full items-center justify-center px-3 py-7">
          <Logo01 class="h-7 sm:h-8" />
        </div>
        <div class="flex w-full items-center justify-center px-3 py-7">
          <Logo02 class="h-7 sm:h-8" />
        </div>
        <div class="flex w-full items-center justify-center px-3 py-7">
          <Logo03 class="h-7 sm:h-8" />
        </div>
        <div class="flex w-full items-center justify-center px-3 py-7">
          <Logo04 class="h-7 sm:h-8" />
        </div>
        <div class="flex w-full items-center justify-center px-3 py-7">
          <Logo05 class="h-7 sm:h-8" />
        </div>
        <div class="flex w-full items-center justify-center px-3 py-7">
          <Logo06 class="h-7 sm:h-8" />
        </div>
      </div>

      <div class="mask-l-from-0 absolute top-0 left-0 w-6 -translate-x-full border-b border-dashed sm:w-12" />
      <div class="mask-r-from-0 absolute top-0 right-0 w-6 translate-x-full border-b border-dashed sm:w-12" />
      <div class="mask-l-from-0 absolute bottom-0 left-0 w-6 -translate-x-full border-b border-dashed sm:w-12" />
      <div class="mask-r-from-0 absolute right-0 bottom-0 w-6 translate-x-full border-b border-dashed sm:w-12" />
      <div class="mask-t-from-0 absolute top-0 left-0 h-6 -translate-y-full border-s border-dashed sm:h-12" />
      <div class="mask-t-from-0 absolute top-0 right-0 h-6 -translate-y-full border-s border-dashed sm:h-12" />
      <div class="mask-b-from-0 absolute bottom-0 left-0 h-6 translate-y-full border-s border-dashed sm:h-12" />
      <div class="mask-b-from-0 absolute right-0 bottom-0 h-6 translate-y-full border-s border-dashed sm:h-12" />
    </div>
  </div>
</template>
