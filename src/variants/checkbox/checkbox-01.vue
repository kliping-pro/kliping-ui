<script lang="ts">
export const description = "Kotak centang bawaan, dengan label di sampingnya."
</script>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" />
    <label
      class="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for="terms"
    >
      Accept terms and conditions
    </label>
  </div>
</template>
