<script lang="ts">
export const description = "Ajakan bertindak di kartu gelap membulat dengan lambang di atasnya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Logo from '@/blocks/cta-07/components/Logo.vue'
</script>

<template>
  <div class="px-0 py-16 sm:px-6">
    <div class="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center rounded-3xl bg-foreground py-16 text-background dark:bg-foreground/7 dark:text-foreground">
      <Logo class="size-14" />
      <h2 class="mt-10 font-medium text-5xl tracking-tighter">
        Ready to Build Faster?
      </h2>
      <p class="mx-auto mt-6 max-w-xl text-center text-background/70 text-xl/normal dark:text-muted-foreground">
        Join thousands of developers using our premium component library to
        ship beautiful UIs in minutes, not hours.
      </p>
      <Button class="mt-8">Get Started</Button>
    </div>
  </div>
</template>
