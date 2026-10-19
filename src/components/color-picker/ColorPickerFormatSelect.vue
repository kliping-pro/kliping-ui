<script setup lang="ts">
import type { ColorFormat } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { colorToString, parseColor } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectColorPickerContext } from './context'

/**
 * Pemilih format keluaran.
 *
 * Dipasang sebagai `<select>` biasa, bukan `Select` berhias — yang dipilih
 * empat kata pendek dengan lebar tetap, dan popover berisi popover lain
 * membawa masalah fokus yang tidak sepadan dengan hasilnya.
 *
 * Yang berubah cuma cara warnanya ditulis. Warnanya sendiri tetap: menukar
 * `hex` ke `rgb` tidak menggeser satu saluran pun.
 */
const props = withDefaults(defineProps<{
  /** The selectable formats, in display order. */
  formats?: ColorFormat[]
  class?: HTMLAttributes['class']
}>(), {
  formats: () => ['hex', 'rgb', 'hsl', 'hsb'],
})

const { state, setValue, setFormat } = injectColorPickerContext('ColorPickerFormatSelect')

/**
 * Menulis ulang warnanya dalam format yang baru.
 *
 * Formatnya saja tidak cukup: `v-model` menyimpan teks, dan teks yang sudah
 * tertulis `#3b82f6` tidak berubah sendiri jadi `rgb(59, 130, 246)`. Yang
 * menulis ulangnya `ColorFieldRoot` di bagian masukan — tapi kalau tidak ada
 * masukan sama sekali, tidak ada yang mengerjakannya, jadi dikerjakan di sini.
 */
function onChange(event: Event) {
  const format = (event.target as HTMLSelectElement).value as ColorFormat

  setFormat(format)
  setValue(colorToString(parseColor(state.value.value), format))
}
</script>

<template>
  <select
    aria-label="Color format"
    :class="cn(
      'h-8 shrink-0 rounded-md border bg-transparent px-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      props.class,
    )"
    data-slot="color-picker-format-select"
    :disabled="state.disabled"
    :value="state.format"
    @change="onChange"
  >
    <option v-for="f in props.formats" :key="f" :value="f">
      {{ f.toUpperCase() }}
    </option>
  </select>
</template>
