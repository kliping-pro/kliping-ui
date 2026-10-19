import blockList from '@/registry/blocks.json'
import blockGalleryData from '@/registry/block-gallery.json'
import chartGalleryData from '@/registry/chart-gallery.json'

/**
 * Katalog block dan chart.
 *
 * Diangkut dari registry repo fork sebagai satu berkas JSON. Di sana isinya
 * dilayani `/api/block/[name]`; di sini dibaca saat build, karena situs ini
 * tidak punya server dan tidak akan punya.
 */
export interface Block {
  name: string
  description: string
  categories?: string[]
  /**
   * Tinggi bingkai pratinjau, dari `iframeHeight` yang diekspor `page.vue`
   * block itu sendiri. Tujuh belas block menyebutkannya; sisanya memakai
   * tinggi bawaan.
   */
  iframeHeight?: string
}

export const allBlocks = blockList as Block[]

const CHART_CATEGORIES = new Set(['chart', 'chart-area', 'chart-bar', 'chart-line', 'chart-pie', 'chart-tooltip'])

/** Block halaman utuh — yang bukan chart. */
export const blocks = allBlocks.filter(b => !(b.categories ?? []).some(c => CHART_CATEGORIES.has(c)))

/** Chart, dikelompokkan terpisah karena halamannya sendiri. */
export const charts = allBlocks.filter(b => (b.categories ?? []).some(c => CHART_CATEGORIES.has(c)))

export function findBlock(name: string) {
  return allBlocks.find(b => b.name === name)
}

/**
 * Galeri block: tiap kategori, judul halamannya, dan urutan isinya.
 *
 * Satu sumber untuk nav, halaman grid, halaman "all", pencarian, dan
 * Previous/Next di halaman detail — supaya angka di kartu, isi grid, dan
 * posisi "3 of 18" selalu sama. Featured adalah pilihan kurasi: isinya juga
 * tercantum di kategori aslinya.
 */
export interface Gallery {
  slug: string
  name: string
  title: string
  description: string
  items: string[]
}

export const blockGalleries: Gallery[] = blockGalleryData

export const blockCategories = blockGalleries.map(g => ({ name: g.name, href: `/blocks/${g.slug}` }))

/** Blocks page nav: All (`/blocks`) first, then each category. */
export const blockNav = [{ name: 'All', href: '/blocks' }, ...blockCategories]

export function findBlockGallery(slug: string) {
  return blockGalleries.find(g => g.slug === slug)
}

/**
 * Galeri tempat sebuah block "tinggal": kategori aslinya, bukan Featured.
 * Block yang hanya ada di Featured (`dashboard-01`) tinggal di Featured.
 */
export function blockGalleryOf(name: string) {
  return blockGalleries.find(g => g.slug !== 'featured' && g.items.includes(name))
    ?? blockGalleries.find(g => g.items.includes(name))
}

/** Halaman kategori sebuah block, dari galerinya. */
export function blockCategoryPage(name: string) {
  const g = blockGalleryOf(name)
  return g ? `/blocks/${g.slug}` : '/blocks'
}

/** How many blocks a category page shows. */
export function blockCount(href: string) {
  return findBlockGallery(href.replace(/^\/blocks\//, ''))?.items.length ?? 0
}

/**
 * Galeri grafik: tiap jenis grafik, judul halamannya, dan urutan isinya.
 *
 * Bentuknya sama persis dengan galeri block, dan dipakai dengan cara yang sama:
 * satu sumber untuk sidebar, halaman grid, halaman "all", pencarian, dan
 * Previous/Next di halaman detail. Ditulis tangan di
 * `src/registry/chart-gallery.json`, dibaca juga oleh
 * `scripts/generate-chart-pages.mjs`.
 *
 * `/charts` sendiri sekarang halaman All — satu kartu per jenis — sama seperti
 * `/blocks`. Area, yang dulu menempatinya, pindah ke `/charts/area`.
 */
export const chartGalleries: Gallery[] = chartGalleryData

export const chartCategories = chartGalleries.map(g => ({ name: g.name, href: `/charts/${g.slug}` }))

/** Charts page nav: All (`/charts`) first, then each chart type. */
export const chartNav = [{ name: 'All', href: '/charts' }, ...chartCategories]

export function findChartGallery(slug: string) {
  return chartGalleries.find(g => g.slug === slug)
}

/** The chart type gallery a chart belongs to. */
export function chartGalleryOf(name: string) {
  return chartGalleries.find(g => g.items.includes(name))
}

/**
 * Nama grafik di URL dan di layar — `ChartBarDefault` jadi `chart-bar-default`,
 * nama yang sama dengan yang dipakai hulu untuk grafik yang sama. Nama
 * berkasnya tetap PascalCase karena itu nama komponennya.
 */
export function chartSlug(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
