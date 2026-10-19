<script lang="ts">
export const description = "Footer satu baris paling ringkas."
</script>

<script setup lang="ts">
import { Wheat } from '@lucide/vue'
</script>

<template>
  <footer class="flex items-center justify-between border-t bg-background px-6 py-4">
    <a class="flex items-center gap-2" href="/">
      <Wheat />
      <span class="font-medium text-xl">Bloxxee</span>
    </a>

    <p class="font-medium text-muted-foreground text-sm">
      Copyright &copy; {{ new Date().getFullYear() }} Bloxxee. All rights
      reserved.
    </p>
  </footer>
</template>
