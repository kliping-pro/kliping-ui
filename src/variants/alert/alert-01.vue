<script lang="ts">
export const description = "Peringatan bawaan: ikon, judul, dan satu baris keterangan."
</script>

<script setup lang="ts">
import { CircleFadingArrowUpIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert>
    <CircleFadingArrowUpIcon class="size-4" />
    <AlertTitle>Update Available</AlertTitle>
    <AlertDescription>
      A new version of the app is now available.
    </AlertDescription>
  </Alert>
</template>
