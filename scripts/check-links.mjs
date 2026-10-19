// Memeriksa setiap tautan internal di situs yang sudah dibangun.
//
// Dokumentasi ini hasil konversi dari Nuxt Content, yang menaruh dokumentasinya
// di bawah `/docs/`. Kliping tidak. Artinya setiap tautan silang antar halaman
// sempat salah alamat, dan tautan mati tidak pernah membuat build gagal — ia
// hanya diam sampai ada yang mengkliknya. Skrip ini yang membuatnya bersuara.
//
// Yang diperiksa: jalurnya ada, dan jangkarnya (#bagian) benar-benar ada di
// halaman tujuan. Yang kedua itu yang biasanya luput — memindahkan sebuah
// heading tidak merusak tautannya, cuma membuatnya mendarat di puncak halaman.
//
// Batasnya jujur disebut di sini: yang dibaca HTML hasil render server, jadi
// tautan yang baru muncul setelah sesuatu diklik — isi dropdown, popover,
// menu navigasi yang terlipat — tidak ikut terpindai. Demo navigation-menu
// menyembunyikan tiga tautan di sana, dan ketiganya sempat mati tanpa
// terdeteksi skrip ini.
//
// Jalankan: npm run check:links

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST_DIR = path.join(ROOT, 'docs/.vitepress/dist')

function listFiles(dir, base = dir) {
  const result = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // Melewati yang berawalan titik: di dalam docs/ itu berarti .vitepress,
    // yang memuat hasil build dan cache-nya sendiri — ribuan berkas yang cuma
    // akan disaring lagi setelahnya.
    if (entry.name.startsWith('.'))
      continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory())
      result.push(...listFiles(fullPath, base))
    else result.push(path.relative(base, fullPath).split(path.sep).join('/'))
  }
  return result
}

/** Rute yang dilayani sebuah berkas HTML, mengikuti `cleanUrls: true`. */
function routeOf(file) {
  const withoutHtml = file.replace(/\.html$/, '')
  if (withoutHtml === 'index')
    return '/'
  if (withoutHtml.endsWith('/index'))
    return `/${withoutHtml.slice(0, -'/index'.length)}`
  return `/${withoutHtml}`
}

/**
 * Id yang bisa dijadikan sasaran jangkar.
 *
 * Bukan cuma heading: dialog, tab, dan akordeon juga menaruh id di elemennya,
 * dan sebuah tautan boleh saja menunjuk ke sana.
 */
function idsIn(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))
}

function hrefsIn(html) {
  return [...html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map(m => m[1])
}

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist does not exist yet. Run `npm run docs:build` first.')
  process.exit(1)
}

const allFiles = listFiles(DIST_DIR)
const fileSet = new Set(allFiles)
// `code/` bukan halaman: isinya potongan HTML tersorot yang diambil komponen
// lewat fetch, bukan yang dibuka pembaca. Ikut dipindai, angkanya jadi 1.084
// alih-alih 450 dan tidak ada satu pun tautan tambahan yang diperiksa.
const pages = allFiles.filter(b => b.endsWith('.html') && !b.startsWith('code/'))

// Rute → berkasnya, dan rute → id yang ada di dalamnya. Isi HTML dibaca sekali
// saja lalu dipegang; 157 halaman masih jauh di bawah ukuran yang perlu
// dihemat, dan membacanya dua kali justru membuat skripnya lebih lambat.
const htmlByFile = new Map()
const routes = new Map()
for (const file of pages) {
  const html = fs.readFileSync(path.join(DIST_DIR, file), 'utf8')
  htmlByFile.set(file, html)
  routes.set(routeOf(file), file)
}
const anchors = new Map([...routes].map(([r, b]) => [r, idsIn(htmlByFile.get(b))]))

/** Berkas yang benar-benar dilayani untuk sebuah jalur, atau null. */
function resolveTarget(linkPath) {
  const trimmed = linkPath.replace(/\/$/, '') || '/'
  if (routes.has(trimmed))
    return routes.get(trimmed)
  const relPath = linkPath.replace(/^\//, '')
  if (fileSet.has(relPath))
    return relPath
  if (fileSet.has(`${relPath}.html`))
    return `${relPath}.html`
  return null
}

const problems = []

for (const file of pages) {
  const fromRoute = routeOf(file)
  for (const href of hrefsIn(htmlByFile.get(file))) {
    if (!href || EXTERNAL.test(href))
      continue

    const [rawPath, fragment] = href.split('#')

    // Tautan yang cuma jangkar menunjuk ke halamannya sendiri.
    if (!rawPath) {
      if (fragment && !anchors.get(fromRoute)?.has(decodeURIComponent(fragment)))
        problems.push({ from: fromRoute, href, reason: 'anchor not found on this page' })
      continue
    }

    const linkPath = rawPath.startsWith('/')
      ? rawPath
      : path.posix.resolve(path.posix.dirname(fromRoute), rawPath)

    const target = resolveTarget(linkPath)
    if (!target) {
      problems.push({ from: fromRoute, href, reason: 'page not found' })
      continue
    }

    if (fragment) {
      const toRoute = routeOf(target)
      if (!anchors.get(toRoute)?.has(decodeURIComponent(fragment)))
        problems.push({ from: fromRoute, href, reason: `anchor not found on ${toRoute}` })
    }
  }
}

// Tombol "Copy Page" mengambil markdown mentah lewat fetch, jadi tautannya
// tidak pernah muncul sebagai href di HTML dan pemindaian di atas tidak
// menyentuhnya. Kalau hook penyalinnya melewatkan sebuah berkas, yang gagal
// cuma tombolnya — diam-diam, di sisi pembaca.
//
// Yang dibandingkan pohon sumbernya, bukan daftar rute: komponennya menyebut
// berkas lewat `page.filePath`, dan hook penyalin memakai jalur relatif yang
// sama. Memeriksanya begini berarti memeriksa hal yang persis dipakai, bukan
// menebak ulang bentuk URL-nya.
const SOURCE_DIR = path.join(ROOT, 'docs')
const missingRaw = listFiles(SOURCE_DIR)
  .filter(b => b.endsWith('.md') && !fileSet.has(`raw/${b}`))

const width = 60
console.log(`Pages checked     : ${pages.length}`)
console.log(`Internal links    : ${pages.reduce((n, b) => n + hrefsIn(htmlByFile.get(b)).filter(h => h && !EXTERNAL.test(h)).length, 0)}`)
console.log('─'.repeat(width))

if (problems.length) {
  const byPage = new Map()
  for (const m of problems) {
    if (!byPage.has(m.from))
      byPage.set(m.from, [])
    byPage.get(m.from).push(m)
  }
  for (const [from, pageProblems] of [...byPage].sort()) {
    console.log(`\n${from}`)
    for (const m of pageProblems)
      console.log(`  ${m.href}  →  ${m.reason}`)
  }
  console.log('─'.repeat(width))
}

if (missingRaw.length) {
  console.log(`\nMarkdown sources not copied to /raw (the "Copy page" button will fail):`)
  for (const r of missingRaw)
    console.log(`  ${r}`)
  console.log('─'.repeat(width))
}

const total = problems.length + missingRaw.length
console.log(total === 0
  ? '✔ No broken internal links.'
  : `✘ ${problems.length} broken links, ${missingRaw.length} sources without a raw copy.`)

process.exit(total === 0 ? 0 : 1)
