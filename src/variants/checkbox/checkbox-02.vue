<script lang="ts">
export const description = "Dimatikan, beserta labelnya yang ikut pudar."
</script>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox disabled id="terms-disabled" />
    <label
      class="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for="terms-disabled"
    >
      Accept terms and conditions
    </label>
  </div>
</template>
