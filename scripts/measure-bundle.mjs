// Mengukur berapa banyak kode yang mendarat di project orang untuk tiap item
// registry.
//
// Kenapa ini ada: bobot yang tidak diukur selalu naik, tidak pernah turun.
// Sebuah block yang bertambah satu ikon, satu pembungkus, dan satu utilitas
// kecil tidak pernah terasa berat saat ditulis — beratnya baru terasa oleh
// orang yang memasang dua puluh block.
//
// APA YANG DIUKUR
// Ukuran gzip dari berkas milik item itu sendiri, ditambah seluruh
// @kliping/* yang ditariknya secara berantai. Untuk registry bergaya shadcn
// angka inilah yang paling jujur: kodenya disalin ke repo orang, bukan
// dipasang sebagai paket, jadi yang mereka tanggung memang sebesar sumbernya.
//
// APA YANG TIDAK DIUKUR — dan ini harus diingat saat membaca hasilnya
// Berat paket npm di `dependencies`. `motion-v` tidak bisa ditimbang dari sini
// tanpa memasangnya lebih dulu, jadi paketnya disebut namanya saja. Sebuah item
// yang lolos anggaran tapi menarik satu paket besar tetap mahal; kolom "npm"
// yang memberi tahu itu.
//
// Anggarannya titik awal, bukan hukum. Setel ulang dari hasil pengukuran
// pertama, lalu perlakukan sebagai batas.
//
// Jalankan: npm run measure:bundle

import { gzipSync } from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const REGISTRY_FILE = path.join(ROOT, 'registry.json')

/**
 * Anggaran per jenis, dalam byte gzip. Lihat §3.1 di KLIPING-ROADMAP-FOUNDATION.md.
 *
 * Angka `registry:hook` sudah disetel ulang sekali, dari 3 KB, memakai
 * pengukuran nyata pertama alih-alih tebakan. Dasarnya:
 *
 *   useEventListener — 101 baris + 2 rantai = 2,3 KB gzip
 *   → sekitar 23 byte gzip per baris, dengan gaya komentar repo ini
 *
 * Composable terbesar yang akan datang adalah useFullscreen: 309 baris di
 * sumbernya, dan setelah rantainya diciutkan (enam dari tujuh dependensinya
 * jatuh ke Kelas B dan tidak ikut dikirim) tersisa sekitar 350 baris bersama
 * useEventListener, target, dan is-browser. Itu ± 8 KB.
 *
 * Jadi 8 KB, bukan 3 KB. Anggaran adalah langit-langit untuk menangkap
 * pertumbuhan liar, bukan ukuran ideal tiap item — menyetelnya seketat item
 * terkecil cuma memaksa orang berikutnya menaikkannya tanpa berpikir.
 */
const BUDGETS = {
  'registry:lib': 2 * 1024,
  'registry:hook': 8 * 1024,
  'registry:component': 5 * 1024,
  'registry:ui': 10 * 1024,
  'registry:block': 30 * 1024,
}

const DEFAULT_BUDGET = 30 * 1024

/**
 * Batas atas per item untuk yang memang lebih berat dari anggaran jenisnya —
 * dikunci di ukuran saat diukur (19 Okt 2026), dibulatkan ke 0,5 KB di atasnya.
 * Item ini boleh tetap seberat sekarang, tapi tidak boleh tumbuh lagi; yang
 * menyusut boleh menurunkan angkanya. Item baru tidak masuk sini tanpa alasan.
 */
const CEILINGS = {
  // Komponen bermulti-bagian: 8–15 bagian yang bicara lewat context.
  'questionnaire': [13 * 1024, 'multi-part form flow (steps, choices, validation)'],
  'media-player': [11.5 * 1024, 'multi-part player (controls, seek, volume, time maths)'],
  'map': [10.5 * 1024, 'multi-part map (markers, popups, clusters, controls)'],
  'cropper': [10.5 * 1024, 'multi-part cropper with tested crop maths'],
  'ai-chat': [10.5 * 1024, 'chat thread, messages, reasoning, tool calls, attachments'],
  'phone-input': [11.5 * 1024, 'country picker on command + popover; 239-row country table'],
  'data-table-advanced': [15.5 * 1024, 'filters, pagination, view options on table, select, command, dropdown-menu'],
  // Koleksi: tiap logo SVG berdiri sendiri; dipakai sebagian pun terpasang semua.
  'logos': [15 * 1024, 'collection of SVG logos'],
  // Varian yang berat karena primitif bersama (dropdown-menu, select, field) —
  // dibayar sekali per project, bukan per varian.
  'table-09': [6.5 * 1024, 'data table with dropdown-menu and checkbox'],
  'table-10': [8 * 1024, 'data table with dropdown-menu, select and checkbox'],
  'table-11': [7 * 1024, 'data table with dropdown-menu and checkbox'],
  'select-07': [5.5 * 1024, 'select inside field'],
}

