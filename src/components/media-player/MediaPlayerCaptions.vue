<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CaptionsIcon, CaptionsOffIcon } from '@lucide/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Tombol teks.
 *
 * Jalur teksnya dibaca dari elemen medianya, bukan dari daftar yang ditulis
 * ulang di sini. `<track>` yang ditulis di dalam `<video>` sudah jadi
 * `TextTrack` begitu dibaca peramban, dan menyalinnya ke keadaan sendiri
 * berarti dua daftar yang harus tetap sama.
 *
 * Tidak tergambar kalau tidak ada jalur teks sama sekali.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, media } = injectMediaPlayerContext('MediaPlayerCaptions')

const count = ref(0)
const enabled = ref(false)

// Yang `metadata` tidak untuk ditonton.
/** Text tracks that can be turned on. */
function tracks(): TextTrack[] {
  const list = media.value?.textTracks
  if (!list) return []

  return Array.from(list).filter(t => t.kind === 'subtitles' || t.kind === 'captions')
}

function read() {
  const all = tracks()
  count.value = all.length
  enabled.value = all.some(t => t.mode === 'showing')
}

function toggle() {
  const all = tracks()
  if (!all.length) return

  const turnOn = !enabled.value

  for (const [i, t] of all.entries())
    t.mode = turnOn && i === 0 ? 'showing' : 'hidden'

  read()
}

onMounted(read)

// Jalur teks bisa muncul belakangan — `<track>` yang berkasnya masih diunduh
// belum ada di `textTracks` saat komponennya terpasang.
watch(() => state.value.duration, read)

const available = computed(() => count.value > 0)
</script>

<template>
  <button
    v-if="available"
    :aria-label="enabled ? 'Turn off captions' : 'Turn on captions'"
    :aria-pressed="enabled"
    :class="cn(
      'inline-flex size-8 items-center justify-center rounded-md text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="media-player-captions"
    :disabled="state.disabled"
    type="button"
    @click="toggle"
  >
    <slot :enabled="enabled">
      <CaptionsIcon v-if="enabled" />
      <CaptionsOffIcon v-else />
    </slot>
  </button>
</template>
