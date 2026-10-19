<script lang="ts">
export const description = "Lencana yang bisa diklik, digambar sebagai tombol."
</script>

<script setup lang="ts">
import { badgeVariants } from '@/components/ui/badge'
</script>

<template>
  <button
    :class="badgeVariants({
      class: 'cursor-pointer select-none focus:ring-offset-1',
    })"
  >
    Clickable
  </button>
</template>
