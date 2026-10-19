<script lang="ts">
export const description = "Kartu polos berisi satu paragraf, tanpa judul dan tombol."
</script>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <Card class="w-full max-w-md">
    <CardContent class="pt-6">
      <p class="text-muted-foreground text-sm">
        This is a plain card with simple content. Perfect for displaying basic
        information.
      </p>
    </CardContent>
  </Card>
</template>
