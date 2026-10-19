<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PlayIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Tombol putar besar di tengah, sebelum pemutaran dimulai.
 *
 * Hilang begitu diputar dan tidak kembali saat dijeda. Yang menjeda di tengah
 * video sudah tahu di mana tombol putarnya, dan tombol raksasa yang muncul
 * menutupi gambar tiap kali dijeda menghalangi justru saat orang ingin
 * melihat gambarnya diam.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, play } = injectMediaPlayerContext('MediaPlayerOverlay')
</script>

<template>
  <button
    v-if="!state.playing && state.currentTime === 0 && !state.error"
    aria-label="Play"
    :class="cn(
      'absolute inset-0 z-10 flex items-center justify-center bg-black/20 outline-none transition-colors hover:bg-black/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white',
      props.class,
    )"
    data-slot="media-player-overlay"
    :disabled="state.disabled"
    type="button"
    @click="play"
  >
    <slot>
      <span class="flex size-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform hover:scale-105 motion-reduce:transition-none">
        <PlayIcon class="ml-0.5 size-7" />
      </span>
    </slot>
  </button>
</template>
