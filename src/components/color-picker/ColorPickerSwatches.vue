<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ColorSwatchPickerRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectColorPickerContext } from './context'

/**
 * Palet warna siap pakai.
 *
 * Isinya `ColorPickerSwatchItem`, dan yang dipilih langsung jadi warna
 * akarnya. Bentuknya kisi mengalir, bukan kolom tetap — palet enam warna dan
 * palet dua puluh empat warna sama-sama harus terlihat rapi.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, setValue } = injectColorPickerContext('ColorPickerSwatches')

function select(value: AcceptableValue) {
  if (typeof value === 'string') setValue(value)
}
</script>

<template>
  <ColorSwatchPickerRoot
    aria-label="Swatches"
    :class="cn('flex flex-wrap gap-1.5', props.class)"
    data-slot="color-picker-swatches"
    :disabled="state.disabled"
    :model-value="state.value"
    @update:model-value="select"
  >
    <slot />
  </ColorSwatchPickerRoot>
</template>
