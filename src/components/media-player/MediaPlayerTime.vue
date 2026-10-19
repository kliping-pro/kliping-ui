<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'
import { formatRemaining, formatTime } from './time'

/**
 * Penunjuk waktu.
 *
 * Lebarnya dipatok dengan angka tabular, bukan dibiarkan mengikuti isinya.
 * Angka proporsional membuat seluruh bilah kendali bergeser-geser tiap detik,
 * dan itu terlihat sebagai kegelisahan yang tidak jelas asalnya.
 */
const props = withDefaults(defineProps<{
  /** `elapsed` shows the running time, `remaining` the time left, `duration` both. */
  variant?: 'elapsed' | 'remaining' | 'duration'
  class?: HTMLAttributes['class']
}>(), {
  variant: 'duration',
})

const { state } = injectMediaPlayerContext('MediaPlayerTime')

// Jam dipaksa muncul kalau durasinya melewati satu jam, supaya lebarnya tidak
// berubah di tengah jalan.
/** Whether hours are always shown. */
const showHours = computed(() => Number.isFinite(state.value.duration) && state.value.duration >= 3600)

const text = computed(() => {
  const s = state.value

  if (props.variant === 'remaining') return formatRemaining(s.currentTime, s.duration)
  if (props.variant === 'elapsed') return formatTime(s.currentTime, showHours.value)

  return `${formatTime(s.currentTime, showHours.value)} / ${formatTime(s.duration, showHours.value)}`
})
</script>

<template>
  <span
    :class="cn('select-none px-1 font-medium text-white text-xs tabular-nums', props.class)"
    data-slot="media-player-time"
  >
    <slot :text="text">{{ text }}</slot>
  </span>
</template>
