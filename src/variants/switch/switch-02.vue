<script lang="ts">
export const description = "Dengan label di sampingnya."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch id="enable-feature" />
    <Label for="enable-feature">Enable Feature</Label>
  </div>
</template>
