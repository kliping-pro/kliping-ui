<script lang="ts">
export const description = "Bilah pengumuman berkartu dengan tombol tutup di pojoknya."
</script>

<script setup lang="ts">
import { ArrowUpRight, X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-6 py-10">
    <div class="relative mx-auto flex min-h-10 max-w-lg flex-wrap items-center justify-between gap-3 rounded-lg bg-muted px-5 py-4 text-center text-sm">
      <p>We just released the premium version 🎉</p>
      <Button>
        Check it out <ArrowUpRight />
      </Button>
      <Button
        class="absolute -top-2.5 -right-2.5 size-6"
        aria-label="Dismiss"
        size="icon"
        variant="outline"
      >
        <X class="size-3" />

      </Button>
    </div>
  </div>
</template>
