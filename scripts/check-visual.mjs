// Uji regresi visual atas situs hasil build: potret tiap halaman, bandingkan
// dengan potret baseline piksel per piksel.
//
//   npm run check:visual -- --update            potret jadi baseline
//   npm run check:visual                        bandingkan dengan baseline
//   npm run check:visual -- --blocks            ditambah pratinjau seluruh block (/view/*)
//   npm run check:visual -- --only button,dialog  hanya halaman yang namanya memuat salah satunya
//
// Butuh `npm run docs:build` lebih dulu (membaca docs/.vitepress/dist).
//
// Baseline TIDAK di-commit. Render huruf berbeda antar mesin (versi FreeType,
// font sistem), jadi potret dari laptop tidak sebanding dengan potret dari CI —
// baseline yang di-commit akan gagal di mana-mana kecuali di mesin pembuatnya.
// Yang dibandingkan selalu dua build di mesin yang sama:
//
//   lokal  build `main` → `--update`, lalu build branch Anda → bandingkan
//   CI     job `visual` membangun base branch PR → baseline, lalu PR-nya →
//          bandingkan; gambar perbedaannya diunggah sebagai artifact.
//
// Supaya dua build yang sama menghasilkan piksel yang sama: animasi & transisi
// dimatikan, waktu dibekukan, Math.random diberi benih tetap, gambar luar
// diblokir, dan caret disembunyikan.
//
// Hasil: docs/.vitepress/cache/visual/{baseline,current,diff}/ dan report.json.

import fs from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
// VISUAL_DIST: potret build lain (CI memotret build base branch dengan skrip
// dari PR — base branch belum tentu punya skrip ini).
const DIST = process.env.VISUAL_DIST ? path.resolve(process.env.VISUAL_DIST) : path.join(ROOT, 'docs/.vitepress/dist')
const OUT = path.join(ROOT, 'docs/.vitepress/cache/visual')
const argv = process.argv.slice(2)
const args = new Set(argv)
const only = argv.includes('--only') ? argv[argv.indexOf('--only') + 1].split(',') : null
const update = args.has('--update')

// Selisih per kanal di bawah ini dianggap sama (anti-aliasing, pembulatan
// warna). Halaman gagal bila piksel yang berbeda melebihi rasio ini.
const CHANNEL_TOLERANCE = 24
const MAX_DIFF_RATIO = 0.001

// Pratinjau yang memang berubah tiap saat lewat timer, bukan animasi CSS —
// membekukan waktu dan acak tidak cukup. Dilewati, dengan alasannya.
const VOLATILE = {
  'component-animated-grid-pattern': 'squares move on a setInterval timer',
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('✘ docs/.vitepress/dist is missing: run `npm run docs:build` first.')
  process.exit(1)
}

/** { name, url, selector } — selector: bagian yang dipotret (null = viewport). */
const targets = []
for (const p of ['/', '/introduction', '/components', '/blocks', '/builder', '/cli', '/hooks/use-counter'])
  targets.push({ name: `page${p === '/' ? '-home' : p.replaceAll('/', '-')}`, url: p, selector: null })
