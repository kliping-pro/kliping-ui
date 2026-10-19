import { colors } from './colors-data'

/**
 * Palet warna Tailwind, dirapikan jadi bentuk yang siap ditampilkan.
 *
 * Sumbernya berkas data yang diangkut apa adanya dari repo fork. Di sana
 * bentuknya divalidasi Zod sebelum dipakai; di sini tidak — datanya berkas
 * statis di repo ini sendiri, bukan masukan dari luar, jadi yang divalidasi
 * hanyalah tulisan kita sendiri, dan itu sudah dijaga TypeScript.
 */
export interface Color {
  name: string
  id: string
  scale: number
  className: string
  hex: string
  rgb: string
  hsl: string
  oklch: string
  foreground: string
  var: string
}

export interface ColorPalette {
  name: string
  colors: Color[]
}

/**
 * Warna teks yang terbaca di atas sebuah warna latar.
 *
 * Luminansinya dihitung setelah kanal dikembalikan ke ruang linear — mata
 * tidak menanggapi terang secara linear, dan rata-rata mentah dari nilai sRGB
 * memilih warna teks yang salah pada hijau dan kuning.
 */
function readableTextColor(rgb: string) {
  const [r, g, b] = rgb.split(' ').map(Number)

  function linear(channel: number) {
    const normalized = channel / 255
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  }

  const luminance = 0.2126 * linear(r!) + 0.7152 * linear(g!) + 0.0722 * linear(b!)
  return luminance > 0.179 ? '#000' : '#fff'
}

export function getPalettes(): ColorPalette[] {
  return Object.entries(colors)
    .filter((entry): entry is [string, any[]] => Array.isArray(entry[1]))
    .map(([name, shades]) => ({
      name,
      colors: shades.map((shade) => {
        const rgb = shade.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, '$1 $2 $3')
        return {
          ...shade,
          name,
          id: `${name}-${shade.scale}`,
          className: `${name}-${shade.scale}`,
          var: `--color-${name}-${shade.scale}`,
          rgb,
          hsl: shade.hsl.replace(/^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/, '$1 $2 $3'),
          oklch: `oklch(${shade.oklch.replace(/^oklch\(([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\)$/, '$1 $2 $3')})`,
          foreground: readableTextColor(rgb),
        }
      }),
    }))
}

export const COLOR_FORMATS = ['className', 'hex', 'rgb', 'hsl', 'oklch', 'var'] as const
export type ColorFormat = (typeof COLOR_FORMATS)[number]

/** A color value in the given format, ready to copy. */
export function colorValue(color: Color, format: ColorFormat) {
  return {
    className: `bg-${color.className}`,
    hex: color.hex,
    rgb: `rgb(${color.rgb})`,
    hsl: `hsl(${color.hsl})`,
    oklch: color.oklch,
    var: `var(${color.var})`,
  }[format]
}
