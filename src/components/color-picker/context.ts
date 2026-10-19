import type { Color, ColorFormat } from 'reka-ui'
import type { ComputedRef } from 'vue'
import { colorToString } from 'reka-ui'
import { createContext } from '@/lib/create-context'

export interface ColorPickerState {
  value: string
  format: ColorFormat
  disabled: boolean
}

export interface ColorPickerContext {
  state: ComputedRef<ColorPickerState>
  setValue: (value: string) => void
  setFormat: (format: ColorFormat) => void
}

export const [provideColorPickerContext, injectColorPickerContext, injectColorPickerContextOptional]
  = createContext<ColorPickerContext>('ColorPicker')

/**
 * Mengubah warna dari komponen Reka UI menjadi teks.
 *
 * Keluarga warna Reka UI mengirim `string | Color` — teks kalau nilainya
 * memang masuk sebagai teks, objek kalau penggesernya yang menghitungnya.
 * `v-model` akar ini selalu teks, jadi yang objek perlu diubah.
 *
 * Yang mengubahnya `colorToString`, bukan `toString()` milik objeknya: yang
 * kedua tidak menerima format, dan hasilnya selalu hex — memakainya membuat
 * `format="rgb"` diam-diam tidak berpengaruh apa-apa.
 */
export function toColorString(color: string | Color, format: ColorFormat): string {
  return typeof color === 'string' ? color : colorToString(color, format)
}
