<script lang="ts">
export const description = "Angka pemberitahuan menempel di pojok tombol ikon."
</script>

<script setup lang="ts">
import { BellIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative">
      <Button size="icon" variant="outline">
        <BellIcon />
      </Button>
      <span class="absolute top-0 right-0 flex min-w-4 origin-center translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-destructive px-1 text-white text-xs">
        2
      </span>
    </div>
  </div>
</template>
