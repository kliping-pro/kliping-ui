<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Bilah kendali di bawah medianya.
 *
 * Menahan sendiri saat tetikus ada di atasnya. Kendali yang menghilang di
 * bawah jari yang sedang menggeser volume bukan sekadar mengganggu —
 * geserannya ikut hilang bersamanya.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, hold } = injectMediaPlayerContext('MediaPlayerControls')
</script>

<template>
  <div
    :class="cn(
      'absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 bg-gradient-to-t from-black/80 to-transparent px-3 pt-8 pb-2.5 transition-opacity duration-200 motion-reduce:transition-none',
      state.visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      props.class,
    )"
    data-slot="media-player-controls"
    @pointerenter="hold(true)"
    @pointerleave="hold(false)"
  >
    <slot />
  </div>
</template>
