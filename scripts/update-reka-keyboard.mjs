// Mengambil tabel "Keyboard Interactions" dari dokumentasi Reka UI ke
// src/registry/reka-keyboard.json, untuk bagian Keyboard Interactions halaman
// komponen Kliping (scripts/generate-api-reference.mjs).
//
// Komponen Kliping yang dibangun di atas primitif Reka UI mewarisi perilaku
// keyboard-nya apa adanya, jadi tabelnya diambil dari sumbernya — bukan ditulis
// ulang dan pelan-pelan berbeda. Reka UI: MIT, Copyright (c) 2023 UnoVue.
//
// Jalankan manual saat reka-ui diperbarui (butuh jaringan ke GitHub):
//
//   git clone --depth 1 --filter=blob:none --sparse https://github.com/unovue/reka-ui /tmp/reka
//   git -C /tmp/reka sparse-checkout set docs/content/docs/components
//   node scripts/update-reka-keyboard.mjs /tmp/reka

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const OUTPUT = path.join(ROOT, 'src/registry/reka-keyboard.json')
const repo = process.argv[2]
if (!repo || !fs.existsSync(path.join(repo, 'docs/content/docs/components'))) {
  console.error('Usage: node scripts/update-reka-keyboard.mjs <path to a reka-ui clone>')
  process.exit(1)
}

/** Teks polos dari deskripsi berisi markup Vue/HTML Reka (`<Kbd>`, `<Code>`, `<br />`). */
const plain = s => s
  .replace(/\\'/g, '\'')
  .replace(/<(Kbd|Code|code|kbd)>([\s\S]*?)<\/\1>/g, '`$2`')
  .replace(/<br\s*\/?>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim()

const dir = path.join(repo, 'docs/content/docs/components')
const components = {}
for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()) {
  const md = fs.readFileSync(path.join(dir, file), 'utf-8')
  const heading = md.search(/^#{2,3} Keyboard Interactions\s*$/m)
  if (heading < 0)
    continue
  const section = md.slice(heading).split(/\n#{1,3} (?!Keyboard)/)[0]
  const rows = []
  // Sebagian halaman memakai tabel markdown biasa: | `Key` | Description |
  for (const line of section.split('\n')) {
    const cells = line.match(/^\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|\s*$/)
    if (cells)
      rows.push({ keys: [cells[1]], description: plain(cells[2]) })
  }
  const start = section.indexOf('<KeyboardTable')
  const end = section.indexOf(']"', start)
  const table = start < 0 || end < 0 ? '' : section.slice(start, end)
  // Deskripsi ditulis dengan kutip tunggal, ganda, atau template string.
  for (const m of table.matchAll(/keys:\s*\[([^\]]*)\][\s\S]*?description:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`([\s\S]*?)`)/g)) {
    const keys = [...m[1].matchAll(/['"]([^'"]*)['"]/g)].map(k => k[1])
    if (keys.length)
      rows.push({ keys, description: plain(m[2] ?? m[3] ?? m[4]) })
  }
  if (rows.length)
    components[file.replace(/\.md$/, '')] = rows
}

const commit = execFileSync('git', ['-C', repo, 'rev-parse', '--short', 'HEAD']).toString().trim()
fs.writeFileSync(OUTPUT, `${JSON.stringify({
  source: { repo: 'https://github.com/unovue/reka-ui', commit, license: 'MIT, Copyright (c) 2023 UnoVue' },
  components,
}, null, 2)}\n`)
console.log(`✔ reka-keyboard.json — ${Object.keys(components).length} components (reka-ui ${commit})`)
