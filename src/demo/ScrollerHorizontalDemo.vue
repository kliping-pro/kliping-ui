<!-- example: 1. Horizontal Scroll -->
<script setup lang="ts">
import { Scroller } from '@/components/scroller'
</script>

<template>
  <Scroller orientation="horizontal" class="w-full p-4">
    <div class="flex items-center gap-2.5">
      <div
        v-for="index in 10"
        :key="index"
        class="flex h-32 w-[180px] shrink-0 flex-col items-center justify-center rounded-md bg-accent p-4"
      >
        <div class="text-lg font-medium">
          Card {{ index }}
        </div>
        <span class="text-sm text-muted-foreground">Scroll horizontally</span>
      </div>
    </div>
  </Scroller>
</template>
