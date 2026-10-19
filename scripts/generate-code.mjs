// Menyorot sumber tiap contoh dan block, lalu menuliskannya sebagai berkas
// statis di `docs/public/code/`.
//
// KENAPA TIDAK DISISIPKAN KE HALAMANNYA SAJA
//
// Karena itu yang sebelumnya dilakukan, dan itu yang membuat `docs:build`
// kehabisan memori. Diukur dengan menaikkan atap heap sampai buildnya berhenti
// gagal:
//
//   sumber disisipkan     lantainya 8–10 GB
//   sumber tidak disisipkan  lantainya ≤ 6 GB
//
// Selisihnya sekitar empat gigabyte, dan sebabnya bukan Shiki-nya. Sebabnya
// hasil sorotan itu ikut jadi bagian modul JavaScript tiap halaman: satu demo
// yang disorot jadi ± 50 KB HTML penuh `<span>`, dan halaman yang memuat sebelas
// demo menghasilkan chunk 591 KB. Rollup menahan seluruhnya di memori sampai
// build selesai, dan menahannya dua kali — VitePress memancarkan varian `.lean`
// untuk tiap halaman, dan isi statis yang berada di dalam slot komponen tidak
// bisa dibuangnya dari varian itu.
//
// Ditulis ke berkas terpisah, hasil sorotannya tidak pernah masuk graf modul.
// Halamannya tinggal mengambilnya saat dibutuhkan — dan untuk block, "saat
// dibutuhkan" berarti ketika pembaca benar-benar membuka tab Kode.
//
// Dijalankan sebagai proses tersendiri, bukan di dalam config VitePress: memori
// yang dipakainya dilepas begitu prosesnya selesai, jauh sebelum build dimulai.
//
// Jalankan: npm run generate:code  (otomatis lewat `predocs:build`)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tsLang from '@shikijs/langs/typescript'
import vueLang from '@shikijs/langs/vue'
import darkTheme from '@shikijs/themes/github-dark-default'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import lightTheme from '../docs/.vitepress/shiki-light-theme.mjs'
import { formatCode } from './format-code.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const OUTPUT_DIR = path.join(ROOT, 'docs/public/code')

/**
 * Item registry yang sudah disusun scripts/generate-registry.mjs (jalan lebih dulu di
 * `predocs:build`). Tab Code menampilkan isi ini, bukan sumber mentah repo —
 * yang dilihat pembaca di situs sama persis dengan yang dipasang CLI-nya:
 * tanpa komentar, nama berkas kebab-case, format seragam, dan jalur serta
 * impornya bentuk yang mendarat di project mereka (alias bawaan shadcn-vue).
 */
const REGISTRY_DIR = path.join(ROOT, 'docs/public/r')
function registryItem(name) {
  const p = path.join(REGISTRY_DIR, `${name}.json`)
  if (!fs.existsSync(p))
    throw new Error(`docs/public/r/${name}.json does not exist yet — run \`npm run generate:registry\` first.`)
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}
const ALIAS = [
  ['registry/kliping/ui/', 'components/ui/'],
  ['registry/kliping/components/', 'components/'],
  ['registry/kliping/composables/', 'composables/'],
  ['registry/kliping/lib/', 'lib/'],
]
const toProjectPaths = (text) => {
  for (const [from, to] of ALIAS)
    text = text.replaceAll(`@/${from}`, `@/${to}`).replaceAll(from, to)
  return text
}
/** Berkas sebuah item registry dalam bentuk di project pemakai: `[{ filePath, code }]`. */
const itemFiles = name => registryItem(name).files.map(f => ({ filePath: toProjectPaths(f.path), code: toProjectPaths(f.content).trimEnd() }))

const shiki = await createHighlighterCore({
  langs: [vueLang, tsLang],
  themes: [lightTheme, darkTheme],
  engine: createJavaScriptRegexEngine(),
})

/** Sumber tiap contoh: demo, grafik, dan pintu masuk tiap block. */
function collectSources() {
  const sources = new Map()

  for (const folder of ['demo', 'charts']) {
    const dir = path.join(ROOT, 'src', folder)
    if (!fs.existsSync(dir))
      continue
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.vue'))
        sources.set(path.basename(file, '.vue'), path.join(dir, file))
    }
  }

  const blocksDir = path.join(ROOT, 'src/blocks')
  for (const name of fs.readdirSync(blocksDir)) {
    const page = path.join(blocksDir, name, 'page.vue')
    if (fs.existsSync(page))
      sources.set(name, page)
  }

  // Varian komponen. Namanya diberi awalan `variants-` supaya `button-01` milik
  // varian tidak menimpa berkas block bernama sama — dan keduanya memang ada.
  const variantsDir = path.join(ROOT, 'src/variants')
  if (fs.existsSync(variantsDir)) {
    for (const component of fs.readdirSync(variantsDir)) {
      const dir = path.join(variantsDir, component)
      if (!fs.statSync(dir).isDirectory())
        continue
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith('.vue'))
          sources.set(`variants-${path.basename(file, '.vue')}`, path.join(dir, file))
      }
    }
  }

  return sources
}

