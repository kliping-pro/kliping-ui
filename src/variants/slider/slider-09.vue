<script lang="ts">
export const description = "Penanda nilai tertulis di bawah jalurnya."
</script>

<script setup lang="ts">
import { Slider } from '@/components/ui/slider'

const ramExpansions = ["4GB", "6GB", "8GB"]
</script>

<template>
  <div class="w-full max-w-sm">
    <Slider :default-value="[1]" :max="2" :step="1" />
    <div class="-mx-1.5 mt-2 flex items-center justify-between text-muted-foreground text-xs">
      <span v-for="expansion in ramExpansions" :key="expansion">{{ expansion }}</span>
    </div>
  </div>
</template>
