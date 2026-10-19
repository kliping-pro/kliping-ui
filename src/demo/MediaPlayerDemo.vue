<script setup lang="ts">
import { ref } from 'vue'
import {
  MediaPlayer,
  MediaPlayerAudio,
  MediaPlayerControls,
  MediaPlayerError,
  MediaPlayerLoading,
  MediaPlayerPlay,
  MediaPlayerPlaybackSpeed,
  MediaPlayerSeek,
  MediaPlayerSeekButton,
  MediaPlayerTime,
  MediaPlayerVolume,
} from '@/components/media-player'

const lastEvent = ref<string>()
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <MediaPlayer
      :auto-hide="0"
      class="bg-neutral-900"
      @pause="lastEvent = 'paused'"
      @play="lastEvent = 'playing'"
      @ended="lastEvent = 'ended'"
    >
      <MediaPlayerAudio preload="metadata" src="/media/sample-tone.wav" />

      <!-- Pemutar audio tidak punya gambar, jadi bilah kendalinya yang jadi
           seluruh isinya. Tingginya dipatok supaya kendalinya punya tempat
           berdiri, dan `auto-hide` dimatikan karena tidak ada gambar yang
           perlu dilihat tanpa terhalang. -->
      <div class="h-20" />

      <MediaPlayerLoading />
      <MediaPlayerError />

      <MediaPlayerControls class="pt-3">
        <MediaPlayerSeek />
        <div class="flex items-center gap-0.5">
          <MediaPlayerPlay />
          <MediaPlayerSeekButton direction="backward" :seconds="5" />
          <MediaPlayerSeekButton direction="forward" :seconds="5" />
          <MediaPlayerTime class="ml-1" />
          <div class="flex-1" />
          <MediaPlayerPlaybackSpeed />
          <MediaPlayerVolume />
        </div>
      </MediaPlayerControls>
    </MediaPlayer>

    <p class="text-muted-foreground text-sm">
      Space plays and pauses, the left and right arrows seek, the up and down
      arrows change the volume, and <code>m</code> mutes. Focus the player
      first — shortcuts bound to the whole document would pause the video for
      someone who is just scrolling the page.
      <span v-if="lastEvent"> Last event: <code>{{ lastEvent }}</code>.</span>
    </p>

    <p class="text-muted-foreground text-sm">
      For video, swap <code>MediaPlayerAudio</code> for
      <code>MediaPlayerVideo</code> and add
      <code>MediaPlayerOverlay</code>, <code>MediaPlayerCaptions</code>,
      <code>MediaPlayerPip</code>, and <code>MediaPlayerFullscreen</code> —
      all four hide themselves when the media isn't a video or the
      browser doesn't support them.
    </p>
  </div>
</template>
