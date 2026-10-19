<script setup lang="ts">
import type { CropArea } from '@/components/cropper'
import { onBeforeUnmount, ref } from 'vue'
import {
  Cropper,
  CropperArea,
  CropperImage,
  CropperReset,
  CropperRotate,
  CropperViewport,
  CropperZoomSlider,
  canvasToBlob,
  cropToCanvas,
} from '@/components/cropper'
import { Button } from '@/components/ui/button'

const aspectRatio = ref(1)
const isCircular = ref(false)
const cropArea = ref<CropArea>()
const result = ref<string>()

const wrapper = ref<HTMLElement>()

const RATIOS = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:4', value: 3 / 4 },
]

async function crop() {
  const image = wrapper.value?.querySelector('img')
  if (!image || !cropArea.value) return

  const canvas = await cropToCanvas(
    image,
    { width: image.naturalWidth, height: image.naturalHeight },
    cropArea.value,
  )

  const blob = await canvasToBlob(canvas, 'image/png')

  // URL objek yang lama dilepas sebelum diganti — kalau tidak, tiap kali
  // dipotong ada satu blob yang menetap di memori sampai halamannya ditutup.
  if (result.value) URL.revokeObjectURL(result.value)
  result.value = URL.createObjectURL(blob)
}

onBeforeUnmount(() => {
  if (result.value) URL.revokeObjectURL(result.value)
})
</script>

<template>
  <div ref="wrapper" class="grid w-full gap-6 lg:grid-cols-[1fr_16rem]">
    <Cropper :aspect-ratio="aspectRatio" @crop-change="cropArea = $event">
      <div class="flex flex-wrap items-center gap-1">
        <Button
          v-for="ratio in RATIOS"
          :key="ratio.label"
          size="sm"
          :variant="aspectRatio === ratio.value ? 'default' : 'outline'"
          @click="aspectRatio = ratio.value"
        >
          {{ ratio.label }}
        </Button>
        <Button
          class="ml-1"
          size="sm"
          :variant="isCircular ? 'default' : 'outline'"
          @click="isCircular = !isCircular"
        >
          Circle
        </Button>
      </div>

      <CropperViewport class="max-h-96">
        <CropperImage alt="Sample landscape to crop" src="/images/crop-example.svg" />
        <CropperArea :circular="isCircular" />
      </CropperViewport>

      <div class="flex items-center gap-2">
        <CropperZoomSlider class="flex-1" />
        <CropperRotate direction="counterclockwise" />
        <CropperRotate />
        <CropperReset />
      </div>

      <div class="flex items-center gap-2">
        <Button size="sm" @click="crop">
          Crop
        </Button>
        <code v-if="cropArea" class="text-muted-foreground text-xs">
          {{ Math.round(cropArea.width) }} &times; {{ Math.round(cropArea.height) }} px
        </code>
      </div>
    </Cropper>

    <div class="flex flex-col gap-2">
      <p class="font-medium text-sm">
        Result
      </p>
      <div class="flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-muted/40">
        <img v-if="result" alt="Cropped result" :class="isCircular ? 'size-full rounded-full object-cover' : 'size-full object-contain'" :src="result">
        <span v-else class="px-4 text-center text-muted-foreground text-sm">
          Press <b>Crop</b> to see the result.
        </span>
      </div>
      <p class="text-muted-foreground text-sm">
        Drag the image, scroll to zoom, or use the arrow keys.
      </p>
    </div>
  </div>
</template>
