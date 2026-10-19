<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <AspectRatio :ratio="16 / 9" class="bg-muted rounded-lg">
    <img
      src="/samples/photos/photo-05.svg"
      alt="Photo by Drew Beamer"
      fill
      class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
    >
  </AspectRatio>
</template>
