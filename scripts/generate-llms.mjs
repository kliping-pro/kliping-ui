// Menyusun docs/public/llms.txt — katalog Kliping untuk agen AI.
//
// llms.txt adalah kebiasaan yang sedang umum: satu berkas teks di akar situs
// yang dibaca agen (Claude, ChatGPT, Cursor, …) sebelum menulis kode. Isinya
// cara memasang dan seluruh item registry — nama, keterangan Inggris, tautan
// JSON-nya — dikelompokkan seperti katalog situs: komponen, block per
// kategori, varian per komponen, chart, hook, lib.
//
// Berkas statis: disajikan CDN, tanpa server, tanpa biaya per permintaan.
// Sumbernya registry.json, jadi tidak pernah tertinggal dari registry.
// Dijalankan lewat `predocs:build`; hasilnya tidak di-commit (.gitignore).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { changeLines } from './item-changes.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const SITE = 'https://kliping.pro'
const OUTPUT = path.join(ROOT, 'docs/public/llms.txt')
const API_DIR = path.join(ROOT, 'docs/components/_api')
const COMPONENT_DOCS = path.join(ROOT, 'docs/public/llms/components')
const USAGE_EN = path.join(ROOT, 'docs/.vitepress/cache/usage-docs-en')
const HOOK_EN = path.join(ROOT, 'docs/.vitepress/cache/hook-docs-en')
const LLMS_DIR = path.join(ROOT, 'docs/public/llms')

const { items } = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8'))
const componentKeyboard = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry/component-keyboard.json'), 'utf-8'))
const docPages = new Set(fs.readdirSync(path.join(ROOT, 'docs/components')).map(f => f.replace(/\.md$/, '')))

const ACRONYMS = { ai: 'AI', cta: 'CTA', faq: 'FAQ', otp: 'OTP', qr: 'QR', ui: 'UI', cruds: 'CRUDs' }
const title = slug => slug.split('-').map(w => ACRONYMS[w] ?? w[0].toUpperCase() + w.slice(1)).join(' ')
const line = it => `- [${it.name}](${SITE}/r/${it.name}.json): ${it.description ?? it.title}`

// Satu berkas markdown ringkas per komponen untuk agen: pasang, impor,
// Requirements, API Reference (dari scripts/generate-api-reference.mjs).
// Agen membaca hanya komponen yang ia pakai — jauh lebih hemat token daripada
// halaman HTML utuh atau seluruh kode sumbernya.
fs.rmSync(COMPONENT_DOCS, { recursive: true, force: true })
fs.mkdirSync(COMPONENT_DOCS, { recursive: true })
const componentDoc = new Set()
for (const it of items.filter(i => i.type === 'registry:ui')) {
  const api = path.join(API_DIR, `${it.name}.md`)
  if (!fs.existsSync(api))
    continue
  const exportsLine = fs.readFileSync(api, 'utf-8').match(/^### (\w+)$/gm)?.map(h => h.slice(4))
  const body = fs.readFileSync(api, 'utf-8')
    .replace(/<!-- #region changelog -->[\s\S]*?<!-- #endregion changelog -->\n?/, () => `${changeLines(it.name, 'en').join('\n')}\n`)
    .replace(/<!-- #(end)?region [\w-]+ -->\n?/g, '')
    .replace(/^Semua dipasang otomatis.*\n\n/m, '')
    .replace('— disiapkan `kliping init`', '— set up by `kliping init`')
    // Prosa bagian otomatis (Indonesia untuk situs) → Inggris untuk agen.
    .replace(/^Susunan bagiannya seperti dipakai di contoh-contoh di atas\..*$/m, 'Typical structure, taken from the examples. Import every part from one place and nest them like this:')
    .replace(/^Bagian lain yang tersedia: /m, 'Other parts: ')
    .replace(/^Berasal dari (\[[^\]]+\]\([^)]+\)) \(MIT, ([^)]+)\)\. Rantai lengkapnya di \[Credits\]\(\/credits\)\.$/m, 'Based on $1 (MIT, $2). Full chain: [Credits](https://kliping.pro/credits).')
    .replace(new RegExp(`^(?:${Object.values(componentKeyboard).map(o => o.note.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') || '(?!)'})$`, 'm'), m => Object.values(componentKeyboard).find(o => o.note === m)?.noteEn ?? 'Written from Kliping\'s own code.')
    .replace(/^Perilaku keyboard-nya datang dari primitif Reka UI (\[[^\]]+\]\([^)]+\)).*$/m, 'Keyboard behaviour comes from the Reka UI primitive $1 (WAI-ARIA pattern).')
    .replace(/^Token tema yang dibaca komponen ini — .*?: (`--.*)$/m, 'Theme tokens this component reads (change them in global CSS, `:root` and `.dark`): $1')
    .replace(/^Variabel khusus komponen ini — .*$/m, 'Component variables (override through `style` or your CSS):')
    .replace(/dihitung saat runtime/g, 'computed at runtime')
    .replace(/^Ditambah atribut `<input>` bawaan, diteruskan ke elemen input: /gm, 'Plus native `<input>` attributes, passed to the input element: ')
    .replace(/^Tidak punya props, events, atau slot sendiri\.$/gm, 'No props, events or slots of its own.')
  const parts = exportsLine?.length ? exportsLine.join(', ') : it.title.replace(/\s+/g, '')
  fs.writeFileSync(path.join(COMPONENT_DOCS, `${it.name}.md`), `# ${it.title}

> ${it.description}

- Install: \`npx kliping@latest add ${it.name}\`
- Import: \`import { ${parts} } from '@/components/ui/${it.name}'\`
- Docs: ${SITE}/components/${it.name}${docPages.has(it.name) ? '' : ' (no page)'}
- Source: ${SITE}/r/${it.name}.json

${body.replace(/^## /gm, '## ').trim()}
`)
  componentDoc.add(it.name)
}

