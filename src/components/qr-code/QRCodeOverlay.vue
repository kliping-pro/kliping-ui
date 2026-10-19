<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Sisipan di tengah kode QR — biasanya logo.
 *
 * Menutupi sebagian modulnya, jadi tingkat koreksi galatnya sebaiknya
 * dinaikkan ke `Q` atau `H` supaya kodenya tetap terbaca.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm bg-background', props.class)"
    data-slot="qr-code-overlay"
  >
    <slot />
  </Primitive>
</template>
