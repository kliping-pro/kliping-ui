<!-- example: 2. Controlled State -->
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
  ColorPickerTrigger,
} from '@/components/color-picker'
import { Button } from '@/components/ui/button'

const presets = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b']

const color = ref('#3b82f6')
const open = ref(false)

function reset() {
  color.value = '#000000'
  open.value = false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <ColorPicker v-model="color" v-model:open="open" format="hex" class="w-auto">
        <ColorPickerTrigger class="w-auto px-3" aria-label="Pick Color">
          <ColorPickerSwatch class="size-4" />
          Pick Color
        </ColorPickerTrigger>
        <ColorPickerContent>
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
        </ColorPickerContent>
      </ColorPicker>
      <Button variant="outline" @click="reset">
        Reset
      </Button>
    </div>

    <div class="flex flex-col gap-2">
      <h4 class="text-sm font-medium">
        Preset Colors
      </h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset"
          type="button"
          class="hover:border-border focus-visible:border-ring size-8 rounded border-2 border-transparent focus-visible:outline-none"
          :style="{ backgroundColor: preset }"
          :aria-label="`Select color ${preset}`"
          @click="color = preset"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2 text-sm">
      <div>
        <span class="font-medium">Current color:</span>
        <code class="ml-2 font-mono">{{ color }}</code>
      </div>
      <div>
        <span class="font-medium">Picker state:</span>
        <span class="ml-2">{{ open ? 'Open' : 'Closed' }}</span>
      </div>
    </div>
  </div>
</template>