targets.push({ name: 'page-home-dark', url: '/', selector: null, dark: true })
targets.push({ name: 'page-components-button-dark', url: '/components/button', selector: null, dark: true })
for (const f of fs.readdirSync(path.join(DIST, 'components')).filter(f => f.endsWith('.html')).sort()) {
  const name = f.replace(/\.html$/, '')
  targets.push({ name: `component-${name}`, url: `/components/${name}`, selector: '.preview:visible' })
}
if (args.has('--blocks')) {
  for (const f of fs.readdirSync(path.join(DIST, 'view')).filter(f => f.endsWith('.html')).sort())
    targets.push({ name: `block-${f.replace(/\.html$/, '')}`, url: `/view/${f.replace(/\.html$/, '')}`, selector: null })
}
const selected = (only ? targets.filter(t => only.some(o => t.name.includes(o))) : targets).filter(t => !VOLATILE[t.name])
const volatile = targets.filter(t => VOLATILE[t.name] && (!only || only.some(o => t.name.includes(o))))

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' }
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  let file = path.join(DIST, p)
  if (!file.startsWith(DIST))
    return res.writeHead(403).end()
  if (fs.existsSync(`${file}.html`))
    file = `${file}.html`
  else if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, 'index.html')
  if (!fs.existsSync(file))
    return res.writeHead(404).end()
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`

const executablePath = process.env.CHROMIUM_PATH ?? (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined)
const browser = await chromium.launch({ executablePath })

/** Konteks peramban yang deterministik: waktu beku, acak berbenih, tanpa gerak. */
async function newContext(dark) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light', reducedMotion: 'reduce' })
  await context.route(url => !url.href.startsWith(base), route => route.abort())
  await context.addInitScript((isDark) => {
    const fixed = new Date('2026-01-15T10:00:00Z').getTime()
    const RealDate = Date
    // eslint-disable-next-line no-global-assign
    Date = class extends RealDate {
      constructor(...a) { super(...(a.length ? a : [fixed])) }
      static now() { return fixed }
    }
    let seed = 42
    Math.random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    try { localStorage.setItem('vitepress-theme-appearance', isDark ? 'dark' : 'light') } catch {}
  }, !!dark)
  return context
}

const FREEZE_CSS = `*, *::before, *::after {
  animation-duration: 0s !important; animation-delay: 0s !important; animation-iteration-count: 1 !important;
  transition: none !important; caret-color: transparent !important; scroll-behavior: auto !important;
}`

// `--update --only x` hanya menimpa potret x; baseline lainnya tetap.
for (const dir of update ? (only ? [] : ['baseline']) : ['current', 'diff'])
  fs.rmSync(path.join(OUT, dir), { recursive: true, force: true })
for (const dir of ['baseline', 'current', 'diff'])
  fs.mkdirSync(path.join(OUT, dir), { recursive: true })

const contexts = { light: await newContext(false), dark: await newContext(true) }
const report = []
let done = 0
for (const t of selected) {
  const page = await contexts[t.dark ? 'dark' : 'light'].newPage()
  const file = path.join(OUT, update ? 'baseline' : 'current', `${t.name}.png`)
  try {
    await page.goto(base + t.url, { waitUntil: 'load', timeout: 30000 })
    await page.addStyleTag({ content: FREEZE_CSS })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(400)
    const target = t.selector ? page.locator(t.selector).first() : page
    if (t.selector && !(await page.locator(t.selector).count())) {
      report.push({ name: t.name, status: 'skipped', reason: 'no preview' })
    }
    else {
      await target.screenshot({ path: file, animations: 'disabled', caret: 'hide' })
      report.push({ name: t.name, status: update ? 'baseline' : 'captured' })
    }
  }
  catch (error) {
    report.push({ name: t.name, status: 'error', reason: String(error).split('\n')[0] })
  }
  await page.close()
  if (++done % 25 === 0)
    console.log(`  ${done}/${selected.length}`)
}
await browser.close()
server.close()

if (update) {
  const ok = report.filter(r => r.status === 'baseline').length
  console.log(`✔ baseline: ${ok} screenshots in ${path.relative(ROOT, path.join(OUT, 'baseline'))}`)
  const errors = report.filter(r => r.status === 'error')
  for (const e of errors)
    console.log(`  ✘ ${e.name}: ${e.reason}`)
  process.exit(errors.length ? 1 : 0)
}

/** Bandingkan dua PNG; tulis gambar beda (piksel berbeda merah di atas versi pudar). */
function compare(a, b, diffFile) {
  const imgA = PNG.sync.read(fs.readFileSync(a))
  const imgB = PNG.sync.read(fs.readFileSync(b))
  if (imgA.width !== imgB.width || imgA.height !== imgB.height)
    return { ratio: 1, reason: `size ${imgA.width}×${imgA.height} → ${imgB.width}×${imgB.height}` }
  const diff = new PNG({ width: imgA.width, height: imgA.height })
  let changed = 0
  for (let i = 0; i < imgA.data.length; i += 4) {
    const d = Math.max(Math.abs(imgA.data[i] - imgB.data[i]), Math.abs(imgA.data[i + 1] - imgB.data[i + 1]), Math.abs(imgA.data[i + 2] - imgB.data[i + 2]))
    if (d > CHANNEL_TOLERANCE) {
      changed++
      diff.data.set([255, 0, 0, 255], i)
    }
    else {
      const gray = Math.round((imgB.data[i] + imgB.data[i + 1] + imgB.data[i + 2]) / 3)
      diff.data.set([gray, gray, gray, 60], i)
    }
  }
  const ratio = changed / (imgA.width * imgA.height)
  if (ratio > MAX_DIFF_RATIO)
    fs.writeFileSync(diffFile, PNG.sync.write(diff))
  return { ratio }
}

const failed = []
const missing = []
for (const r of report.filter(r => r.status === 'captured')) {
  const baseline = path.join(OUT, 'baseline', `${r.name}.png`)
  if (!fs.existsSync(baseline)) {
    missing.push(r.name)
    r.status = 'new'
    continue
  }
  const result = compare(baseline, path.join(OUT, 'current', `${r.name}.png`), path.join(OUT, 'diff', `${r.name}.png`))
  r.ratio = Number(result.ratio.toFixed(5))
  r.status = result.ratio > MAX_DIFF_RATIO ? 'changed' : 'same'
  if (result.reason)
    r.reason = result.reason
  if (r.status === 'changed')
    failed.push(r)
}
fs.writeFileSync(path.join(OUT, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)

const errors = report.filter(r => r.status === 'error')
const same = report.filter(r => r.status === 'same').length
console.log(`\nvisual: ${selected.length} targets — ${same} unchanged, ${failed.length} changed, ${missing.length} new, ${errors.length} errors`)
for (const t of volatile)
  console.log(`  skipped ${t.name}: ${VOLATILE[t.name]}`)
for (const r of failed)
  console.log(`  ✘ ${r.name}: ${(r.ratio * 100).toFixed(2)}% pixels${r.reason ? ` (${r.reason})` : ''}`)
for (const e of errors)
  console.log(`  ✘ ${e.name}: ${e.reason}`)
if (missing.length)
  console.log(`  new (no baseline): ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? ', …' : ''}`)
if (failed.length)
  console.log(`  diff images: ${path.relative(ROOT, path.join(OUT, 'diff'))} — red = changed pixels`)
process.exit(failed.length || errors.length ? 1 : 0)
