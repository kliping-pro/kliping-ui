/**
 * Pembacaan navigasi untuk tema Kliping.
 *
 * Tema bawaan VitePress punya composable-nya sendiri untuk ini, tapi semuanya
 * hidup di `vitepress/dist/client/theme-default/composables/` — jalur internal
 * yang tidak dijanjikan stabil antar versi. Yang dibutuhkan di sini cuma tiga
 * hal sederhana, jadi ditulis sendiri saja ketimbang mengikat kerangka situs
 * pada bentuk dalam paket orang lain.
 */
import type { DefaultTheme } from 'vitepress'

export interface NavLink {
  text: string
  link: string
}

/**
 * Samakan bentuk sebuah jalur supaya bisa dibandingkan.
 *
 * Yang dibandingkan datang dari dua sumber yang menulis jalur dengan cara
 * berbeda: `route.path` milik VitePress selalu memakai garis miring di
 * belakang untuk halaman index, sedangkan tautan di config ditulis tangan dan
 * kadang tidak. Keduanya diratakan dulu, jadi `/registry` dan `/registry/`
 * dihitung sebagai halaman yang sama.
 */
export function normalizePath(path: string) {
  const clean = path.replace(/\.html$/, '').replace(/index$/, '')
  return clean !== '/' && clean.endsWith('/') ? clean.slice(0, -1) : clean
}

/**
 * Sidebar yang berlaku untuk sebuah jalur.
 *
 * VitePress mengizinkan `sidebar` berupa deret tunggal, atau objek yang
 * memetakan awalan jalur ke deretnya sendiri. Kliping memakai bentuk kedua
 * sejak `/hooks` punya sidebar terpisah: composable dan komponen adalah dua
 * dokumentasi yang berdampingan, bukan satu daftar panjang yang menampung
 * keduanya.
 *
 * Awalan terpanjang yang cocok yang menang, jadi `/hooks/` didahulukan atas
 * `/` tanpa bergantung pada urutan penulisannya di config.
 */
export function sidebarFor(
  sidebar: DefaultTheme.Sidebar | undefined,
  path: string,
): DefaultTheme.SidebarItem[] {
  if (!sidebar)
    return []
  if (Array.isArray(sidebar))
    return sidebar

  const prefix = Object.keys(sidebar)
    .filter(a => path.startsWith(a))
    .sort((a, b) => b.length - a.length)[0]

  if (!prefix)
    return []

  const entry = sidebar[prefix]
  return Array.isArray(entry) ? entry : entry.items
}

/** Semua tautan di sidebar, diratakan jadi satu deret sesuai urutan tampilnya. */
export function flatten(sidebar: DefaultTheme.SidebarItem[] | undefined): NavLink[] {
  const result: NavLink[] = []

  function walk(items: DefaultTheme.SidebarItem[]) {
    for (const item of items) {
      if (item.link && item.text)
        result.push({ text: item.text, link: item.link })
      if (item.items)
        walk(item.items)
    }
  }

  walk(sidebar ?? [])
  return result
}

/**
 * Halaman sebelum dan sesudah halaman yang sedang dibuka.
 *
 * Urutannya mengikuti sidebar, bukan struktur folder: yang diharapkan pembaca
 * saat menekan "Next" adalah item berikutnya di daftar yang dia lihat.
 */
export function prevNext(path: string, links: NavLink[]) {
  const current = normalizePath(path)
  const i = links.findIndex(t => normalizePath(t.link) === current)
  return {
    prev: i > 0 ? links[i - 1] : undefined,
    next: i >= 0 && i < links.length - 1 ? links[i + 1] : undefined,
  }
}
