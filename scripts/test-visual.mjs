// Membuka situs yang sudah dibangun di peramban sungguhan, lalu memeriksanya.
//
// Tiga hal yang dicari, dan ketiganya pernah benar-benar terjadi di sini:
//
//   Hydration mismatch — HTML dari server berbeda dengan yang digambar ulang
//     Vue di peramban. Build tetap hijau, halaman tetap tampil, tapi Vue
//     membuang hasil server lalu menggambar ulang semuanya. Cuma kelihatan
//     lewat console.
//
//   Meluap mendatar — sesuatu lebih lebar dari layarnya. Di desktop nyaris
//     mustahil terlihat; di ponsel halamannya bisa digeser ke samping.
//
//   Galat console — komponen yang gagal, aset yang hilang, prop yang salah.
//
// Selain itu halaman kuncinya dipotret, terang dan gelap, untuk dibandingkan
// berdampingan dengan kliping-vue. Potretnya tidak ikut masuk git: ia hasil
// pemeriksaan, bukan sumber.
//
// Jalankan: npm run test:visual           — 12 rute, empat kondisi
//           npm run test:visual -- --all — seluruh rute yang ada
//
// Kalau chromium bawaan Playwright tidak terpasang, tunjuk binernya sendiri
// lewat $KLIPING_CHROMIUM.

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST_DIR = path.join(ROOT, 'docs/.vitepress/dist')
const SCREENSHOT_DIR = path.join(ROOT, 'scripts/screenshots')
const PORT = Number(process.env.KLIPING_PORT ?? 4180)
const BASE_URL = `http://localhost:${PORT}`

const allRoutes = process.argv.includes('--all')

// Halaman yang disebut roadmap, plus satu wakil dari tiap jenis halaman yang
// punya cara render sendiri: komponen biasa, blok dalam iframe, varian yang
// digambar inline, dan grafik yang cuma digambar di sisi klien.
//
// `/variants/table` yang dipilih sebagai wakil varian, bukan `/variants/button`:
// di situ ada tabel data TanStack lengkap dengan menu dan penyaringnya —
// halaman varian paling berat yang ada, dan yang paling mungkin gagal
// dihidrasi.
const KEY_ROUTES = [
  '/',
  '/introduction',
  '/installation',
  '/components',
  '/blocks',
  '/variants',
  '/templates',
  '/charts',
  '/colors',
  '/typeset',
  '/components/button',
]
// Dua yang terakhir halaman indeks — bentuk yang dulu membuat tombol "Copy
// Page" salah alamat, dan satu-satunya bentuk yang bisa mengulanginya.
const SAMPLE_ROUTES = ['/components/sidebar', '/blocks/login-01', '/variants/table', '/templates/homeguardian', '/charts/bar', '/directory', '/registry']

/**
 * Seluruh halaman komponen berkategori, bukan satu wakil.
 *
 * Block dan varian cukup diwakili satu halaman karena ratusan di antaranya
 * lahir dari konverter yang sama — yang gagal di satu, gagal di semuanya.
 * Komponen berkategori kebalikannya: tiap komponen ditulis sendiri, menyimpan
 * keadaannya sendiri, dan gagal dengan caranya sendiri. Satu wakil tidak
 * mewakili apa pun di sana.
 */
function catalogRoutes() {
  const catalogFile = path.join(ROOT, 'src/registry/component-catalog.json')
  if (!fs.existsSync(catalogFile)) return []
  return JSON.parse(fs.readFileSync(catalogFile, 'utf-8')).map(d => `/components/${d.slug}`)
}

/**
 * Masalah yang diwarisi dari hulu, bukan dibuat di sini.
 *
 * Ketiganya sudah ditelusuri sampai sumbernya sebelum dimasukkan ke sini:
 *
 *   hidrasi — komponen yang memutuskan tata letaknya dari lebar layar lewat
 *     `useMediaQuery`. Server tidak punya layar, jadi ia selalu menggambar
 *     versi desktop; di lebar ponsel peramban menggambar ulang jadi versi
 *     lain. `SidebarProvider.vue` di sini identik byte-per-byte dengan yang
 *     di kliping-vue, jadi memperbaikinya berarti menyimpang dari hulu.
 *
 *   meluap — `products-01` memuat tabel produk yang memang tidak menyusut di
 *     lebar ponsel, dan bedanya dengan hulu cuma jalur impor. `otp-05`
 *     meleset dua piksel.
 *
 * Dicatat, bukan disembunyikan: gunanya supaya masalah BARU tetap menonjol.
 * Daftar yang tidak pernah dibaca ulang akan pelan-pelan menelan regresi
 * sungguhan, jadi tiap entri di sini harus bisa ditunjuk sumbernya.
 */
