// Menyusun halaman dokumentasi untuk tiap composable.
//
// Prosanya tidak ditulis dua kali. Tiap composable sudah punya penjelasan di
// komentar kepala berkasnya — kenapa ia ada, apa yang mudah salah, keputusan
// apa yang diambil dan atas dasar apa. Menyalinnya ke markdown akan melahirkan
// dua sumber yang harus dijaga tetap sama, dan yang selalu terjadi berikutnya
// adalah keduanya menyimpang.
//
// Jadi halamannya dibangun dari sumbernya: komentar kepala jadi prosa, tanda
// tangan ekspornya jadi bagian API, dan `registry.json` memberi judul serta
// keterangannya.
//
// Bagian Credits di tiap halaman composable disusun `scripts/credits.mjs`
// (sumber langsung + hulu bentuk API-nya); rantai lengkapnya di `/credits`.
//
// Halaman Kelas B dan Paket Luar TIDAK disentuh skrip ini. Keduanya ditulis
// tangan karena isinya justru penjelasan kenapa tidak ada yang perlu dipasang,
// dan itu tidak bisa diturunkan dari kode yang memang tidak ada.
//
// Jalankan: npm run generate:hooks

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { creditLines } from './credits.mjs'
import { createHookApi } from './hook-api.mjs'
import { changeLines } from './item-changes.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const HOOKS_DIR = path.join(ROOT, 'docs/hooks')
// Versi Inggris bagian API untuk agen AI (`llms/hooks/<nama>.md`, disusun
// scripts/generate-llms.mjs) — sama seperti usage-docs-en untuk block.
const AGENT_DIR = path.join(ROOT, 'docs/.vitepress/cache/hook-docs-en')

const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/composables/meta.json'), 'utf-8'))
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8'))
// Keterangan di registry.json berbahasa Inggris (yang terkirim lewat CLI);
// halaman situs memakai keterangan Indonesia dari registry-hooks.json.
const siteDescriptions = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/registry-hooks.json'), 'utf-8')).items.map(i => [i.name, i.description]))
const byName = new Map(registry.items.map(i => [i.name, { ...i, description: siteDescriptions.get(i.name) ?? i.description }]))

/** Nama demo untuk sebuah composable, kalau berkasnya ada. */
function demoName(name) {
  const pascal = name.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('')
  const file = path.join(ROOT, 'src/demo', `${pascal}Demo.vue`)
  return fs.existsSync(file) ? `${pascal}Demo` : undefined
}

