<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Videonya.
 *
 * `controls` sengaja tidak diteruskan. Yang memakai komponen ini memakainya
 * karena ingin kendali sendiri, dan kendali bawaan peramban yang ikut
 * tergambar di atasnya membuat dua baris tombol yang saling menutupi.
 */
const props = defineProps<{
  /** URL of the video file; omit it to supply <source> elements in the default slot. */
  src?: string
  /** Image URL shown before the video starts playing. */
  poster?: string
  /** Starts playing the video as soon as it can. */
  autoplay?: boolean
  /** Restarts the video when it ends. */
  loop?: boolean
  /** Mutes the video. */
  muted?: boolean
  /** How much to load before playback: 'none', 'metadata', or 'auto'. */
  preload?: 'none' | 'metadata' | 'auto'
  /** CORS mode of the media request: '', 'anonymous', or 'use-credentials'. */
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  class?: HTMLAttributes['class']
}>()

// The element ref is passed as `context.media` (not destructured) so the template
// binds the Ref itself and the type checker can see it is used.
const context = injectMediaPlayerContext('MediaPlayerVideo')
const { toggle } = context
</script>

<template>
  <video
    :ref="context.media"
    :autoplay="props.autoplay"
    :class="cn('size-full object-contain', props.class)"
    :crossorigin="props.crossorigin"
    data-slot="media-player-video"
    :loop="props.loop"
    :muted="props.muted"
    playsinline
    :poster="props.poster"
    :preload="props.preload"
    :src="props.src"
    @click="toggle"
  >
    <slot />
  </video>
</template>
