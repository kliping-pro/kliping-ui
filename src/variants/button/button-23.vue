<script lang="ts">
export const description = "Sedikit mengecil saat ditekan."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button as-child>
      <Button class="active:scale-95">Tap</Button>
    </Button>
    <Button as-child size="icon">
      <Button class="active:scale-95">
        <StarIcon />
      </Button>
    </Button>
    <Button as-child>
      <Button class="active:scale-95">
        <StarIcon /> Star
      </Button>
    </Button>
  </div>
</template>