const INHERITED = [
  { kind: 'hydration', route: /^\/blocks\/sidebar-/ },
  { kind: 'hydration', route: /^\/blocks\/dashboard-01$/ },
  { kind: 'hydration', route: /^\/components\/(breadcrumb|carousel)$/ },
  // Galeri block, dan hanya di lebar ponsel. Yang tidak cocok bukan halaman
  // ini melainkan block di dalam iframe-nya: sejak pratinjaunya benar-benar
  // menyempit — bukan lagi render 1440 piksel yang diperkecil — bingkainya di
  // ponsel memang selebar ponsel, jadi sidebar di dalamnya menggambar versi
  // ponsel sementara HTML dari server versi desktop. Itu persis ketidakcocokan
  // yang sudah tercatat untuk halaman block-nya sendiri, cuma terlihat dari
  // halaman induknya. Sengaja dibatasi ke lebar ponsel: kalau galeri ini
  // bermasalah di desktop, itu hal baru dan harus tetap menonjol.
  { kind: 'hydration', route: /^\/blocks$/, condition: /mobile/ },
  { kind: 'overflow', route: /^\/blocks\/(products-01|otp-05)$/ },
]

const CONDITIONS = [
  { name: 'light-wide', dark: false, width: 1440, height: 900 },
  { name: 'dark-wide', dark: true, width: 1440, height: 900 },
  { name: 'light-mobile', dark: false, width: 390, height: 844 },
  { name: 'dark-mobile', dark: true, width: 390, height: 844 },
]

function distRoutes() {
  const result = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory())
        walk(fullPath)
      else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
        const rel = path.relative(DIST_DIR, fullPath).split(path.sep).join('/').replace(/\.html$/, '')
        result.push(rel === 'index' ? '/' : `/${rel.replace(/\/index$/, '')}`)
      }
    }
  }
  walk(DIST_DIR)
  return result.sort()
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

/**
 * Menyalakan server pratinjau, dan yang lebih penting: bisa mematikannya lagi.
 *
 * `npx` cuma pembungkus — server yang sesungguhnya cucunya. Mematikan proses
 * yang dikembalikan `spawn` tidak menyentuh cucu itu, jadi tiap kali skrip ini
 * selesai ia meninggalkan satu server yang masih memegang portnya. Setelah
 * beberapa kali jalan, portnya habis dan yang gagal justru skripnya sendiri.
 *
 * `detached` menaruh seluruh keturunannya di satu grup proses, dan mengirim
 * sinyal ke PID negatif mengenai satu grup itu sekaligus.
 */
function stopServer(child) {
  try {
    process.kill(-child.pid, 'SIGTERM')
  }
  catch {
    child.kill()
  }
}

async function startServer() {
  // Port yang sudah terpakai berarti ada server lain di sana — biasanya sisa
  // uji sebelumnya yang berhenti karena galat dan tidak sempat membereskan
  // anaknya. Yang membuatnya berbahaya bukan tabrakan portnya: `vitepress
  // preview` yang kedua diam saja saat gagal mengikat, jadi uji ini bicara
  // dengan server lama yang masih memegang folder dist yang SUDAH DIHAPUS
  // build terakhir. Yang keluar dari situ 300-an "aset hilang" yang seluruhnya
  // palsu, dan tidak ada satu pun yang menunjuk sebabnya.
  try {
    const response = await fetch(BASE_URL)
    if (response.ok) {
      throw new Error(
        `Port ${PORT} is already in use by another process. Stop the preview server `
        + 'that is still running first — test results from it read a build that no longer exists.',
      )
    }
  }
  catch (error) {
    if (error instanceof Error && error.message.startsWith(`Port ${PORT}`)) throw error
    // Gagal menyambung justru yang diharapkan: portnya memang kosong.
  }

  const child = spawn('npx', ['vitepress', 'preview', 'docs', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'ignore',
    detached: true,
  })
  // Dua menit, bukan dua puluh detik. Panggilan `npx` yang cache-nya masih
  // dingin bisa menghabiskan setengah menit sendiri sebelum servernya mulai
  // mendengarkan, dan jendela yang terlalu sempit membuat skrip ini menyerah
  // pada server yang sebenarnya baik-baik saja.
  for (let i = 0; i < 240; i++) {
    await sleep(500)
    try {
      const r = await fetch(BASE_URL)
      if (r.ok)
        return child
    }
    catch {}
  }
  stopServer(child)
  throw new Error(`Preview server did not come up at ${BASE_URL} after 2 minutes.`)
}

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist does not exist yet. Run `npm run docs:build` first.')
  process.exit(1)
}

