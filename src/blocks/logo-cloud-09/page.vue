<script lang="ts">
export const description = "Logo dalam petak rapat tanpa jarak antar sel."
</script>

<script setup lang="ts">
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/logos"
</script>

<template>
  <div class="px-6 py-12">
    <p class="text-balance text-center font-medium text-foreground/80 text-lg">
      Trusted by teams and companies around the world
    </p>
    <div class="mx-auto mt-10 grid max-w-5xl grid-cols-2 place-items-center gap-x-4 gap-y-4 grayscale-100 sm:grid-cols-3 md:grid-cols-4">
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo01 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo02 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo03 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo04 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo05 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo06 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo07 class="h-7 sm:h-8" />
      </div>
      <div class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7">
        <Logo08 class="h-7 sm:h-8" />
      </div>
    </div>
  </div>
</template>
