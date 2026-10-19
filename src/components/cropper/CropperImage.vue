<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/**
 * Gambar yang dipotong.
 *
 * Digambar dengan ukuran aslinya lalu diskala lewat `transform`, bukan
 * dengan lebar dan tinggi yang dihitung. Alasannya bukan keanggunan:
 * `transform` dijalankan penyusun (compositor), jadi menyeret dan menzum
 * tidak memicu tata letak ulang seluruh halaman. Mengubah `width` memicunya
 * di tiap gerakan tetikus.
 *
 * Urutan transformasinya dikunci: geser, lalu putar, lalu skala. Urutan
 * itulah yang cocok dengan `pixelCrop` di sebelah — yang menghitung kotak
 * potong pada kerangka yang sudah diputar lalu diskala.
 */
const props = defineProps<{
  /** URL of the image to crop. */
  src: string
  /** Alternative text for the image. */
  alt: string
  /** CORS mode of the image; set it when exporting a crop of a cross-origin image to a canvas. */
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  class?: HTMLAttributes['class']
}>()

const { state, setMedia } = injectCropperContext('CropperImage')

function onLoad(event: Event) {
  const image = event.target as HTMLImageElement
  setMedia({ width: image.naturalWidth, height: image.naturalHeight })
}

const style = computed(() => {
  const k = state.value

  return {
    width: `${k.media.width}px`,
    height: `${k.media.height}px`,
    transform: `translate(-50%, -50%) translate(${k.offset.x}px, ${k.offset.y}px) rotate(${k.rotation}deg) scale(${k.scale})`,
  }
})
</script>

<template>
  <img
    :alt="props.alt"
    :class="cn(
      'absolute top-1/2 left-1/2 max-w-none origin-center',
      state.dragging ? '' : 'transition-transform duration-150 motion-reduce:transition-none',
      props.class,
    )"
    :crossorigin="props.crossorigin"
    data-slot="cropper-image"
    draggable="false"
    :src="props.src"
    :style="style"
    @load="onLoad"
  >
</template>
