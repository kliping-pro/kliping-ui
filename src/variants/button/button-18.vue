<script lang="ts">
export const description = "Tiga tombol yang menyatu jadi satu kelompok."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <Button variant="secondary">Left</Button>
    <ButtonGroupSeparator />
    <Button variant="secondary">Middle</Button>
    <ButtonGroupSeparator />
    <Button variant="secondary">Right</Button>
  </ButtonGroup>
</template>
