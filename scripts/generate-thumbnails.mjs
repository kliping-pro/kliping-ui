// Memotret tiap block, varian, atau grafik untuk thumbnail di halaman grid
// Blocks, Variants, dan Charts.
//
// Dua gambar per isi — terang dan gelap — 640×400 WebP di
// `docs/public/thumbs/<kind>/`. Dipotret dari hasil build, bukan dari server dev:
// yang dipotret harus sama persis dengan yang dilihat pembaca, dan halaman
// kanvas `/view/<nama>` hasil build sudah statis, jadi tidak ada yang perlu
// menunggu Vite menyusun modul.
//
// Gambarnya di-commit, bukan dibuat saat deploy: memotret 347 block dua kali
// butuh beberapa menit dan sebuah peramban, dan keduanya tidak perlu ada di
// mesin build. Jalankan ulang saat block bertambah atau berubah.
//
// Foto di dalam block (Unsplash dan sebagainya) dimuat dari internet. Di
// lingkungan yang tidak bisa menjangkaunya, area gambarnya akan kosong di
// thumbnail — potret ulang dari mesin yang terhubung untuk memperbaikinya.
//
// Jalankan: npm run docs:build && npm run generate:thumbnails
//   --kind blocks|variants|charts  galeri yang dipotret (bawaan: blocks)
//   --only hero-01,hero-02        cuma isi ini
//   --missing                     lewati isi yang thumbnail-nya sudah ada
//   --origin http://localhost:5173  potret dari server yang sudah jalan (server
//                                 dev, misalnya) alih-alih dari hasil build
//
// Varian dan grafik dipotret dari kanvasnya sendiri, `/view/variants/<nama>` dan
// `/view/charts/<nama>`. Varian dibingkai dengan caranya sendiri
// (`frameComponent()`): isinya diukur, lalu dipotong pas di sekelilingnya.

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST_DIR = path.join(ROOT, 'docs/.vitepress/dist')
// Ukuran jendela pemotretan block. Varian dipotret di jendela yang lebih
// sempit (lihat `GALLERY_KINDS`); perbandingannya sama, 16:10.
const WIDTH = 1280
const HEIGHT = 800
const CONCURRENCY = 4

const args = process.argv.slice(2)
const flagValue = name => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined)
const only = flagValue('--only')?.split(',')
const missingOnly = args.includes('--missing')
const externalOrigin = flagValue('--origin')?.replace(/\/$/, '')

/**
 * Tiap galeri: folder kanvasnya di bawah `/view`, folder thumbnail-nya, ukuran
 * jendelanya, lebar bingkai terkecil (makin kecil, makin jauh isi yang kecil
 * diperbesar), dan berapa lama menunggu sebelum memotret — grafik Unovis
 * beranimasi saat pertama digambar.
 *
 * Varian dipotret di jendela 640×400 dengan kerapatan piksel 2×. Jendelanya
 * sempit karena sebagian varian selebar wadahnya (tabel, isian): di jendela
 * selebar desktop mereka melebar jadi garis tipis, di sini lebarnya paling
 * banyak 560 piksel — selebar kartu. Lebih sempit lagi tidak bisa: di bawah
 * 640 piksel varian yang responsif berganti ke tata seluler (`sm:`).
 * Kerapatan 2× supaya isi kecil — satu lencana — tetap tajam setelah dipotong
 * dan diperbesar. Varian tidak memakai
 * `minFrame`; lihat `frameComponent()`.
 */
const GALLERY_KINDS = {
  blocks: { canvas: '', outDir: 'blocks', viewportSize: [WIDTH, HEIGHT], minFrame: WIDTH / 2, wait: 700 },
  variants: { canvas: 'variants', outDir: 'variants', viewportSize: [640, 400], scale: 2, component: true, wait: 700 },
  charts: { canvas: 'charts', outDir: 'charts', viewportSize: [WIDTH, HEIGHT], minFrame: WIDTH / 2, wait: 1800 },
}
const kind = GALLERY_KINDS[flagValue('--kind') ?? 'blocks']
if (!kind) {
  console.error(`✘ --kind must be one of: ${Object.keys(GALLERY_KINDS).join(', ')}`)
  process.exit(1)
}
const OUTPUT_DIR = path.join(ROOT, 'docs/public/thumbs', kind.outDir)

if (!externalOrigin && !fs.existsSync(path.join(DIST_DIR, 'view', kind.canvas))) {
  console.error('✘ No build output with /view pages yet. Run `npm run docs:build` first, or pass --origin.')
  process.exit(1)
}

