<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TimeRange } from './time'
import { defaultDocument, useEventListener } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { provideMediaPlayerContext } from './context'
import { clampTime, readTimeRanges } from './time'

/**
 * Pemutar video dan audio dengan kendali sendiri.
 *
 * Keadaannya dibaca dari elemen medianya, tidak disimpan sebagai sumber
 * kebenaran tersendiri. Itu penting: `<video>` bisa berubah tanpa ada yang
 * menyuruhnya — jaringan yang tersendat menghentikan pemutaran, sistem
 * operasi menjeda saat panggilan masuk, pemakai menekan tombol media di papan
 * ketiknya. Keadaan bayangan yang disimpan sendiri akan salah tiap kali itu
 * terjadi, dan salahnya tidak akan pernah kelihatan sampai ada yang
 * mengeluh tombolnya menunjukkan "jeda" sementara videonya diam.
 *
 * Yang disimpan di sini cuma cerminan, dan tiap peristiwa media
 * memperbaruinya. Perintahnya berjalan satu arah: tombol memanggil elemennya,
 * elemennya mengabarkan, cerminannya ikut. Tidak ada jalan pintas dari tombol
 * ke cerminan.
 */
const props = withDefaults(defineProps<{
  /** Hide the controls after this many milliseconds without movement. Zero means never. */
  autoHide?: number
  /** Keyboard shortcuts: space, arrows, m, f. */
  keyboardShortcuts?: boolean
  /** Seconds to seek each time the left or right arrow is pressed. */
  seekStep?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  autoHide: 2500,
  keyboardShortcuts: true,
  seekStep: 5,
  disabled: false,
})

const emit = defineEmits<{
  /** Playback started. */
  play: []
  /** Playback paused. */
  pause: []
  /** Playback reached the end. */
  ended: []
  /** The media failed to load or play, with a message. */
  error: [message: string]
  /** The playback position changed, in seconds. */
  timeUpdate: [seconds: number]
}>()

const media = ref<HTMLMediaElement>()
const container = ref<HTMLElement>()

const currentTime = ref(0)
const duration = ref(Number.NaN)
const playing = ref(false)
const buffering = ref(false)
const ended = ref(false)
const volume = ref(1)
const muted = ref(false)
const playbackRate = ref(1)
const buffered = ref<TimeRange[]>([])
const fullscreen = ref(false)
const pictureInPicture = ref(false)
const error = ref<string>()
const video = ref(false)

const visible = ref(true)
const held = ref(false)

let hideTimer: ReturnType<typeof setTimeout> | undefined

// Yang menahan — tetikus di atas kendalinya, penggeser yang sedang diseret —
// membatalkan hitungannya. Kendali yang menghilang di bawah jari yang sedang
// menggeser volume bukan sekadar mengganggu; geserannya ikut hilang.
/** Shows the controls, then counts down to hide them again. */
function refresh() {
  visible.value = true
  clearTimeout(hideTimer)

  if (props.autoHide <= 0 || !playing.value || held.value) return

  hideTimer = setTimeout(() => {
    visible.value = false
  }, props.autoHide)
}

function hold(value: boolean) {
  held.value = value
  refresh()
}

watch([playing, held], refresh)

onBeforeUnmount(() => {
  clearTimeout(hideTimer)
})

function play() {
  if (props.disabled) return

  // `play()` mengembalikan janji yang ditolak kalau peramban menolak
  // memutar — biasanya karena belum ada gerakan pemakai. Yang ditolak tanpa
  // ditangkap muncul di konsol sebagai galat yang tidak dilaporkan siapa pun.
  media.value?.play().catch((cause: Error) => {
    error.value = cause.message
    emit('error', cause.message)
  })
}

function pause() {
  media.value?.pause()
}

function toggle() {
  if (playing.value) pause()
  else play()
}

function seekTo(seconds: number) {
  const el = media.value
  if (!el || props.disabled) return

  el.currentTime = clampTime(seconds, duration.value)
}

function seekBy(seconds: number) {
  seekTo(currentTime.value + seconds)
}

function setVolume(value: number) {
  const el = media.value
  if (!el) return

  el.volume = Math.min(Math.max(value, 0), 1)
  // Menggeser volume ke atas dari nol sekaligus melepas senyapnya. Tanpa itu,
  // penggesernya bergerak dan tidak ada yang terdengar.
  if (el.volume > 0 && el.muted) el.muted = false
}

function toggleMute() {
  const el = media.value
  if (el) el.muted = !el.muted
}

function setPlaybackRate(value: number) {
  const el = media.value
  if (el) el.playbackRate = value
}

async function toggleFullscreen() {
  const el = container.value
  if (!el) return

  try {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await el.requestFullscreen()
  }
  catch (cause) {
    // Layar penuh ditolak — di iframe tanpa izin, atau di iOS pada
    // `<video>` yang bukan elemen layar penuhnya sendiri. Bukan galat
    // pemutaran, jadi tidak dilaporkan sebagai galat pemutaran.
    error.value = cause instanceof Error ? cause.message : String(cause)
  }
}

