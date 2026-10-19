// Menyusun halaman dokumentasi untuk template.
//
// Dua bentuk halaman, dan keduanya sudah dipakai di tempat lain di situs ini:
//
//   docs/templates.md          indeks berkartu, seperti /variants
//   docs/templates/{slug}.md   kanvas `layout: false`, seperti halaman block
//   docs/templates/{slug}/preview.md  halaman detail, seperti /blocks/<nama>
//
// Kanvasnya bukan pilihan gaya. Sebuah template adalah halaman utuh dengan
// navbar-nya sendiri, dan sebagian bagiannya memakai posisi `sticky` maupun
// `fixed` — digambar di dalam kolom dokumentasi, keduanya lolos dari
// pembungkusnya dan menimpa kerangka situsnya. Dengan `layout: false`
// halamannya berdiri sendiri, dan indeksnya membingkainya lewat iframe.
//
// Jalankan: npm run generate:templates

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { usedComponents } from './source-imports.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const TEMPLATES_FILE = path.join(ROOT, 'src/registry/templates.json')
const OUTPUT_DIR = path.join(ROOT, 'docs/templates')

const templates = JSON.parse(fs.readFileSync(TEMPLATES_FILE, 'utf-8'))

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

for (const t of templates) {
  const page = [
    '---',
    `title: ${JSON.stringify(t.name)}`,
    'layout: false',
    '---',
    '',
    '<script setup>',
    `import Template from '@/templates/${t.slug}/page.vue'`,
    '</script>',
    '',
    '<BlockCanvas><Template /></BlockCanvas>',
    '',
  ].join('\n')

  fs.writeFileSync(path.join(OUTPUT_DIR, `${t.slug}.md`), page)

  // Halaman detail, pola Blocks: kanvas di atas dimuat iframe, ditambah tab
  // Code, Install, dan Previous/Next ke template lain. `uses` adalah komponen
  // registry yang diimpor seluruh berkas template-nya — itulah yang dipasang.
  const files = []
  const walk = (dir) => {
    for (const i of fs.readdirSync(dir, { withFileTypes: true })) {
      const j = path.join(dir, i.name)
      if (i.isDirectory())
        walk(j)
      else if (/\.(vue|ts)$/.test(i.name))
        files.push(j)
    }
  }
  walk(path.join(ROOT, 'src/templates', t.slug))
  fs.mkdirSync(path.join(OUTPUT_DIR, t.slug), { recursive: true })
  fs.writeFileSync(path.join(OUTPUT_DIR, t.slug, 'preview.md'), [
    '---',
    `title: ${JSON.stringify(`${t.name} preview`)}`,
    `description: ${JSON.stringify(t.description)}`,
    'layout: false',
    '---',
    '',
    `<BlockDetail kind="template" name="${t.slug}" :uses='${JSON.stringify(usedComponents(files))}' />`,
    '',
  ].join('\n'))
}

const index = [
  '---',
  'title: Templates',
  `description: ${JSON.stringify(`${templates.length} halaman utuh siap pakai, disusun dari komponen yang sama dengan yang ada di registry ini.`)}`,
  'layout: page',
  '---',
  '',
  '<TemplatePage />',
  '',
].join('\n')

fs.writeFileSync(path.join(ROOT, 'docs/templates.md'), index)

// Satu halaman per kategori — /templates/landing-page, /templates/portfolio —
// seperti halaman kategori Blocks. Indeksnya (/templates) jadi halaman All
// berkartu. Nama kategorinya tidak bentrok dengan slug template mana pun.
const categories = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/template-sources.json'), 'utf-8')).categories
for (const k of categories) {
  const matching = templates.filter(t => t.category === k.slug)
  if (!matching.length)
    continue
  if (templates.some(t => t.slug === k.slug))
    throw new Error(`category ${k.slug} collides with a template slug`)
  fs.writeFileSync(path.join(OUTPUT_DIR, `${k.slug}.md`), [
    '---',
    `title: ${JSON.stringify(k.name)}`,
    `description: ${JSON.stringify(`${matching.length} template ${k.name.toLowerCase()} siap pakai, disusun dari komponen yang sama dengan yang ada di registry ini.`)}`,
    'layout: page',
    '---',
    '',
    `<TemplatePage category="${k.slug}" />`,
    '',
  ].join('\n'))
}

console.log(`✔ ${templates.length} template pages + index generated`)
