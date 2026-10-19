// Menyusun `src/registry/component-catalog.json` — katalog yang dibaca situs.
//
// Bedanya dengan `scripts/component-sources.json`: yang di sana daftar yang HENDAK ada,
// yang di sini daftar yang SUDAH ada di repo. Keduanya sengaja terpisah. Kalau
// situs membaca daftar niat, halaman komponen yang belum ditulis tetap muncul
// di navigasi dan menggagalkan build dengan impor yang tidak ada — atau lebih
// buruk, muncul kosong tanpa keluhan apa pun.
//
// Tiap entri tinggal di rumahnya sendiri: komponen di `src/components/`,
// composable di `src/composables/`, fungsi murni di `src/lib/`. Foldernya
// dicari di ketiganya, dan jalurnya ikut dicatat supaya halaman dokumentasinya
// menyebut impor yang benar.
//
// Bagian-bagian tiap komponen dibaca dari `index.ts`-nya, bukan dari daftar
// yang ditulis tangan. Menambah satu bagian baru tidak menuntut siapa pun
// ingat memperbarui katalognya.
//
// Jalankan: npm run generate:component-catalog

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const HOMES = ['src/components', 'src/composables', 'src/lib']
const OUTPUT_FILE = path.join(ROOT, 'src/registry/component-catalog.json')

const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/component-sources.json'), 'utf-8'))

/** Nama komponen yang diekspor sebuah `index.ts`, urut sesuai isinya. */
function partsOf(folder) {
  const indexFile = path.join(folder, 'index.ts')
  if (!fs.existsSync(indexFile)) return []

  const content = fs.readFileSync(indexFile, 'utf-8')
  return [...content.matchAll(/export \{ default as (\w+) \}/g)].map(c => c[1])
}

const allEntries = [...catalog.components, ...catalog.utilities]

const entries = []
const missing = []

for (const entry of allEntries) {
  const home = HOMES.find(r => fs.existsSync(path.join(ROOT, r, entry.slug, 'index.ts')))

  // Folder yang isinya cuma fungsi — `composition` — tetap masuk katalog.
  // Yang tidak punya `index.ts` sama sekali belum jadi apa-apa.
  if (!home) {
    missing.push(entry.slug)
    continue
  }

  entries.push({
    slug: entry.slug,
    name: entry.name,
    category: entry.category,
    description: entry.description,
    weight: entry.weight,
    path: `${home}/${entry.slug}`,
    parts: partsOf(path.join(ROOT, home, entry.slug)),
  })
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(entries, null, 2)}\n`)

if (process.argv.includes('--check')) {
  console.log(`✔ ${entries.length} of ${allEntries.length} catalog components exist`)
  if (missing.length) console.log(`  missing: ${missing.join(', ')}`)
}
else {
  console.log(`✔ src/registry/component-catalog.json: ${entries.length} components, ${entries.reduce((n, d) => n + d.parts.length, 0)} parts`)
  if (missing.length) console.log(`  missing (${missing.length}): ${missing.join(', ')}`)
}
