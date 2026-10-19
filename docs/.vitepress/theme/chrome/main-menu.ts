import type { Component } from 'vue'
import { BracesIcon, ChartAreaIcon, LayoutGridIcon, LayoutTemplateIcon, ShapesIcon } from '@lucide/vue'
import { blocks, charts } from '@/lib/blocks'
import { allTemplates } from '@/lib/templates'
import { allVariants } from '@/lib/variants'
import { hookCounts } from '../hooks'

/**
 * Isi nav utama — satu sumber untuk header desktop dan menu layar sempit.
 *
 * Header memakai mega menu (NavigationMenu shadcn): Home, Components, dan
 * Browse masing-masing membuka panel berisi tautan beserta keterangannya.
 * Sisanya tautan biasa. Urutannya: tujuan belajar (Home, Docs), bahan bangunan
 * (Components, Browse), lalu halaman rujukan (Directory, Colors, Typeset) —
 * Typeset paling akhir.
 *
 * Dulu isinya ditulis di `themeConfig.nav`. Bentuk nav VitePress tidak punya
 * tempat untuk keterangan dan ikon, dan yang membaca nav itu hanya dua
 * komponen chrome ini, jadi datanya pindah ke sini.
 */
export interface MenuLink {
  title: string
  href: string
  description?: string
  icon?: Component
  count?: number
}

export type MenuEntry =
  | { kind: 'link', title: string, href: string }
  | { kind: 'home', title: string, href: string, items: MenuLink[] }
  | {
    kind: 'grid'
    title: string
    href: string
    items: MenuLink[]
    /** Tautan "lihat semua" di kaki panel. */
    all?: MenuLink
    /** Di menu layar sempit isinya dijajarkan sendiri-sendiri, bukan satu tautan. */
    split?: boolean
  }

/**
 * Komponen yang selalu dipakai — cukup untuk menyusun satu dashboard utuh:
 * kerangka (Sidebar), isian (Input, Select, Form), data (Table, Chart, Card),
 * dan lapisan di atasnya (Dialog, Sheet, Dropdown Menu, Tooltip).
 */
const CORE_COMPONENTS: MenuLink[] = [
  { title: 'Button', href: '/components/button', description: 'Triggers an action or event, in every variant you will need.' },
  { title: 'Sidebar', href: '/components/sidebar', description: 'A composable, collapsible sidebar for any dashboard.' },
  { title: 'Card', href: '/components/card', description: 'Groups related content and actions on one surface.' },
  { title: 'Data Table', href: '/components/data-table', description: 'Sortable, filterable, paginated tables built on TanStack Table.' },
  { title: 'Chart', href: '/components/chart', description: 'Area, bar, line and pie charts that follow your theme.' },
  { title: 'Form', href: '/components/form', description: 'Accessible forms with validation, labels and error messages.' },
  { title: 'Dialog', href: '/components/dialog', description: 'A modal window that overlays the page and traps focus.' },
  { title: 'Dropdown Menu', href: '/components/dropdown-menu', description: 'A menu of actions or options opened from a trigger.' },
  { title: 'Select', href: '/components/select', description: 'Picks one value from a list, keyboard friendly.' },
  { title: 'Tabs', href: '/components/tabs', description: 'Layered panels of content shown one at a time.' },
]

export const mainMenu: MenuEntry[] = [
  {
    kind: 'home',
    title: 'Home',
    href: '/',
    items: [
      { title: 'Introduction', href: '/introduction', description: 'Re-usable Vue components you copy, own and change.' },
      { title: 'Concepts', href: '/concepts', description: 'How components, variants, blocks, pages and templates fit together.' },
      { title: 'Installation', href: '/installation', description: 'How to install dependencies and structure your app.' },
      { title: 'Typography', href: '/components/typography', description: 'Styles for headings, paragraphs, lists… etc.' },
    ],
  },
  { kind: 'link', title: 'Docs', href: '/introduction' },
  {
    kind: 'grid',
    title: 'Components',
    href: '/components',
    items: CORE_COMPONENTS,
    all: { title: 'All components', href: '/components', description: 'Every component, primitive and helper in the registry.' },
  },
  {
    kind: 'grid',
    title: 'Browse',
    href: '/blocks',
    items: [
      { title: 'Blocks', href: '/blocks', icon: LayoutGridIcon, count: blocks.length, description: `${blocks.length} full sections and pages — heroes, pricing, dashboards` },
      { title: 'Variants', href: '/variants', icon: ShapesIcon, count: allVariants.length, description: `${allVariants.length} copy-paste variations of every component` },
      { title: 'Templates', href: '/templates', icon: LayoutTemplateIcon, count: allTemplates.length, description: `${allTemplates.length} complete starter sites to clone and ship` },
      { title: 'Hooks', href: '/hooks', icon: BracesIcon, count: hookCounts.pages, description: `${hookCounts.pages} composables for state, lifecycle and the browser` },
      { title: 'Charts', href: '/charts', icon: ChartAreaIcon, count: charts.length, description: `${charts.length} charts — area, bar, line, pie — wired to your theme` },
    ],
    split: true,
  },
  { kind: 'link', title: 'Builder', href: '/builder' },
  { kind: 'link', title: 'Directory', href: '/directory/' },
  { kind: 'link', title: 'Colors', href: '/colors' },
  { kind: 'link', title: 'Typeset', href: '/typeset' },
]

/** Semua tujuan nav sebagai deret datar, untuk menu layar sempit. */
export function flattenMenu(): { text: string, link: string }[] {
  return mainMenu.flatMap(e => e.kind === 'grid' && e.split
    ? e.items.map(i => ({ text: i.title, link: i.href }))
    : [{ text: e.title, link: e.href }])
}
