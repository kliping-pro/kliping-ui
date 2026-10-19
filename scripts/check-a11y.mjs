// Audit aksesibilitas otomatis (axe-core) atas situs hasil build.
//
//   npm run check:a11y                 halaman inti + semua halaman komponen
//   npm run check:a11y -- --blocks     ditambah pratinjau seluruh block (/view/*)
//   npm run check:a11y -- --update     tulis ulang baseline dari hasil sekarang
//
// Butuh `npm run docs:build` lebih dulu (membaca docs/.vitepress/dist).
// Peramban: Chromium Playwright; di sandbox pakai /opt/pw-browsers/chromium
// (atau CHROMIUM_PATH).
//
// Gagal hanya bila pelanggaran berdampak `serious` / `critical` BERTAMBAH
// dibanding scripts/a11y-baseline.json (per aturan, jumlah halaman). Pelanggaran
// lama tidak memblokir — baseline-nya diturunkan setiap kali ada yang
// dibereskan (`--update`), jadi angkanya hanya boleh turun (pola "ratchet").
// Baseline dicatat per cakupan: `pages` (kerangka situs + halaman komponen)
// dan `blocks` (pratinjau /view/*, hanya dengan --blocks). `--update` menulis
// ulang cakupan yang diaudit saja.

import fs from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import AxeBuilder from '@axe-core/playwright'
import { chromium } from 'playwright'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST = path.join(ROOT, 'docs/.vitepress/dist')
const BASELINE = path.join(ROOT, 'scripts/a11y-baseline.json')
const REPORT = path.join(ROOT, 'docs/.vitepress/cache/a11y-report.json')
const args = new Set(process.argv.slice(2))
const BLOCKING = new Set(['serious', 'critical'])

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('✘ docs/.vitepress/dist is missing: run `npm run docs:build` first.')
  process.exit(1)
}

// Halaman yang diaudit: kerangka situs, setiap halaman komponen, dan (opsional)
// pratinjau tiap block — isi yang benar-benar dipasang orang.
const pages = ['/', '/introduction', '/installation', '/components', '/blocks', '/builder', '/mcp', '/cli']
for (const f of fs.readdirSync(path.join(DIST, 'components')).filter(f => f.endsWith('.html')).sort())
  pages.push(`/components/${f.replace(/\.html$/, '')}`)
if (args.has('--blocks')) {
  for (const f of fs.readdirSync(path.join(DIST, 'view')).filter(f => f.endsWith('.html')).sort())
    pages.push(`/view/${f.replace(/\.html$/, '')}`)
}

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' }
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  let file = path.join(DIST, p)
  if (!file.startsWith(DIST))
    return res.writeHead(403).end()
  // Sama dengan Cloudflare Pages: `/components` → components.html dulu, baru
  // components/index.html.
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
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
// Gambar luar (unsplash, randomuser) tidak dibutuhkan untuk audit — dan di
// sandbox tidak terjangkau. Diblokir supaya halaman tidak menunggu.
await context.route(url => !url.href.startsWith(base), route => route.abort())

const SCOPES = ['pages', 'blocks']
const scopeOf = p => p.startsWith('/view/') ? 'blocks' : 'pages'
const byRule = new Map()
const report = []
let done = 0
for (const p of pages) {
  const page = await context.newPage()
  try {
    await page.goto(base + p, { waitUntil: 'load', timeout: 30000 })
    await page.waitForTimeout(300)
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    for (const v of violations) {
      const entry = byRule.get(v.id) ?? { impact: v.impact, help: v.help, nodes: 0, pages: [] }
      entry.nodes += v.nodes.length
      entry.pages.push(p)
      byRule.set(v.id, entry)
      report.push({ page: p, rule: v.id, impact: v.impact, nodes: v.nodes.slice(0, 5).map(n => n.target.join(' ')) })
    }
  }
  catch (error) {
    report.push({ page: p, error: String(error).split('\n')[0] })
  }
  await page.close()
  if (++done % 25 === 0)
    console.log(`  ${done}/${pages.length} pages`)
}
await browser.close()
server.close()

fs.mkdirSync(path.dirname(REPORT), { recursive: true })
fs.writeFileSync(REPORT, `${JSON.stringify(report, null, 2)}\n`)

const audited = SCOPES.filter(scope => scope === 'pages' || args.has('--blocks'))
/** Jumlah halaman per aturan serious/critical, satu cakupan. */
const countsOf = scope => Object.fromEntries([...byRule]
  .filter(([, v]) => BLOCKING.has(v.impact))
  .map(([k, v]) => [k, v.pages.filter(p => scopeOf(p) === scope).length])
  .filter(([, n]) => n > 0)
  .sort())
const current = Object.fromEntries(audited.map(scope => [scope, countsOf(scope)]))

console.log(`\naxe: ${pages.length} pages, ${byRule.size} rules violated`)
for (const [id, v] of [...byRule].sort((a, b) => b[1].pages.length - a[1].pages.length))
  console.log(`  ${(v.impact ?? '').padEnd(8)} ${id.padEnd(28)} ${String(v.pages.length).padStart(4)} pages  ${v.help}`)
const errors = report.filter(r => r.error)
if (errors.length)
  console.log(`  ${errors.length} pages failed to load (see ${path.relative(ROOT, REPORT)})`)

const stored = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf-8')) : {}
const baseline = Object.fromEntries(SCOPES.map(scope => [scope, stored[scope] ?? {}]))

if (args.has('--update')) {
  fs.writeFileSync(BASELINE, `${JSON.stringify({ ...baseline, ...current }, null, 2)}\n`)
  console.log(`✔ baseline written (${audited.join(', ')}): ${path.relative(ROOT, BASELINE)}`)
  process.exit(0)
}

let failed = false
for (const scope of audited) {
  const worse = Object.entries(current[scope]).filter(([id, n]) => n > (baseline[scope][id] ?? 0))
  if (worse.length) {
    failed = true
    console.error(`✘ ${scope}: new serious/critical accessibility problems (pages per rule, baseline in scripts/a11y-baseline.json):`)
    for (const [id, n] of worse)
      console.error(`  ${id}: ${baseline[scope][id] ?? 0} → ${n}  (${byRule.get(id).pages.filter(p => scopeOf(p) === scope).slice(0, 5).join(', ')}…)`)
  }
  const better = Object.entries(baseline[scope]).filter(([id, n]) => (current[scope][id] ?? 0) < n)
  if (better.length)
    console.log(`↓ ${scope}: fewer problems than the baseline (${better.map(([id]) => id).join(', ')}): run with --update to lower it.`)
}
if (failed)
  process.exit(1)
console.log('✔ no new serious/critical accessibility problems.')
