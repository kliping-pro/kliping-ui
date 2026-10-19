<!-- example: 1. Controlled State -->
<script setup lang="ts">
import type { Point } from '@/components/cropper'
import { RotateCcw } from '@lucide/vue'
import { ref } from 'vue'
import { Cropper, CropperArea, CropperImage, CropperViewport } from '@/components/cropper'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const zoom = ref(1)
const rotation = ref(0)
const offset = ref<Point>({ x: 0, y: 0 })

function reset() {
  zoom.value = 1
  rotation.value = 0
  offset.value = { x: 0, y: 0 }
}
</script>

<template>
  <div class="relative flex w-full max-w-lg flex-col gap-4">
    <Cropper v-model:zoom="zoom" v-model:rotation="rotation" v-model:offset="offset" :aspect-ratio="1" :max-zoom="3">
      <CropperViewport class="max-h-72">
        <CropperImage alt="Sample landscape to crop" src="/images/crop-example.svg" />
        <CropperArea />
      </CropperViewport>
    </Cropper>
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex w-full flex-col gap-2.5">
        <Label>Zoom: {{ zoom.toFixed(2) }}</Label>
        <Slider
          aria-label="Zoom"
          :max="3"
          :min="1"
          :model-value="[zoom]"
          :step="0.1"
          @update:model-value="value => zoom = value?.[0] ?? 1"
        />
      </div>
      <div class="flex w-full flex-col gap-2.5">
        <Label>Rotation: {{ rotation.toFixed(0) }}°</Label>
        <Slider
          aria-label="Rotation"
          :max="180"
          :min="-180"
          :model-value="[rotation]"
          :step="1"
          @update:model-value="value => rotation = value?.[0] ?? 0"
        />
      </div>
    </div>
    <Button aria-label="Reset crop" class="absolute top-2 right-2 size-8" size="icon" variant="outline" @click="reset">
      <RotateCcw />
    </Button>
  </div>
</template>
