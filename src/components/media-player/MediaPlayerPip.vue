<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PictureInPicture2Icon } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectMediaPlayerContext } from './context'

/**
 * Tombol gambar dalam gambar.
 *
 * Tidak tergambar sama sekali di peramban yang tidak mendukungnya — tombol
 * mati tanpa penjelasan lebih membingungkan daripada tombol yang memang
 * tidak ada. Pemeriksaannya di `onMounted` karena di server tidak ada
 * `document`.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, togglePictureInPicture } = injectMediaPlayerContext('MediaPlayerPip')

const supported = ref(false)

onMounted(() => {
  supported.value = 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled
})
</script>

<template>
  <button
    v-if="supported && state.video"
    :aria-label="state.pictureInPicture ? 'Exit picture-in-picture' : 'Enter picture-in-picture'"
    :class="cn(
      'inline-flex size-8 items-center justify-center rounded-md text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="media-player-pip"
    :disabled="state.disabled"
    type="button"
    @click="togglePictureInPicture"
  >
    <slot>
      <PictureInPicture2Icon />
    </slot>
  </button>
</template>
