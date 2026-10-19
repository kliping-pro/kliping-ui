<script lang="ts">
export const description = "Selebar kolom yang menampungnya."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button class="w-full">
    <StarIcon /> Star
  </Button>
</template>
