<script lang="ts">
export const description = "Tiga bentuk sudut, dari persegi sampai bulat penuh."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex items-center gap-2">
    <Badge class="rounded-none">Rectangular</Badge>
    <Badge class="rounded">Rounded</Badge>
    <Badge>Default</Badge>
  </div>
</template>
