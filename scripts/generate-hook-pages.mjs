// Menyusun halaman pratinjau Hooks — alur yang sama dengan Blocks dan Charts.
//
//   /hooks/<nama>/preview     halaman detail satu composable: demo memenuhi
//                             layar, tab Preview, Code, Install, Docs, dan
//                             Previous/Next di antara composable sekategori
//   /view/hooks/<nama>        kanvas polos berisi demonya, dimuat iframe
//                             halaman di atas
//
// Halaman dokumentasinya (`/hooks/<nama>`) tidak disentuh — ia tetap tempat
// penjelasan dan API, dan tab Docs di halaman pratinjau membawa ke sana.
//
// Yang masuk galeri cuma composable yang punya demo. Halaman padanan bawaan
// Vue dan paket luar (`use-swr`, `use-query`, …) tidak punya sesuatu untuk
// dipratinjau, jadi tidak ikut dihitung di "1 of N".
//
// Demonya dirender di peramban saja (ClientOnly). Yang diperagakan sebagian
// besar adalah API peramban — waktu, media query, judul tab, papan klip — dan
// nilai yang dihitung server untuknya pasti berbeda dari milik peramban.
//
// Galerinya ditulis ke `src/registry/hook-gallery.json`: urutan dan
// kategorinya dari `src/composables/meta.json`, sama dengan sidebar Hooks.
//
// Jalankan: npm run generate:hook-pages (otomatis lewat `predocs:build`).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DOCS_DIR = path.join(ROOT, 'docs')

const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/composables/meta.json'), 'utf-8'))
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8'))
// Keterangan di registry.json berbahasa Inggris (yang terkirim lewat CLI);
// halaman situs memakai keterangan Indonesia dari registry-hooks.json.
const siteDescriptions = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/registry-hooks.json'), 'utf-8')).items.map(i => [i.name, i.description]))
const byName = new Map(registry.items.filter(i => i.type === 'registry:hook').map(i => [i.name, { ...i, description: siteDescriptions.get(i.name) ?? i.description }]))

/** Demo sebuah composable: yang dipakai halaman dokumentasinya sendiri. */
function demoName(name) {
  const file = path.join(DOCS_DIR, 'hooks', `${name}.md`)
  if (!fs.existsSync(file))
    return undefined
  const demo = fs.readFileSync(file, 'utf-8').match(/<ComponentPreview name="([A-Za-z0-9]+)"/)?.[1]
  return demo && fs.existsSync(path.join(ROOT, 'src/demo', `${demo}.vue`)) ? demo : undefined
}

const write = (relPath, content) => {
  const filePath = path.join(ROOT, relPath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8') !== content)
    fs.writeFileSync(filePath, content)
}

const frontmatter = (data) => {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`)
  return `---\n${lines.join('\n')}\n---\n\n`
}

/** Judul dan keterangan dari frontmatter halaman dokumentasinya — ada juga untuk padanan tanpa entri registry. */
function readFrontmatter(name) {
  const content = fs.readFileSync(path.join(DOCS_DIR, 'hooks', `${name}.md`), 'utf-8')
  const pick = key => content.match(new RegExp(`^${key}:(.*)$`, 'm'))?.[1].trim().replace(/^(["'])(.*)\1$/, '$2')
  return { title: pick('title') ?? name, description: pick('description') ?? '' }
}

const gallery = []
const demo = {}
const info = {}

for (const k of meta.categories) {
  const items = k.items.filter((n) => {
    const d = demoName(n)
    if (d)
      demo[n] = d
    return !!d
  })
  if (items.length)
    gallery.push({ slug: k.name.toLowerCase().replace(/\s+/g, '-'), name: k.name, items })
}

for (const [name, d] of Object.entries(demo)) {
  const fm = readFrontmatter(name)
  const title = byName.get(name)?.title ?? fm.title
  // `installable`: ada entri registry-nya. Padanan bawaan Vue punya demo, tapi tidak
  // ada berkas yang dipasang.
  info[name] = { title, description: byName.get(name)?.description ?? fm.description, installable: byName.has(name) }
  write(`docs/view/hooks/${name}.md`, `${frontmatter({ title, layout: false })}<script setup>\nimport Demo from '@/demo/${d}.vue'\n</script>\n\n<BlockCanvas layout="hook"><ClientOnly><Demo /></ClientOnly></BlockCanvas>\n`)
  write(`docs/hooks/${name}/preview.md`, `${frontmatter({ title: `${title} preview`, description: info[name].description, layout: false })}<BlockDetail kind="hook" name="${name}" />\n`)
}

write('src/registry/hook-gallery.json', `${JSON.stringify({ galleries: gallery, demo, info }, null, 2)}\n`)

console.log(`✔ ${Object.keys(demo).length} composables with a demo: /view/hooks canvases and /hooks/<name>/preview pages, ${gallery.length} categories`)
