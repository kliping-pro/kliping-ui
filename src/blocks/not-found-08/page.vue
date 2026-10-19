<script lang="ts">
export const description = "Halaman 404 dengan angka raksasa samar sebagai latar."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
    <p class="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-black text-[40vw] text-foreground/2 leading-none">
      404
    </p>
    <div class="relative z-10">
      <h1 class="font-medium text-4xl/none tracking-tight">
        Page not found
      </h1>
      <p class="mx-auto mt-5 max-w-sm text-lg text-muted-foreground">
        The page you're looking for doesn't exist or may have been
        moved.
      </p>
      <div class="mt-8 flex justify-center gap-3">
        <Button as-child>
          <a href="/">Go home</a>
        </Button>
        <Button as-child variant="outline">
          <a href="#">Contact support</a>
        </Button>
      </div>
    </div>
  </div>
</template>