fs.rmSync(OUTPUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

let count = 0
let bytes = 0

/** Sorot satu sumber jadi markup blok kode VitePress. */
function highlight(code, lang) {
  // Dua tema dipasang sekaligus lewat variabel CSS, bukan satu tema yang diganti
  // saat modenya berubah — sama seperti yang dilakukan VitePress untuk blok kode
  // biasa, jadi berpindah terang-gelap tidak perlu mengambil apa pun lagi.
  const pre = shiki.codeToHtml(code, {
    lang,
    themes: { light: 'kliping-light', dark: 'github-dark-default' },
    defaultColor: false,
  })
    // Gaya latar Shiki dilepas; latarnya milik bingkai di bawah, sama seperti
    // blok kode markdown.
    .replace(/^<pre class="([^"]*)" style="[^"]*"/, '<pre class="$1 vp-code"')

  // Dibungkus markup yang sama persis dengan blok kode markdown VitePress.
  // Tanpa bungkus ini `<pre>`-nya telanjang: tidak satu pun gaya blok kode —
  // warna sorotan, latar, nomor baris, tombol salin — mengenainya, karena
  // semuanya menyasar `div[class*="language-"]`, dan kodenya tampil sebagai
  // teks polos yang bocor dari kotaknya.
  const lineCount = code.split('\n').length
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span class="line-number">${i + 1}</span><br>`).join('')
  const html = `<div class="language-${lang === 'typescript' ? 'ts' : 'vue'} vp-adaptive-theme line-numbers-mode">`
    + `<button title="Copy code" class="copy"></button>`
    + `<span class="lang">${lang === 'typescript' ? 'ts' : 'vue'}</span>`
    + pre
    + `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbers}</div>`
    + `</div>`
  count += 1
  bytes += Buffer.byteLength(html)
  return html
}

const langOf = file => (file.endsWith('.ts') ? 'typescript' : 'vue')

/**
 * Jalur sebuah berkas block di project pemakai, bukan di repo ini.
 *
 * Di sini block tinggal di `src/blocks/<nama>/`, dan impornya menunjuk ke sana.
 * Yang dipasang CLI ke project orang lain lain bentuknya — sama dengan
 * shadcn-vue: halamannya di `pages/<nama>/index.vue`, bagiannya di
 * `components/`. Tab Kode menampilkan bentuk yang akan diterima pembaca, jadi
 * jalur dan impornya ditulis ulang ke sana. `dashboard-01` jadi
 * `pages/dashboard/index.vue`.
 */
const kebab = n => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/** Nama item registry di balik satu sumber, atau undefined untuk demo dokumentasi. */
function itemName(name, file) {
  if (name.startsWith('variants-'))
    return name.slice('variants-'.length)
  if (file.startsWith(path.join(ROOT, 'src/blocks') + path.sep))
    return name
  if (file.startsWith(path.join(ROOT, 'src/charts') + path.sep))
    return kebab(name)
  return undefined
}

for (const [name, file] of collectSources()) {
  const item = itemName(name, file)
  // Item registry: berkas utamanya persis seperti yang dipasang. Demo
  // dokumentasi juga disalin pembaca, jadi dirapikan dengan aturan yang sama.
  const code = item
    ? itemFiles(item)[0].code
    : (await formatCode(fs.readFileSync(file, 'utf-8'), file)).trimEnd()
  fs.writeFileSync(path.join(OUTPUT_DIR, `${name}.html`), highlight(code, langOf(file)))
}

/**
 * Seluruh berkas tiap block, satu sorotan per berkas, ditambah manifesnya.
 *
 *   code/blocks/<nama>.json          daftar berkas: jalur tujuan dan nomornya
 *   code/blocks/<nama>/<n>.html      sorotan berkas ke-n
 *
 * Diambil saat tab Kode dibuka, dan tiap berkas baru diambil saat dipilih —
 * block terbesar punya belasan berkas, dan pembaca jarang membuka semuanya.
 */
const blocksDir = path.join(ROOT, 'src/blocks')
for (const name of fs.readdirSync(blocksDir)) {
  if (!fs.existsSync(path.join(blocksDir, name, 'page.vue')))
    continue
  const outDir = path.join(OUTPUT_DIR, 'blocks', name)
  fs.mkdirSync(outDir, { recursive: true })
  const manifest = itemFiles(name).map(({ filePath, code }, n) => {
    fs.writeFileSync(path.join(outDir, `${n}.html`), highlight(code, langOf(filePath)))
    return { path: filePath, n }
  })
  fs.writeFileSync(path.join(OUTPUT_DIR, 'blocks', `${name}.json`), JSON.stringify(manifest))
}

/**
 * Manifes varian dan grafik, dibaca tab Code di halaman detailnya — bentuk yang
 * sama dengan manifes block, supaya BlockCode tidak perlu membedakan ketiganya.
 *
 *   code/variants/<nama>.json   varian
 *   code/charts/<Nama>.json     grafik
 *
 * Sebagian besar cuma satu berkas, dan sorotannya sudah ditulis di atas untuk
 * halaman live-nya — manifesnya menunjuk ke sana lewat `file`, jadi tidak ada
 * yang disorot dua kali. Varian yang memakai pembantu dari folder
 * `components/`-nya sendiri (`BunLogo.vue`, `pembayaran.ts`) ditulis lengkap
 * seperti block: tiap berkas disorot di `code/variants/<nama>/<n>.html`, dan
 * impornya ditulis ulang ke jalur di project pemakai.
 *
 * Jalurnya jalur di project pemakai: komponen ber-PascalCase di `components/`.
 */
const writeManifest = (folder, name, manifest) => {
  fs.mkdirSync(path.join(OUTPUT_DIR, folder), { recursive: true })
  fs.writeFileSync(path.join(OUTPUT_DIR, folder, `${name}.json`), JSON.stringify(manifest))
}

for (const [name, file] of collectSources()) {
  const item = itemName(name, file)
  if (!item || file.startsWith(path.join(ROOT, 'src/blocks') + path.sep))
    continue
  const folder = name.startsWith('variants-') ? 'variants' : 'charts'
  const key = folder === 'variants' ? item : name
  const allFiles = itemFiles(item)
  if (allFiles.length === 1) {
    // Berkas utamanya sudah disorot di atas untuk halaman live-nya.
    writeManifest(folder, key, [{ path: allFiles[0].filePath, n: 0, file: `${name}.html` }])
    continue
  }
  const outDir = path.join(OUTPUT_DIR, folder, key)
  fs.mkdirSync(outDir, { recursive: true })
  writeManifest(folder, key, allFiles.map(({ filePath, code }, n) => {
    fs.writeFileSync(path.join(outDir, `${n}.html`), highlight(code, langOf(filePath)))
    return { path: filePath, n }
  }))
}

/**
 * Seluruh berkas tiap template, bentuk yang sama dengan block: halamannya di
 * depan, sisanya urut jalur, impor `@/templates/<slug>/…` ditulis ulang ke
 * jalur di project pemakai.
 *
 *   code/templates/<slug>.json, code/templates/<slug>/<n>.html
 */
const templatesDir = path.join(ROOT, 'src/templates')
for (const slug of fs.existsSync(templatesDir) ? fs.readdirSync(templatesDir) : []) {
  const templateRoot = path.join(templatesDir, slug)
  if (!fs.existsSync(path.join(templateRoot, 'page.vue')))
    continue
  const allFiles = []
  const walk = (dir) => {
    for (const i of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const filePath = path.join(dir, i.name)
      if (i.isDirectory())
        walk(filePath)
      else if (/\.(vue|ts)$/.test(i.name))
        allFiles.push(filePath)
    }
  }
  walk(templateRoot)
  const relPath = j => path.relative(templateRoot, j).split(path.sep).join('/')
  const targetPath = j => (relPath(j) === 'page.vue' ? `pages/${slug}.vue` : relPath(j))
  allFiles.sort((a, b) => Number(relPath(b) === 'page.vue') - Number(relPath(a) === 'page.vue') || targetPath(a).localeCompare(targetPath(b)))
  const outDir = path.join(OUTPUT_DIR, 'templates', slug)
  fs.mkdirSync(outDir, { recursive: true })
  const manifest = allFiles.map((j, n) => {
    const code = fs.readFileSync(j, 'utf-8').trimEnd().replaceAll(`@/templates/${slug}/`, '@/')
    fs.writeFileSync(path.join(outDir, `${n}.html`), highlight(code, langOf(j)))
    count += 1
    return { path: targetPath(j), n }
  })
  writeManifest('templates', slug, manifest)
}

/**
 * Manifes Hooks, dibaca tab Code di `/hooks/<nama>/preview`: berkas
 * composable-nya sendiri — jalurnya jalur pemasangan CLI, dari `registry.json`
 * — lalu demonya. Demo sudah disorot di atas, jadi manifesnya menunjuk ke sana.
 */
const hookGalleryFile = path.join(ROOT, 'src/registry/hook-gallery.json')
if (fs.existsSync(hookGalleryFile)) {
  const { demo } = JSON.parse(fs.readFileSync(hookGalleryFile, 'utf-8'))
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8'))
  const byName = new Map(registry.items.map(i => [i.name, i]))
  for (const [name, d] of Object.entries(demo)) {
    const outDir = path.join(OUTPUT_DIR, 'hooks', name)
    fs.mkdirSync(outDir, { recursive: true })
    const manifest = (byName.has(name) ? itemFiles(name) : []).map(({ filePath, code }, n) => {
      fs.writeFileSync(path.join(outDir, `${n}.html`), highlight(code, langOf(filePath)))
      return { path: filePath, n }
    })
    manifest.push({ path: `components/${kebab(d)}.vue`, n: manifest.length, file: `${d}.html` })
    writeManifest('hooks', name, manifest)
  }
}

console.log(`✔ ${count} sources highlighted to docs/public/code/ (${(bytes / 1048576).toFixed(1)} MB)`)
console.log('  None of them enter the module graph — pages fetch them on demand.')
