// Menyusun seluruh halaman Variants dari `src/registry/variants.json`.
//
// Alurnya sama dengan Blocks (`generate-block-pages.mjs`), halaman demi halaman:
//
//   /variants                   indeks: satu kartu per komponen
//   /variants/<komponen>        grid thumbnail berpaginasi — ringan, cuma gambar
//   /variants/<komponen>/all    semua varian komponen itu sebagai pratinjau live
//   /variants/<nama>            halaman detail satu varian: Preview, Code, Install
//   /view/variants/<nama>        kanvas polos, yang dimuat iframe halaman detail
//
// Kanvasnya di bawah `variants/`, bukan langsung di `/view`: nama varian dan
// nama block bisa sama persis — `button-01` ada di keduanya.
//
// Isinya diturunkan seluruhnya dari registry-nya, jadi menambah satu varian
// cukup mengangkutnya lalu menjalankan skrip ini (otomatis lewat
// `predocs:build`). Thumbnail-nya dipotret terpisah: `npm run generate:thumbnails
// -- --kind variants`.
//
// Tiap halaman mengimpor variannya sendiri lewat `<script setup>`, bukan lewat
// satu `import.meta.glob` di komponen temanya. Bedanya besar: glob di tema
// menyeret ketiga ratus varian beserta pohon komponennya ke chunk yang dipakai
// SETIAP halaman, termasuk halaman yang tidak menampilkan satu varian pun.
// Diimpor per halaman, tiap potongan bundel cuma memuat variannya sendiri —
// pelajaran yang sama yang sudah dibayar sekali di halaman block.
//
// Jalankan: npm run generate:variants

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, helperFiles, usedComponents } from './source-imports.mjs'

const VARIANTS_FILE = path.join(ROOT, 'src/registry/variants.json')
const OUTPUT_DIR = path.join(ROOT, 'docs/variants')

const variants = JSON.parse(fs.readFileSync(VARIANTS_FILE, 'utf-8'))

const components = [...new Set(variants.map(v => v.component))].sort()

// Singkatan ditulis kapital penuh — `input-otp` jadi Input OTP, bukan Input Otp.
const ACRONYMS = new Set(['otp'])
const titleOf = name => name.split('-').map(b => ACRONYMS.has(b) ? b.toUpperCase() : b[0].toUpperCase() + b.slice(1)).join(' ')

/** Nama pengenal untuk impornya — `button-01` jadi `Button01`. */
const identifierOf = name => name.split('-').map(b => b[0].toUpperCase() + b.slice(1)).join('')

// Keterangan tiap halaman ditulis tangan; yang belum ditulis jatuh ke kalimat
// bawaan berisi cacah variannya — benar, tapi tidak memberi tahu apa pun, dan
// itu justru yang membuatnya terlihat perlu diganti.
const DESCRIPTIONS = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/variant-descriptions.json'), 'utf-8'),
)

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

/** Menulis sebuah halaman, dan cuma kalau isinya berubah — supaya server dev tidak memuat ulang sia-sia. */
const write = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8') !== content)
    fs.writeFileSync(filePath, content)
}

const frontmatter = (data) => {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`)
  return `---\n${lines.join('\n')}\n---\n\n`
}

// Halaman detail dan kanvas, satu pasang per varian.
for (const v of variants) {
  const file = path.join(ROOT, 'src/variants', v.component, `${v.name}.vue`)
  const used = usedComponents([file, ...helperFiles(file)])

  write(
    path.join(ROOT, 'docs/view/variants', `${v.name}.md`),
    `${frontmatter({ title: v.name, layout: false })}<script setup>\nimport Variant from '@/variants/${v.component}/${v.name}.vue'\n</script>\n\n<BlockCanvas layout="component"><Variant /></BlockCanvas>\n`,
  )
  write(
    path.join(OUTPUT_DIR, `${v.name}.md`),
    `${frontmatter({ title: v.name, description: v.description, layout: false })}<BlockDetail kind="variant" name="${v.name}" :uses='${JSON.stringify(used)}' />\n`,
  )
}

for (const k of components) {
  const componentVariants = variants.filter(v => v.component === k)

  const imports = componentVariants
    .map(v => `import ${identifierOf(v.name)} from '@/variants/${k}/${v.name}.vue'`)
    .join('\n')

  const itemsMarkup = componentVariants
    .map(v => `<VariantItem name="${v.name}" description="${v.description.replace(/"/g, '&quot;')}"><${identifierOf(v.name)} /></VariantItem>`)
    .join('\n\n')

  const description = DESCRIPTIONS[k] ?? `${componentVariants.length} varian ${titleOf(k)}.`

  // Halaman kategorinya: grid thumbnail, sama dengan halaman kategori Blocks.
  write(
    path.join(OUTPUT_DIR, `${k}.md`),
    `${frontmatter({ title: titleOf(k), description, layout: 'page' })}<VariantPage>\n\n<BlockGrid kind="variant" category="${k}" />\n\n</VariantPage>\n`,
  )

  // Halaman "all": seluruh variannya hidup, digambar langsung di halaman.
  const page = [
    '---',
    `title: ${titleOf(k)}`,
    // Dikutip: keterangannya memuat titik dua, dan YAML membaca `a: b` sebagai
    // pasangan kunci-nilai — frontmatternya gagal diurai, dan buildnya berhenti
    // dengan pesan yang menyebut YAML, bukan berkas markdownnya.
    `description: ${JSON.stringify(description)}`,
    'layout: page',
    '---',
    '',
    '<script setup>',
    imports,
    '</script>',
    '',
    '<VariantPage>',
    '',
    itemsMarkup,
    '',
    '</VariantPage>',
    '',
  ].join('\n')

  write(path.join(OUTPUT_DIR, k, 'all.md'), page)
}

// Indeksnya: satu kartu per komponen, dengan cacah variannya — komponen yang
// sama dengan indeks Blocks, jadi kartunya dihitung dari galeri yang sama
// dengan sidebar.
const index = [
  '---',
  'title: Component Variants',
  `description: ${JSON.stringify(`${variants.length} cara memakai ${components.length} komponen, dari yang paling polos sampai yang paling jauh dari bawaannya.`)}`,
  'layout: page',
  '---',
  '',
  '<VariantPage>',
  '',
  '<AllBlocks kind="variant" />',
  '',
  '</VariantPage>',
  '',
].join('\n')

write(path.join(ROOT, 'docs/variants.md'), index)

console.log(`✔ ${variants.length} variants: /view/variants canvases, detail pages, and ${components.length} components (grid + all) + index`)
