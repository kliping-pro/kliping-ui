<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TriangleAlertIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/** Playback error message, covering the media. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectMediaPlayerContext('MediaPlayerError')
</script>

<template>
  <div
    v-if="state.error"
    :class="cn(
      'absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-black/80 p-4 text-center text-white',
      props.class,
    )"
    data-slot="media-player-error"
    role="alert"
  >
    <slot :error="state.error">
      <TriangleAlertIcon class="size-6" />
      <p class="text-sm">
        {{ state.error }}
      </p>
    </slot>
  </div>
</template>
