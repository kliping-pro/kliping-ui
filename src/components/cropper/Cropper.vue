<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CropArea, Point, Size } from './crop'
import { useElementSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { provideCropperContext } from './context'
import { baseScale, clampOffset, frameSize, pixelCrop } from './crop'

/**
 * Pemotong gambar dan video.
 *
 * Yang disimpan bukan hasil potongannya, melainkan cara memotongnya: zum,
 * putaran, dan geseran. Kotak pikselnya dihitung ulang dari ketiganya tiap
 * kali salah satu berubah, dan gambar hasilnya baru dibuat saat diminta.
 *
 * Itu sengaja. Membuat kanvas di tiap gerakan tetikus berarti membuat ratusan
 * kanvas seukuran gambar aslinya per detik, dan yang terlihat pemakainya
 * cuma bingkai yang tersendat.
 *
 * Zum satu berarti media pas menutupi bingkainya, bukan berarti ukuran
 * aslinya. Kalau zum satu berarti ukuran asli, gambar yang lebih kecil dari
 * bingkainya menyisakan celah kosong di hasil potongannya — dan itu cacat,
 * bukan pilihan.
 *
 * Akar ini tidak menggambar apa-apa selain bungkus. Yang dipotong dan yang
 * ditadah tetikusnya `CropperViewport`, dan pemisahan itu bukan hiasan:
 * viewport-nya memotong apa pun yang keluar dari batasnya, jadi penggeser
 * dan tombol yang ikut masuk ke dalamnya akan terpotong juga.
 */
const props = withDefaults(defineProps<{
  /** Aspect ratio of the crop frame, width divided by height. */
  aspectRatio?: number
  /** Lowest allowed zoom; 1 makes the media just cover the frame. Also the value reset returns to. */
  minZoom?: number
  /** Highest allowed zoom; zoom changes are clamped to this value. */
  maxZoom?: number
  /** Zoom increment per mouse-wheel tick; also the default step of the zoom buttons. */
  zoomStep?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  aspectRatio: 1,
  minZoom: 1,
  maxZoom: 4,
  zoomStep: 0.1,
  disabled: false,
})

const emit = defineEmits<{
  /** The crop area changed, in pixels on the rotated frame of reference. */
  cropChange: [crop: CropArea]
}>()

/** Current zoom factor (v-model:zoom), where 1 makes the media just cover the frame. */
const zoom = defineModel<number>('zoom', { default: 1 })
/** Current rotation in degrees (v-model:rotation); may accumulate past 360. */
const rotation = defineModel<number>('rotation', { default: 0 })
/** Media offset from the frame center in px (v-model:offset), clamped so the frame stays covered. */
const offset = defineModel<Point>('offset', { default: () => ({ x: 0, y: 0 }) })

const container = ref<HTMLElement>()
const media = ref<Size>({ width: 0, height: 0 })
const dragging = ref(false)

const { width: containerWidth, height: containerHeight } = useElementSize(container)

const containerSize = computed<Size>(() => ({ width: containerWidth.value, height: containerHeight.value }))
const frame = computed(() => frameSize(containerSize.value, props.aspectRatio))
const scale = computed(() => baseScale(media.value, frame.value, rotation.value) * zoom.value)

const crop = computed(() => pixelCrop(media.value, frame.value, offset.value, scale.value, rotation.value))

function clamp() {
  offset.value = clampOffset(offset.value, media.value, frame.value, scale.value, rotation.value)
}

function setZoom(value: number) {
  zoom.value = Math.min(Math.max(value, props.minZoom), props.maxZoom)
  clamp()
}

function setRotation(value: number) {
  rotation.value = value
  clamp()
}

function setOffset(value: Point) {
  offset.value = clampOffset(value, media.value, frame.value, scale.value, rotation.value)
}

function setMedia(size: Size) {
  media.value = size
  clamp()
}

function reset() {
  zoom.value = props.minZoom
  rotation.value = 0
  offset.value = { x: 0, y: 0 }
}

// Wadahnya bisa berubah ukuran tanpa ada yang menyentuh pemotongnya — panel
// yang dilebarkan, jendela yang diubah ukurannya. Bingkainya ikut berubah,
// dan geseran yang tadinya sah bisa jadi tidak sah lagi.
watch([frame, () => props.aspectRatio], clamp)

watch(crop, (c) => {
  if (media.value.width > 0) emit('cropChange', c)
}, { immediate: true })

provideCropperContext({
  state: computed(() => ({
    media: media.value,
    container: containerSize.value,
    frame: frame.value,
    offset: offset.value,
    zoom: zoom.value,
    rotation: rotation.value,
    scale: scale.value,
    disabled: props.disabled,
    dragging: dragging.value,
    crop: crop.value,
  })),
  setZoom,
  setRotation,
  setOffset,
  setMedia,
  setDragging: (value) => {
    dragging.value = value
  },
  reset,
  zoomLimits: computed(() => ({ min: props.minZoom, max: props.maxZoom, step: props.zoomStep })),
  container,
})

defineExpose({ crop, reset })
</script>

<template>
  <div
    :class="cn('flex w-full flex-col gap-3', props.class)"
    data-slot="cropper"
  >
    <slot :crop="crop" />
  </div>
</template>
