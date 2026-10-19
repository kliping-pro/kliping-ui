// Menyusun bagian "Usage", "Sample content"/"Data", dan "Requirements"
// halaman dokumentasi tiap block, variant, dan chart, langsung dari kodenya.
//
//   docs/<modul>/docs/_api/<nama>.md   disisipkan halamannya lewat
//                                      <!--@include: ./_api/<nama>.md-->
//   docs/.vitepress/cache/usage-docs-en/<modul>/<nama>.md   isi yang sama
//                                      dalam bahasa Inggris, untuk agen AI
//                                      (generate-llms.mjs → llms/<modul>/)
//   docs/.vitepress/cache/usage-docs.json   data mentahnya
//
// Yang dibaca dari sumbernya:
//   - block (src/blocks/<nama>/): data contoh `const plans = [...]` → nama,
//     jumlah butir, kunci butir pertama ("kontrak data" yang diganti pemakai);
//     gambar host luar, tautan `href="#"`, form tanpa `@submit`; breakpoint
//     Tailwind dan kelas `dark:`
//   - variant (src/variants/<komponen>/<nama>.vue): komponen induk yang
//     diimpor dan props yang dipasang padanya di template — yang diubah untuk
//     menukar gaya — plus pemeriksaan isi yang sama dengan block
//   - chart (src/charts/<Nama>.vue): `chartData` (butir & kunci), seri di
//     `chartConfig` (label & warna), komponen Unovis yang dipakai
// Dari item terbitannya (docs/public/r/<nama>.json): paket npm, item Kliping
// yang ikut terpasang, berkas yang ditulis ke project.
//
// Jalankan: npm run generate:usage-docs (otomatis lewat `predocs:build`,
// setelah generate-registry.mjs)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { klipingCommand } from '../docs/.vitepress/kliping-command.mjs'
import { creditLines } from './credits.mjs'
import { changeLines } from './item-changes.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const EN_ROOT = path.join(ROOT, 'docs/.vitepress/cache/usage-docs-en')
const DATA_FILE = path.join(ROOT, 'docs/.vitepress/cache/usage-docs.json')
const read = p => fs.readFileSync(p, 'utf-8')

