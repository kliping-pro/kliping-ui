<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/**
 * Selubung gelap yang menutup halaman, dengan lubang di sasarannya.
 *
 * Lubangnya digambar dengan `box-shadow` sebesar layar, bukan dengan empat
 * persegi yang mengapit sasaran atau dengan `clip-path`. Satu elemen, satu
 * properti, dan sudut yang bisa dibulatkan — sementara empat persegi menuntut
 * empat perhitungan yang harus tetap sinkron, dan `clip-path` tidak bisa
 * dianimasikan mulus antar langkah.
 *
 * Selubung tanpa sasaran menggelapkan seluruh halaman tanpa lubang. Itu yang
 * tepat untuk langkah pembuka: belum ada yang ditunjuk.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, skip } = injectTourContext('TourOverlay')

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const style = computed(() => {
  const k = state.value.rect
  if (!k) return undefined

  return {
    top: `${k.top}px`,
    left: `${k.left}px`,
    width: `${k.width}px`,
    height: `${k.height}px`,
  }
})
</script>

<template>
  <Teleport v-if="mounted" to="body">
    <template v-if="state.open">
      <!-- Yang berlubang tidak bisa dipakai menangkap klik: lubangnya cuma
           bayangan, jadi seluruh persegi tetap menadah tetikus dan sasarannya
           malah tidak bisa disentuh. Penadahnya lapisan tersendiri di
           belakangnya. -->
      <div
        :class="cn('fixed inset-0 z-40', props.class)"
        data-slot="tour-overlay"
        @click="skip"
      />

      <div
        v-if="style"
        aria-hidden="true"
        class="pointer-events-none absolute z-40 rounded-lg shadow-[0_0_0_9999px_rgb(0_0_0/0.6)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        data-slot="tour-highlight"
        :style="style"
      />
      <div
        v-else
        aria-hidden="true"
        class="pointer-events-none fixed inset-0 z-40 bg-black/60"
        data-slot="tour-highlight"
      />
    </template>
  </Teleport>
</template>
