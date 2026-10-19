<script lang="ts">
export const description = "Kelompok tombol menaik-menurun, tersusun ke bawah."
</script>

<script setup lang="ts">
import { ChevronDown, ChevronUp } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <Button class="gap-1 font-semibold" variant="outline">
      <ChevronUp class="size-5" /> 39
    </Button>
    <Button size="icon" variant="outline">
      <ChevronDown class="size-5" />
    </Button>
  </ButtonGroup>
</template>
