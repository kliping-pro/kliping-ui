<script lang="ts">
export const description = "Pemilih berkas."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="w-full max-w-xs">
    <Label for="picture">Profile Picture</Label>
    <Input class="mt-2" id="picture" type="file" />
  </div>
</template>
