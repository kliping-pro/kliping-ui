<!-- example: 3. Navigation Buttons -->
<script setup lang="ts">
import { Scroller } from '@/components/scroller'
</script>

<template>
  <Scroller
    hide-scrollbar
    with-navigation
    scroll-trigger-mode="press"
    class="flex h-80 w-full flex-col gap-2.5 p-4"
  >
    <div v-for="index in 10" :key="index" class="flex shrink-0 flex-col rounded-md bg-accent p-4">
      <div class="text-lg font-medium">
        Card {{ index }}
      </div>
      <span class="text-sm text-muted-foreground">Use the navigation arrows to scroll</span>
    </div>
  </Scroller>
</template>
