<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { getSwapState, provideSwapContext } from './context'

/**
 * Dua isi yang bertukar tempat.
 *
 * Sumbernya membangun store luar sendiri — `useLazyRef` untuk keadaan,
 * `useAsRef` untuk prop terbaru, `useSyncExternalStore` untuk melanggan, dan
 * satu `StoreContext` untuk membagikannya. Seluruh lapisan itu ada supaya
 * `SwapOn` dan `SwapOff` tidak ikut render ulang saat prop lain berganti.
 *
 * Di Vue tidak ada yang perlu dibangun: satu `computed` yang disediakan lewat
 * `provide` sudah bersifat per-nilai. Yang tersisa dari kode aslinya cuma
 * perilakunya — dan perilakunya memang tidak berubah.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The initial state when used without `v-model:swapped`. */
  defaultSwapped?: boolean
  /** What triggers the swap. */
  activationMode?: 'click' | 'hover'
  /** Transition between the two contents: `fade`, `rotate`, `flip`, or `scale`. */
  animation?: 'fade' | 'rotate' | 'flip' | 'scale'
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  defaultSwapped: false,
  activationMode: 'click',
  animation: 'fade',
})

/** Whether the "on" content is shown (v-model:swapped); leave unbound to use `defaultSwapped`. */
const model = defineModel<boolean | undefined>('swapped', { default: undefined })

// Terkendali saat pemanggilnya mengikat `v-model:swapped`, tidak terkendali
// saat tidak. Keduanya dilayani satu `computed` supaya sisa komponen ini tidak
// perlu tahu bedanya.
const swapped = computed({
  get: () => model.value ?? props.defaultSwapped,
  set: (value) => {
    model.value = value
  },
})

const isClickMode = computed(() => props.activationMode === 'click')

function toggle() {
  if (props.disabled) return
  swapped.value = !swapped.value
}

function onClick() {
  if (!isClickMode.value) return
  toggle()
}

function onMouseEnter() {
  if (props.activationMode !== 'hover' || props.disabled) return
  swapped.value = true
}

function onMouseLeave() {
  if (props.activationMode !== 'hover' || props.disabled) return
  swapped.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (!isClickMode.value || props.disabled) return
  if (event.key !== 'Enter' && event.key !== ' ') return

  // Spasi menggulung halaman kalau tidak dicegah, dan elemen ini bukan tombol
  // sungguhan — jadi peramban tidak mencegahnya sendiri.
  event.preventDefault()
  toggle()
}

provideSwapContext(computed(() => ({ swapped: swapped.value })))
</script>

<template>
  <Primitive
    :aria-disabled="props.disabled"
    :aria-pressed="isClickMode ? swapped : undefined"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'relative inline-flex cursor-pointer select-none items-center justify-center data-disabled:cursor-not-allowed data-disabled:opacity-50',
      props.class,
    )"
    :data-animation="props.animation"
    :data-disabled="props.disabled ? '' : undefined"
    data-slot="swap"
    :data-state="getSwapState(swapped)"
    :role="isClickMode ? 'button' : undefined"
    :tabindex="isClickMode && !props.disabled ? 0 : undefined"
    @click="onClick"
    @keydown="onKeydown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </Primitive>
</template>
