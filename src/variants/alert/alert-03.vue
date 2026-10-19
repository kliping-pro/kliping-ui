<script lang="ts">
export const description = "Nada hijau, untuk yang berhasil."
</script>

<script setup lang="ts">
import { CircleCheckBigIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert class="border-emerald-600/50 text-emerald-600 dark:border-emerald-600 [&>svg]:text-emerald-600">
    <CircleCheckBigIcon class="size-4" />
    <AlertTitle>Operation Successful</AlertTitle>
    <AlertDescription class="text-emerald-600">
      Your action has been completed successfully
    </AlertDescription>
  </Alert>
</template>
