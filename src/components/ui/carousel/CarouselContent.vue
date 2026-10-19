<script setup lang="ts">
import type { WithClassAsProps } from "./interface"
import { cn } from "@/lib/utils"
import { useCarousel } from "./useCarousel"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

// Tidak didestrukturisasi: `carouselRef` diteruskan ke `:ref` sebagai ref, bukan
// nilai yang sudah dibuka template — dan dengan begitu pemakaiannya terlihat
// oleh pemeriksa tipe.
const carousel = useCarousel()
const { orientation } = carousel
</script>

<template>
  <div
    :ref="carousel.carouselRef"
    data-slot="carousel-content"
    class="overflow-hidden"
  >
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
