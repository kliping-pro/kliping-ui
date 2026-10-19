<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RotateCcwIcon, RotateCwIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/**
 * Tombol memutar seperempat lingkaran.
 *
 * Putarannya dibiarkan menumpuk melewati 360 derajat, tidak dikembalikan ke
 * nol. Perhitungannya tidak peduli — sinus dan kosinus 450 derajat sama
 * dengan 90 — dan yang tidak dikembalikan membuat animasinya terus berputar
 * ke arah yang sama alih-alih melompat balik satu putaran penuh.
 */
const props = withDefaults(defineProps<{
  /** Rotation direction of each press: 'clockwise' or 'counterclockwise'. */
  direction?: 'clockwise' | 'counterclockwise'
  /** Rotation per press, in degrees. */
  step?: number
  class?: HTMLAttributes['class']
}>(), {
  direction: 'clockwise',
  step: 90,
})

const { state, setRotation } = injectCropperContext('CropperRotate')

function rotate() {
  const sign = props.direction === 'clockwise' ? 1 : -1
  setRotation(state.value.rotation + sign * props.step)
}
</script>

<template>
  <Button
    :aria-label="props.direction === 'clockwise' ? 'Rotate clockwise' : 'Rotate counterclockwise'"
    :class="cn(props.class)"
    data-slot="cropper-rotate"
    :disabled="state.disabled"
    size="icon"
    variant="outline"
    @click="rotate"
  >
    <slot>
      <RotateCwIcon v-if="props.direction === 'clockwise'" />
      <RotateCcwIcon v-else />
    </slot>
  </Button>
</template>
