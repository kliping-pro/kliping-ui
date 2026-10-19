import meta from '@/composables/meta.json'
import registry from '@/registry/registry-hooks.json'

/**
 * Katalog halaman Hooks: kategori, isinya, dan nav-nya.
 *
 * Satu sumber untuk halaman All, halaman kategori, dan pencarian — supaya
 * angka di kartu kategori, isi halamannya, dan hasil pencarian selalu sama.
 * Urutan dan pengelompokannya dari `src/composables/meta.json`, judul dan
 * keterangan tiap composable dari `src/registry/registry-hooks.json` — potongan
 * `registry.json` yang disusun `scripts/generate-registry.mjs`.
 */
interface RegistryItem {
  name: string
  title?: string
  description?: string
}

export interface HookItem {
  name: string
  title: string
  description?: string
  /** Halaman penjelasan tanpa berkas yang dipasang: padanan native Vue atau paket luar. */
  explanationOnly: boolean
}

const byName = new Map<string, RegistryItem>(
  (registry.items as RegistryItem[]).map(i => [i.name, i]),
)

export const categorySlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-')

export const hookCategories = meta.categories
  .filter(c => c.items.length > 0)
  .map(c => ({
    name: c.name,
    slug: categorySlug(c.name),
    href: `/hooks/${categorySlug(c.name)}`,
    description: c.description,
    items: c.items.map((name): HookItem => {
      const entry = byName.get(name)
      return {
        name,
        title: entry?.title ?? name.replace(/-([a-z])/g, (_, h: string) => h.toUpperCase()),
        description: entry?.description,
        explanationOnly: !entry,
      }
    }),
  }))

/** Hitungan untuk kepala halaman, dari data — bukan angka yang ditulis tangan. */
export const hookCounts = (() => {
  const all = hookCategories.flatMap(c => c.items)
  const installable = all.filter(i => !i.explanationOnly)
  return {
    pages: all.length,
    composables: installable.filter(i => i.name.startsWith('use-')).length,
    helpers: installable.filter(i => !i.name.startsWith('use-')).length,
    equivalents: all.filter(i => i.explanationOnly).length,
  }
})()

/** Deret nav halaman Hooks: All (`/hooks`) di depan, lalu tiap kategori. */
export const hookNav = [{ name: 'All', href: '/hooks' }, ...hookCategories.map(c => ({ name: c.name, href: c.href }))]