const routes = allRoutes ? distRoutes() : [...KEY_ROUTES, ...SAMPLE_ROUTES, ...catalogRoutes()]
const server = await startServer()

const browser = await chromium.launch(
  process.env.KLIPING_CHROMIUM ? { executablePath: process.env.KLIPING_CHROMIUM } : {},
)

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })

const findings = []
const inherited = []
const externalAssets = []
let loads = 0

try {
  for (const condition of CONDITIONS) {
    const context = await browser.newContext({
      viewport: { width: condition.width, height: condition.height },
      colorScheme: condition.dark ? 'dark' : 'light',
    })
    // Tema disimpan VitePress di localStorage. Menanamnya sebelum halaman
    // jalan berarti halamannya langsung digambar dengan tema yang benar —
    // bukan berkedip dari terang ke gelap setelah skripnya sempat jalan.
    await context.addInitScript((dark) => {
      localStorage.setItem('vitepress-theme-appearance', dark ? 'dark' : 'light')
    }, condition.dark)

    const page = await context.newPage()

    for (const r of routes) {
      const errors = []
      const external = []
      const onConsole = (message) => {
        const text = message.text()
        // "Failed to load resource" sudah ditangani requestfailed, yang tahu
        // alamat mana yang gagal — pesan console-nya tidak.
        if (/Failed to load resource/i.test(text))
          return
        if (message.type() === 'error' || /hydrat/i.test(text))
          errors.push(text)
      }
      // Aset yang gagal dimuat dipisah berdasarkan asalnya. Yang dari luar —
      // foto Unsplash, avatar GitHub yang dipakai demo — bisa gagal cuma
      // karena jaringan tempat skrip ini dijalankan; menghitungnya sebagai
      // kerusakan situs akan membuat skripnya berteriak serigala.
      //
      // ERR_ABORTED dari origin sendiri dilewati: VitePress memuat lebih dulu
      // potongan rute yang tautannya masuk layar, dan permintaan itu memang
      // dibatalkan begitu halamannya ditinggalkan. Berkasnya ada; yang batal
      // pengambilannya.
      const onRequestFailed = (request) => {
        const url = request.url()
        const reason = request.failure()?.errorText ?? 'failed'
        if (!url.startsWith(BASE_URL))
          external.push(url)
        else if (!/ERR_ABORTED/.test(reason))
          errors.push(`request failed: ${url.slice(BASE_URL.length)} (${reason})`)
      }

      // Aset yang benar-benar hilang tidak pernah memicu requestfailed — server
      // menjawabnya dengan 404, dan 404 tetap sebuah jawaban. Ini yang
      // menangkapnya.
      const onResponse = (response) => {
        const url = response.url()
        if (url.startsWith(BASE_URL) && response.status() >= 400)
          errors.push(`missing asset: ${url.slice(BASE_URL.length)} → ${response.status()}`)
      }
      // Semuanya dilepas lagi di ujung perulangan. Halaman yang sama dipakai
      // untuk seluruh rute, jadi pendengar yang dibiarkan menumpuk sampai
      // ratusan dan Node mulai mengeluh soal batas pendengar.
      const onPageError = e => errors.push(`pageerror: ${e.message}`)
      page.on('console', onConsole)
      page.on('pageerror', onPageError)
      page.on('requestfailed', onRequestFailed)
      page.on('response', onResponse)

      // Enam puluh detik, bukan tiga puluh bawaannya: galeri `/blocks`
      // membingkai 34 block sekaligus, masing-masing di iframe dengan bundel
      // sendiri. Di mesin yang sedang sibuk, batas bawaannya tidak cukup.
      //
      // Yang ditunggu `load`, bukan `networkidle`.
      //
      // `networkidle` menuntut jaringan sunyi dua detik penuh, dan halaman di
      // sini tidak pernah sampai ke sana: block, varian, dan template
      // memakai foto contoh dari host luar, dan proksi di lingkungan ini
      // MENGGANTUNG permintaan terlarang alih-alih menolaknya. Yang gagal jadi
      // skripnya, bukan halamannya — dan gerbang yang gagal karena dirinya
      // sendiri tidak menjaga apa pun.
      //
      // Jeda dua detik sesudahnya yang sesungguhnya penting: hidrasi berjalan
      // setelah `load`, dan keluhannya baru tercatat sesudah itu.
      await page.goto(BASE_URL + r, { waitUntil: 'load', timeout: 60_000 })
      await page.waitForTimeout(2000)
      loads++

      const overflow = await page.evaluate(() => {
        const d = document.documentElement
        return d.scrollWidth > d.clientWidth ? { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth } : null
      })

      // Jenis yang tidak terdaftar — galat console biasa, aset yang hilang —
      // tidak pernah dimaklumi.
      const isInherited = kind => INHERITED.some(d =>
        d.kind === kind && d.route.test(r) && (!d.condition || d.condition.test(condition.name)),
      )
      const record = (kind, message) => {
        (isInherited(kind) ? inherited : findings).push(`${condition.name} ${r} — ${message}`)
      }

      if (overflow)
        record('overflow', `overflow ${overflow.scrollWidth}>${overflow.clientWidth}`)
      for (const g of errors)
        record(/hydrat/i.test(g) ? 'hydration' : 'other', g.slice(0, 160))
      externalAssets.push(...external)

      // Tombol "Copy Page" mengambil markdown mentahnya lewat fetch, jadi
      // alamat yang salah tidak kelihatan sampai ada yang mengklik. Pernah
      // salah persis begitu: halaman indeks seperti /directory menebak
      // alamatnya dari URL, dan tebakannya beda tergantung ada tidaknya garis
      // miring di ujung. Diperiksa sekali saja, di kondisi pertama.
      if (condition === CONDITIONS[0]) {
        const button = page.getByRole('button', { name: /Copy Page/ })
        if (await button.count()) {
          // Dibungkus try supaya kegagalannya jadi temuan yang menyebut
          // rutenya, bukan pengecualian yang menghentikan seluruh uji tanpa
          // memberi tahu halaman mana yang bermasalah.
          try {
            await button.click({ timeout: 5000 })
            const link = page.getByRole('menuitem', { name: /View as Markdown/ })
            const href = await link.getAttribute('href', { timeout: 5000 })
            const response = await page.request.get(BASE_URL + href)
            if (!response.ok())
              findings.push(`${condition.name} ${r} — raw markdown ${href} → ${response.status()}`)
            await page.keyboard.press('Escape')
          }
          catch (error) {
            findings.push(`${condition.name} ${r} — "Copy Page" menu did not open: ${String(error.message).split('\n')[0]}`)
          }
        }
      }

      // Potret hanya untuk halaman kunci di lebar penuh; empat kondisi kali
      // seluruh rute cuma menghasilkan tumpukan berkas yang tidak dilihat siapa pun.
      if (KEY_ROUTES.includes(r) && condition.width === 1440) {
        const fileName = `${r === '/' ? 'home' : r.slice(1).replaceAll('/', '-')}-${condition.dark ? 'dark' : 'light'}.png`
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, fileName), fullPage: true })
      }

      page.off('console', onConsole)
      page.off('pageerror', onPageError)
      page.off('requestfailed', onRequestFailed)
      page.off('response', onResponse)
    }

    await context.close()
  }
}
finally {
  await browser.close()
  stopServer(server)
}

const rule = '─'.repeat(64)
console.log(`Routes      : ${routes.length}`)
console.log(`Loads       : ${loads}`)
console.log(`Screenshots : ${path.relative(ROOT, SCREENSHOT_DIR)}`)
console.log(rule)

if (externalAssets.length) {
  const hosts = [...new Set(externalAssets.map(a => new URL(a).host))].sort()
  console.log(`External assets failed to load: ${externalAssets.length} requests to ${hosts.join(', ')}.`)
  console.log('Those are photos and avatars used by demos. If the network this script runs')
  console.log('on blocks them, the count is expected and not a site defect.')
  console.log(rule)
}

if (inherited.length) {
  console.log(`Inherited from upstream (${inherited.length}) — recorded, not regressions:`)
  for (const w of inherited)
    console.log(`  ${w}`)
  console.log(rule)
}

if (findings.length) {
  for (const t of findings)
    console.log(`  ${t}`)
  console.log(rule)
}

console.log(findings.length === 0
  ? `✔ Clean across ${loads} loads.`
  : `✘ ${findings.length} problems.`)

process.exit(findings.length === 0 ? 0 : 1)
