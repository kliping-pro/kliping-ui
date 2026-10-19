<script lang="ts">
export const description = "Empat warna berbeda."
</script>

<script setup lang="ts">
import { Loader2Icon } from '@lucide/vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Loader2Icon class="animate-spin" />
    <Loader2Icon class="animate-spin text-green-500" />
    <Loader2Icon class="animate-spin text-indigo-500" />
    <Loader2Icon class="animate-spin text-rose-500" />
  </div>
</template>
