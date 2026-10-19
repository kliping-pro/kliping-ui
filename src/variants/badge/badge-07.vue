<script lang="ts">
export const description = "Garis tepinya yang bergradasi, bukan latarnya."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex items-center justify-center rounded-full bg-linear-to-r from-sky-400 to-indigo-600 p-0.5">
    <Badge class="rounded-full border-none bg-background text-foreground">
      Gradient Outline
    </Badge>
  </div>
</template>
