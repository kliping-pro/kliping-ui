<!-- example: 1. Audio Player -->
<script setup lang="ts">
import {
  MediaPlayer,
  MediaPlayerAudio,
  MediaPlayerControls,
  MediaPlayerPlay,
  MediaPlayerPlaybackSpeed,
  MediaPlayerSeek,
  MediaPlayerSeekButton,
  MediaPlayerTime,
  MediaPlayerVolume,
} from '@/components/media-player'
</script>

<template>
  <MediaPlayer :auto-hide="0" class="h-28 w-full max-w-md bg-neutral-900">
    <MediaPlayerAudio preload="metadata" src="/media/sample-tone.wav" />
    <MediaPlayerControls class="flex-col items-stretch gap-2.5">
      <div class="flex items-center gap-2">
        <MediaPlayerSeek class="flex-1" />
        <MediaPlayerTime />
      </div>
      <div class="flex w-full items-center justify-center gap-2">
        <MediaPlayerSeekButton direction="backward" :seconds="5" />
        <MediaPlayerPlay />
        <MediaPlayerSeekButton direction="forward" :seconds="5" />
        <MediaPlayerVolume />
        <MediaPlayerPlaybackSpeed />
      </div>
    </MediaPlayerControls>
  </MediaPlayer>
</template>
