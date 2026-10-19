// Menyusun seluruh halaman Charts dari `src/registry/chart-gallery.json`.
//
// Alurnya sama dengan Blocks (`generate-block-pages.mjs`), halaman demi halaman:
//
//   /charts                     indeks: satu kartu per jenis grafik
//   /charts/<jenis>             grid thumbnail berpaginasi — ringan, cuma gambar
//   /charts/<jenis>/all         semua grafik jenis itu sebagai pratinjau live,
//                               dengan gagang pengubah lebar seperti block
//   /charts/<nama>              halaman detail satu grafik: Preview, Code, Install
//   /view/charts/<nama>         kanvas polos, yang dimuat iframe dua halaman di atas
//
// `<nama>` adalah nama grafiknya dalam kebab-case — `ChartBarDefault` jadi
// `chart-bar-default` — nama yang sama dengan yang dipakai hulu. Berkasnya
// sendiri tetap `src/charts/ChartBarDefault.vue`.
//
// Pratinjaunya iframe, bukan grafik yang digambar langsung di halaman, karena
// alasan yang sama dengan block: yang ingin dilihat adalah bagaimana grafiknya
// menata ulang dirinya di layar sempit, dan itu baru terlihat kalau jendelanya
// benar-benar menyempit.
//
// Galerinya ditulis tangan, jadi yang ditulis skrip ini cuma halamannya.
// Menambah grafik cukup menambahkannya ke galerinya lalu menjalankan skrip ini
// (otomatis lewat `predocs:build`).
//
// Jalankan: npm run generate:charts

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, usedComponents } from './source-imports.mjs'

const DOCS_DIR = path.join(ROOT, 'docs')
const gallery = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/chart-gallery.json'), 'utf-8'))
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/blocks.json'), 'utf-8'))
const descriptions = new Map(registry.map(b => [b.name, b.description]))

const charts = fs.readdirSync(path.join(ROOT, 'src/charts'))
  .filter(n => n.endsWith('.vue'))
  .map(n => n.replace(/\.vue$/, ''))
  .sort()

/** `ChartBarDefault` → `chart-bar-default`. Sama dengan `chartSlug()` di `src/lib/blocks.ts`. */
const kebab = name => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

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

const listed = new Set(gallery.flatMap(g => g.items))
const orphans = charts.filter(n => !listed.has(n))
const unknown = [...listed].filter(n => !charts.includes(n))
if (unknown.length)
  throw new Error(`Gallery lists charts that are not in src/charts: ${unknown.join(', ')}`)

const collisions = charts.map(kebab).filter(n => gallery.some(g => g.slug === n))
if (collisions.length)
  throw new Error(`Chart names collide with their kind: ${collisions.join(', ')}`)

const used = new Map(charts.map(n => [n, usedComponents([path.join(ROOT, 'src/charts', `${n}.vue`)])]))

for (const n of charts) {
  // Kanvas: grafiknya saja. Digambar di peramban saja — alasannya ada di
  // ComponentPreview.vue: Unovis mengukur wadahnya, dan di server tidak ada
  // wadah yang bisa diukur.
  write(`view/charts/${kebab(n)}.md`, `${frontmatter({ title: kebab(n), layout: false })}<script setup>\nimport Chart from '@/charts/${n}.vue'\n</script>\n\n<BlockCanvas layout="chart"><ClientOnly><Chart /></ClientOnly></BlockCanvas>\n`)

  write(`charts/${kebab(n)}.md`, `${frontmatter({ title: kebab(n), description: descriptions.get(n) ?? n, layout: false })}<BlockDetail kind="chart" name="${n}" :uses='${JSON.stringify(used.get(n))}' />\n`)
}

for (const g of gallery) {
  const data = { title: g.title, description: g.description, layout: 'page' }
  write(`charts/${g.slug}.md`, `${frontmatter(data)}<ChartPage>\n\n<BlockGrid kind="chart" category="${g.slug}" />\n\n</ChartPage>\n`)
  write(`charts/${g.slug}/all.md`, `${frontmatter(data)}<ChartPage>\n\n${g.items.map(n => `<BlockViewer kind="chart" name="${n}" :uses='${JSON.stringify(used.get(n))}' />`).join('\n\n')}\n\n</ChartPage>\n`)
}

write('charts.md', `${frontmatter({
  title: 'Beautiful Charts',
  description: 'Kumpulan komponen grafik siap pakai, dibangun di atas Unovis. Dari grafik dasar sampai tampilan data yang kaya — salin dan tempel ke aplikasi Anda.',
  layout: 'page',
})}<ChartPage>\n\n<AllBlocks kind="chart" />\n\n</ChartPage>\n`)

console.log(`✔ ${charts.length} charts: /view/charts canvases, detail pages, and ${gallery.length} kinds (grid + all) + index`)
if (orphans.length)
  console.log(`  not in any gallery yet (${orphans.length}): ${orphans.join(', ')}`)
