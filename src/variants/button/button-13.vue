<script lang="ts">
export const description = "Bercahaya nila, dengan bayangan berwarna di bawahnya."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import ButtonNeon from '@/variants/button/components/ButtonNeon.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <ButtonNeon>Neon</ButtonNeon>
    <ButtonNeon size="icon">
      <StarIcon />
    </ButtonNeon>
    <ButtonNeon>
      <StarIcon /> Star
    </ButtonNeon>
  </div>
</template>