/** Komentar kepala berkas, diubah jadi prosa markdown. */
function prose(source) {
  const match = source.match(/^\/\*\*\n([\s\S]*?)\n \*\//)
  if (!match)
    return ''

  return match[1]
    .split('\n')
    .map(line => line.replace(/^ \* ?/, ''))
    .join('\n')
    .trim()
}

/** Tanda tangan ekspor publik, tanpa badannya. */
function signatures(source) {
  const result = []
  const pattern = /^export (?:function|const|interface|type) [\s\S]*?(?=\n\n|\n$)/gm

  for (const match of source.matchAll(pattern)) {
    const block = match[0]
    // Fungsi dipotong di kurung buka badannya — yang dibutuhkan pembaca adalah
    // apa yang masuk dan apa yang keluar, bukan bagaimana isinya dikerjakan.
    if (block.startsWith('export function')) {
      // Kurung buka badan: `) {` atau `): TipeKembali {` di akhir baris.
      const cut = block.match(/\)(?:\s*:\s*[^\n{]+?)?\s*\{\n/)
      result.push(cut ? block.slice(0, cut.index + cut[0].lastIndexOf('{')).trimEnd() : block)
    }
    else if (block.startsWith('export interface')) {
      result.push(block)
    }
    else if (block.startsWith('export type')) {
      result.push(block)
    }
  }

  return result.join('\n\n')
}

/**
 * Seluruh rantai `@kliping/*` sebuah item, terurut untuk ditempel.
 *
 * Yang paling dalam lebih dulu: berkas yang mengimpor sesuatu harus datang
 * setelah yang diimpornya, supaya orang yang menempel berurutan tidak pernah
 * sempat punya berkas yang menunjuk berkas yang belum ada.
 */
function orderedChain(name, seen = new Set()) {
  const result = []
  for (const dep of byName.get(name)?.registryDependencies ?? []) {
    if (!dep.startsWith('@kliping/'))
      continue
    const target = dep.slice('@kliping/'.length)
    if (seen.has(target))
      continue
    seen.add(target)
    result.push(...orderedChain(target, seen), target)
  }
  return result
}

// Yang disusun skrip ini adalah item yang benar-benar punya berkas di registry.
// Halaman padanan native dan paket luar ditulis tangan — isinya justru
// penjelasan kenapa tidak ada yang perlu dipasang.
const publishedNames = meta.categories
  .flatMap(k => k.items)
  .filter(name => byName.get(name)?.type === 'registry:hook')

fs.mkdirSync(HOOKS_DIR, { recursive: true })
fs.rmSync(AGENT_DIR, { recursive: true, force: true })
fs.mkdirSync(AGENT_DIR, { recursive: true })

// Item lib (create-context, target, …): halamannya ditulis tangan, jadi yang
// disusun hanya bagian Requirements + API-nya, di `docs/hooks/_api/<nama>.md`
// untuk disisipkan `<!--@include: ./_api/<nama>.md-->`.
const libNames = registry.items.filter(i => i.type === 'registry:lib').map(i => i.name)
const API_DIR = path.join(HOOKS_DIR, '_api')
fs.rmSync(API_DIR, { recursive: true, force: true })
fs.mkdirSync(API_DIR, { recursive: true })

const apiOf = createHookApi(ROOT, [...publishedNames, ...libNames].map(n => path.join(ROOT, byName.get(n).files[0].path)))

// Sel tabel: `|` di tipe union harus di-escape, baris baru dirapatkan.
const cell = s => String(s).replace(/\s+/g, ' ').replace(/\|/g, '\\|')
const code = s => `\`${cell(s)}\``
const cleanType = (t, optional) => (optional ? t.replace(/ \| undefined$/, '') : t)

/**
 * Tabel Parameters dan Returns tiap fungsi yang diekspor. `lang` memilih judul
 * kolom & catatan: Indonesia untuk situs, Inggris untuk agen.
 */
function apiTables(fns, lang) {
  const t = lang === 'id'
    ? { none: 'Tanpa parameter.', returns: 'Mengembalikan' }
    : { none: 'No parameters.', returns: 'Returns' }
  const out = []
  for (const fn of fns) {
    if (fns.length > 1)
      out.push(`### ${fn.name}\n`)
    out.push(fns.length > 1 ? '#### Parameters\n' : '### Parameters\n')
    if (fn.params.length) {
      out.push('| Parameter | Type | Default | Description |\n|---|---|---|---|')
      for (const p of fn.params)
        out.push(`| ${code(p.name + (p.optional ? '?' : ''))} | ${code(cleanType(p.type, p.optional))} | ${p.default ? code(p.default) : '—'} | ${cell(p.description)} |`)
      out.push('')
    }
    else {
      out.push(`${t.none}\n`)
    }
    out.push(fns.length > 1 ? '#### Returns\n' : '### Returns\n')
    if (fn.returns.properties) {
      if (fn.returns.description)
        out.push(`${fn.returns.description}\n`)
      out.push('| Property | Type | Description |\n|---|---|---|')
      for (const p of fn.returns.properties)
        out.push(`| ${code(p.name)} | ${code(cleanType(p.type, p.optional))} | ${cell(p.description)} |`)
      out.push('')
    }
    else {
      out.push(`${code(fn.returns.type)}${fn.returns.description ? ` — ${cell(fn.returns.description)}` : ''}\n`)
    }
  }
  return out.join('\n').trim()
}

/** Tabel Requirements: paket npm, item Kliping yang ikut, berkas yang ditulis. */
function requirements(entry, lang) {
  const rows = ['| Requirement | Value |', '|---|---|']
  rows.push(lang === 'id' ? '| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |' : '| Project | Vue 3.5+, `@` alias — set up by `kliping init` |')
  if (entry.dependencies?.length)
    rows.push(`| npm packages | ${entry.dependencies.map(code).join(', ')} |`)
  const deps = (entry.registryDependencies ?? []).filter(d => d.startsWith('@kliping/')).map(d => d.replace('@kliping/', ''))
  if (deps.length)
    rows.push(`| Kliping items | ${deps.map(code).join(', ')} |`)
  rows.push(`| Files | ${entry.files.map(f => code(f.path.replace(/^src\//, ''))).join('<br>')} |`)
  return rows.join('\n')
}

let written = 0
for (const name of publishedNames) {
  const entry = byName.get(name)

  const sourceFile = path.join(ROOT, entry.files[0].path)
  const source = fs.readFileSync(sourceFile, 'utf-8')

  const demo = demoName(name)
  const api = signatures(source)
  const fns = apiOf(sourceFile)
  const chain = (entry.registryDependencies ?? []).filter(d => d.startsWith('@kliping/'))

  // Baris pertama komentar kepala selalu mengulang `description` di frontmatter.
  // Dibuang di sini supaya kalimat yang sama tidak muncul dua kali berturut-turut
  // di halaman yang sudah menampilkan keterangannya di judul.
  const content = prose(source)
  const firstParagraph = content.split('\n\n')[0].replace(/\n/g, ' ').trim()
  const body = firstParagraph.replace(/\s+/g, ' ') === entry.description
    ? content.split('\n\n').slice(1).join('\n\n').trim()
    : content

  // Tab Manual memuat sumbernya sendiri saja — BUKAN seluruh rantainya.
  //
  // Percobaan menyisipkan seluruh rantai sudah dijalankan dan gagal persis
  // seperti yang sudah tercatat di `docs/.vitepress/config.ts` untuk block:
  // 253 KB markdown dengan 168 blok kode, dan `docs:build` kehabisan memori di
  // 6 GB. Sebabnya penggandaan — sumber `use-event-listener` muncul di sembilan
  // halaman, `is-browser` dan `target` di jauh lebih banyak lagi.
  //
  // Rantainya tetap bisa disalin: namanya disebut sebagai tautan tepat di atas,
  // dan tiap halamannya memuat sumbernya sendiri. Yang hilang cuma penggandaan.
  // Yang ditampilkan isi terbitannya di registry — sama persis dengan yang
  // dipasang CLI: tanpa komentar, format seragam, impor ke alias project.
  const published = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/public/r', `${name}.json`), 'utf-8')).files[0]
  const ownContent = published.content
    .replaceAll('@/registry/kliping/composables/', '@/composables/')
    .replaceAll('@/registry/kliping/lib/', '@/lib/')
    .trimEnd()
  const manualFile = `\`\`\`ts [${published.path.replace('registry/kliping/', '')}]\n${ownContent}\n\`\`\``

  const orderedDeps = orderedChain(name)

  const chainLinks = chain
    .map(d => d.replace('@kliping/', ''))
    .map(n => `[\`${n}\`](/hooks/${n})`)

  // Judul boleh memuat titik dua di prosa Bahasa Indonesia, jadi dikutip.
  const sections = [
    `---\ntitle: ${entry.title}\ndescription: ${JSON.stringify(entry.description)}\n---`,
    demo ? `<ComponentPreview name="${demo}" code="none" />` : null,
    body || null,
    '## Installation',
    [
      '<Tabs>',
      '',
      '<TabItem value="cli" label="CLI">',
      '',
      `<InstallCLI name="${name}" />`,
      '',
      chainLinks.length
        ? `Ikut terpasang sendiri: ${chainLinks.join(', ')}.`
        : 'Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.',
      '',
      '</TabItem>',
      '',
      '<TabItem value="manual" label="Manual">',
      '',
      orderedDeps.length
        ? `Salin dulu ${orderedDeps.map(n => `[\`${n}\`](/hooks/${n})`).join(', ')} — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.`
        : 'Salin kode berikut ke project Anda.',
      '',
      manualFile,
      '',
      '</TabItem>',
      '',
      '</Tabs>',
    ].join('\n'),
    `## Requirements\n\n${requirements(entry, 'id')}`,
    api ? `## API Reference\n\n\`\`\`ts\n${api}\n\`\`\`\n\n${apiTables(fns, 'id')}` : null,
    changeLines(name).join('\n').trimEnd() || null,
    entry.type === 'registry:hook' ? creditLines('hook', name).join('\n').trimEnd() : null,
  ]

  // Versi agen: pasang, impor, Requirements, API — tanpa prosa Indonesia.
  const exportsList = fns.map(f => f.name).join(', ')
  const importPath = entry.type === 'registry:lib' ? `@/lib/${name}` : `@/composables/${name}`
  fs.writeFileSync(path.join(AGENT_DIR, `${name}.md`), [
    `- Import: \`import { ${exportsList} } from '${importPath}'\``,
    `## Requirements\n\n${requirements(entry, 'en')}`,
    api ? `## API Reference\n\n${apiTables(fns, 'en')}` : '',
    changeLines(name, 'en').join('\n').trimEnd(),
    entry.type === 'registry:hook' ? creditLines('hook', name, 'en', 'https://kliping.pro').join('\n').trimEnd() : '',
  ].filter(Boolean).join('\n\n') + '\n')

  fs.writeFileSync(
    path.join(HOOKS_DIR, `${name}.md`),
    `${sections.filter(Boolean).join('\n\n')}\n`,
  )
  written += 1
}

for (const name of libNames) {
  const entry = byName.get(name)
  const sourceFile = path.join(ROOT, entry.files[0].path)
  const api = signatures(fs.readFileSync(sourceFile, 'utf-8'))
  const fns = apiOf(sourceFile)
  fs.writeFileSync(path.join(API_DIR, `${name}.md`), [
    `## Requirements\n\n${requirements(entry, 'id')}`,
    api ? `## API Reference\n\n\`\`\`ts\n${api}\n\`\`\`\n\n${apiTables(fns, 'id')}` : '',
  ].filter(Boolean).join('\n\n') + '\n')
  fs.writeFileSync(path.join(AGENT_DIR, `${name}.md`), [
    `- Import: \`import { ${fns.map(f => f.name).join(', ')} } from '@/lib/${name}'\``,
    `## Requirements\n\n${requirements(entry, 'en')}`,
    fns.length ? `## API Reference\n\n${apiTables(fns, 'en')}` : '',
  ].filter(Boolean).join('\n\n') + '\n')
}

console.log(`✔ ${written} composable pages generated in docs/hooks/, ${libNames.length} lib API sections in docs/hooks/_api/`)
console.log('  Class B and external-package pages are hand-written; this script leaves them alone.')
