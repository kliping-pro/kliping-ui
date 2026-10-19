<script lang="ts">
export const description = "Empat ukuran, dari kecil sampai besar."
</script>

<script setup lang="ts">
import { Loader2Icon } from '@lucide/vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Loader2Icon class="h-4 w-4 animate-spin" />
    <Loader2Icon class="h-5 w-5 animate-spin" />
    <Loader2Icon class="h-6 w-6 animate-spin" />
    <Loader2Icon class="h-8 w-8 animate-spin" />
  </div>
</template>
