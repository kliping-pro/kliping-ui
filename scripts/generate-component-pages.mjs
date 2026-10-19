// Menyusun halaman dokumentasi untuk komponen berkategori di katalog.
//
//   docs/components/{slug}.md   satu halaman per komponen
//
// Halamannya tinggal di folder yang sama dengan halaman komponen primitif, dan
// ditandai `catalog: true` di frontmatter-nya. Tanda itu satu-satunya yang
// membedakan keduanya — dan satu-satunya yang boleh dibuang skrip ini. Halaman
// primitif ditulis tangan; menghapusnya karena tidak ada di katalog berarti
// menghapus dokumentasi yang tidak bisa disusun ulang.
//
// Indeksnya, `docs/components.md`, tidak disusun di sini: halaman itu milik
// seluruh komponen, bukan cuma yang di katalog.
//
// Bagian "Penggunaan" disusun dari daftar bagian yang benar-benar diekspor
// `index.ts`, jadi contoh impornya tidak akan pernah menyebut nama yang tidak
// ada. Yang tidak disusun otomatis isinya: demo tiap komponen ditulis tangan di
// `src/demo/`, dan halaman yang demonya belum ada tetap terbit tanpa
// pratinjau, bukan dengan pratinjau kosong yang tidak jelas rusak atau tidak.
//
// Jalankan: npm run generate:components

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { klipingAdd } from '../docs/.vitepress/kliping-command.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const CATALOG_FILE = path.join(ROOT, 'src/registry/component-catalog.json')
const OUTPUT_DIR = path.join(ROOT, 'docs/components')
const DEMO_DIR = path.join(ROOT, 'src/demo')
const CATALOG_MARKER = /^catalog:\s*true\s*$/m

const components = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'))
// Hanya butir yang benar-benar ada di registry yang diberi perintah pasang.
const registryNames = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8')).items.map(i => i.name))

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const demoName = slug => `${slug.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('')}Demo`
const pascal = slug => slug.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('')

// Contoh tambahan tiap komponen: `src/demo/<Komponen>…Demo.vue` yang baris
// pertamanya `<!-- example: 2. With Dynamic Overlay -->` (urutan & judul). Sebuah
// demo hanya milik komponen dengan nama terpanjang yang cocok — `StatusDemo`
// bukan contoh `Stat`, `ListboxDemo` bukan contoh `List`.
const allPascal = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8')).items
  .filter(i => i.type === 'registry:ui').map(i => pascal(i.name))
function examplesOf(slug) {
  const own = pascal(slug)
  const longer = allPascal.filter(n => n !== own && n.startsWith(own))
  return fs.readdirSync(DEMO_DIR)
    .filter(f => f.startsWith(own) && f.endsWith('Demo.vue') && f !== `${own}Demo.vue` && !longer.some(n => f.startsWith(n)))
    .map((f) => {
      const header = fs.readFileSync(path.join(DEMO_DIR, f), 'utf-8').match(/^<!--\s*example:\s*(\d+)\.\s*(.+?)\s*-->/)
      return header ? { name: f.replace(/\.vue$/, ''), order: Number(header[1]), title: header[2] } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
}

/** Halaman katalog lama yang komponennya sudah tidak ada lagi ikut dibuang. */
const current = new Set(components.map(d => `${d.slug}.md`))
for (const file of fs.readdirSync(OUTPUT_DIR)) {
  if (!file.endsWith('.md') || current.has(file))
    continue
  if (CATALOG_MARKER.test(fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf-8')))
    fs.rmSync(path.join(OUTPUT_DIR, file))
}

for (const d of components) {
  const demo = demoName(d.slug)
  const hasDemo = fs.existsSync(path.join(DEMO_DIR, `${demo}.vue`))
  // Bentuk di project pemakai, bukan di repo ini: CLI memasang tiap komponen
  // Kliping ke `components/ui/<nama>/`, dengan nama berkas kebab-case.
  const importPath = `@/components/ui/${d.slug}`

  const lines = [
    '---',
    `title: ${JSON.stringify(d.name)}`,
    `description: ${JSON.stringify(d.description)}`,
    'catalog: true',
    '---',
    '',
  ]

  if (hasDemo) lines.push(`<ComponentPreview name="${demo}" />`, '')

  lines.push(
    '## Installation',
    '',
    ...(registryNames.has(d.slug)
      ? ['```bash', klipingAdd(d.slug), '```']
      : [`Belum tersedia lewat CLI. Salin berkasnya dari [\`${d.path}\`](https://github.com/kliping-pro/kliping-ui/tree/main/${d.path}) ke project Anda.`]),
    '',
  )

  if (d.parts.length) {
    lines.push(
      '## Usage',
      '',
      '```vue',
      '<script setup lang="ts">',
      `import { ${d.parts.join(', ')} } from '${importPath}'`,
      '</script>',
      '```',
      '',
    )
  }

  const examples = examplesOf(d.slug)
  if (examples.length) {
    lines.push('## Examples', '')
    for (const ex of examples)
      lines.push(`### ${ex.title}`, '', `<ComponentPreview name="${ex.name}" />`, '')
  }

  // Requirements + API Reference (props, events, slots, data-*) disusun dari
  // kodenya oleh scripts/generate-api-reference.mjs.
  lines.push(`<!--@include: ./_api/${d.slug}.md-->`, '')

  fs.writeFileSync(path.join(OUTPUT_DIR, `${d.slug}.md`), `${lines.join('\n')}`)
}

const withoutDemo = components.filter(d => !fs.existsSync(path.join(DEMO_DIR, `${demoName(d.slug)}.vue`)))

console.log(`✔ ${components.length} catalog component pages generated`)
if (withoutDemo.length) console.log(`  no demo yet (${withoutDemo.length}): ${withoutDemo.map(d => d.slug).join(', ')}`)
