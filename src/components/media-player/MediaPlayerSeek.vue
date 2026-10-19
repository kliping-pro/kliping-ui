<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'
import { bufferedPercent, formatTime } from './time'

/**
 * Penggeser posisi pemutaran.
 *
 * Selama diseret, yang tergambar posisi seretannya — bukan posisi medianya.
 * Kalau yang tergambar posisi media, tiap `timeupdate` menarik kepala
 * penggesernya kembali ke tempat medianya berada, dan seretannya terasa
 * melawan tangan.
 *
 * Batang penyangganya digambar di belakang, bukan sebagai lapisan tersendiri
 * di atas. Sangga yang menutupi kemajuan membuat yang sudah ditonton tampak
 * belum ditonton.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, seekTo, hold } = injectMediaPlayerContext('MediaPlayerSeek')

const dragValue = ref<number>()

const sliderValue = computed(() => [dragValue.value ?? state.value.currentTime])

const buffered = computed(() =>
  bufferedPercent(state.value.buffered, state.value.currentTime, state.value.duration),
)

// Durasi yang belum diketahui memberi penggeser yang tidak bisa digeser,
// bukan yang bergerak sembarangan.
/** The slider maximum; zero while the duration is unknown. */
const duration = computed(() => (Number.isFinite(state.value.duration) ? state.value.duration : 0))

function onDrag(next: number[] | undefined) {
  if (next?.[0] === undefined) return

  dragValue.value = next[0]
  hold(true)
}

function onCommit(next: number[] | undefined) {
  if (next?.[0] !== undefined) seekTo(next[0])

  dragValue.value = undefined
  hold(false)
}
</script>

<template>
  <SliderRoot
    :class="cn('relative flex h-4 w-full touch-none select-none items-center', props.class)"
    data-slot="media-player-seek"
    :disabled="state.disabled || duration <= 0"
    :max="duration"
    :min="0"
    :model-value="sliderValue"
    :step="0.1"
    @update:model-value="onDrag"
    @value-commit="onCommit"
  >
    <SliderTrack class="relative h-1 w-full grow overflow-hidden rounded-full bg-white/25">
      <div
        aria-hidden="true"
        class="absolute inset-y-0 left-0 bg-white/35"
        :style="{ width: `${buffered}%` }"
      />
      <SliderRange class="absolute h-full bg-white" />
    </SliderTrack>
    <!-- Nama dan nilai dibaca dari thumb (role="slider"), bukan dari root yang
         hanya `<span>` tanpa peran. -->
    <SliderThumb
      aria-label="Seek"
      :aria-valuetext="`${formatTime(sliderValue[0] ?? 0)} of ${formatTime(state.duration)}`"
      class="block size-3 rounded-full bg-white opacity-0 shadow-sm outline-none transition-opacity group-hover/media:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white/60"
    />
  </SliderRoot>
</template>
