<script lang="ts">
export const description = "Dengan label di atasnya."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="w-full max-w-xs">
    <Label for="email">Email</Label>
    <Input class="mt-2" id="email" placeholder="Email" type="email" />
  </div>
</template>