const componentName = n => n.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('')
const kebab = n => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const code = s => `\`${String(s).replace(/\|/g, '\\|')}\``
const targetPath = p => p.replace(/^registry\/kliping\//, '').replace(/^ui\//, 'components/ui/')
const componentDocs = new Set(fs.readdirSync(path.join(ROOT, 'docs/components')).map(f => f.replace(/\.md$/, '')))

/** Komentar dibuang dulu — `// visitors: {` di chartConfig bukan kunci sungguhan. */
const stripComments = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1').replace(/<!--[\s\S]*?-->/g, '')

/** Prosa halaman situs (Indonesia) dan berkas agen (Inggris); istilahnya sama. */
const TEXT = {
  id: {
    blockIntro: n => `Block ini satu *section* selebar halaman, tanpa props: teks dan datanya diubah langsung di \`${n}.vue\` setelah dipasang.`,
    variantIntro: (n, parents) => `Variant ini contoh siap pakai dari ${parents} — gaya dan susunan yang sudah jadi. Setelah dipasang, \`${n}.vue\` milik Anda: ubah teks atau props-nya langsung di berkas itu.`,
    chartIntro: n => `Chart ini satu kartu berisi grafik Unovis yang mengikuti tema (warna \`--chart-1\` … \`--chart-5\`). Data dan serinya diubah langsung di \`${n}.vue\`.`,
    asPage: 'Atau langsung sebagai halaman bersama block lain, sesuai urutan — sama dengan [Builder](/builder):',
    importLabel: 'Impor',
    renderLabel: 'Render',
    propsTitle: 'Props yang dipasang variant ini pada komponen induknya — ubah nilainya untuk menukar gaya; daftar lengkapnya ada di API Reference komponen:',
    propsHead: '| Komponen | Props yang dipakai |',
    noProps: 'Variant ini tidak memasang props khusus — gayanya datang dari kelas dan susunan isinya.',
    responsive: b => `**Responsive:** menyesuaikan lebar layar lewat breakpoint ${b}.`,
    fixed: '**Responsive:** tata letaknya sama di semua lebar layar (tanpa breakpoint).',
    darkExtra: '**Dark mode:** ikut kelas `.dark` lewat token tema, ditambah beberapa kelas `dark:` khusus.',
    dark: '**Dark mode:** ikut kelas `.dark` sepenuhnya lewat token tema.',
    dataIntro: 'Data contoh ada di konstanta berikut — ganti isinya dengan data Anda dengan bentuk butir yang sama:',
    dataHead: '| Data | Berkas | Butir | Bentuk butir |',
    single: 'nilai tunggal',
    hosts: h => `Gambar/aset dari host luar: ${h} — ganti dengan aset Anda sendiri.`,
    links: n => `${n} tautan masih \`href="#"\` — arahkan ke halaman Anda.`,
    forms: f => `Form di ${f} belum mengirim ke mana pun — tambahkan handler \`@submit\` ke API Anda.`,
    formsDone: 'Form sudah punya handler `@submit` contoh — sambungkan ke API Anda.',
    inline: 'Teksnya ditulis langsung di template — ganti sesuai kebutuhan; tidak ada data contoh terpisah.',
    chartData: 'Ganti konstanta data dengan data Anda — tiap butir satu titik di sumbu x, dengan kunci yang sama:',
    series: 'Tiap kunci di `chartConfig` adalah satu seri: namanya cocok dengan kunci di data, label tampil di tooltip/legenda, warnanya token tema.',
    seriesHead: '| Seri | Label | Warna |',
    unovis: v => `Dibangun dengan Unovis: ${v}. Opsi tiap komponennya ada di [dokumentasi Unovis](https://unovis.dev/docs).`,
    reqIntro: 'Semua dipasang otomatis oleh `kliping add`; tabel ini untuk Anda yang memasang manual atau memeriksa project.\n',
    project: '| Project | Vue 3.5+, Tailwind CSS v4, alias `@` — disiapkan `kliping init` |',
    familyBlocks: c => `Block lain di kategori **${c}** — bentuk *section*-nya sama, jadi bisa saling ditukar di halaman Anda (atau di [Builder](/builder)):`,
    familyVariants: c => `Variant lain dari **${c}** — pilih gaya lain tanpa mengubah cara pakainya:`,
  },
  en: {
    blockIntro: n => `A full-width page section without props: edit its text and data directly in \`${n}.vue\` after installing.`,
    variantIntro: (n, parents) => `A ready-made example of ${parents}: the styling and composition are done. Once installed, \`${n}.vue\` is yours — change its text or props in that file.`,
    chartIntro: n => `A card with a Unovis chart that follows the theme (colors \`--chart-1\` … \`--chart-5\`). Change its data and series directly in \`${n}.vue\`.`,
    asPage: 'Or as a page together with other blocks, in order (same as the Builder):',
    importLabel: 'Import',
    renderLabel: 'Render',
    propsTitle: 'Props this variant sets on its parent components — change them to switch the style; every prop is in the component API reference:',
    propsHead: '| Component | Props used |',
    noProps: 'This variant sets no special props — its look comes from classes and its content.',
    responsive: b => `**Responsive:** adapts with the breakpoints ${b}.`,
    fixed: '**Responsive:** same layout at every width (no breakpoints).',
    darkExtra: '**Dark mode:** follows the `.dark` class through theme tokens, plus a few `dark:` classes.',
    dark: '**Dark mode:** follows the `.dark` class entirely through theme tokens.',
    dataIntro: 'Sample data lives in these constants — replace it with your data in the same item shape:',
    dataHead: '| Data | File | Items | Item shape |',
    single: 'plain values',
    hosts: h => `Images/assets from external hosts: ${h} — replace with your own.`,
    links: n => `${n} links still point to \`href="#"\`.`,
    forms: f => `The form in ${f} does not submit anywhere — add an \`@submit\` handler that calls your API.`,
    formsDone: 'The form has a sample `@submit` handler — connect it to your API.',
    inline: 'Text is written directly in the template; there is no separate sample data.',
    chartData: 'Replace the data constant with your data — one item per x-axis point, with the same keys:',
    series: 'Each key in `chartConfig` is one series: it matches a key in the data, the label shows in tooltips/legends, the color is a theme token.',
    seriesHead: '| Series | Label | Color |',
    unovis: v => `Built with Unovis: ${v}. Options for each are in the [Unovis docs](https://unovis.dev/docs).`,
    reqIntro: '',
    project: '| Project | Vue 3.5+, Tailwind CSS v4, `@` alias — set up by `kliping init` |',
    familyBlocks: c => `Other blocks in the **${c}** category — the same kind of section, so they can be swapped on your page:`,
    familyVariants: c => `Other variants of **${c}** — a different style, used the same way:`,
  },
}

/** Nilai literal `[` … `]` mulai dari `start`: jumlah butir dan kunci butir pertama. */
function readArray(src, start) {
  let depth = 0
  let quote = null
  let items = 0
  let sawValue = false
  let firstKeys = null
  let objStart = -1
  for (let i = start; i < src.length; i++) {
    const ch = src[i]
    if (quote) {
      if (ch === '\\')
        i++
      else if (ch === quote)
        quote = null
      continue
    }
    if (ch === '"' || ch === '\'' || ch === '`') {
      quote = ch
      if (depth === 1)
        sawValue = true
      continue
    }
    if (ch === '[' || ch === '{' || ch === '(') {
      depth++
      if (depth === 2 && ch === '{' && objStart < 0)
        objStart = i
      if (depth === 2)
        sawValue = true
      continue
    }
    if (ch === ']' || ch === '}' || ch === ')') {
      depth--
      if (depth === 1 && ch === '}' && objStart >= 0 && !firstKeys)
        firstKeys = topLevelKeys(src.slice(objStart + 1, i))
      if (depth === 0)
        return { items: items + (sawValue ? 1 : 0), keys: firstKeys ?? [] }
      continue
    }
    if (depth === 1) {
      if (ch === ',') {
        if (sawValue)
          items++
        sawValue = false
      }
      else if (!/\s/.test(ch)) {
        sawValue = true
      }
    }
  }
  return null
}

/** Kunci tingkat teratas sebuah isi objek literal (tanpa kurung kurawalnya). */
function topLevelKeys(body) {
  const keys = []
  let depth = 0
  let quote = null
  let token = ''
  for (let i = 0; i < body.length; i++) {
    const ch = body[i]
    if (quote) {
      if (ch === '\\')
        i++
      else if (ch === quote)
        quote = null
      continue
    }
    if ('"\'`'.includes(ch)) {
      quote = ch
      continue
    }
    if ('[{('.includes(ch))
      depth++
    else if (']})'.includes(ch))
      depth--
    if (depth === 0) {
      if (ch === ':' && /^\s*[A-Za-z_$][\w$]*\s*$/.test(token))
        keys.push(token.trim())
      if (ch === ',' || ch === ':')
        token = ''
      else
        token += ch
    }
  }
  return keys
}

const HOSTS = /https?:\/\/([\w.-]+)\//g

/** Pemeriksaan isi yang sama untuk ketiga modul. */
function analyze(sources) {
  const all = sources.map(s => s.src).join('\n')
  const arrays = []
  for (const { file, src } of sources) {
    const clean = stripComments(src)
    for (const m of clean.matchAll(/^\s*(?:export\s+)?const\s+(\w+)(?:\s*:\s*[^=]+)?\s*=\s*\[/gm)) {
      const info = readArray(clean, m.index + m[0].length - 1)
      if (info && info.items > 0)
        arrays.push({ name: m[1], file, ...info })
    }
  }
  const hosts = new Map()
  for (const m of all.matchAll(HOSTS)) {
    if (/^(www\.w3\.org|kliping\.pro|unovis\.dev)$/.test(m[1]))
      continue
    hosts.set(m[1], (hosts.get(m[1]) ?? 0) + 1)
  }
  const forms = sources.filter(s => /<form\b/.test(s.src))
  return {
    arrays,
    hosts,
    placeholderLinks: (all.match(/href="#"/g) ?? []).length,
    forms,
    unhandledForms: forms.filter(s => !/<form\b[^>]*@submit/.test(s.src)),
    breakpoints: ['sm', 'md', 'lg', 'xl', '2xl'].filter(b => new RegExp(`(?<![\\w-])${b}:`).test(all)),
    darkClasses: /(?<![\w-])dark:/.test(all),
  }
}

/** Komponen Kliping yang diimpor sebuah variant dan props yang dipasang padanya. */
function parentProps(src) {
  const imports = new Map() // NamaKomponen → nama item (folder)
  for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*'@\/components\/ui\/([\w-]+)'/g)) {
    for (const n of m[1].split(',').map(s => s.trim()).filter(s => /^[A-Z]/.test(s)))
      imports.set(n, m[2])
  }
  const template = stripComments(src.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? '')
  const used = new Map() // item → Map(Komponen → Set(prop))
  for (const m of template.matchAll(/<([A-Z]\w*)(\s[^>]*?)?\/?>/g)) {
    const item = imports.get(m[1])
    if (!item)
      continue
    const props = new Set()
    // Satu atribut per kecocokan, nilai berkutipnya ikut tertelan — kata di
    // dalam `class="…"` tidak terbaca sebagai prop.
    for (const a of (m[2] ?? '').matchAll(/([:@#]?[\w.:-]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'))?/g)) {
      const attr = a[1].replace(/^(?:v-bind:|:)/, '')
      if (/^[@#]|^v-/.test(a[1]) || ['class', 'style', 'key', 'ref', 'id', 'as-child'].includes(attr) || /^(?:aria|data)-/.test(attr))
        continue
      props.add(attr)
    }
    const byComponent = used.get(item) ?? new Map()
    byComponent.set(m[1], new Set([...(byComponent.get(m[1]) ?? []), ...props]))
    used.set(item, byComponent)
  }
  return used
}

/** Seri chart: kunci tingkat teratas `chartConfig` beserta label dan warnanya. */
function chartSeries(src) {
  const clean = stripComments(src)
  const m = clean.match(/const chartConfig\s*=\s*\{/)
  if (!m)
    return []
  let depth = 0
  let end = m.index + m[0].length - 1
  for (let i = end; i < clean.length; i++) {
    if (clean[i] === '{')
      depth++
    else if (clean[i] === '}' && --depth === 0) {
      end = i
      break
    }
  }
  const body = clean.slice(m.index + m[0].length, end)
  return topLevelKeys(body).map((key) => {
    const block = body.match(new RegExp(`(?:^|[\\s,{])['"]?${key}['"]?\\s*:\\s*\\{([^}]*)\\}`))?.[1] ?? ''
    return {
      key,
      label: block.match(/label:\s*['"]([^'"]*)['"]/)?.[1],
      color: block.match(/color:\s*['"]([^'"]*)['"]/)?.[1],
    }
  })
}

function requirements(t, item, site) {
  const deps = item?.dependencies ?? []
  const regDeps = (item?.registryDependencies ?? []).map(d => d.replace('@kliping/', ''))
  const out = ['## Requirements\n']
  if (t.reqIntro)
    out.push(t.reqIntro)
  out.push('| Requirement | Value |\n|---|---|', t.project)
  if (deps.length)
    out.push(`| npm packages | ${deps.map(code).join(', ')} |`)
  if (regDeps.length)
    out.push(`| Kliping items | ${regDeps.map(d => componentDocs.has(d) ? `[${code(d)}](${site}/components/${d})` : code(d)).join(', ')} |`)
  out.push(`| Files | ${(item?.files ?? []).map(f => code(targetPath(f.path))).join('<br>')} |`)
  return out
}

function contentNotes(t, a) {
  const content = []
  if (a.arrays.length) {
    content.push(`${t.dataIntro}\n`, `${t.dataHead}\n|---|---|---|---|`)
    for (const x of a.arrays)
      content.push(`| ${code(x.name)} | ${code(x.file)} | ${x.items} | ${x.keys.length ? x.keys.map(code).join(', ') : t.single} |`)
    content.push('')
  }
  const extra = []
  if (a.hosts.size)
    extra.push(t.hosts([...a.hosts].map(([h, n]) => `${code(h)} (${n})`).join(', ')))
  if (a.placeholderLinks)
    extra.push(t.links(a.placeholderLinks))
  if (a.unhandledForms.length)
    extra.push(t.forms(a.unhandledForms.map(f => code(f.file)).join(', ')))
  else if (a.forms.length)
    extra.push(t.formsDone)
  if (extra.length)
    content.push(extra.map(e => `- ${e}`).join('\n'), '')
  return content
}

// Kode sebaris, bukan blok kode: ratusan halaman × blok bersorotan Shiki
// membuat build kehabisan memori (sorotannya ikut jadi modul JS tiap halaman).
const usage = (folder, name, t) => [
  `- ${t.importLabel}: ${code(`import ${componentName(name)} from '@/components/${folder}/${name}/${name}.vue'`)}`,
  `- ${t.renderLabel}: ${code(`<${componentName(name)} />`)}`,
  '',
]

const layoutNotes = (t, a) => [
  `- ${a.breakpoints.length ? t.responsive(a.breakpoints.map(b => code(`${b}:`)).join(', ')) : t.fixed}`,
  `- ${a.darkClasses ? t.darkExtra : t.dark}`,
  '',
]

/**
 * "In this family": item sekerabat — block di kategori yang sama, atau variant
 * dari komponen induk yang sama (pola payload-components). Situs menautkan
 * halaman docs-nya; versi agen menautkan berkas llms-nya.
 */
const titleCase = slug => slug.split('-').filter(Boolean).map(w => ({ cta: 'CTA', faq: 'FAQ', ai: 'AI', cruds: 'CRUDs' })[w] ?? w[0].toUpperCase() + w.slice(1)).join(' ')
function family(module, name, siblings, intro, local) {
  const others = siblings.filter(n => n !== name)
  if (!others.length)
    return []
  const href = n => (local ? `/${module}/docs/${n}` : `https://kliping.pro/llms/${module}/${n}.md`)
  return ['## In this family\n', `${intro}\n`, `${others.map(n => `[${code(n)}](${href(n)})`).join(' · ')}\n`]
}

function renderBlock(name, a, item, t, local) {
  const site = local ? '' : 'https://kliping.pro'
  const content = contentNotes(t, a)
  return [
    '## Usage\n',
    `${t.blockIntro(name)}\n`,
    ...usage('blocks', name, t),
    `${t.asPage} ${code(klipingCommand(`add navbar-01 ${name} footer-01 --page src/LandingPage.vue`))}\n`,
    ...layoutNotes(t, a),
    '## Sample content\n',
    ...(content.length ? content : [`${t.inline}\n`]),
    ...requirements(t, item, site),
    ...family('blocks', name, blockFamilies.get(item?.categories?.[1]) ?? [], t.familyBlocks(titleCase(item?.categories?.[1] ?? '')), local),
    ...changeLines(name, local ? 'id' : 'en'),
    ...creditLines('block', name, local ? 'id' : 'en', site),
  ]
}

function renderVariant(name, group, a, used, item, t, local) {
  const site = local ? '' : 'https://kliping.pro'
  const link = c => (componentDocs.has(c) ? `[${componentName(c).replace(/(\w)([A-Z])/g, '$1 $2')}](${site}/components/${c})` : code(c))
  const parents = (used.size ? [...used.keys()] : [group]).map(link).join(', ')
  const out = ['## Usage\n', `${t.variantIntro(name, parents)}\n`, ...usage('variants', name, t)]
  const rows = []
  for (const [itemName, byComponent] of used) {
    for (const [component, props] of byComponent) {
      if (props.size)
        rows.push(`| ${componentDocs.has(itemName) ? `[${code(component)}](${site}/components/${itemName}#api-reference)` : code(component)} | ${[...props].map(code).join(', ')} |`)
    }
  }
  out.push(...(rows.length ? [`${t.propsTitle}\n`, `${t.propsHead}\n|---|---|`, ...rows, ''] : [`${t.noProps}\n`]))
  out.push(...layoutNotes(t, a))
  const content = contentNotes(t, a)
  if (content.length)
    out.push('## Sample content\n', ...content)
  return [...out, ...requirements(t, item, site), ...family('variants', name, variantFamilies.get(group) ?? [], t.familyVariants(titleCase(group)), local), ...changeLines(name, local ? 'id' : 'en'), ...creditLines('variant', name, local ? 'id' : 'en', site)]
}

function renderChart(name, src, a, item, t, local) {
  const site = local ? '' : 'https://kliping.pro'
  const out = ['## Usage\n', `${t.chartIntro(name)}\n`, ...usage('charts', name, t), '## Data\n']
  if (a.arrays.length) {
    out.push(`${t.chartData}\n`, `${t.dataHead}\n|---|---|---|---|`)
    for (const x of a.arrays)
      out.push(`| ${code(x.name)} | ${code(x.file)} | ${x.items} | ${x.keys.length ? x.keys.map(code).join(', ') : t.single} |`)
    out.push('')
  }
  const series = chartSeries(src)
  if (series.length) {
    out.push(`${t.series}\n`, `${t.seriesHead}\n|---|---|---|`)
    for (const s of series)
      out.push(`| ${code(s.key)} | ${s.label ? code(s.label) : '—'} | ${s.color ? code(s.color) : '—'} |`)
    out.push('')
  }
  const vis = [...new Set(src.match(/\bVis[A-Z]\w+/g) ?? [])]
  if (vis.length)
    out.push(`${t.unovis(vis.map(code).join(', '))}\n`)
  return [...out, ...requirements(t, item, site), ...changeLines(name, local ? 'id' : 'en'), ...creditLines('chart', name, local ? 'id' : 'en', site)]
}

const published = (name) => {
  const p = path.join(ROOT, 'docs/public/r', `${name}.json`)
  return fs.existsSync(p) ? JSON.parse(read(p)) : null
}

function emit(module, slug, idLines, enLines) {
  const dir = path.join(ROOT, 'docs', module, 'docs/_api')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${slug}.md`), `${idLines.join('\n').trim()}\n`)
  const en = path.join(EN_ROOT, module)
  fs.mkdirSync(en, { recursive: true })
  fs.writeFileSync(path.join(en, `${slug}.md`), `${enLines.join('\n').trim()}\n`)
}

for (const module of ['blocks', 'variants', 'charts']) {
  fs.rmSync(path.join(ROOT, 'docs', module, 'docs/_api'), { recursive: true, force: true })
  fs.rmSync(path.join(EN_ROOT, module), { recursive: true, force: true })
}

const data = { blocks: {}, variants: {}, charts: {} }

// Keluarga: kategori block (registry `categories[1]`) dan folder variant.
const blockFamilies = new Map()
for (const n of fs.readdirSync(path.join(ROOT, 'src/blocks')).sort()) {
  const category = published(n)?.categories?.[1]
  if (category)
    blockFamilies.set(category, [...(blockFamilies.get(category) ?? []), n])
}
const variantFamilies = new Map(fs.readdirSync(path.join(ROOT, 'src/variants'))
  .filter(g => fs.statSync(path.join(ROOT, 'src/variants', g)).isDirectory())
  .map(g => [g, fs.readdirSync(path.join(ROOT, 'src/variants', g)).filter(f => f.endsWith('.vue')).map(f => f.replace(/\.vue$/, '')).sort()]))

// Block: satu folder, page.vue + berkas bantunya.
const BLOCKS = path.join(ROOT, 'src/blocks')
for (const name of fs.readdirSync(BLOCKS).filter(n => fs.existsSync(path.join(BLOCKS, n, 'page.vue'))).sort()) {
  const folder = path.join(BLOCKS, name)
  const sources = fs.readdirSync(folder, { recursive: true }).map(String).filter(f => /\.(vue|ts)$/.test(f))
    .map(f => ({ file: f === 'page.vue' ? `${name}.vue` : f, src: read(path.join(folder, f)) }))
  const a = analyze(sources)
  const item = published(name)
  data.blocks[name] = { arrays: a.arrays, hosts: Object.fromEntries(a.hosts), placeholderLinks: a.placeholderLinks, forms: a.forms.length, unhandledForms: a.unhandledForms.map(f => f.file), breakpoints: a.breakpoints }
  emit('blocks', name, renderBlock(name, a, item, TEXT.id, true), renderBlock(name, a, item, TEXT.en, false))
}

// Variant: satu berkas per varian, dikelompokkan per komponen induk.
const VARIANTS = path.join(ROOT, 'src/variants')
for (const group of fs.readdirSync(VARIANTS).sort()) {
  const dir = path.join(VARIANTS, group)
  if (!fs.statSync(dir).isDirectory())
    continue
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.vue')).sort()) {
    const name = f.replace(/\.vue$/, '')
    const src = read(path.join(dir, f))
    const a = analyze([{ file: `${name}.vue`, src }])
    const used = parentProps(src)
    const item = published(name)
    data.variants[name] = { parents: [...used.keys()], props: Object.fromEntries([...used].map(([k, v]) => [k, Object.fromEntries([...v].map(([c, p]) => [c, [...p]]))])) }
    emit('variants', name, renderVariant(name, group, a, used, item, TEXT.id, true), renderVariant(name, group, a, used, item, TEXT.en, false))
  }
}

// Chart: satu berkas PascalCase; nama registry dan halamannya kebab-case.
const CHARTS = path.join(ROOT, 'src/charts')
for (const f of fs.readdirSync(CHARTS).filter(f => f.endsWith('.vue')).sort()) {
  const name = kebab(f.replace(/\.vue$/, ''))
  const src = read(path.join(CHARTS, f))
  const a = analyze([{ file: `${name}.vue`, src }])
  const item = published(name)
  data.charts[name] = { data: a.arrays, series: chartSeries(src) }
  emit('charts', name, renderChart(name, src, a, item, TEXT.id, true), renderChart(name, src, a, item, TEXT.en, false))
}

fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
fs.writeFileSync(DATA_FILE, `${JSON.stringify(data, null, 1)}\n`)
const n = k => Object.keys(data[k]).length
console.log(`✔ usage docs — ${n('blocks')} blocks, ${n('variants')} variants, ${n('charts')} charts`)
