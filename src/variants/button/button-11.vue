<script lang="ts">
export const description = "Tombol ikon bulat untuk tiga jejaring sosial."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandTwitter,
} from '@tabler/icons-vue'
</script>

<template>
  <div class="flex items-center gap-2">
    <Button class="rounded-full" size="icon">
      <IconBrandTwitch />
    </Button>
    <Button class="rounded-full" size="icon">
      <IconBrandInstagram />
    </Button>
    <Button class="rounded-full" size="icon">
      <IconBrandTwitter />
    </Button>
  </div>
</template>
