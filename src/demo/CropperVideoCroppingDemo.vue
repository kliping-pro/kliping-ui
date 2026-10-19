<!-- example: 4. Video Cropping -->
<script setup lang="ts">
import { Pause, Play } from '@lucide/vue'
import { onBeforeUnmount, ref } from 'vue'
import { Cropper, CropperArea, CropperVideo, CropperViewport, CropperZoomSlider } from '@/components/cropper'
import { Button } from '@/components/ui/button'

// Videonya dipilih pengunjung sendiri (URL objek lokal), jadi contoh ini
// tidak memuat apa pun dari jaringan.
const src = ref<string>()
const playing = ref(true)
const wrapper = ref<HTMLElement>()

function choose(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (src.value) URL.revokeObjectURL(src.value)
  src.value = URL.createObjectURL(file)
  playing.value = true
}

function togglePlay() {
  const video = wrapper.value?.querySelector('video')
  if (!video) return
  if (video.paused) void video.play()
  else video.pause()
  playing.value = !video.paused
}

onBeforeUnmount(() => {
  if (src.value) URL.revokeObjectURL(src.value)
})
</script>

<template>
  <div ref="wrapper" class="flex w-full max-w-lg flex-col gap-3">
    <label class="flex items-center gap-3 text-sm">
      <span class="font-medium">Video</span>
      <input accept="video/*" class="text-sm file:mr-3 file:rounded-md file:border file:bg-background file:px-3 file:py-1 file:text-sm" type="file" @change="choose">
    </label>
    <Cropper v-if="src" :aspect-ratio="16 / 9">
      <CropperViewport class="max-h-72">
        <CropperVideo autoplay loop muted :src="src" />
        <CropperArea />
      </CropperViewport>
      <div class="flex items-center gap-2">
        <Button :aria-label="playing ? 'Pause' : 'Play'" class="size-8" size="icon" variant="outline" @click="togglePlay">
          <Pause v-if="playing" />
          <Play v-else />
        </Button>
        <CropperZoomSlider class="flex-1" />
      </div>
    </Cropper>
    <div v-else class="flex aspect-video items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
      Choose a video file to crop it.
    </div>
  </div>
</template>
