<script lang="ts">
export const description = "Latar bergradasi biru ke nila."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import ButtonGradient from '@/variants/button/components/ButtonGradient.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <ButtonGradient>Gradient</ButtonGradient>
    <ButtonGradient size="icon">
      <StarIcon />
    </ButtonGradient>
    <ButtonGradient>
      <StarIcon /> Star
    </ButtonGradient>
  </div>
</template>
