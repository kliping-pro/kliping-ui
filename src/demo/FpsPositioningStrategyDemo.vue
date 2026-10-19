<!-- example: 1. Positioning Strategy -->
<script setup lang="ts">
import { ref } from 'vue'
import { Fps } from '@/components/fps'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

// `fixed` menempel di sudut layar — di halaman dokumentasi itu melayang di atas
// isi lain, jadi baru dinyalakan saat diminta.
const showFixed = ref(false)
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div class="relative h-40 w-full rounded-lg border bg-muted/50 p-4">
      <Fps strategy="absolute" position="top-right" label="Absolute" />
      <div class="flex size-full flex-col items-center justify-center gap-1">
        <div>Absolute positioning</div>
        <div class="text-sm text-muted-foreground">
          Relative to this container, without a portal
        </div>
      </div>
    </div>
    <div class="relative flex h-40 w-full flex-col items-center justify-center gap-3 rounded-lg border bg-muted/50 p-4">
      <Fps v-if="showFixed" strategy="fixed" position="bottom-right" label="Fixed" />
      <div class="flex flex-col items-center gap-1">
        <div>Fixed positioning</div>
        <div class="text-sm text-muted-foreground">
          Relative to the viewport, with a portal
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Switch id="fps-fixed" v-model="showFixed" />
        <Label for="fps-fixed">Show fixed counter</Label>
      </div>
    </div>
  </div>
</template>
