<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RotateCcwIcon, RotateCwIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/** Button that seeks forward or backward by a number of seconds. */
const props = withDefaults(defineProps<{
  /** Seek 'forward' or 'backward' by `seconds` on each press. */
  direction?: 'forward' | 'backward'
  /** Seconds to seek per press. */
  seconds?: number
  class?: HTMLAttributes['class']
}>(), {
  direction: 'forward',
  seconds: 10,
})

const { state, seekBy } = injectMediaPlayerContext('MediaPlayerSeekButton')
</script>

<template>
  <button
    :aria-label="props.direction === 'forward' ? `Seek forward ${props.seconds} seconds` : `Seek back ${props.seconds} seconds`"
    :class="cn(
      'relative inline-flex size-8 items-center justify-center rounded-md text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="media-player-seek-button"
    :disabled="state.disabled"
    type="button"
    @click="seekBy(props.direction === 'forward' ? props.seconds : -props.seconds)"
  >
    <slot>
      <RotateCwIcon v-if="props.direction === 'forward'" />
      <RotateCcwIcon v-else />
      <span class="absolute inset-0 flex items-center justify-center font-semibold text-[8px] leading-none">
        {{ props.seconds }}
      </span>
    </slot>
  </button>
</template>
