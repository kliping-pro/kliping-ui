<script lang="ts">
export const description = "Dimatikan, tidak bisa diisi."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input class="max-w-xs" disabled placeholder="Email" type="email" />
</template>
