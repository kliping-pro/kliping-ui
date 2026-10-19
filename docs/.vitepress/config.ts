import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import lightTheme from './shiki-light-theme.mjs'
import { isPackageCommand } from './theme/package-manager'

const srcRoot = path.resolve(fileURLToPath(new URL('../..', import.meta.url)), 'src')

/**
 * CSS Tailwind yang disusun `scripts/build-tailwind.mjs` di proses sendiri
 * (bagian akhir `predocs:build`). Saat build, `@/assets/main.css` diarahkan ke
 * berkas ini dan plugin Tailwind tidak dipasang: plugin itu menahan compiler
 * dan hasil pindaiannya di memori sepanjang build — ± 2,2 GB dari ± 5,5 GB
 * puncak (diukur 18 Okt 2026). Dev server tetap memakai plugin.
 */
const precompiledCss = path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'cache/tailwind.css')
const usePrecompiledCss = process.argv.includes('build') && existsSync(precompiledCss)

/**
 * Daftar sidebar untuk 65 halaman komponen, dibaca dari isi foldernya.
 *
 * Judulnya diambil dari frontmatter tiap berkas supaya sama persis dengan yang
 * tampil di halamannya, dan tidak perlu ada dua daftar yang harus dijaga tetap
 * sinkron setiap kali komponen baru ditambahkan.
 */
