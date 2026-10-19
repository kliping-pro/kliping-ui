<script lang="ts">
export const description = "Ajakan bertindak polos di tengah, tanpa latar."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-0 py-20 sm:px-6">
    <div class="relative flex w-full flex-col items-center justify-center py-16">
      <h2 class="font-medium text-5xl tracking-tighter">
        Ready to Build Faster?
      </h2>
      <p class="mx-auto mt-6 max-w-xl text-center text-muted-foreground text-xl/normal">
        Join thousands of developers using our premium component library to
        ship beautiful UIs in minutes, not hours.
      </p>
      <Button class="mt-8">Get Started</Button>
    </div>
  </div>
</template>
