<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Audionya.
 *
 * Elemennya tetap ada di DOM tapi tidak tergambar — `<audio>` tanpa
 * `controls` memang tidak menggambar apa-apa, dan menyembunyikannya dengan
 * `display: none` justru menghentikan pemutaran di sebagian peramban.
 */
const props = defineProps<{
  /** URL of the audio file; omit it to supply <source> elements in the default slot. */
  src?: string
  /** Starts playing the audio as soon as it can. */
  autoplay?: boolean
  /** Restarts the audio when it ends. */
  loop?: boolean
  /** Mutes the audio. */
  muted?: boolean
  /** How much to load before playback: 'none', 'metadata', or 'auto'. */
  preload?: 'none' | 'metadata' | 'auto'
  /** CORS mode of the media request: '', 'anonymous', or 'use-credentials'. */
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  class?: HTMLAttributes['class']
}>()

// The element ref is passed as `context.media` (not destructured) so the template
// binds the Ref itself and the type checker can see it is used.
const context = injectMediaPlayerContext('MediaPlayerAudio')
</script>

<template>
  <audio
    :ref="context.media"
    :autoplay="props.autoplay"
    :class="cn(props.class)"
    :crossorigin="props.crossorigin"
    data-slot="media-player-audio"
    :loop="props.loop"
    :muted="props.muted"
    :preload="props.preload"
    :src="props.src"
  >
    <slot />
  </audio>
</template>
