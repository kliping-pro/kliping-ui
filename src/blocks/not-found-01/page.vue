<script lang="ts">
export const description = "Halaman 404 polos di tengah layar dengan dua tombol."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <h1 class="mt-4 font-medium text-[2.5rem]/none tracking-[-0.02em]">
      Page not found
    </h1>
    <p class="mt-6 max-w-sm text-muted-foreground">
      Sorry, we couldn't find the page you're looking for. It may
      have been moved or deleted.
    </p>
    <div class="mt-10 flex gap-3">
      <Button as-child>
        <a href="/">Go home</a>
      </Button>
      <Button as-child variant="outline">
        <a href="#">Contact support</a>
      </Button>
    </div>
  </div>
</template>
