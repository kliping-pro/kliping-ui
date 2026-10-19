<script lang="ts">
export const description = "Dimatikan, beserta labelnya yang ikut pudar."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch disabled id="enable-feature-disabled" />
    <Label for="enable-feature-disabled">Enable Feature</Label>
  </div>
</template>
