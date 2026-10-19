// Mengurai tiap SFC block dengan kompilator Vue yang sesungguhnya.
//
// `vue-tsc` memeriksa tipe, bukan template. Ungkapan yang salah di dalam
// atribut — kurung tidak seimbang, sisa sintaks JSX — lolos begitu saja darinya
// dan baru meledak di `docs:build`, satu galat per build, tiga menit sekali.
//
// Pemeriksa ini menguraikan semuanya sekaligus dan melaporkan seluruh
// masalahnya dalam hitungan detik.
//
// Jalankan: npm run check:sfc

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { compileTemplate, parse } from 'vue/compiler-sfc'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
// Block, varian, dan template sama-sama hasil `ubah-block.mjs`, jadi ketiganya
// bisa gagal dengan cara yang sama. Komponen di `src/components/` datang dari
// konverter yang berbeda — tapi jenis kegagalannya persis sama, karena
// keduanya sama-sama menyusun teks templat, bukan pohon sintaks.
const DIRS = ['src/blocks', 'src/variants', 'src/templates', 'src/components'].map(d => path.join(ROOT, d))

const files = []
const walk = (d) => {
  for (const i of fs.readdirSync(d, { withFileTypes: true })) {
    const j = path.join(d, i.name)
    if (i.isDirectory()) walk(j)
    else if (i.name.endsWith('.vue')) files.push(j)
  }
}
for (const d of DIRS) {
  if (fs.existsSync(d)) walk(d)
}

const problems = []

for (const b of files) {
  const source = fs.readFileSync(b, 'utf-8')
  const relPath = path.relative(ROOT, b)

  try {
    const { descriptor, errors } = parse(source, { filename: b })
    for (const e of errors)
      problems.push(`${relPath}: ${e.message}`)

    if (descriptor.template) {
      const compiled = compileTemplate({
        source: descriptor.template.content,
        filename: b,
        id: relPath,
      })
      for (const e of compiled.errors)
        problems.push(`${relPath}: ${typeof e === 'string' ? e : e.message}`)
    }
  }
  catch (e) {
    problems.push(`${relPath}: ${e.message}`)
  }
}

const rule = '─'.repeat(78)
console.log(rule)
console.log(`SFC blocks, variants, templates & components — ${files.length} files parsed`)
console.log(rule)

if (problems.length) {
  for (const g of problems)
    console.error(`✖ ${g}`)
  console.error(`\n${problems.length} problems.`)
  process.exit(1)
}

console.log('✔ All SFCs parse.')
