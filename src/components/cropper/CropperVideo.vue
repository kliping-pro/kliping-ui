<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/**
 * Video yang dipotong.
 *
 * Sama persis dengan `CropperImage`, kecuali ukuran aslinya dibaca dari
 * `videoWidth` dan bukan `naturalWidth`, dan yang menandai sudah termuat
 * `loadedmetadata` dan bukan `load` — `load` pada video berarti sesuatu yang
 * lain sama sekali.
 */
const props = withDefaults(defineProps<{
  /** URL of the video to crop. */
  src: string
  /** Starts playing the video as soon as it can. */
  autoplay?: boolean
  /** Restarts the video when it ends. */
  loop?: boolean
  /** Mutes the video audio. */
  muted?: boolean
  /** Shows the browser's native video controls. */
  controls?: boolean
  class?: HTMLAttributes['class']
}>(), {
  loop: true,
  muted: true,
})

const { state, setMedia } = injectCropperContext('CropperVideo')

function onLoad(event: Event) {
  const video = event.target as HTMLVideoElement
  setMedia({ width: video.videoWidth, height: video.videoHeight })
}

const style = computed(() => {
  const k = state.value

  return {
    width: `${k.media.width}px`,
    height: `${k.media.height}px`,
    transform: `translate(-50%, -50%) translate(${k.offset.x}px, ${k.offset.y}px) rotate(${k.rotation}deg) scale(${k.scale})`,
  }
})
</script>

<template>
  <video
    :autoplay="props.autoplay"
    :class="cn(
      'absolute top-1/2 left-1/2 max-w-none origin-center',
      state.dragging ? '' : 'transition-transform duration-150 motion-reduce:transition-none',
      props.class,
    )"
    :controls="props.controls"
    data-slot="cropper-video"
    :loop="props.loop"
    :muted="props.muted"
    playsinline
    :src="props.src"
    :style="style"
    @loadedmetadata="onLoad"
  />
</template>
