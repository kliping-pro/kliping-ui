<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Volume1Icon, Volume2Icon, VolumeXIcon } from '@lucide/vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Tombol senyap dan penggeser volume.
 *
 * Penggesernya melebar saat tetikus mendekat, dan lebar nol saat tidak.
 * Bukan disembunyikan dengan `hidden`: yang lebarnya nol tetap bisa dicapai
 * papan ketik dan tetap dibacakan pembaca layar, sementara yang disembunyikan
 * hilang dari keduanya.
 */
const props = withDefaults(defineProps<{
  /** Keep the slider always visible instead of waiting for hover. */
  expanded?: boolean
  class?: HTMLAttributes['class']
}>(), {
  expanded: false,
})

const { state, setVolume, toggleMute, hold } = injectMediaPlayerContext('MediaPlayerVolume')

const sliderValue = computed(() => [state.value.muted ? 0 : state.value.volume])

function onUpdate(value: number[] | undefined) {
  if (value?.[0] !== undefined) setVolume(value[0])
}
</script>

<template>
  <div
    :class="cn('group/volume flex items-center', props.class)"
    data-slot="media-player-volume"
    @pointerenter="hold(true)"
    @pointerleave="hold(false)"
  >
    <button
      :aria-label="state.muted ? 'Unmute' : 'Mute'"
      class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0"
      :disabled="state.disabled"
      type="button"
      @click="toggleMute"
    >
      <VolumeXIcon v-if="state.muted || state.volume === 0" />
      <Volume1Icon v-else-if="state.volume < 0.5" />
      <Volume2Icon v-else />
    </button>

    <SliderRoot
      class="relative flex h-4 touch-none select-none items-center overflow-hidden transition-[width] duration-200 motion-reduce:transition-none"
      :class="props.expanded ? 'w-20' : 'w-0 group-hover/volume:w-20 group-focus-within/volume:w-20'"
      :disabled="state.disabled"
      :max="1"
      :min="0"
      :model-value="sliderValue"
      :step="0.01"
      @update:model-value="onUpdate"
    >
      <SliderTrack class="relative mx-1.5 h-1 w-full grow overflow-hidden rounded-full bg-white/25">
        <SliderRange class="absolute h-full bg-white" />
      </SliderTrack>
      <SliderThumb
        aria-label="Volume"
        :aria-valuetext="`${Math.round((sliderValue[0] ?? 0) * 100)}%`"
        class="block size-3 rounded-full bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      />
    </SliderRoot>
  </div>
</template>
