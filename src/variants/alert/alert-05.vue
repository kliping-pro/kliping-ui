<script lang="ts">
export const description = "Nada biru langit, untuk kabar yang sekadar memberi tahu."
</script>

<script setup lang="ts">
import { InfoIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert class="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
    <InfoIcon class="size-4" />
    <AlertTitle>Important Information</AlertTitle>
    <AlertDescription class="text-cyan-600">
      Make sure to review the recent updates before proceeding.
    </AlertDescription>
  </Alert>
</template>