// Daftar isinya dibaca dari halaman kanvas yang ditulis skrip penyusun
// halaman, bukan dari hasil build — supaya sama saja dipotret dari mana pun.
const allItems = fs.readdirSync(path.join(ROOT, 'docs/view', kind.canvas))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))
  .sort()
const targets = allItems
  .filter(n => !only || only.includes(n))
  .filter(n => !missingOnly || !fs.existsSync(path.join(OUTPUT_DIR, `${n}.webp`)))

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// Server statis kecil untuk hasil build, dengan URL bersih: `/view/x` → `view/x.html`.
const CONTENT_TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' }
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const candidates = [path.join(DIST_DIR, urlPath), path.join(DIST_DIR, `${urlPath}.html`), path.join(DIST_DIR, urlPath, 'index.html')]
  const file = candidates.find(c => c.startsWith(DIST_DIR) && fs.existsSync(c) && fs.statSync(c).isFile())
  if (!file) {
    res.writeHead(404).end()
    return
  }
  res.writeHead(200, { 'content-type': CONTENT_TYPES[path.extname(file)] ?? 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
if (!externalOrigin)
  await new Promise(ready => server.listen(0, '127.0.0.1', ready))
const origin = externalOrigin ?? `http://127.0.0.1:${server.address().port}`

// Di sandbox Claude Code, Chromium-nya terpasang di sini; di mesin lain Playwright menemukannya sendiri.
const executablePath = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined
const browser = await chromium.launch({ executablePath })

/**
 * Membingkai ulang potretnya di sekitar isi.
 *
 * Navbar, footer, banner, atau satu kartu di tengah kanvas 1280×800 tinggal
 * garis tipis di thumbnail 640×400. Jadi area isinya dicari (`trim`, terhadap
 * warna latarnya), diberi tepi, dibesarkan paling banyak 2×,
 * dan diletakkan di tengah bingkai 16:10 berwarna latar yang sama. Block yang
 * memang memenuhi layar — hero, dashboard — dibiarkan apa adanya.
 */
async function frame(png) {
  // Warna latar = warna yang paling banyak muncul. Pojok kiri atas tidak bisa
  // dipercaya: di block sidebar, pojok itu milik sidebar-nya.
  const pixels = await sharp(png).removeAlpha().raw().toBuffer()
  const counts = new Map()
  for (let i = 0; i < pixels.length; i += 3 * 7) {
    const k = (pixels[i] << 16) | (pixels[i + 1] << 8) | pixels[i + 2]
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  const background = [...counts].reduce((a, b) => (b[1] > a[1] ? b : a))[0]
  const [r, g, b] = [background >> 16, (background >> 8) & 255, background & 255]
  const { data, info } = await sharp(png).trim({ background: { r, g, b }, threshold: 12 }).toBuffer({ resolveWithObject: true })
  // Isi yang tinggi — section penuh, layout bersidebar — dibiarkan apa adanya:
  // dipusatkan, layout yang menempel di tepi justru terlihat salah.
  if (info.height >= kind.viewportSize[1] * 0.6)
    return png
  const margin = 48
  let width = Math.max(info.width + margin * 2, kind.minFrame)
  let height = Math.max(info.height + margin * 2, kind.minFrame * (kind.viewportSize[1] / kind.viewportSize[0]))
  if (width / height > kind.viewportSize[0] / kind.viewportSize[1])
    height = width * (kind.viewportSize[1] / kind.viewportSize[0])
  else
    width = height * (kind.viewportSize[0] / kind.viewportSize[1])
  width = Math.round(width)
  height = Math.round(height)
  return sharp({ create: { width, height, channels: 3, background: { r, g, b } } })
    .composite([{ input: data, left: Math.round((width - info.width) / 2), top: Math.round((height - info.height) / 2) }])
    .png()
    .toBuffer()
}

/**
 * Membingkai varian: isinya dipotong pas, lalu diberi tepi yang sebanding.
 *
 * `region` adalah gabungan kotak semua elemen varian di kanvas (piksel CSS),
 * diukur di halaman. Kotak elemen saja belum cukup — pembungkus `w-full` di
 * sekeliling satu tombol ikut terhitung selebar kanvas — jadi di dalam
 * wilayah itu piksel isinya dicari lagi (`trim` terhadap warna latar). Ambang
 * `trim`-nya nyaris nol: potretnya PNG tanpa derau, dan warna `muted` — jalur
 * slider, isian tanpa garis tepi — cuma beda beberapa angka dari latarnya.
 * Ambang yang lebih longgar memotong mereka dan membuat bingkainya miring.
 *
 * Bingkainya 16:10 dan lebarnya mengikuti isi: isi mengisi paling banyak 88%
 * lebar dan 80% tinggi bingkai, dengan tepi sedikitnya `MIN_MARGIN` piksel CSS
 * (isi yang pendek-lebar, seperti paginasi, tidak menempel di tepi). Bingkai
 * tidak pernah lebih sempit dari `MIN_WIDTH` piksel CSS — batas pembesaran, supaya satu lencana tidak jadi raksasa dan
 * tidak buram. Isi yang lebih tinggi dari yang muat (tabel, akordeon panjang,
 * kartu formulir) tidak diciutkan jadi garis: bingkainya dilebarkan paling
 * banyak `MAX_WIDEN`×, lalu isinya diletakkan rata atas dan bagian bawahnya
 * terpotong.
 */
const MIN_WIDTH = 260
const MIN_MARGIN = 36
const MAX_WIDEN = 1.35
async function frameComponent(png, region, scale) {
  // Latarnya warna pojok kiri atas, bukan warna terbanyak: kanvas varian selalu
  // menyisakan tepi kosong, sedangkan dialog yang terbuka bisa menutupi
  // sebagian besar potret dan membuat putihnya jadi warna terbanyak.
  const [r, g, b] = await sharp(png).removeAlpha().extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer()
  const background = { r, g, b }
  const { width: shotWidth, height: shotHeight } = await sharp(png).metadata()
  // Wilayah dalam piksel potret, diberi sedikit kelonggaran untuk bayangan.
  const slack = 12 * scale
  const left = Math.max(0, Math.floor(region.x * scale - slack))
  const top = Math.max(0, Math.floor(region.y * scale - slack))
  const right = Math.min(shotWidth, Math.ceil((region.x + region.w) * scale + slack))
  const bottom = Math.min(shotHeight, Math.ceil((region.y + region.h) * scale + slack))
  let box = { x: left, y: top, w: right - left, h: bottom - top }
  if (box.w <= 0 || box.h <= 0)
    box = { x: 0, y: 0, w: shotWidth, h: shotHeight }
  // Dua langkah: dalam satu rantai sharp, `trim` dijalankan sebelum `extract`.
  const regionPng = await sharp(png).extract({ left: box.x, top: box.y, width: box.w, height: box.h }).png().toBuffer()
  const { info } = await sharp(regionPng)
    .trim({ background, threshold: 2 })
    .toBuffer({ resolveWithObject: true })
    .catch(() => ({ info: null }))
  // `trimOffsetLeft/Top` negatif: berapa piksel yang dibuang dari kiri/atas.
  if (info && info.width > 2 && info.height > 2)
    box = { x: box.x - (info.trimOffsetLeft ?? 0), y: box.y - (info.trimOffsetTop ?? 0), w: info.width, h: info.height }

  const ratio = 16 / 10
  let width = Math.max(box.w / 0.88, box.w + MIN_MARGIN * 2 * scale, MIN_WIDTH * scale)
  const neededHeight = Math.max(box.h / 0.8, box.h + MIN_MARGIN * 2 * scale)
  if (neededHeight > width / ratio)
    width = Math.min(neededHeight * ratio, width * MAX_WIDEN)
  width = Math.round(width)
  const height = Math.round(width / ratio)
  const x = Math.round(box.x + box.w / 2 - width / 2)
  // Muat: dipusatkan. Tidak muat: rata atas, tepi atasnya setara tepi samping.
  const y = neededHeight <= height + 1
    ? Math.round(box.y + box.h / 2 - height / 2)
    : Math.round(box.y - Math.min((width - box.w) / 2, height * 0.1))

  // Bingkai boleh melewati tepi potret; bagian di luarnya diisi warna latar.
  const ix = Math.max(0, x)
  const iy = Math.max(0, y)
  const iw = Math.min(shotWidth, x + width) - ix
  const ih = Math.min(shotHeight, y + height) - iy
  const cropped = await sharp(png).extract({ left: ix, top: iy, width: iw, height: ih }).toBuffer()
  return sharp({ create: { width, height, channels: 3, background } })
    .composite([{ input: cropped, left: ix - x, top: iy - y }])
    .png()
    .toBuffer()
}

async function capture(name, theme) {
  const context = await browser.newContext({ viewport: { width: kind.viewportSize[0], height: kind.viewportSize[1] }, deviceScaleFactor: kind.scale ?? 1, colorScheme: theme })
  await context.addInitScript(t => localStorage.setItem('vitepress-theme-appearance', t), theme)
  const page = await context.newPage()
  try {
    await page.goto(`${origin}/view/${kind.canvas ? `${kind.canvas}/` : ''}${name}`, { waitUntil: 'load', timeout: 60000 })
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
    // Modal tertutup cuma menampilkan satu tombol. Yang mewakili block-nya adalah
    // dialognya, jadi dibuka dulu sebelum dipotret.
    if (name.startsWith('modals-'))
      await page.getByRole('button', { name: 'Open Modal' }).click({ timeout: 3000 }).catch(() => {})
    // Begitu juga varian alert dialog: yang dibingkai dialognya, di atas tirainya.
    if (name.startsWith('alert-dialog-'))
      await page.getByRole('button', { name: 'Show Dialog' }).click({ timeout: 3000 }).catch(() => {})
    await page.waitForTimeout(kind.wait)
    // Tabel berkolom banyak meluap di dalam wadah gesernya sendiri; di jendela
    // 640 kolom kanannya terpotong. Hanya untuk varian seperti itu jendelanya
    // dilebarkan secukupnya — yang lain tetap dipotret di lebar yang sama.
    if (kind.component) {
      const overflow = await page.evaluate(() => Math.max(0, ...[...document.querySelectorAll('.min-h-svh > div *')]
        .filter(el => el.scrollWidth > el.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(el).overflowX))
        .map(el => el.scrollWidth - el.clientWidth)))
      if (overflow > 0) {
        await page.setViewportSize({ width: kind.viewportSize[0] + Math.ceil(overflow) + 16, height: kind.viewportSize[1] })
        await page.waitForTimeout(300)
      }
    }
    let image
    if (kind.component) {
      // Gabungan kotak semua elemen varian, ditambah isi yang dipindah ke
      // `body` (popover, tooltip yang terbuka). Koordinatnya relatif halaman,
      // karena potretnya satu halaman penuh: varian yang lebih tinggi dari
      // jendela memanjangkan halamannya.
      const region = await page.evaluate(() => {
        const dialog = document.querySelector('[role="alertdialog"], [role="dialog"]')
        const container = document.querySelector('.min-h-svh > div')
        const elements = dialog
          ? [dialog]
          : [...(container?.querySelectorAll('*') ?? []), ...document.querySelectorAll('body > [data-reka-popper-content-wrapper]')]
        let [x1, y1, x2, y2] = [Infinity, Infinity, -Infinity, -Infinity]
        for (const el of elements) {
          const k = el.getBoundingClientRect()
          if (k.width < 2 || k.height < 2)
            continue
          x1 = Math.min(x1, k.left + scrollX)
          y1 = Math.min(y1, k.top + scrollY)
          x2 = Math.max(x2, k.right + scrollX)
          y2 = Math.max(y2, k.bottom + scrollY)
        }
        return Number.isFinite(x1) ? { x: x1, y: y1, w: x2 - x1, h: y2 - y1 } : { x: 0, y: 0, w: 0, h: 0 }
      })
      image = await frameComponent(await page.screenshot({ type: 'png', fullPage: true }), region, kind.scale)
    }
    else {
      image = await frame(await page.screenshot({ type: 'png' }))
    }
    const suffix = theme === 'dark' ? '-dark' : ''
    await sharp(image).resize(640, 400, { kernel: 'lanczos3' }).webp({ quality: 72 }).toFile(path.join(OUTPUT_DIR, `${name}${suffix}.webp`))
  }
  finally {
    await context.close()
  }
}

const queue = targets.flatMap(n => [[n, 'light'], [n, 'dark']])
let done = 0
const failures = []
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  for (let task = queue.shift(); task; task = queue.shift()) {
    try {
      await capture(...task)
    }
    catch (e) {
      failures.push(`${task.join(' ')}: ${e.message.split('\n')[0]}`)
    }
    done += 1
    if (done % 50 === 0)
      console.log(`  ${done}/${targets.length * 2}`)
  }
}))

await browser.close()
if (!externalOrigin)
  server.close()

console.log(`✔ ${targets.length} items captured (light + dark) to docs/public/thumbs/${kind.outDir}/`)
if (failures.length) {
  console.log(`✘ ${failures.length} failed:`)
  failures.forEach(g => console.log(`  ${g}`))
  process.exitCode = 1
}
