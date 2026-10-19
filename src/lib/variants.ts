/**
 * Katalog varian komponen.
 *
 * `src/registry/variants.json` disusun sekali oleh alat impor sekali pakai
 * (`skrip/angkut-variasi.mjs`, dihapus di 7a4be01 — ada di riwayat git) dari
 * isi `src/variants/`. Sejak itu disunting tangan: menambah varian berarti
 * menambah entrinya di sana, dan keterangannya ditulis di sana juga — bukan di
 * sini, dan bukan di tiap SFC, supaya satu tempat saja yang harus disunting.
 * `scripts/generate-variant-pages.mjs` menyusun halamannya dari berkas itu.
 */
import variantList from '@/registry/variants.json'

export interface Variant {
  /** File name without extension, e.g. `button-01`. */
  name: string
  /** The component being varied, e.g. `button`. */
  component: string
  description: string
}

export const allVariants: Variant[] = variantList

/** Names of components that have variants, sorted alphabetically. */
export const variantComponents = [...new Set(allVariants.map(v => v.component))].sort()

export function variantsOf(component: string) {
  return allVariants.filter(v => v.component === component)
}

/** How many variants a component has; zero when none. */
export function variantCount(component: string) {
  return allVariants.filter(v => v.component === component).length
}

/**
 * Judul yang tampil untuk sebuah komponen — `dropdown-menu` jadi
 * `Dropdown Menu`. Ditulis di satu tempat karena dipakai indeks, judul
 * halaman, dan tautan silang dari halaman komponennya.
 */
const ACRONYMS = new Set(['otp'])

export function componentTitle(component: string) {
  return component
    .split('-')
    // Singkatan ditulis kapital penuh — `input-otp` jadi Input OTP.
    .map(part => ACRONYMS.has(part) ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

/**
 * Varian yang dikelompokkan per komponen, dalam bentuk yang sama dengan galeri
 * block — `slug`, `name`, `items` — supaya halaman grid, halaman detail, dan
 * Previous/Next-nya bisa memakai komponen yang sama dengan Blocks.
 *
 * Urutan isinya urutan nama berkas: `button-01`, `button-02`, … — urutan yang
 * sama dengan halaman live-nya.
 */
export const variantGalleries = variantComponents.map(c => ({
  slug: c,
  name: componentTitle(c),
  items: allVariants.filter(v => v.component === c).map(v => v.name),
}))

export function findVariant(name: string) {
  return allVariants.find(v => v.name === name)
}
