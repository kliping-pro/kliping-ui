<!-- example: 2. Hidden Scrollbar -->
<script setup lang="ts">
import { Scroller } from '@/components/scroller'
</script>

<template>
  <Scroller class="flex h-80 w-full flex-col gap-2.5 p-4" hide-scrollbar>
    <div v-for="index in 20" :key="index" class="flex h-40 shrink-0 flex-col rounded-md bg-accent p-4">
      <div class="text-lg font-medium">
        Card {{ index }}
      </div>
      <span class="text-sm text-muted-foreground">Scroll smoothly without visible scrollbars</span>
    </div>
  </Scroller>
</template>
