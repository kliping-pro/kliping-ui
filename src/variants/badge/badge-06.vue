<script lang="ts">
export const description = "Latar bergradasi biru ke nila."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge class="rounded-full border-none bg-linear-to-r from-sky-500 to-indigo-600 text-white">
    Gradient
  </Badge>
</template>
