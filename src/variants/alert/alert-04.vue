<script lang="ts">
export const description = "Nada kuning, untuk yang perlu dipertimbangkan dulu."
</script>

<script setup lang="ts">
import { AlertTriangleIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert class="border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500">
    <AlertTriangleIcon class="size-4" />
    <AlertTitle>Proceed with Caution</AlertTitle>
    <AlertDescription class="text-amber-500">
      This action might have unintended consequences.
    </AlertDescription>
  </Alert>
</template>
