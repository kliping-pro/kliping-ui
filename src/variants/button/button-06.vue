<script lang="ts">
export const description = "Sedang memuat: pemintal menggantikan ikonnya."
</script>

<script setup lang="ts">
import { Spinner } from "@/components/ui/spinner"
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex items-center gap-2">
    <Button size="icon">
      <Spinner />
    </Button>
    <Button>
      <Spinner /> Loading
    </Button>
  </div>
</template>
