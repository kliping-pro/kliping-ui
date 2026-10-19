<script lang="ts">
export const description = "Foto bulat di dalam lencananya, di kiri atau di kanan."
</script>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge class="h-7 gap-1.5 rounded-full pl-0.75" variant="outline">
      <img loading="lazy"
        alt=""
        class="aspect-square rounded-full"
        :height="20"
        src="/samples/avatars/avatar-13.svg"
        :width="20"
      />
      shadcn
    </Badge>
    <Badge class="h-7 gap-1.5 rounded-full pr-0.75" variant="outline">
      shadcn
      <img loading="lazy"
        alt=""
        class="h-5 w-5 rounded-full"
        :height="20"
        src="/samples/avatars/avatar-13.svg"
        :width="20"
      />
    </Badge>
  </div>
</template>
