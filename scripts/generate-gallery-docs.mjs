// Menyusun dokumentasi Blocks, Variants, Charts, dan Templates — bentuk yang
// sama dengan dokumentasi Hooks.
//
// Tiap modul punya bagian dokumentasinya sendiri, dengan sidebar-nya sendiri:
//
//   /<modul>/docs                   Introduction — ditulis tangan
//   /<modul>/docs/installation      Installation — ditulis tangan
//   /<modul>/docs/<nama>            satu halaman per isi — DISUSUN skrip ini
//
// Halaman per isi dibangun dari data yang sudah ada, tidak ditulis dua kali:
// pratinjau hidupnya (ScaledPreview: kanvasnya selebar desktop, diskalakan
// pas ke kolom), perintah pemasangannya, komponen registry yang dipakainya, dan
// tautan ke pratinjau penuhnya. Keterangannya dari katalog masing-masing.
//
// Sidebar-nya disusun config.ts dari `src/registry/gallery-docs.json`,
// yang juga ditulis di sini: urutan kategori dan isinya sama persis dengan
// halaman galerinya, jadi Previous/Next di dokumentasi berjalan seperti di
// halaman detail.
//
// Jalankan: npm run generate:gallery-docs (otomatis lewat `predocs:build`, setelah
// halaman detail tiap galeri disusun — `uses` dibaca dari sana).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { klipingAdd } from '../docs/.vitepress/kliping-command.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DOCS_DIR = path.join(ROOT, 'docs')
const readJson = j => JSON.parse(fs.readFileSync(path.join(ROOT, j), 'utf-8'))

