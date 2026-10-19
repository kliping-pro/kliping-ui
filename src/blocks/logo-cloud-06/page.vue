<script lang="ts">
export const description = "Logo bergulir tanpa henti dalam satu jalur."
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
import { Marquee } from '@/components/ui/marquee'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="overflow-hidden">
      <p class="text-center font-medium text-foreground/80 text-xl tracking-[-0.01em]">
        More than 2.2 million companies worldwide already trust us
      </p>

      <div class="mt-10 flex max-w-(--breakpoint-lg) items-center justify-center gap-x-14 gap-y-10 *:h-14">
        <Marquee
          class="mask-x-from-75% [--duration:20s] [&_svg]:mr-10"
          pauseOnHover
        >
          <Logo01 />
          <Logo02 />
          <Logo03 />
          <Logo04 />
          <Logo05 />
          <Logo06 />
          <Logo07 />
          <Logo08 />
        </Marquee>
      </div>
    </div>
  </div>
</template>
