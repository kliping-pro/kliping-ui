<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Tombol putar dan jeda.
 *
 * Setelah medianya habis, ikonnya berganti jadi panah ulang. Tombol putar di
 * ujung video menjanjikan lanjutan yang tidak ada — yang sebenarnya terjadi
 * pemutaran dari awal lagi, dan lebih baik dikatakan.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, toggle } = injectMediaPlayerContext('MediaPlayerPlay')
</script>

<template>
  <button
    :aria-label="state.playing ? 'Pause' : state.ended ? 'Replay' : 'Play'"
    :class="cn(
      'inline-flex size-8 items-center justify-center rounded-md text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="media-player-play"
    :disabled="state.disabled"
    type="button"
    @click="toggle"
  >
    <slot :playing="state.playing">
      <PauseIcon v-if="state.playing" />
      <RotateCcwIcon v-else-if="state.ended" />
      <PlayIcon v-else />
    </slot>
  </button>
</template>
