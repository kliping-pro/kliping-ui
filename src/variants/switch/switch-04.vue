<script lang="ts">
export const description = "Tiga warna berbeda saat menyala."
</script>

<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch defaultChecked />
    <Switch class="data-[state=checked]:bg-green-500" defaultChecked />
    <Switch class="data-[state=checked]:bg-indigo-500" defaultChecked />
    <Switch class="data-[state=checked]:bg-rose-500" defaultChecked />
  </div>
</template>
