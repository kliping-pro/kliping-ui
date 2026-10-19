<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectQRCodeContext } from './context'

/** A pulsing placeholder while the code is generating. Disappears once done. */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state, result } = injectQRCodeContext('QRCodeSkeleton')
const { dataUrl, svgString } = result
</script>

<template>
  <Primitive
    v-if="!dataUrl && !svgString"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute max-h-(--qr-code-size) max-w-(--qr-code-size) animate-pulse bg-accent', props.class)"
    data-slot="qr-code-skeleton"
    :style="{ width: `${state.size}px`, height: `${state.size}px` }"
  >
    <slot />
  </Primitive>
</template>
