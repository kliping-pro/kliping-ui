---
title: "Media Player"
description: "Pemutar video dan audio dengan kendali sendiri: putar, gulir waktu, volume, kecepatan, teks, dan layar penuh."
catalog: true
---

<ComponentPreview name="MediaPlayerDemo" />

## Installation

```bash
npx kliping@latest add media-player
```

## Usage

```vue
<script setup lang="ts">
import { MediaPlayer, MediaPlayerAudio, MediaPlayerCaptions, MediaPlayerControls, MediaPlayerError, MediaPlayerFullscreen, MediaPlayerLoading, MediaPlayerOverlay, MediaPlayerPip, MediaPlayerPlay, MediaPlayerPlaybackSpeed, MediaPlayerSeek, MediaPlayerSeekButton, MediaPlayerTime, MediaPlayerVideo, MediaPlayerVolume } from '@/components/ui/media-player'
</script>
```

## Examples

### Audio Player

<ComponentPreview name="MediaPlayerAudioPlayerDemo" />

### With Error Handling

<ComponentPreview name="MediaPlayerWithErrorHandlingDemo" />

<!--@include: ./_api/media-player.md-->
