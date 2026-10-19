<script lang="ts">
export const description = "Angka hitungan di dalam lencananya sendiri."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge class="gap-2">
      Projects <span class="opacity-70">6</span>
    </Badge>
    <Badge class="gap-2" variant="outline">
      Members <span class="text-muted-foreground">11</span>
    </Badge>
    <Badge class="gap-2" variant="secondary">
      Tasks <span class="text-muted-foreground">7</span>
    </Badge>
  </div>
</template>
