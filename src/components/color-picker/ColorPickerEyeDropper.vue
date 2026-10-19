<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PipetteIcon } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectColorPickerContext } from './context'

/**
 * Tombol pengambil warna dari layar.
 *
 * Memakai `EyeDropper`, yang sampai sekarang cuma ada di Chromium. Yang tidak
 * punya tidak diberi tombol mati — tombolnya tidak digambar sama sekali.
 * Tombol mati tanpa penjelasan lebih membingungkan daripada tombol yang
 * memang tidak ada.
 *
 * Pemeriksaannya dilakukan di `onMounted`, bukan saat menyiapkan: di server
 * tidak ada `window`, dan menebaknya ada membuat tombolnya sempat tergambar
 * lalu hilang setelah hidrasi.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, setValue } = injectColorPickerContext('ColorPickerEyeDropper')

const isSupported = ref(false)

onMounted(() => {
  isSupported.value = 'EyeDropper' in window
})

async function pick() {
  const EyeDropperCtor = (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper

  try {
    const { sRGBHex } = await new EyeDropperCtor().open()
    setValue(sRGBHex)
  }
  catch {
    // Ditutup dengan Escape. Bukan galat — pemakainya berubah pikiran.
  }
}
</script>

<template>
  <button
    v-if="isSupported"
    :aria-label="'Pick a color from the screen'"
    :class="cn(
      'inline-flex size-8 shrink-0 items-center justify-center rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
    data-slot="color-picker-eye-dropper"
    :disabled="state.disabled"
    type="button"
    @click="pick"
  >
    <slot>
      <PipetteIcon />
    </slot>
  </button>
</template>
