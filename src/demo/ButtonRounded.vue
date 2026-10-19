<script setup lang="ts">
import { ArrowUpIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col gap-8">
    <Button variant="outline" size="icon" class="rounded-full" aria-label="Scroll to top">
      <ArrowUpIcon />
    </Button>
  </div>
</template>