async function togglePictureInPicture() {
  const el = media.value
  if (!(el instanceof HTMLVideoElement)) return

  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture()
    else await el.requestPictureInPicture()
  }
  catch (cause) {
    error.value = cause instanceof Error ? cause.message : String(cause)
  }
}

/** Copies the element's state into the mirror. */
function sync() {
  const el = media.value
  if (!el) return

  currentTime.value = el.currentTime
  duration.value = el.duration
  playing.value = !el.paused && !el.ended
  ended.value = el.ended
  volume.value = el.volume
  muted.value = el.muted
  playbackRate.value = el.playbackRate
  buffered.value = readTimeRanges(el.buffered)
  video.value = el instanceof HTMLVideoElement
}

// Peristiwanya didaftarkan dari sini, bukan dari `MediaPlayerVideo`, supaya
// keduanya — video dan audio — tidak perlu menuliskan daftar yang sama.
const SYNC_EVENTS = [
  'loadedmetadata',
  'durationchange',
  'timeupdate',
  'progress',
  'volumechange',
  'ratechange',
  'seeked',
] as const

for (const name of SYNC_EVENTS)
  useEventListener(media, name, sync)

useEventListener(media, 'play', () => {
  sync()
  emit('play')
})

useEventListener(media, 'pause', () => {
  sync()
  emit('pause')
})

useEventListener(media, 'ended', () => {
  sync()
  emit('ended')
})

useEventListener(media, 'timeupdate', () => {
  emit('timeUpdate', currentTime.value)
})

useEventListener(media, 'waiting', () => {
  buffering.value = true
})

useEventListener(media, ['playing', 'canplay'], () => {
  buffering.value = false
  error.value = undefined
})

useEventListener(media, 'error', () => {
  const mediaError = media.value?.error
  const message = mediaError ? `Media failed to load (code ${mediaError.code}).` : 'Media failed to load.'
  error.value = message
  buffering.value = false
  emit('error', message)
})

useEventListener(media, ['enterpictureinpicture', 'leavepictureinpicture'], () => {
  pictureInPicture.value = document.pictureInPictureElement === media.value
})

useEventListener(defaultDocument, 'fullscreenchange', () => {
  fullscreen.value = document.fullscreenElement === container.value
})

useEventListener(container, ['pointermove', 'pointerdown'], refresh)
useEventListener(container, 'pointerleave', () => {
  if (playing.value && !held.value) visible.value = false
})

// Dipasang di wadahnya, bukan di dokumen. Spasi yang menjeda video di halaman
// yang sedang digulir orang lain — itu yang terjadi kalau dipasang di
// dokumen — jauh lebih mengganggu daripada pintasan yang menuntut pemutarnya
// difokuskan lebih dulu.
/** Keyboard shortcuts. */
function onKeydown(event: KeyboardEvent) {
  if (!props.keyboardShortcuts || props.disabled) return

  const target = event.target as HTMLElement | null
  // Penggeser di dalam kendalinya juga memakai panah. Yang sedang difokuskan
  // di sana harus menang.
  if (target?.closest('[role="slider"], input, textarea, select')) return

  const actions: Record<string, () => void> = {
    ' ': toggle,
    k: toggle,
    ArrowRight: () => seekBy(props.seekStep),
    ArrowLeft: () => seekBy(-props.seekStep),
    ArrowUp: () => setVolume(volume.value + 0.1),
    ArrowDown: () => setVolume(volume.value - 0.1),
    m: toggleMute,
    f: toggleFullscreen,
    Home: () => seekTo(0),
    End: () => seekTo(duration.value),
  }

  const action = actions[event.key]
  if (!action) return

  event.preventDefault()
  action()
  refresh()
}

provideMediaPlayerContext({
  state: computed(() => ({
    currentTime: currentTime.value,
    duration: duration.value,
    playing: playing.value,
    buffering: buffering.value,
    ended: ended.value,
    volume: volume.value,
    muted: muted.value,
    playbackRate: playbackRate.value,
    buffered: buffered.value,
    fullscreen: fullscreen.value,
    pictureInPicture: pictureInPicture.value,
    visible: visible.value || !playing.value,
    error: error.value,
    disabled: props.disabled,
    video: video.value,
  })),
  media,
  container,
  play,
  pause,
  toggle,
  seekTo,
  seekBy,
  setVolume,
  toggleMute,
  setPlaybackRate,
  toggleFullscreen,
  togglePictureInPicture,
  hold,
})

defineExpose({ play, pause, toggle, seekTo, seekBy })
</script>

<template>
  <div
    ref="container"
    :class="cn(
      'group/media relative isolate overflow-hidden rounded-lg bg-black outline-none focus-visible:ring-2 focus-visible:ring-ring',
      props.class,
    )"
    data-slot="media-player"
    :data-state="playing ? 'playing' : 'paused'"
    tabindex="0"
    @keydown="onKeydown"
  >
    <slot :playing="playing" :current-time="currentTime" :duration="duration" />
  </div>
</template>
