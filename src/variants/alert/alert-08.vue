<script lang="ts">
export const description = "Latar berwarna beserta garis tepi senadanya."
</script>

<script setup lang="ts">
import { CircleFadingArrowUpIcon, OctagonAlert, ShieldAlert } from '@lucide/vue'
import { Alert, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <div class="w-full space-y-4">
    <Alert class="border-emerald-500/50 bg-emerald-600/10 text-emerald-500 dark:border-emerald-600/50 dark:bg-emerald-600/15">
      <CircleFadingArrowUpIcon class="size-4" />
      <AlertTitle>Your action has been completed successfully.</AlertTitle>
    </Alert>
    <Alert class="border-blue-400/50 bg-blue-500/10 text-blue-500 dark:border-blue-600/60 dark:bg-blue-600/20 dark:text-blue-400">
      <CircleFadingArrowUpIcon class="size-4" />
      <AlertTitle>A new version of the app is now available.</AlertTitle>
    </Alert>
    <Alert class="border-amber-500/50 bg-amber-600/10 text-amber-500 dark:border-amber-600/50 dark:bg-amber-600/15">
      <ShieldAlert class="size-4" />
      <AlertTitle>Changes will overwrite existing data.</AlertTitle>
    </Alert>
    <Alert class="border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/50 dark:bg-destructive/15">
      <OctagonAlert class="size-4" />
      <AlertTitle>
        Unable to process your request. Please try again later.
      </AlertTitle>
    </Alert>
  </div>
</template>
