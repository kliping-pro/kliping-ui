<script lang="ts">
export const description = "Cincin fokusnya biru, bukan warna bawaan."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input
    class="max-w-xs focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/20"
    placeholder="Email"
    type="email"
  />
</template>
