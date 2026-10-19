import type { Component } from 'vue'
import { klipingAdd } from '../kliping-command.mjs'
import {
  blockGalleries,
  blockGalleryOf,
  blocks,
  chartGalleries,
  chartGalleryOf,
  charts,
  chartSlug,
  findBlock,
  findBlockGallery,
  findChartGallery,
} from '@/lib/blocks'
import { allTemplates, findTemplate, templateCategories, templatesIn } from '@/lib/templates'
import { allVariants, findVariant, variantGalleries } from '@/lib/variants'
import hookGallery from '@/registry/hook-gallery.json'
import HooksIcon from './HooksIcon.vue'
import BlockIcon from './BlockIcon.vue'
import ChartIcon from './ChartIcon.vue'
import VariantIcon from './VariantIcon.vue'

/**
 * Lima galeri, satu alur: Blocks, Variants, Charts, Hooks, dan Templates.
 *
 * Ketiganya berjalan dengan cara yang sama — halaman kategori berisi grid
 * thumbnail, halaman `/all` berisi pratinjau live, dan tiap isinya punya
 * halaman detail dengan Preview, Code, Install, dan Previous/Next. Yang berbeda
 * cuma alamatnya, sumber datanya, dan kata yang dipakai untuk menyebut isinya.
 * Perbedaan itu dikumpulkan di sini, jadi BlockGrid, BlockDetail, BlockViewer,
 * dan AllBlocks tidak perlu tahu galeri mana yang sedang digambarnya.
 *
 * Blocks adalah acuannya: alamat dan perilakunya tidak berubah sedikit pun.
 */
export type GalleryKind = 'block' | 'variant' | 'chart' | 'hook' | 'template'

/** Satu kategori galeri: alamatnya, namanya di layar, dan urutan isinya. */
export interface GalleryCategory {
  slug: string
  name: string
  items: string[]
}

export interface Catalog {
  /** Halaman All galeri ini, juga awalan alamat seluruh halamannya. */
  root: string
  /** Kata untuk satu isi dan banyak isi — "block" dan "blocks". */
  singular: string
  plural: string
  /** Judul galeri di layar — "Blocks", "Variants", "Charts". */
  title: string
  /** Seluruh kategorinya, berurutan seperti di sidebar. */
  categories: GalleryCategory[]
  /** Berapa isi seluruh galeri, untuk item All di sidebar. */
  count: number
  icon: Component
  findCategory: (slug: string) => GalleryCategory | undefined
  /** Kategori tempat sebuah isi tinggal — sumber Previous/Next dan "3 of 18". */
  categoryOf: (name: string) => GalleryCategory | undefined
  description: (name: string) => string
  /** Nama yang tampil di layar — sama dengan nama di alamatnya. */
  label: (name: string) => string
  /** Halaman detail sebuah isi. */
  detailPage: (name: string) => string
  /** Kanvas polos yang dimuat iframe pratinjaunya. */
  canvas: (name: string) => string
  /** Thumbnail terang dan gelapnya, dari `npm run generate:thumbnails`. */
  thumbnail: (name: string, dark: boolean) => string
  /**
   * Folder kode tersorotnya di bawah `/code/`, dibaca BlockCode. Nama folder
   * di disk — `blocks`, `variants`, `charts`, `hooks`, `templates`, sama
   * dengan `/thumbs/` — bukan nama jenis galerinya.
   */
  codeFolder: string
  /** Tujuan tombol Docs di halaman detail. */
  docsPage: (name: string) => string
  /** Tinggi bingkai pratinjau di halaman `/all`. */
  height: (name: string) => string
}

const BLOCK_HEIGHT = '930px'

/** Composable berdemo per kategori, dari `scripts/generate-hook-pages.mjs`. */
const hookCategories: GalleryCategory[] = hookGallery.galleries
const templateGalleryCategories: GalleryCategory[] = templateCategories.map(c => ({ slug: c.slug, name: c.name, items: templatesIn(c.slug).map(t => t.slug) }))

interface HookInfo {
  title: string
  description: string
  /** Punya berkas yang bisa dipasang lewat CLI. */
  installable: boolean
}

const hookInfo: Record<string, HookInfo> = hookGallery.info