const write = (relPath, content) => {
  const filePath = path.join(DOCS_DIR, relPath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8') !== content)
    fs.writeFileSync(filePath, content)
}

const frontmatter = (data) => {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`)
  return `---\n${lines.join('\n')}\n---\n\n`
}

/** `uses` dari halaman detail yang sudah disusun skrip galerinya. */
function usedFrom(relPath) {
  const filePath = path.join(DOCS_DIR, relPath)
  if (!fs.existsSync(filePath))
    return []
  const m = fs.readFileSync(filePath, 'utf-8').match(/:uses='(\[[^']*\])'/)
  return m ? JSON.parse(m[1]) : []
}

/** Komponen bertautan ke dokumentasinya — kalau ada; sebagian (animated-grid-pattern) belum punya halaman. */
const componentLink = p => fs.existsSync(path.join(DOCS_DIR, 'components', `${p}.md`)) ? `[${componentTitle(p)}](/components/${p})` : `\`${p}\``

const componentTitle = k => k.split('-').map(b => (b === 'otp' ? 'OTP' : b[0].toUpperCase() + b.slice(1))).join(' ')
const kebab = n => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

// ---------------------------------------------------------------------------
// Data tiap modul, dalam satu bentuk: kategori berisi isi, tiap isi tahu
// label, keterangan, halaman detail, dan cara memasangnya.

const blocksJson = readJson('src/registry/blocks.json')
const blockDescriptions = new Map(blocksJson.map(b => [b.name, b.description]))
const variants = readJson('src/registry/variants.json')
const templates = readJson('src/registry/templates.json')

const MODULES = [
  {
    kind: 'block',
    base: '/blocks',
    title: 'Blocks',
    unit: 'block',
    // Featured cuma etalase: isinya biasanya juga ada di kategorinya sendiri,
    // dan di dokumentasi tiap block cukup muncul sekali. Yang tinggal di
    // Featured hanya block yang tidak punya kategori lain (dashboard-01).
    categories: (() => {
      const g = readJson('src/registry/block-gallery.json')
      const elsewhere = new Set(g.filter(x => x.slug !== 'featured').flatMap(x => x.items))
      return g.map(x => ({ slug: x.slug, name: x.name, items: x.slug === 'featured' ? x.items.filter(n => !elsewhere.has(n)) : x.items })).filter(x => x.items.length)
    })(),
    label: n => n,
    description: n => blockDescriptions.get(n) ?? '',
    detail: n => `/blocks/${n}`,
    used: () => [],
    install: n => klipingAdd(n),
    viewer: n => `<ScaledPreview kind="block" name="${n}" />`,
  },
  {
    kind: 'variant',
    base: '/variants',
    title: 'Variants',
    unit: 'variant',
    categories: [...new Set(variants.map(v => v.component))].sort().map(k => ({ slug: k, name: componentTitle(k), items: variants.filter(v => v.component === k).map(v => v.name) })),
    label: n => n,
    description: n => variants.find(v => v.name === n)?.description ?? '',
    detail: n => `/variants/${n}`,
    used: n => usedFrom(`variants/${n}.md`),
    install: n => klipingAdd(n),
    viewer: n => `<ScaledPreview kind="variant" name="${n}" />`,
  },
  {
    kind: 'chart',
    base: '/charts',
    title: 'Charts',
    unit: 'chart',
    categories: readJson('src/registry/chart-gallery.json').map(g => ({ slug: g.slug, name: g.name, items: g.items })),
    label: kebab,
    description: n => blockDescriptions.get(n) ?? '',
    detail: n => `/charts/${kebab(n)}`,
    used: n => usedFrom(`charts/${kebab(n)}.md`),
    install: n => klipingAdd(kebab(n)),
    viewer: n => `<ScaledPreview kind="chart" name="${n}" />`,
  },
  {
    kind: 'template',
    base: '/templates',
    title: 'Templates',
    unit: 'template',
    categories: [...new Set(templates.map(t => t.category))].map(k => ({
      slug: k,
      name: k === 'landing-page' ? 'Landing Page' : k === 'portfolio' ? 'Portfolio' : k,
      items: templates.filter(t => t.category === k).map(t => t.slug),
    })),
    label: n => templates.find(t => t.slug === n)?.name ?? n,
    description: n => templates.find(t => t.slug === n)?.description ?? '',
    detail: n => `/templates/${n}/preview`,
    used: n => usedFrom(`templates/${n}/preview.md`),
    install: (n, used) => klipingAdd(used),
    viewer: n => `<ScaledPreview kind="template" name="${n}" />`,
  },
]

// ---------------------------------------------------------------------------

// Bagian Credits halaman template: repo asal dan status lisensinya, apa adanya.
function templateCredits(slug) {
  const t = templates.find(x => x.slug === slug)
  if (!t?.repo)
    return ''
  const link = `[\`${t.repo}\`](https://github.com/${t.repo})`
  const status = t.license.type === 'not stated'
    ? 'repo asalnya belum menyatakan lisensi; untuk proyek komersial, tanyakan ke penulisnya.'
    : `${t.license.type}, ${t.license.copyright}.`
  return `\n## Credits\n\nBerasal dari ${link} — ${status} Rantai lengkapnya di [Credits](/credits#template).\n`
}

const sidebar = {}

for (const m of MODULES) {
  const pages = []
  for (const r of m.categories) {
    for (const n of r.items) {
      const used = m.used(n)
      const label = m.label(n)
      const slug = m.kind === 'chart' ? kebab(n) : n
      // Block, variant, chart: Usage + Requirements dari scripts/generate-usage-docs.mjs
      // (komponen yang dipakai ada di Requirements). Template tetap daftar komponennya.
      const usageDocs = ['block', 'variant', 'chart'].includes(m.kind)
      const componentsSection = used.length && !usageDocs
        ? `\n## Components\n\n${m.unit[0].toUpperCase() + m.unit.slice(1)} ini disusun dari ${used.map(componentLink).join(', ')}. Semuanya ikut terpasang oleh perintah di atas.\n`
        : ''
      write(`${m.base.slice(1)}/docs/${m.kind === 'chart' ? kebab(n) : n}.md`, `${frontmatter({ title: label, description: m.description(n) })}${m.viewer(n, used)}

## Installation

<PackageCommand command="${m.install(n, used)}" />

Belum ada project? Jalankan \`npx kliping@latest init\` dulu — lihat [Installation](${m.base}/docs/installation).
${usageDocs ? `\n<!--@include: ./_api/${slug}.md-->\n` : ''}${componentsSection}
## Full preview

[Buka ${label} selebar layar](${m.detail(n)}) — tab Preview dengan ukuran Desktop, Tablet, dan Mobile, seluruh berkasnya di tab Code, dan Previous/Next ke ${m.unit} lain di ${m.title}.
${m.kind === 'template' ? templateCredits(n) : ''}`)
      pages.push(n)
    }
  }
  sidebar[m.kind] = {
    root: m.base,
    title: m.title,
    categories: m.categories.map(r => ({ slug: r.slug, name: r.name, items: r.items.map(n => ({ text: m.label(n), link: `${m.base}/docs/${m.kind === 'chart' ? kebab(n) : n}` })) })),
  }
  console.log(`✔ ${m.title}: ${pages.length} docs pages in ${m.base}/docs`)
}

fs.writeFileSync(path.join(ROOT, 'src/registry/gallery-docs.json'), `${JSON.stringify(sidebar, null, 2)}\n`)
