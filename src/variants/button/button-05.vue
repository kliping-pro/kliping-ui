<script lang="ts">
export const description = "Berikon, di kiri maupun di kanan tulisannya."
</script>

<script setup lang="ts">
import { ArrowRight, Star } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex items-center gap-2">
    <Button size="icon">
      <Star />
    </Button>
    <Button>
      <Star /> Star
    </Button>
    <Button>
      Read More <ArrowRight />
    </Button>
  </div>
</template>
