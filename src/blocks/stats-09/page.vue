<script lang="ts">
export const description = "Tiga angka dipisah garis tipis di antaranya."
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="mx-auto max-w-(--breakpoint-xl) py-12 text-center">
      <h2 class="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        Why Should You Choose Us?
      </h2>
      <p class="mt-3.5 text-muted-foreground text-xl md:text-2xl">
        Because after switching to us...
      </p>

      <div class="px-6">
        <div
          :class="cn(
            'mt-16 grid max-w-5xl justify-center gap-y-8 border max-sm:divide-y sm:mt-24 sm:grid-cols-2 sm:gap-y-0 lg:grid-cols-3 lg:divide-x',
            'sm:*:last:border-t sm:*:first:border-e lg:*:last:border-t-0'
          )"
        >
          <div class="max-sm:space-y-6 max-sm:px-6 max-sm:py-12 sm:divide-y">
            <div class="font-medium text-5xl sm:px-6 sm:py-12">96%</div>
            <p class="text-lg sm:p-6">
              of customers say they have a better brand experience
            </p>
          </div>
          <div class="max-sm:space-y-6 max-sm:px-6 max-sm:py-12 sm:divide-y">
            <div class="font-medium text-5xl sm:px-6 sm:py-12">95%</div>
            <p class="text-lg sm:p-6">
              of customers say they gather more data, more easily
            </p>
          </div>
          <div class="max-sm:space-y-6 max-sm:px-6 max-sm:py-12 sm:col-span-2 sm:divide-y lg:col-span-1">
            <div class="font-medium text-5xl sm:px-6 sm:py-12">87%</div>
            <p class="text-lg sm:p-6">
              of customers say they reveal deeper insights from data
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
