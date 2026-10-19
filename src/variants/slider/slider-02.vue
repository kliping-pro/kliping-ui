<script lang="ts">
export const description = "Dimatikan, tidak bisa digeser."
</script>

<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider
    class="max-w-sm data-disabled:cursor-not-allowed data-disabled:opacity-50"
    :default-value="[50]"
    disabled
    :max="100"
    :step="1"
  />
</template>
