<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'
import { nextPlaybackRate } from './time'

/**
 * Pengubah kecepatan putar.
 *
 * Satu tombol yang berputar melewati daftarnya, bukan menu. Kecepatan putar
 * hampir selalu diubah antara dua nilai yang berdekatan — satu ke satu
 * setengah dan kembali — dan menu yang harus dibuka untuk itu menuntut dua
 * ketukan di tempat satu sudah cukup.
 */
const props = withDefaults(defineProps<{
  /** Playback rates to cycle through, in order. */
  speeds?: number[]
  class?: HTMLAttributes['class']
}>(), {
  speeds: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
})

const { state, setPlaybackRate } = injectMediaPlayerContext('MediaPlayerPlaybackSpeed')
</script>

<template>
  <button
    :aria-label="`Playback speed ${state.playbackRate}×`"
    :class="cn(
      'inline-flex h-8 min-w-9 items-center justify-center rounded-md px-1.5 font-medium text-white text-xs tabular-nums outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50',
      props.class,
    )"
    data-slot="media-player-playback-speed"
    :disabled="state.disabled"
    type="button"
    @click="setPlaybackRate(nextPlaybackRate(state.playbackRate, props.speeds))"
  >
    <slot :rate="state.playbackRate">{{ state.playbackRate }}&times;</slot>
  </button>
</template>
