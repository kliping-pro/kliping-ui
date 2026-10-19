<!-- example: 3. Different Shapes -->
<script setup lang="ts">
import { ref } from 'vue'
import { Cropper, CropperArea, CropperImage, CropperViewport } from '@/components/cropper'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const SHAPES = [
  { label: 'Rectangle', value: 'rectangle' },
  { label: 'Circle', value: 'circle' },
] as const

const shape = ref<'rectangle' | 'circle'>('rectangle')
const grid = ref(false)
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-1">
        <Button
          v-for="item in SHAPES"
          :key="item.value"
          size="sm"
          :variant="shape === item.value ? 'default' : 'outline'"
          @click="shape = item.value"
        >
          {{ item.label }}
        </Button>
      </div>
      <div class="flex items-center gap-2">
        <Switch id="cropper-shapes-grid" v-model="grid" />
        <Label for="cropper-shapes-grid">Show grid</Label>
      </div>
    </div>
    <Cropper :aspect-ratio="1">
      <CropperViewport class="max-h-72">
        <CropperImage alt="Sample landscape to crop" src="/images/crop-example.svg" />
        <CropperArea :circular="shape === 'circle'" :grid="grid" />
      </CropperViewport>
    </Cropper>
  </div>
</template>
