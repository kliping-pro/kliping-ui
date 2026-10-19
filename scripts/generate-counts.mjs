// Menghitung isi registry dan menuliskannya ke tabel di README.
//
// Angka di README selalu benar sekali — saat ditulis — lalu ditinggalkan
// bertambah tuanya sendiri. Tabel isi di sana pernah menyebut 34 block ketika
// yang ada 236, dan tidak ada satu pun pemeriksa yang mengeluh.
//
// Skrip ini menghitungnya dari isi folder yang sesungguhnya, lalu mengganti
// baris tabelnya di antara dua penanda komentar. `--check` cuma
// membandingkan tanpa menulis, dan berhenti dengan kode 1 kalau berbeda —
// bentuk itu yang dipakai gerbang.
//
// Jalankan: npm run generate:counts
//           npm run check:counts

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')

const START_MARKER = '<!-- angka:mulai -->'
const END_MARKER = '<!-- angka:selesai -->'

const countDir = (relPath, keep = () => true) => {
  const fullPath = path.join(ROOT, relPath)
  if (!fs.existsSync(fullPath))
    return 0
  return fs.readdirSync(fullPath).filter(keep).length
}

const countRecursive = (relPath, suffix) => {
  const fullPath = path.join(ROOT, relPath)
  if (!fs.existsSync(fullPath))
    return 0

  let count = 0
  const walk = (d) => {
    for (const i of fs.readdirSync(d, { withFileTypes: true })) {
      const j = path.join(d, i.name)
      // `.vitepress/dist` memuat salinan mentah tiap halaman. Ikut terhitung,
      // jumlahnya jadi dua kali lipat — dan angka itu terlihat masuk akal,
      // yang justru membuatnya sulit disadari.
      // `_api/` (potongan API Reference) dan `public/llms/` (berkas untuk agen
      // AI) disusun saat build dan tidak di-commit — CI menghitung sebelum build.
      if (i.isDirectory() && !['.vitepress', 'node_modules', '_api', 'llms'].includes(i.name))
        walk(j)
      else if (i.name.endsWith(suffix))
        count += 1
    }
  }
  walk(fullPath)
  return count
}

const jsonLength = (relPath) => {
  const fullPath = path.join(ROOT, relPath)
  return fs.existsSync(fullPath) ? JSON.parse(fs.readFileSync(fullPath, 'utf-8')).length : 0
}

const counts = {
  'Komponen primitif (`src/components/ui/`)': countDir('src/components/ui'),
  'Block siap pakai (`src/blocks/`)': countDir('src/blocks', n =>
    fs.existsSync(path.join(ROOT, 'src/blocks', n, 'page.vue'))),
  'Varian komponen (`src/variants/`)': jsonLength('src/registry/variants.json'),
  'Template halaman utuh (`src/templates/`)': jsonLength('src/registry/templates.json'),
  'Komponen berkategori (`src/components/`)': jsonLength('src/registry/component-catalog.json'),
  'Composable (`src/composables/`)': countDir('src/composables', n =>
    n.endsWith('.ts') && !n.endsWith('.test.ts')),
  'Grafik (`src/charts/`)': countDir('src/charts', n => n.endsWith('.vue')),
  // Dihitung rekursif: subfolder yang kelak muncul di sini tidak boleh
  // terlewat tanpa bersuara — angka yang salah di tabel ini persis jenis
  // pembusukan yang skrip ini dibuat untuk cegah.
  'Contoh untuk dokumentasi (`src/demo/`)': countRecursive('src/demo', '.vue'),
  'Halaman dokumentasi (`docs/`)': countRecursive('docs', '.md'),
}

const table = [
  START_MARKER,
  '',
  '| | Jumlah |',
  '|---|---|',
  ...Object.entries(counts).map(([label, count]) => `| ${label} | ${count} |`),
  '',
  END_MARKER,
].join('\n')

const readmeFile = path.join(ROOT, 'README.md')
const content = fs.readFileSync(readmeFile, 'utf-8')

const start = content.indexOf(START_MARKER)
const end = content.indexOf(END_MARKER)
if (start === -1 || end === -1) {
  console.error(`✖ markers ${START_MARKER} / ${END_MARKER} not found in README.md`)
  process.exit(2)
}

const updated = content.slice(0, start) + table + content.slice(end + END_MARKER.length)

if (process.argv.includes('--check')) {
  if (updated !== content) {
    console.error('✖ the counts in README.md no longer match the repo.')
    console.error('  Run: npm run generate:counts')
    process.exit(1)
  }
  console.log('✔ the counts in README.md match the repo.')
}
else {
  fs.writeFileSync(readmeFile, updated)
  console.log('✔ README.md counts table updated:')
  for (const [label, count] of Object.entries(counts))
    console.log(`  ${String(count).padStart(4)}  ${label.replace(/ \(.*/, '')}`)
}