if (!fs.existsSync(REGISTRY_FILE)) {
  console.error('✘ registry.json not found.')
  process.exit(1)
}

const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'))
const items = registry.items ?? []
const byName = new Map(items.map(i => [i.name, i]))

/** Seluruh item yang ikut terpasang bersama sebuah item, termasuk dirinya. */
function chain(name, seen = new Set()) {
  if (seen.has(name))
    return seen
  seen.add(name)

  for (const dep of byName.get(name)?.registryDependencies ?? []) {
    if (dep.startsWith('@kliping/'))
      chain(dep.slice('@kliping/'.length), seen)
  }
  return seen
}

/** Paket npm yang ikut terpasang bersama sebuah rantai. */
function npmPackages(names) {
  const packages = new Set()
  for (const name of names) {
    for (const d of byName.get(name)?.dependencies ?? [])
      packages.add(d)
  }
  return [...packages].sort()
}

function gzipSizeOf(names) {
  const chunks = []
  for (const name of names) {
    for (const b of byName.get(name)?.files ?? []) {
      const filePath = path.join(ROOT, b.path)
      if (fs.existsSync(filePath))
        chunks.push(fs.readFileSync(filePath))
    }
  }
  // Digabung dulu baru dimampatkan: itu yang mendekati kenyataan, karena
  // berkas-berkasnya mendarat di project yang sama dan berbagi kosakata.
  return gzipSync(Buffer.concat(chunks)).length
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

const results = []
for (const it of items) {
  const chainNames = [...chain(it.name)]
  const bytes = gzipSizeOf(chainNames)
  const ceiling = CEILINGS[it.name]?.[0]
  const budget = ceiling ?? BUDGETS[it.type] ?? DEFAULT_BUDGET
  results.push({
    ceiling: Boolean(ceiling),
    name: it.name,
    type: it.type,
    bytes,
    budget,
    chained: chainNames.length - 1,
    npm: npmPackages(chainNames),
    over: bytes > budget,
  })
}

results.sort((a, b) => b.bytes - a.bytes)

const width = 78
console.log('─'.repeat(width))
console.log(`Weight of ${items.length} registry items — gzip, source + @kliping chain`)
console.log('─'.repeat(width))
console.log(
  `${'item'.padEnd(26)}${'gzip'.padStart(9)}${'budget'.padStart(11)}${'chain'.padStart(6)}  npm`,
)
console.log('─'.repeat(width))

for (const h of results) {
  const marker = h.over ? '✘' : ' '
  console.log(
    `${marker} ${h.name.padEnd(24)}${kb(h.bytes).padStart(9)}${(kb(h.budget) + (h.ceiling ? '*' : '')).padStart(11)}`
    + `${String(h.chained).padStart(6)}  ${h.npm.join(', ')}`,
  )
}

console.log('─'.repeat(width))

const overBudget = results.filter(h => h.over)
const total = results.reduce((n, h) => n + h.bytes, 0)
console.log(`Largest: ${results[0]?.name ?? '—'} (${kb(results[0]?.bytes ?? 0)})`)
console.log(`All registry sources: ${kb(total)} gzip`)
console.log(`* per-item ceiling (${Object.keys(CEILINGS).length} items) — see CEILINGS in this script`)
console.log('─'.repeat(width))

if (overBudget.length) {
  console.log(`✘ ${overBudget.length} items over budget:`)
  for (const h of overBudget)
    console.log(`  ${h.name} — ${kb(h.bytes)} > ${kb(h.budget)}`)
  console.log('\nReduce the weight, or reset the budget in this script')
  console.log('and in §3.1 — but reset it for a reason, not to turn it green.')
}
else {
  console.log('✔ All items within budget.')
}

process.exit(overBudget.length === 0 ? 0 : 1)
