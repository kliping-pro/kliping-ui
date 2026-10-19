<script lang="ts">
export const description = "Berlatar abu tanpa garis tepi."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input
    class="max-w-xs border-none bg-secondary shadow-none"
    placeholder="Email"
    type="email"
  />
</template>
