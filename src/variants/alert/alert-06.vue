<script lang="ts">
export const description = "Berlatar abu, tanpa warna nada apa pun."
</script>

<script setup lang="ts">
import { OctagonAlertIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert class="bg-muted">
    <OctagonAlertIcon class="size-4" />
    <AlertTitle class="text-foreground">Something Went Wrong</AlertTitle>
    <AlertDescription class="text-foreground">
      An error occurred while processing your request.
    </AlertDescription>
  </Alert>
</template>