/** Item per kelompok, kelompok diurutkan menurut nama. */
function grouped(list, key) {
  const groups = new Map()
  for (const it of list) {
    const k = key(it)
    groups.set(k, [...(groups.get(k) ?? []), it])
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))
}

const of = type => items.filter(it => it.type === type)
const components = of('registry:ui')
const blocks = of('registry:block').filter(it => it.categories?.[0] === 'blocks')
const charts = of('registry:block').filter(it => it.categories?.[0] === 'charts')
const variants = of('registry:component')
const hooks = of('registry:hook')
const lib = of('registry:lib')

const out = []
out.push(`# Kliping

> Vue 3 + Tailwind CSS v4 components, blocks, variants, charts and composables in the shadcn-vue style (Reka UI). ${items.length} MIT-licensed items. The kliping CLI copies the source into the user's project, so the code is theirs to edit. Front-end only: blocks ship with sample data to replace.

## How to use

- Add items to a Vue (Vite or Nuxt) project: \`npx kliping@latest add <name> [<name> …]\`. It installs npm packages, dependent items and theme variables. A project without Tailwind CSS v4 or the \`@\` alias is set up first (\`npx kliping@latest init\`).
- Build a page from blocks, in order: \`npx kliping@latest add navbar-01 hero-01 features-01 footer-01 --page src/LandingPage.vue\`, then render \`LandingPage\` from \`App.vue\` (Nuxt: \`--page app/pages/index.vue\`).
- Where files land: components in \`components/ui/<name>/\` (import from \`@/components/ui/<name>\`), blocks in \`components/blocks/<name>/<name>.vue\`, variants in \`components/variants/<name>/\`, charts in \`components/charts/<name>/\`, composables in \`composables/\`.
- Item source: \`${SITE}/r/<name>.json\` holds the files, npm dependencies and registry dependencies of one item. The full index is \`${SITE}/r/registry.json\`.
- MCP server for AI editors (search, view and add items): \`npx kliping@latest mcp init --client claude\` (or cursor, vscode, codex, opencode). No account and no API key.
- Composition: variants are styled examples of one component, blocks are page sections built from components, a page is blocks stacked in order. Prefer an existing block or variant over writing new UI; adapt its text and sample data.
- Docs: ${SITE}/introduction · Concepts (item levels, file locations, how to read the API tables): ${SITE}/concepts · CLI: ${SITE}/cli · MCP: ${SITE}/mcp · Builder (assemble a page visually): ${SITE}/builder
`)

