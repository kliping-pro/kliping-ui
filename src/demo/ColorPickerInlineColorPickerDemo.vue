<!-- example: 1. Inline Color Picker -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
} from '@/components/color-picker'

const color = ref('#f59e0b')
</script>

<template>
  <ColorPicker v-model="color" format="hex" class="w-full max-w-72">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <ColorPickerSwatch class="size-8" />
        <span class="text-sm font-medium">Selected Color</span>
      </div>
      <div class="flex flex-col gap-4 rounded-lg border p-4">
        <ColorPickerArea />
        <div class="flex items-center gap-2">
          <ColorPickerEyeDropper />
          <div class="flex flex-1 flex-col gap-2">
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ColorPickerFormatSelect />
          <ColorPickerInput class="flex-1" />
        </div>
      </div>
    </div>
  </ColorPicker>
</template>
