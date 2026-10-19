<script lang="ts">
export const description = "Halaman 404 paling ringkas: satu ikon, satu judul, satu tombol."
</script>

<script setup lang="ts">
import { ArrowLeftIcon, OctagonXIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
    <div class="flex size-12 items-center justify-center rounded-2xl border bg-muted">
      <OctagonXIcon class="size-6 text-muted-foreground" />
    </div>
    <h1 class="font-medium text-4xl tracking-tight">
      This page doesn't exist
    </h1>
    <Button as-child class="mt-4" variant="secondary">
      <a href="/">
        <ArrowLeftIcon />
        Go back home
      </a>
    </Button>
  </div>
</template>
