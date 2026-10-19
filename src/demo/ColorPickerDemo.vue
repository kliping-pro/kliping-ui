<script setup lang="ts">
import { ref } from 'vue'
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerSwatches,
  ColorPickerSwatchItem,
  ColorPickerTrigger,
} from '@/components/color-picker'

const color = ref('#3b82f6')
const background = ref('rgb(220, 38, 38)')

const palette = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
]
</script>

<template>
  <div class="grid w-full gap-8 sm:grid-cols-2">
    <div class="flex flex-col gap-3">
      <p class="font-medium text-sm">
        Inline
      </p>

      <ColorPicker v-model="color" class="w-full max-w-64">
        <ColorPickerArea />
        <ColorPickerHueSlider />
        <ColorPickerAlphaSlider />

        <div class="flex items-center gap-2">
          <ColorPickerSwatch />
          <ColorPickerInput class="flex-1" />
          <ColorPickerEyeDropper />
        </div>

        <ColorPickerSwatches>
          <ColorPickerSwatchItem v-for="swatch in palette" :key="swatch" :value="swatch" />
        </ColorPickerSwatches>
      </ColorPicker>

      <p class="text-muted-foreground text-sm">
        Value: <code>{{ color }}</code>
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <p class="font-medium text-sm">
        In a popover
      </p>

      <ColorPicker v-model="background" class="w-full max-w-64" format="rgb">
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHueSlider />

          <div class="flex items-center gap-2">
            <ColorPickerFormatSelect />
            <ColorPickerInput class="flex-1" />
          </div>
        </ColorPickerContent>
      </ColorPicker>

      <div
        class="flex h-24 items-center justify-center rounded-md border font-mono text-sm"
        :style="{ backgroundColor: background }"
      >
        <span class="rounded bg-background/80 px-2 py-1">{{ background }}</span>
      </div>
    </div>
  </div>
</template>
