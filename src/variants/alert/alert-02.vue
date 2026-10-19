<script lang="ts">
export const description = "Nada merusak, untuk kabar yang gagal."
</script>

<script setup lang="ts">
import { OctagonAlertIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert variant="destructive">
    <OctagonAlertIcon class="size-4" />
    <AlertTitle>Something Went Wrong</AlertTitle>
    <AlertDescription>
      An error occurred while processing your request.
    </AlertDescription>
  </Alert>
</template>
