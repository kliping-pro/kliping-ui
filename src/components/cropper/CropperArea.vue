<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectCropperContext } from './context'

/**
 * Bingkai potong beserta selubung yang menggelapkan sekitarnya.
 *
 * Selubungnya `box-shadow` sebesar layar dari bingkainya sendiri, sama
 * seperti sorotan pada `Tour`. Satu elemen mengerjakan dua hal — menggambar
 * garis bingkai dan menggelapkan sisanya — dan keduanya tidak akan pernah
 * bergeser satu sama lain karena memang satu elemen.
 *
 * Seluruhnya `pointer-events-none`. Yang menangkap seretan wadahnya, dan
 * bingkai yang ikut menadah tetikus membuat gambar tidak bisa diseret justru
 * di tengah-tengah, tempat orang paling mungkin menyeretnya.
 */
const props = withDefaults(defineProps<{
  /** Show rule-of-thirds guide lines inside the frame. */
  grid?: boolean
  /** Circular frame, for profile photos. */
  circular?: boolean
  class?: HTMLAttributes['class']
}>(), {
  grid: true,
  circular: false,
})

const { state } = injectCropperContext('CropperArea')

const style = computed(() => ({
  width: `${state.value.frame.width}px`,
  height: `${state.value.frame.height}px`,
}))
</script>

<template>
  <div
    aria-hidden="true"
    :class="cn(
      'pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/90 shadow-[0_0_0_9999px_rgb(0_0_0/0.5)]',
      props.circular ? 'rounded-full' : 'rounded-sm',
      props.class,
    )"
    data-slot="cropper-area"
    :style="style"
  >
    <template v-if="props.grid && !props.circular">
      <div class="absolute inset-y-0 left-1/3 w-px bg-white/30" />
      <div class="absolute inset-y-0 left-2/3 w-px bg-white/30" />
      <div class="absolute inset-x-0 top-1/3 h-px bg-white/30" />
      <div class="absolute inset-x-0 top-2/3 h-px bg-white/30" />
    </template>
    <slot />
  </div>
</template>
