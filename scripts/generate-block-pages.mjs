// Menyusun seluruh halaman Blocks dari `src/registry/block-gallery.json`.
//
// Empat jenis halaman, semuanya diturunkan dari data yang sama:
//
//   /blocks/<kategori>       grid thumbnail berpaginasi — ringan, cuma gambar
//   /blocks/<kategori>/all   semua block kategori itu sebagai pratinjau live
//   /blocks/<nama>           halaman detail satu block: Preview, Code, Install
//   /view/<nama>             kanvas polos, yang dimuat iframe di tiga halaman di atas
//
// Grid dan "all" sengaja dua halaman. Pratinjau live adalah satu iframe per
// block, dan tiap iframe merender halaman utuh; kategori dengan tiga puluh block
// berarti tiga puluh halaman dimuat sekaligus. Grid memuat dua belas gambar,
// dan yang ingin melihat semuanya hidup tinggal membuka "all".
//
// Galerinya ditulis tangan — urutan isinya pilihan, bukan urutan abjad — jadi
// yang ditulis skrip ini cuma halamannya. Menambah block cukup menambahkannya
// ke galerinya lalu menjalankan skrip ini (otomatis lewat `predocs:build`).
//
// Jalankan: npm run generate:blocks

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DOCS_DIR = path.join(ROOT, 'docs')
const gallery = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/block-gallery.json'), 'utf-8'))
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/blocks.json'), 'utf-8'))
const descriptions = new Map(registry.map(b => [b.name, b.description]))

const blocks = fs.readdirSync(path.join(ROOT, 'src/blocks'))
  .filter(n => fs.existsSync(path.join(ROOT, 'src/blocks', n, 'page.vue')))
  .sort()

const write = (relPath, content) => {
  const filePath = path.join(DOCS_DIR, relPath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8') !== content)
    fs.writeFileSync(filePath, content)
}

const frontmatter = (data) => {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`)
  return `---\n${lines.join('\n')}\n---\n\n`
}

// Galeri yang tidak menyebut sebuah block membuatnya tak terjangkau dari nav.
const listed = new Set(gallery.flatMap(g => g.items))
const orphans = blocks.filter(n => !listed.has(n))
const unknown = [...listed].filter(n => !blocks.includes(n))
if (unknown.length)
  throw new Error(`Gallery lists blocks that are not in src/blocks: ${unknown.join(', ')}`)

for (const n of blocks) {
  // Kanvas: block-nya sendiri, tanpa kerangka situs.
  write(`view/${n}.md`, `${frontmatter({ title: n, layout: false })}<script setup>\nimport Block from '@/blocks/${n}/page.vue'\n</script>\n\n<BlockCanvas><Block /></BlockCanvas>\n`)

  // Detail: Preview, Code, Install, dan Previous/Next di galerinya.
  write(`blocks/${n}.md`, `${frontmatter({ title: n, description: descriptions.get(n) ?? n, layout: false })}<BlockDetail name="${n}" />\n`)
}

for (const g of gallery) {
  const data = { title: g.title, description: g.description, layout: 'page' }
  write(`blocks/${g.slug}.md`, `${frontmatter(data)}<BlockPage>\n\n<BlockGrid category="${g.slug}" />\n\n</BlockPage>\n`)
  write(`blocks/${g.slug}/all.md`, `${frontmatter(data)}<BlockPage>\n\n${g.items.map(n => `<BlockViewer name="${n}" />`).join('\n\n')}\n\n</BlockPage>\n`)
}

console.log(`✔ ${blocks.length} blocks: /view canvases, detail pages, and ${gallery.length} galleries (grid + all)`)
if (orphans.length)
  console.log(`  not in any gallery yet (${orphans.length}): ${orphans.join(', ')}`)
