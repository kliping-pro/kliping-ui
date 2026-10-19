<script lang="ts">
export const description = "Tombol yang tampil seperti tautan, termasuk yang dimatikan."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button variant="link">Link</Button>
    <Button disabled variant="link">
      Disabled Link
    </Button>
  </div>
</template>
