<script lang="ts">
export const description = "Slider bawaan, satu tuas."
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider
    :class="cn('max-w-sm')"
    :default-value="[50]"
    :max="100"
    :step="1"
  />
</template>
