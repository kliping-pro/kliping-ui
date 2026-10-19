<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { MarqueeEdgeVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { marqueeEdgeVariants } from '.'

/**
 * Gradien di tepi yang memudarkan isinya.
 *
 * Tanpa ini isinya terpotong tegas di tepi wadah, dan mata membaca potongan
 * itu sebagai akhir daftar — bukan sebagai sesuatu yang masih berjalan.
 */
const props = defineProps<PrimitiveProps & {
  /** Which edge of the marquee the fade covers: `left`, `right`, `top`, or `bottom`. */
  side?: MarqueeEdgeVariants['side']
  size?: MarqueeEdgeVariants['size']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(marqueeEdgeVariants({ side: props.side, size: props.size }), props.class)"
    :data-size="props.size"
    data-slot="marquee-edge"
  >
    <slot />
  </Primitive>
</template>