export const CATALOG: Record<GalleryKind, Catalog> = {
  block: {
    root: '/blocks',
    singular: 'block',
    plural: 'blocks',
    title: 'Blocks',
    categories: blockGalleries,
    count: blocks.length,
    icon: BlockIcon,
    findCategory: findBlockGallery,
    categoryOf: blockGalleryOf,
    description: n => findBlock(n)?.description ?? '',
    label: n => n,
    detailPage: n => `/blocks/${n}`,
    canvas: n => `/view/${n}`,
    thumbnail: (n, dark) => `/thumbs/blocks/${n}${dark ? '-dark' : ''}.webp`,
    codeFolder: 'blocks',
    docsPage: n => `/blocks/docs/${n}`,
    height: n => findBlock(n)?.iframeHeight ?? BLOCK_HEIGHT,
  },
  variant: {
    root: '/variants',
    singular: 'variant',
    plural: 'variants',
    title: 'Variants',
    categories: variantGalleries,
    count: allVariants.length,
    icon: VariantIcon,
    findCategory: slug => variantGalleries.find(g => g.slug === slug),
    categoryOf: n => variantGalleries.find(g => g.items.includes(n)),
    description: n => findVariant(n)?.description ?? '',
    label: n => n,
    detailPage: n => `/variants/${n}`,
    // Di bawah `variants/`, karena nama varian dan nama block bisa sama persis —
    // `button-01` ada di keduanya.
    canvas: n => `/view/variants/${n}`,
    thumbnail: (n, dark) => `/thumbs/variants/${n}${dark ? '-dark' : ''}.webp`,
    codeFolder: 'variants',
    docsPage: n => `/variants/docs/${n}`,
    height: () => '480px',
  },
  chart: {
    root: '/charts',
    singular: 'chart',
    plural: 'charts',
    title: 'Charts',
    categories: chartGalleries,
    count: charts.length,
    icon: ChartIcon,
    findCategory: findChartGallery,
    categoryOf: chartGalleryOf,
    description: n => findBlock(n)?.description ?? '',
    label: chartSlug,
    detailPage: n => `/charts/${chartSlug(n)}`,
    canvas: n => `/view/charts/${chartSlug(n)}`,
    thumbnail: (n, dark) => `/thumbs/charts/${chartSlug(n)}${dark ? '-dark' : ''}.webp`,
    codeFolder: 'charts',
    docsPage: n => `/charts/docs/${chartSlug(n)}`,
    height: () => '600px',
  },
  hook: {
    root: '/hooks',
    singular: 'hook',
    plural: 'hooks',
    title: 'Hooks',
    categories: hookCategories,
    count: hookCategories.reduce((n, c) => n + c.items.length, 0),
    icon: HooksIcon,
    findCategory: slug => hookCategories.find(c => c.slug === slug),
    categoryOf: n => hookCategories.find(c => c.items.includes(n)),
    description: n => hookInfo[n]?.description ?? '',
    label: n => hookInfo[n]?.title ?? n,
    detailPage: n => `/hooks/${n}/preview`,
    canvas: n => `/view/hooks/${n}`,
    // Kartu Hooks memakai cuplikan kode, bukan potret — tidak ada thumbnail.
    thumbnail: () => '',
    codeFolder: 'hooks',
    docsPage: n => `/hooks/${n}`,
    height: () => '560px',
  },
  template: {
    root: '/templates',
    singular: 'template',
    plural: 'templates',
    title: 'Templates',
    categories: templateGalleryCategories,
    count: allTemplates.length,
    icon: BlockIcon,
    findCategory: slug => templateGalleryCategories.find(c => c.slug === slug),
    categoryOf: n => templateGalleryCategories.find(c => c.items.includes(n)),
    description: n => findTemplate(n)?.description ?? '',
    label: n => findTemplate(n)?.name ?? n,
    detailPage: n => `/templates/${n}/preview`,
    // Kanvasnya halaman template itu sendiri, yang sudah ada sejak awal.
    canvas: n => `/templates/${n}`,
    thumbnail: () => '',
    codeFolder: 'templates',
    docsPage: n => `/templates/docs/${n}`,
    height: () => '930px',
  },
}

/**
 * Perintah pemasangan sebuah isi, lewat CLI `kliping`.
 *
 * Block, varian, grafik, dan composable adalah butir registry Kliping sendiri:
 * dipasang dengan namanya (grafik: nama kebab-case-nya). Template bukan butir
 * registry — yang dipasang adalah komponen yang dipakainya (`uses`, dibaca
 * dari impornya oleh skrip penyusun halaman).
 */
export function installCommand(kind: GalleryKind, name: string, uses: string[] = []) {
  // Padanan bawaan Vue tidak punya berkas untuk dipasang: string kosong, dan
  // tab Install menjelaskannya alih-alih menampilkan perintah yang gagal.
  if (kind === 'hook')
    return hookInfo[name]?.installable ? klipingAdd(name) : ''
  if (kind === 'template')
    return klipingAdd(uses)
  return klipingAdd(kind === 'chart' ? chartSlug(name) : name)
}

/**
 * Isi satu kategori sebagai tautan ke halaman detailnya — untuk anak-anak
 * kategori yang bisa dibuka di sidebar halaman berkategori.
 */
export function categoryItemLinks(kind: GalleryKind, slug: string) {
  const c = CATALOG[kind]
  return (c.findCategory(slug)?.items ?? []).map(n => ({ name: c.label(n), href: c.detailPage(n) }))
}
