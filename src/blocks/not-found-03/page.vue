<script lang="ts">
export const description = "Halaman 404 dua kolom dengan panel gelap berisi angka berwarna."
</script>

<script setup lang="ts">
import { OctagonXIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import Number0 from '@/blocks/not-found-03/components/Number0.vue'
import Number4 from '@/blocks/not-found-03/components/Number4.vue'
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <div class="flex flex-col items-center justify-center px-8 py-16 lg:items-start lg:px-16">
      <div class="flex size-10 items-center justify-center rounded-xl border bg-muted">
        <OctagonXIcon class="size-5 text-muted-foreground" />
      </div>
      <h1 class="mt-6 font-medium text-4xl/none tracking-tight">
        Page not found
      </h1>
      <p class="mt-4 max-w-sm text-lg text-muted-foreground">
        Sorry, the page you're looking for doesn't exist or has been
        moved to a new location.
      </p>
      <div class="mt-8 flex gap-3">
        <Button as-child>
          <a href="/">Go home</a>
        </Button>
        <Button as-child variant="outline">
          <a href="#">Contact support</a>
        </Button>
      </div>
    </div>
    <div class="relative hidden items-center justify-center overflow-hidden border-border/70 bg-neutral-950 lg:flex dark:border-s">
      <div class="absolute top-1/4 left-1/4 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-3xl" />
      <div class="absolute right-1/4 bottom-1/4 size-72 translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.145_0_0/0.6)_100%)]" />
      <div class="relative flex items-center gap-2 *:size-32">
        <Number4 />
        <Number0 />
        <Number4 />
      </div>
    </div>
  </div>
</template>
