<script lang="ts">
export const description = "Garis tebal di tepi kiri, tanpa sudut membulat."
</script>

<script setup lang="ts">
import { CircleFadingArrowUpIcon } from '@lucide/vue'
import { Alert, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <div class="w-full space-y-4">
    <Alert class="rounded-none border-0 border-l-4 border-l-blue-500 bg-blue-500/10 dark:bg-blue-500/20">
      <CircleFadingArrowUpIcon class="h-4 w-4 text-blue-500!" />
      <AlertTitle>A new version of the app is now available.</AlertTitle>
    </Alert>
    <Alert class="rounded-none border-blue-300 border-l-4 border-l-blue-500 bg-blue-500/10 dark:border-blue-500/60 dark:border-l-blue-500 dark:bg-blue-600/20">
      <CircleFadingArrowUpIcon class="h-4 w-4 text-blue-500!" />
      <AlertTitle>A new version of the app is now available.</AlertTitle>
    </Alert>
    <Alert class="border-0 border-l-4 border-l-blue-500 bg-blue-500/10 dark:bg-blue-500/20">
      <CircleFadingArrowUpIcon class="h-4 w-4 text-blue-500!" />
      <AlertTitle>A new version of the app is now available.</AlertTitle>
    </Alert>
    <Alert class="border-blue-300 border-l-4 border-l-blue-500 bg-blue-500/10 dark:border-blue-500/60 dark:border-l-blue-500 dark:bg-blue-600/20">
      <CircleFadingArrowUpIcon class="h-4 w-4 text-blue-500!" />
      <AlertTitle>A new version of the app is now available.</AlertTitle>
    </Alert>
  </div>
</template>
