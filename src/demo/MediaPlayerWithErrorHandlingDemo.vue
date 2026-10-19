<!-- example: 4. With Error Handling -->
<script setup lang="ts">
import { AlertCircleIcon } from '@lucide/vue'
import { ref } from 'vue'
import {
  MediaPlayer,
  MediaPlayerAudio,
  MediaPlayerControls,
  MediaPlayerError,
  MediaPlayerPlay,
  MediaPlayerSeek,
  MediaPlayerTime,
} from '@/components/media-player'
import { Button } from '@/components/ui/button'

// Berkas yang sengaja tidak ada, supaya MediaPlayerError tampil; "Load working
// file" mengganti sumbernya dengan yang ada.
const BROKEN = '/media/missing-file.wav'
const WORKING = '/media/sample-tone.wav'
const src = ref(BROKEN)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <MediaPlayer :key="src" :auto-hide="0" class="h-32 bg-neutral-900">
      <MediaPlayerAudio preload="metadata" :src="src" />
      <MediaPlayerError v-slot="{ error }">
        <AlertCircleIcon class="size-6" />
        <p class="text-sm font-medium">
          Playback error
        </p>
        <p class="text-xs text-white/80">
          {{ error }}
        </p>
      </MediaPlayerError>
      <MediaPlayerControls class="pt-3">
        <MediaPlayerSeek />
        <div class="flex items-center gap-1">
          <MediaPlayerPlay />
          <MediaPlayerTime class="ml-1" />
        </div>
      </MediaPlayerControls>
    </MediaPlayer>
    <div class="flex gap-2">
      <Button size="sm" variant="outline" :disabled="src === WORKING" @click="src = WORKING">
        Load working file
      </Button>
      <Button size="sm" variant="outline" :disabled="src === BROKEN" @click="src = BROKEN">
        Load missing file
      </Button>
    </div>
  </div>
</template>
