<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { MaximizeIcon, MinimizeIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/** Fullscreen toggle button. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, toggleFullscreen } = injectMediaPlayerContext('MediaPlayerFullscreen')
</script>

<template>
  <button
    :aria-label="state.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
    :class="cn(
      'inline-flex size-8 items-center justify-center rounded-md text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="media-player-fullscreen"
    :disabled="state.disabled"
    type="button"
    @click="toggleFullscreen"
  >
    <slot :fullscreen="state.fullscreen">
      <MinimizeIcon v-if="state.fullscreen" />
      <MaximizeIcon v-else />
    </slot>
  </button>
</template>
