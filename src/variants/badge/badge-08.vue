<script lang="ts">
export const description = "Titik status berwarna di depan tulisannya."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge class="gap-1.5 bg-amber-600/10 text-amber-500 shadow-none hover:bg-amber-600/10 dark:bg-amber-600/20">
      <div class="h-1.5 w-1.5 rounded-full bg-amber-500" /> In Progress
    </Badge>
    <Badge class="gap-1.5" variant="destructive">
      <div class="h-1.5 w-1.5 rounded-full bg-red-400" /> Blocked
    </Badge>
    <Badge class="gap-1.5 bg-emerald-600/10 text-emerald-500 shadow-none hover:bg-emerald-600/10 dark:bg-emerald-600/20">
      <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Done
    </Badge>
  </div>
</template>