out.push(`## Components (${components.length})\n`)
out.push('Each component has a short API page for agents (install, import, props, events, slots, data attributes): `' + SITE + '/llms/components/<name>.md`.\n')
out.push(components.map(it => componentDoc.has(it.name) ? `${line(it)} API: ${SITE}/llms/components/${it.name}.md` : line(it)).join('\n'))

// Begitu juga per block, variant, dan chart: pakai, data contoh yang
// diganti, Requirements (versi Inggris dari scripts/generate-usage-docs.mjs).
const usageDoc = new Set()
function writeUsageDocs(module, list, preview) {
  fs.rmSync(path.join(LLMS_DIR, module), { recursive: true, force: true })
  fs.mkdirSync(path.join(LLMS_DIR, module), { recursive: true })
  for (const it of list) {
    const src = path.join(USAGE_EN, module, `${it.name}.md`)
    if (!fs.existsSync(src))
      continue
    fs.writeFileSync(path.join(LLMS_DIR, module, `${it.name}.md`), `# ${it.name}\n\n> ${it.description}\n\n- Install: \`npx kliping@latest add ${it.name}\`\n- Preview: ${SITE}${preview(it.name)}\n- Source: ${SITE}/r/${it.name}.json\n\n${fs.readFileSync(src, 'utf-8').trim()}\n`)
    usageDoc.add(`${module}/${it.name}`)
  }
}
writeUsageDocs('blocks', blocks, n => `/blocks/${n}`)
writeUsageDocs('variants', variants, n => `/variants/${n}`)
writeUsageDocs('charts', charts, n => `/charts/${n}`)
const usageLine = module => it => usageDoc.has(`${module}/${it.name}`) ? `${line(it)} ${module === 'hooks' ? 'API' : 'Usage'}: ${SITE}/llms/${module}/${it.name}.md` : line(it)

out.push(`\n## Blocks (${blocks.length})\n`)
for (const [category, list] of grouped(blocks, it => it.categories?.[1] ?? 'other'))
  out.push(`### ${title(category)} (${list.length})\n\n${list.map(usageLine('blocks')).join('\n')}\n`)

out.push(`## Variants (${variants.length})\n`)
for (const [component, list] of grouped(variants, it => it.categories?.[1] ?? 'other'))
  out.push(`### ${title(component)} (${list.length})\n\n${list.map(usageLine('variants')).join('\n')}\n`)

out.push(`## Charts (${charts.length})\n\n${charts.map(usageLine('charts')).join('\n')}\n`)
// Composable dan lib: pasang, impor, Requirements, tabel Parameters/Returns
// (versi Inggris dari scripts/generate-hook-docs.mjs).
fs.rmSync(path.join(LLMS_DIR, 'hooks'), { recursive: true, force: true })
fs.mkdirSync(path.join(LLMS_DIR, 'hooks'), { recursive: true })
for (const it of [...hooks, ...lib]) {
  const src = path.join(HOOK_EN, `${it.name}.md`)
  if (!fs.existsSync(src))
    continue
  fs.writeFileSync(path.join(LLMS_DIR, 'hooks', `${it.name}.md`), `# ${it.name}\n\n> ${it.description}\n\n- Install: \`npx kliping@latest add ${it.name}\`\n- Docs: ${SITE}/hooks/${it.name}\n- Source: ${SITE}/r/${it.name}.json\n${fs.readFileSync(src, 'utf-8').trim()}\n`)
  usageDoc.add(`hooks/${it.name}`)
}
out.push(`## Composables (${hooks.length})\n\n${hooks.map(usageLine('hooks')).join('\n')}\n`)
out.push(`## Lib (${lib.length})\n\n${lib.map(usageLine('hooks')).join('\n')}\n`)

fs.writeFileSync(OUTPUT, `${out.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`)
console.log(`✔ llms.txt — ${items.length} items (${(fs.statSync(OUTPUT).size / 1024).toFixed(0)} KB), ${componentDoc.size} component and ${usageDoc.size} block/variant/chart pages in llms/`)
