<!-- example: 4. Conditional Rendering -->
<script setup lang="ts">
import { ref } from 'vue'
import { Fps } from '@/components/fps'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

// Di aplikasi sungguhan: `:enabled="import.meta.env.DEV"`.
const enabled = ref(true)
</script>

<template>
  <div class="relative flex h-40 w-full flex-col items-center justify-center gap-3 rounded-lg border bg-muted/50 p-4">
    <Fps strategy="absolute" position="top-right" :enabled="enabled" />
    <div class="flex items-center gap-2">
      <Switch id="fps-enabled" v-model="enabled" />
      <Label for="fps-enabled">Enabled (e.g. only in development)</Label>
    </div>
  </div>
</template>
