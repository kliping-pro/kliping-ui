<script lang="ts">
export const description = "Sudut bulat penuh."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button class="rounded-full">Rounded</Button>
    <Button class="rounded-full" size="icon">
      <StarIcon />
    </Button>
    <Button class="rounded-full">
      <StarIcon /> Star
    </Button>
  </div>
</template>
