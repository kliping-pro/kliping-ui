<script lang="ts">
export const description = "Pemisah mendatar dan tegak dalam satu contoh."
</script>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div>
    <div class="space-y-1">
      <h4 class="font-semibold text-sm leading-none">Radix Primitives</h4>
      <p class="text-muted-foreground text-sm">
        An open-source UI component library.
      </p>
    </div>
    <Separator class="my-2.5" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>
