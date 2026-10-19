import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as ColorSwatch } from './ColorSwatch.vue'

/**
 * Apakah peramban mengenali teks ini sebagai warna.
 *
 * `CSS.supports` tidak ada saat render server, dan di sana jawabannya `true`.
 * Menggambar warna yang ternyata tidak sah cuma menghasilkan petak kosong;
 * menolaknya lebih dulu menghasilkan tanda "tidak ada warna" yang salah. Yang
 * kedua lebih menyesatkan, jadi yang dipilih yang pertama.
 */
export function isValidCssColor(value: string): boolean {
  try {
    return typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
      ? CSS.supports('color', value)
      : true
  }
  catch {
    return false
  }
}

const HEX_WITH_ALPHA = /^#(?:[0-9a-f]{4}|[0-9a-f]{8})$/i
const FUNCTION_WITH_ALPHA = /\b(?:rgba|hsla)\s*\(/i
const SLASH_ALPHA = /\b(?:rgb|hsl|lab|lch|oklab|oklch|color)\s*\([^)]*\/\s*[\d.]+%?\s*\)/i

/** Whether a color has a transparent component. */
export function hasAlpha(value: string): boolean {
  const text = value.trim().toLowerCase()

  if (text === 'transparent') return true
  if (HEX_WITH_ALPHA.test(text)) return true
  if (FUNCTION_WITH_ALPHA.test(text)) return true

  return SLASH_ALPHA.test(text)
}

export const colorSwatchVariants = cva(
  'box-border rounded-sm border bg-clip-padding shadow-sm data-disabled:pointer-events-none data-disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'size-8',
        sm: 'size-6',
        lg: 'size-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type ColorSwatchVariants = VariantProps<typeof colorSwatchVariants>