function componentsSidebar() {
  const dir = fileURLToPath(new URL('../components', import.meta.url))
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map((f) => {
      const source = readFileSync(path.join(dir, f), 'utf-8')
      // Judulnya sekarang dikutip di sebagian berkas, karena prosa Bahasa
      // Indonesia sering memakai titik dua dan YAML membacanya sebagai pemetaan.
      const title = source.match(/^title:(.*)$/m)?.[1].trim().replace(/^(["'])(.*)\1$/, '$2')
      // `new: true` di frontmatter menyalakan titik hijau di sidebar dan di
      // daftar komponen. Dibaca di sini supaya penandanya dan judulnya datang
      // dari sumber yang sama.
      const isNew = /^new:\s*true\s*$/m.test(source)
      return { text: title || f.slice(0, -3), link: `/components/${f.slice(0, -3)}`, isNew }
    })
    .sort((a, b) => a.text.localeCompare(b.text, 'id'))
}

/**
 * Sidebar untuk 55 halaman composable, dibaca dari `src/composables/meta.json`.
 *
 * Sumbernya sama dengan yang dipakai `HooksList.vue` untuk menyusun daftar di
 * halaman `/hooks`. Satu berkas, bukan dua yang harus dijaga tetap sama —
 * menambah composable baru cukup menyebutnya sekali di sana.
 *
 * Judulnya dibaca dari frontmatter halamannya, persis seperti sidebar komponen.
 */
function hooksSidebar() {
  const docsDir = fileURLToPath(new URL('../hooks', import.meta.url))
  const meta = JSON.parse(
    readFileSync(path.join(srcRoot, 'composables/meta.json'), 'utf-8'),
  ) as {
    categories: {
      name: string
      pages?: { name: string, title: string }[]
      items: string[]
    }[]
  }

  const titleOf = (name: string, fallback: string) => {
    const file = path.join(docsDir, `${name}.md`)
    if (!existsSync(file))
      return undefined
    const source = readFileSync(file, 'utf-8')
    const title = source.match(/^title:(.*)$/m)?.[1].trim().replace(/^(["'])(.*)\1$/, '$2')
    return title || fallback
  }

  return meta.categories
    .map(category => ({
      text: category.name,
      // Halaman kategorinya (`/hooks/state`), untuk kepala kelompok di sidebar.
      // Sengaja bukan `link`: pager Previous/Next mengikuti semua `link` di
      // sidebar, dan halaman kategori bukan halaman dokumentasi.
      categoryLink: category.pages ? undefined : `/hooks/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
      items: [
        ...(category.pages ?? []).flatMap((p) => {
          const title = titleOf(p.name, p.title)
          return title ? [{ text: title, link: `/hooks/${p.name}` }] : []
        }),
        ...category.items.flatMap((name) => {
          const title = titleOf(name, name)
          return title ? [{ text: title, link: `/hooks/${name}` }] : []
        }),
      ],
    }))
    .filter(k => k.items.length > 0)
}

/**
 * Sidebar dokumentasi Blocks, Variants, Charts, dan Templates — bentuk yang
 * sama dengan sidebar Hooks: Getting Started, lalu satu kelompok per kategori
 * berisi halaman tiap isinya. Kepala kelompok menautkan ke halaman kategori
 * galerinya (`categoryLink`, di luar urutan pager). Isinya ditulis
 * `scripts/generate-gallery-docs.mjs` ke `gallery-docs.json`.
 */
function galleryDocsSidebar(key: 'block' | 'variant' | 'chart' | 'template') {
  const jsonPath = path.join(srcRoot, 'registry/gallery-docs.json')
  if (!existsSync(jsonPath))
    return []
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'))[key] as {
    root: string
    categories: { slug: string, name: string, items: { text: string, link: string }[] }[]
  }
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: `${data.root}/docs` },
        { text: 'Installation', link: `${data.root}/docs/installation` },
        { text: 'Credits', link: '/credits' },
      ],
    },
    ...data.categories.map(c => ({ text: c.name, categoryLink: `${data.root}/${c.slug}`, items: c.items })),
  ]
}

/**
 * Sidebar untuk halaman Blocks, dikelompokkan menurut kategorinya.
 *
 * Pola yang sama dengan sidebar hooks dan sidebar komponen: dibaca dari data
 * yang sudah ada — di sini `src/registry/blocks.json` — bukan ditulis ulang
 * sebagai daftar kedua. Block baru cukup didaftarkan di sana.
 */
function blocksSidebar() {
  const docsDir = fileURLToPath(new URL('../blocks', import.meta.url))
  const blockList = JSON.parse(
    readFileSync(path.join(srcRoot, 'registry/blocks.json'), 'utf-8'),
  ) as { name: string, categories?: string[] }[]

  const byCategory = new Map<string, { text: string, link: string }[]>()

  for (const b of blockList) {
    if (!existsSync(path.join(docsDir, `${b.name}.md`)))
      continue

    // Kategori pertama yang menentukan tempatnya. Sebagian block menyebut dua —
    // `authentication` dan `login`, misalnya — dan menaruhnya di keduanya
    // membuat satu block muncul dua kali di sidebar yang sama.
    const category = b.categories?.[0] ?? 'other'
    if (!byCategory.has(category))
      byCategory.set(category, [])
    byCategory.get(category)!.push({ text: b.name, link: `/blocks/${b.name}` })
  }

  return [...byCategory]
    .sort(([a], [b]) => a.localeCompare(b, 'id'))
    .map(([category, items]) => ({
      text: category.charAt(0).toUpperCase() + category.slice(1),
      items: items.sort((a, b) => a.text.localeCompare(b.text, 'id')),
    }))
}

/** Berkas sumber di balik sebuah nama contoh, dicari di tempat yang sama dengan pratinjaunya. */
function exampleSourceFile(name: string) {
  const candidates = [
    path.join(srcRoot, 'demo', `${name}.vue`),
    path.join(srcRoot, 'charts', `${name}.vue`),
    path.join(srcRoot, 'blocks', name, 'page.vue'),
  ]
  return candidates.find(existsSync)
}

/**
 * Dulu menyisipkan kode sumber tiap contoh ke markdown. Sekarang tidak lagi.
 *
 * Penyisipan itu yang membuat `docs:build` kehabisan memori. Lantainya diukur
 * dengan menaikkan atap heap sampai buildnya berhenti gagal: dengan penyisipan
 * 8–10 GB, tanpa penyisipan ≤ 6 GB. Selisihnya sekitar empat gigabyte.
 *
 * Sebabnya bukan Shiki. Sebabnya hasil sorotan itu jadi bagian modul JavaScript
 * halamannya: satu demo yang disorot ± 50 KB HTML penuh `<span>`, dan halaman
 * yang memuat sebelas demo menghasilkan chunk 591 KB. Rollup menahan seluruhnya
 * di memori sampai build selesai — dan menahannya dua kali, karena VitePress
 * memancarkan varian `.lean` untuk tiap halaman dan isi statis yang berada di
 * dalam slot komponen tidak bisa dibuangnya dari varian itu.
 *
 * Sekarang sorotannya ditulis `scripts/generate-code.mjs` ke `docs/public/code/`
 * sebagai berkas statis biasa, dan komponennya mengambil dari sana. Yang
 * dilihat pembaca sama persis; yang hilang cuma sebelas megabyte yang tidak
 * pernah perlu ikut dibundel.
 */
/*
 * Judul dan deskripsi halaman tidak disisipkan ke markdown.
 *
 * Sebelumnya keduanya ditempelkan ke awal sumber tiap berkas, karena tema
 * bawaan VitePress tidak menggambar apa pun dari frontmatter. Sekarang
 * kerangkanya milik sendiri dan menggambarnya di layout — itu yang membuat
 * tombol sebelumnya/berikutnya bisa duduk sebaris dengan judulnya, persis
 * seperti di shadcn-vue. Sumbernya tetap satu: frontmatter yang sama yang
 * dibaca daftar sidebar.
 */

/**
 * Callout tanpa tajuk tidak diberi tajuk.
 *
 * Callout di upstream hanya bertajuk kalau penulisnya menuliskannya. VitePress
 * selalu menempelkan label bawaan, dan label itu tidak bisa dikosongkan lewat
 * konfigurasi: nilainya dibaca dengan `containerOptions?.tipLabel || "TIP"`,
 * jadi string kosong pun jatuh kembali ke "TIP". Hasilnya kata berbahasa
 * Inggris itu muncul di 30-an halaman yang seluruh isinya Bahasa Indonesia.
 *
 * Yang dibungkus adalah renderer-nya, bukan sumber markdown-nya: `::: tip`
 * tetap sintaks yang dikenal siapa pun yang pernah memakai VitePress. Aman
 * dipasang di sini karena `config` dipanggil paling akhir — semua plugin
 * bawaan sudah terdaftar saat baris ini jalan.
 */
function calloutWithoutTitle(md: any) {
  for (const kind of ['tip', 'info', 'warning', 'danger']) {
    const original = md.renderer.rules[`container_${kind}_open`]
    if (!original)
      continue

    md.renderer.rules[`container_${kind}_open`] = (tokens: any, idx: number, ...rest: any[]) => {
      const html = original(tokens, idx, ...rest)
      const title = tokens[idx].info.trim().slice(kind.length).trim()
      return title ? html : html.replace(/<p class="custom-block-title">.*?<\/p>/, '')
    }
  }
}

/**
 * Blok `bash` yang isinya cuma perintah npm digambar dengan tab pnpm, npm,
 * yarn, dan bun — seperti `CodeBlockCommand` di shadcn-vue.
 *
 * Yang dibungkus renderer-nya, bukan sumbernya: ratusan halaman tetap menulis
 * perintahnya sekali dalam bentuk npm, dan blok yang memuat hal lain —
 * komentar, variabel lingkungan, `laravel new` — dibiarkan apa adanya, karena
 * menerjemahkan separuh isinya lebih menyesatkan daripada tidak sama sekali.
 */
function packageCommandBlocks(md: any) {
  const original = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens: any, idx: number, options: any, env: any, self: any) => {
    const t = tokens[idx]
    const lang = t.info.trim().split(/[\s:{]/)[0]
    if (['bash', 'sh', 'shell'].includes(lang) && isPackageCommand(t.content))
      return `<PackageCommand command="${md.utils.escapeHtml(t.content.trim())}" />\n`
    return original(tokens, idx, options, env, self)
  }
}

function previewSource(md: any) {
  md.core.ruler.before('normalize', 'kliping-preview-source', (state: any) => {
    // Yang tersisa untuk dikerjakan di sini cuma satu: membuang `code="none"`
    // supaya atributnya tidak lolos ke DOM. Halaman composable memakainya untuk
    // menyatakan bahwa demonya tidak perlu ditemani kode sama sekali.
    state.src = state.src.replace(/<(ComponentPreview|ComponentSource)\s([^>]*)\/>/g,
      (match: string) => match.replace(/\s*code="none"/, ' code="none"'))
  })
}

/**
 * Salin sumber markdown tiap halaman ke `/raw/` di hasil build.
 *
 * Yang dilayani halaman dokumentasi bukan cuma pembaca manusia. Tombol "Salin
 * halaman" menyerahkan markdown mentahnya ke model bahasa, dan yang berguna di
 * sana justru sumbernya — bukan HTML yang sudah dibungkus kerangka situs.
 *
 * Disalin saat build, bukan dilayani route handler: berkasnya jadi aset statis
 * biasa, sama seperti gambar, dan tidak ada yang perlu dijalankan di server.
 */
function copyRawMarkdown(outDir: string) {
  const docsRoot = fileURLToPath(new URL('..', import.meta.url))

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.'))
        continue

      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      }
      else if (entry.name.endsWith('.md')) {
        const relativePath = path.relative(docsRoot, fullPath)
        const destination = path.join(outDir, 'raw', relativePath)
        mkdirSync(path.dirname(destination), { recursive: true })
        copyFileSync(fullPath, destination)
      }
    }
  }

  walk(docsRoot)
}

/**
 * Alamat situsnya, dibaca dari env.
 *
 * Config ini berjalan di Node saat build, jadi yang terbaca `process.env` —
 * bukan `import.meta.env` seperti di dalam komponen. Cloudflare Pages
 * menyediakannya lewat pengaturan project; cadangannya disebutkan supaya build
 * lokal tetap jalan tanpa `.env`.
 */
const SITE_URL = process.env.VITE_APP_URL ?? 'https://kliping.pro'

export default defineConfig({
  title: 'Kliping',
  description: 'Komponen Vue siap klip, siap pakai. Dokumentasi Bahasa Indonesia.',
  lang: 'id-ID',
  cleanUrls: true,

  /**
   * Peta situs, dibangun ikut situsnya.
   *
   * Ada alasan konkret di baliknya, bukan sekadar kelengkapan. Sejak Direktori,
   * Warna, dan Typeset dikelompokkan jadi menu turun di header, ketiganya tidak
   * lagi punya tautan di HTML hasil render server — isi dropdown baru digambar
   * setelah dibuka. Bagi pembaca itu tidak jadi soal; bagi perayap, halaman yang
   * tidak pernah ditaut sama saja dengan tidak ada.
   *
   * Peta situs menyelesaikannya untuk seluruh halaman sekaligus, sekarang dan
   * nanti — termasuk ratusan halaman hooks, block, dan variasi yang akan datang.
   */
  sitemap: { hostname: SITE_URL },

  buildEnd: ({ outDir }) => copyRawMarkdown(outDir),

  /**
   * Satu gambar bagikan untuk seluruh situs, bukan satu per halaman.
   *
   * Generator OG per halaman adalah salah satu dari empat hal yang dulu
   * membuat deploy Cloudflare gagal berkali-kali. Imbalannya kecil: kartu yang
   * muncul di aplikasi chat cuma perlu terlihat seperti Kliping.
   */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#009966' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kliping' }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/og.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/og.png` }],
  ],

  // Berkas berawalan titik pernah dipakai upstream untuk menyembunyikan halaman.
  // Yang masih relevan sudah dinamai ulang, sisanya dihapus.
  // `_api/`: potongan Requirements + API Reference yang disisipkan halaman
  // komponen lewat @include — bukan halaman sendiri.
  // `public/**`: berkas statis, disalin apa adanya — termasuk 842 berkas
  // markdown untuk agen AI (`public/llms/`). Tanpa ini VitePress
  // menganggapnya halaman dan mengompilasinya ke bundel klien & SSR (±25%
  // halaman tambahan, build nyaris kehabisan memori).
  srcExclude: ['**/.*.md', '**/_api/**', 'public/**'],

  markdown: {
    // Ekstraksi judul bersifat opt-in di VitePress: tanpa ini `page.headers`
    // selalu kosong. Tema bawaannya tidak memerlukannya — daftar isinya disusun
    // dari DOM setelah halaman jalan. Tema Kliping menggambarnya dari data
    // halaman, jadi daftar isi ikut ter-render saat build dan sudah ada di HTML
    // sebelum satu baris JavaScript pun dijalankan.
    headers: { level: [2, 3] },

    // Tema terang Primer (shiki-light-theme.mjs), bukan `github-light` bawaan
    // VitePress: warna kata kunci dan tag `github-light` hanya ± 4,3:1 di atas
    // latar blok kode — di bawah ambang WCAG AA 4,5:1. Tema gelapnya tetap.
    theme: { light: lightTheme, dark: 'github-dark' },

    // Label bawaan container, dalam Bahasa Indonesia.
    container: {
      infoLabel: 'Info',
      warningLabel: 'Warning',
      dangerLabel: 'Danger',
      detailsLabel: 'Details',
    },

    config: (md) => {
      calloutWithoutTitle(md)
      previewSource(md)
      packageCommandBlocks(md)
    },
  },

  // VitePress menjalankan Vite-nya sendiri dan tidak membaca vite.config.ts di
  // root, jadi alias dan Tailwind harus didaftarkan ulang di sini. Tanpa ini
  // pratinjau di dokumentasi tidak bisa mengimpor komponen dari src/.
  vite: {
    plugins: usePrecompiledCss ? [] : [tailwindcss()],
    resolve: {
      alias: [
        ...(usePrecompiledCss ? [{ find: /^@\/assets\/main\.css$/, replacement: precompiledCss }] : []),
        { find: '@', replacement: path.resolve(fileURLToPath(new URL('../..', import.meta.url)), 'src') },
      ],
    },
  },

  themeConfig: {
    // Nav utama tidak ditulis di sini: isinya mega menu dengan keterangan dan
    // ikon, yang tidak muat di bentuk `nav` VitePress. Sumbernya
    // `theme/chrome/main-menu.ts`, dibaca MainNav dan MobileNav.

    /**
     * Susunannya mengikuti sidebar dokumentasi shadcn-vue: satu kelompok
     * "Bagian" berisi tujuan utama, lalu kelompok-kelompok datar di bawahnya.
     * Tidak ada yang terlipat — di sana semua kelompok selalu terbuka, dan
     * yang menandai halaman aktif adalah latar pada itemnya, bukan panah.
     *
     * Blocks tidak lagi di sini: tempatnya halaman lepas, dijangkau dari nav.
     */
    /**
     * Tiga dokumentasi yang berdampingan, bukan satu daftar panjang.
     *
     * `/hooks` dan `/blocks` masing-masing punya sidebar sendiri; dokumentasi
     * komponen tidak berubah sedikit pun. Orang yang sedang membaca composable
     * tidak sedang mencari Accordion, dan sebaliknya — menumpuk keduanya di
     * satu daftar membuat dua-duanya lebih sulit ditelusuri.
     *
     * Awalan terpanjang yang cocok yang menang, ditangani `sidebarFor()` di
     * `theme/chrome/navigation.ts`.
     */
    sidebar: {
      '/hooks/': hooksSidebar(),
      '/blocks/docs': galleryDocsSidebar('block'),
      '/variants/docs': galleryDocsSidebar('variant'),
      '/charts/docs': galleryDocsSidebar('chart'),
      '/templates/docs': galleryDocsSidebar('template'),
      '/blocks/': blocksSidebar(),
      '/': [
      {
        text: 'Sections',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Concepts', link: '/concepts' },
          { text: 'Components', link: '/components' },
          { text: 'Installation', link: '/installation' },
          { text: 'Theming', link: '/theming' },
          { text: 'Dark Mode', link: '/dark-mode' },
          { text: 'CLI', link: '/cli' },
          { text: 'RTL', link: '/rtl' },
          { text: 'Skills', link: '/skills' },
          { text: 'MCP Server', link: '/mcp' },
          { text: 'Forms', link: '/forms' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Roadmap', link: '/roadmap' },
        ],
      },
      // Upstream tidak mendaftarkan halaman per-framework di sidebar: yang
      // menuntun ke sana adalah kartu di halaman Instalasi dan Mode Gelap.
      // Kartunya masih pecah (Fase UI-1a), jadi sementara tetap di sini supaya
      // sembilan halaman ini tidak jadi halaman yatim.
      {
        text: 'Installation',
        items: [
          { text: 'Vite', link: '/installation/vite' },
          { text: 'Nuxt', link: '/installation/nuxt' },
          { text: 'Astro', link: '/installation/astro' },
          { text: 'Laravel', link: '/installation/laravel' },
          { text: 'Manual', link: '/installation/manual' },
        ],
      },
      {
        text: 'Dark Mode',
        items: [
          { text: 'Vite', link: '/dark-mode/vite' },
          { text: 'Nuxt', link: '/dark-mode/nuxt' },
          { text: 'Vitepress', link: '/dark-mode/vitepress' },
          { text: 'Astro', link: '/dark-mode/astro' },
        ],
      },
      {
        text: 'Forms',
        items: [
          { text: 'VeeValidate', link: '/forms/vee-validate' },
          { text: 'TanStack Form', link: '/forms/tanstack-form' },
          { text: 'Formisch', link: '/forms/formisch' },
        ],
      },
      {
        text: 'Registry',
        items: [
          { text: 'Overview', link: '/registry/' },
          { text: 'Getting Started', link: '/registry/getting-started' },
          { text: 'Examples', link: '/registry/examples' },
          { text: 'registry.json', link: '/registry/registry-json' },
          { text: 'registry-item.json', link: '/registry/registry-item-json' },
          { text: 'FAQ', link: '/registry/faq' },
        ],
      },
      {
        text: 'Utilities',
        items: [
          { text: 'scroll-fade', link: '/utilities/scroll-fade' },
          { text: 'shimmer', link: '/utilities/shimmer' },
        ],
      },
      {
        text: 'More',
        items: [
          { text: 'components.json', link: '/components-json' },
          { text: 'JavaScript', link: '/javascript' },
          { text: 'Figma', link: '/figma' },
          { text: 'Registry Directory', link: '/directory/' },
          // Warna dan Typeset ikut di sini sejak keduanya pindah ke menu turun
          // di header. Isi menu turun baru digambar setelah dibuka, jadi tanpa
          // baris ini keduanya tidak punya satu pun tautan di HTML statis —
          // /colors sempat benar-benar yatim, nol tautan di seluruh situs.
          { text: 'Colors', link: '/colors' },
          { text: 'Typeset', link: '/typeset' },
          { text: 'Legacy Docs', link: '/legacy' },
          { text: 'About', link: '/about' },
          { text: 'Credits', link: '/credits' },
          { text: 'Contributing', link: '/contribution' },
        ],
      },
      {
        text: 'Components',
        items: componentsSidebar(),
      },
      ],
    },

    // Pencarian dijalankan di sisi pembaca dari indeks yang ikut dibangun, jadi
    // tidak ada layanan luar yang perlu dihubungi.
    search: {
      provider: 'local',
      options: {
        /**
         * Judul halaman ikut diindeks sebagai h1.
         *
         * Pencarian lokal memecah halaman per heading, dan tiap hasilnya hanya
         * membawa rantai heading di atasnya. Halaman Kliping tidak menulis
         * `# Judul` di markdown — judulnya digambar kerangka dari frontmatter —
         * jadi rantainya putus di h2, dan hasilnya cuma "Usage" atau
         * "Tambahkan komponen" tanpa tahu milik halaman mana. Dengan h1 dari
         * frontmatter, tiap hasil dibuka dengan nama halamannya.
         *
         * Kanvas `/view/*` dan pratinjau `/hooks|templates/<nama>/preview` dilewati:
         * isinya sudah terwakili halaman detail dan dokumentasinya.
         */
        _render(src, env, md) {
          if (env.relativePath.startsWith('view/') || /^(hooks|templates)\/[^/]+\/preview\.md$/.test(env.relativePath))
            return ''
          const html = md.render(src, env)
          const title = env.frontmatter?.title
          if (!title || /<h1[\s>]/.test(html))
            return html
          // Id-nya sendiri: slug judul bisa bentrok dengan heading lain di
          // halaman yang sama (`## Attachment` di halaman Attachment).
          return md.render(`# ${title} {#page-title}`, {}) + html
        },
        translations: {
          button: { buttonText: 'Search', buttonAriaLabel: 'Search documentation' },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close',
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kliping-pro/kliping-ui' },
    ],

    // Footer situs. `links` sengaja daftar terbuka: saat registry premium
    // terbit (KLIPING-ROADMAP-PREMIUM.md, Fase 3–4), tambahkan Pro License,
    // Terms, Privacy, dan Refunds di sini — pesannya tetap benar karena yang MIT
    // memang hanya registry gratis.
    footer: {
      message: 'Free components are open source under the MIT License.',
      copyright: '© 2026 Kliping',
      links: [
        { text: 'License', link: 'https://github.com/kliping-pro/kliping-ui/blob/main/LICENSE' },
        { text: 'Credits', link: '/credits' },
        { text: 'Roadmap', link: '/roadmap' },
      ],
    },

    outline: { label: 'On This Page', level: [2, 3] },
    docFooter: { prev: 'Previous', next: 'Next' },
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change language',
  },
})
