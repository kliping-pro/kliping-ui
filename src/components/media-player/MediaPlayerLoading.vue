<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { LoaderCircleIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/** Buffering indicator, centered over the media. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectMediaPlayerContext('MediaPlayerLoading')
</script>

<template>
  <div
    v-if="state.buffering"
    aria-live="polite"
    :class="cn('pointer-events-none absolute inset-0 z-10 flex items-center justify-center', props.class)"
    data-slot="media-player-loading"
  >
    <slot>
      <LoaderCircleIcon class="size-8 animate-spin text-white drop-shadow motion-reduce:animate-none" />
      <span class="sr-only">Loading…</span>
    </slot>
  </div>
</template>
