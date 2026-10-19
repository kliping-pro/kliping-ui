// Menyusun bagian "Requirements" dan "API Reference" setiap halaman komponen,
// langsung dari kode — bukan tabel tulisan tangan yang lama-lama basi.
//
//   docs/components/_api/<nama>.md   disisipkan halaman lewat
//                                    <!--@include: ./_api/<nama>.md-->
//   docs/.vitepress/cache/api-reference.json   data mentah seluruh komponen
//                                    (dibaca generate-llms.mjs)
//
// Sumbernya:
//   - props, events, slots: vue-component-meta (pemeriksa tipe Volar) membaca
//     tiap SFC yang diekspor index.ts komponen — tipe, nilai bawaan, wajib
//     atau tidak, dan JSDoc satu baris (aturan repo: JSDoc prop berbahasa
//     Inggris), termasuk props warisan Reka UI (`as`, `asChild`, …).
//   - atribut data-*: dibaca dari template (`data-state`, `data-orientation`)
//     — kait styling dan pengujian.
//   - Requirements: registry.json (paket npm, item Kliping yang ikut, berkas
//     yang ditulis ke project).
//
// Halaman menyisipkan berkasnya utuh (`<!--@include: ./_api/x.md-->`), atau
// per bagian lewat region — `#requirements`, `#<NamaBagian>` — bila prosa dan
// contohnya ditulis tangan di halaman dan hanya tabelnya yang otomatis.
//
// Hasil vue-component-meta disimpan di cache per isi berkas, jadi build kedua
// dan seterusnya hanya membaca ulang SFC yang berubah.
//
// Jalankan: npm run generate:api (otomatis lewat `predocs:build`)

import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@vue/compiler-dom'
import { createChecker } from 'vue-component-meta'
import { creditLines } from './credits.mjs'
import { changeLines } from './item-changes.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = path.join(ROOT, 'src/components')
const DOCS = path.join(ROOT, 'docs/components')
const OUT_DIR = path.join(DOCS, '_api')
const CACHE_DIR = path.join(ROOT, 'docs/.vitepress/cache')
const CACHE_FILE = path.join(CACHE_DIR, 'api-meta-cache.json')
const DATA_FILE = path.join(CACHE_DIR, 'api-reference.json')

/** Sama dengan UI_NAMES di generate-registry.mjs. */
const UI_NAMES = { marquee: 'marquee-basic' }

/** Keterangan untuk props/events umum yang tidak diberi JSDoc di sumbernya. */
const COMMON = {
  'class': 'Classes merged onto the rendered element.',
  'modelValue': 'The controlled value. Bind with `v-model`.',
  'defaultValue': 'The initial value when uncontrolled.',
  'open': 'The controlled open state. Bind with `v-model:open`.',
  'defaultOpen': 'The initial open state when uncontrolled.',
  'disabled': 'Prevents the user from interacting with it.',
  'readonly': 'Shows the value without allowing changes.',
  'required': 'Marks it as required when submitted in a form.',
  'name': 'The name submitted with a form.',
  'dir': 'The reading direction. Inherits from `DirectionProvider` when unset.',
  'orientation': 'The layout direction.',
  'variant': 'The visual style.',
  'size': 'The visual size.',
  'id': 'The id of the rendered element.',
  'update:modelValue': 'Emitted when the value changes.',
  'update:open': 'Emitted when the open state changes.',
  // Event lapisan Reka (DismissableLayer, FocusScope, RovingFocus) — sama di
  // semua dialog, popover, menu, dan select, jadi ditulis sekali di sini.
  'escapeKeyDown': 'Emitted when Escape is pressed; call `event.preventDefault()` to keep it open.',
  'pointerDownOutside': 'Emitted on a pointer down outside; call `event.preventDefault()` to keep it open.',
  'focusOutside': 'Emitted when focus moves outside; call `event.preventDefault()` to keep it open.',
  'interactOutside': 'Emitted on any pointer down or focus outside; call `event.preventDefault()` to keep it open.',
  'openAutoFocus': 'Emitted when focus moves in on open; call `event.preventDefault()` to stop it.',
  'closeAutoFocus': 'Emitted when focus returns on close; call `event.preventDefault()` to stop it.',
  'entryFocus': 'Emitted when focus enters the group; call `event.preventDefault()` to skip focusing the first item.',
  'select': 'Emitted when it is selected, by pointer or keyboard; call `event.preventDefault()` to keep the menu open.',
  'valueCommit': 'Emitted when the user finishes changing the value (pointer up or key press).',
  'update:placeholder': 'Emitted when the placeholder date (the month in view) changes.',
  // Event Reka lain yang dipakai beberapa komponen.
  'highlight': 'Emitted when the highlighted item changes, by pointer or keyboard.',
  'leave': 'Emitted when the pointer leaves the list.',
  'complete': 'Emitted when every input is filled, with the full value.',
  'invalid': 'Emitted when a new value is rejected (duplicate or over `max`).',
  'addTag': 'Emitted when a tag is added, with its value.',
  'removeTag': 'Emitted when a tag is removed, with its value.',
  'collapse': 'Emitted when the panel collapses.',
  'expand': 'Emitted when the panel expands.',
  'resize': 'Emitted when the panel size changes: new size and previous size, in percent.',
  'layout': 'Emitted when panel sizes change, as percentages in order.',
  'dragging': 'Emitted when dragging the handle starts (`true`) or stops (`false`).',
  'init-api': 'Emitted once Embla is ready, with its API (scroll, events, slide indexes).',
  'update:openComplete': 'Emitted when the open or close animation finishes, with the open state.',
  'update:startValue': 'Emitted when the first date of the range is picked, before the range is complete.',
  'update:validModelValue': 'Emitted with the range once both ends are picked and valid.',
}

/**
 * Atribut `<input>` bawaan HTML. Komponen yang tipenya mewarisi
 * `InputHTMLAttributes` (mis. InputOTP dari vue-input-otp) memunculkan
 * semuanya sebagai prop tanpa keterangan. Daripada 30 baris kosong, yang tidak
 * berketerangan diringkas jadi satu catatan di bawah tabel.
 */
const NATIVE_INPUT_ATTRS = new Set(['accept', 'alt', 'autocomplete', 'autofocus', 'capture', 'checked', 'crossorigin', 'enterKeyHint', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'height', 'indeterminate', 'list', 'max', 'min', 'minlength', 'multiple', 'pattern', 'placeholder', 'spellcheck', 'src', 'step', 'type', 'value', 'width'])

const read = p => fs.readFileSync(p, 'utf-8')
const hash = s => createHash('sha1').update(s).digest('hex').slice(0, 16)
/** Item terbitan (docs/public/r, disusun generate-registry): jalur berkas kanonis. */
function publishedItem(name) {
  const p = path.join(ROOT, 'docs/public/r', `${name}.json`)
  return fs.existsSync(p) ? JSON.parse(read(p)) : undefined
}
/** `registry/kliping/ui/rating/rating.vue` → `components/ui/rating/rating.vue` (alias bawaan). */
const targetPath = p => p.replace(/^registry\/kliping\//, '').replace(/^ui\//, 'components/ui/')

// Komponen: satu folder = satu item, bagiannya = ekspor SFC di index.ts.
// Interaksi keyboard primitif Reka UI (scripts/update-reka-keyboard.mjs).
const rekaKeyboard = JSON.parse(read(path.join(ROOT, 'src/registry/reka-keyboard.json'))).components
// Tabel keyboard komponen yang mengatur keyboard-nya sendiri — ditulis dari
// kode Kliping, satu entri per komponen (`note` Indonesia untuk situs,
// `noteEn` Inggris untuk agen).
const componentKeyboard = JSON.parse(read(path.join(ROOT, 'src/registry/component-keyboard.json')))

const kebab = s => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * Primitif Reka UI yang menjadi dasar sebuah komponen: `XxxRoot` yang diimpor
 * dari 'reka-ui' di bagian pertamanya — akar komponennya (`Dialog.vue` →
 * `DialogRoot`). Primitif yang hanya dipakai bagian dalam (slider zoom di
 * Cropper, menu di daftar percakapan) tidak mewakili keyboard komponennya.
 * Hanya yang punya tabel keyboard di dokumentasi Reka UI.
 */
/** Akarnya mengimpor primitif, tapi primitif itu bukan perilaku utamanya. */
const NOT_PRIMITIVE = new Set(['AiThreadList'])

function rekaPrimitive(parts) {
  for (const p of parts.slice(0, 1).filter(p => !NOT_PRIMITIVE.has(p.name))) {
    for (const m of read(p.file).matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]reka-ui['"]/g)) {
      for (const name of m[1].split(',').map(s => s.trim().replace(/^type\s+/, ''))) {
        const root = name.match(/^([A-Z]\w*?)Root$/)?.[1]
        if (root && rekaKeyboard[kebab(root)])
          return { name: root, slug: kebab(root) }
      }
    }
  }
  return null
}

const components = []
for (const [base, isUi] of [[path.join(SRC, 'ui'), true], [SRC, false]]) {
  for (const dir of fs.readdirSync(base).sort()) {
    if (!isUi && dir === 'ui')
      continue
    const folder = path.join(base, dir)
    const index = path.join(folder, 'index.ts')
    if (!fs.statSync(folder).isDirectory() || !fs.existsSync(index))
      continue
    const parts = [...read(index).matchAll(/export \{ default as (\w+) \} from ['"]\.\/([\w-]+\.vue)['"]/g)]
      .map(m => ({ name: m[1], file: path.join(folder, m[2]) }))
      .filter(p => fs.existsSync(p.file))
    if (parts.length)
      components.push({ name: isUi ? (UI_NAMES[dir] ?? dir) : dir, folder, parts, primitive: rekaPrimitive(parts) })
  }
}

// vue-component-meta — mahal (memuat program TypeScript), jadi dengan cache.
const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(read(CACHE_FILE)) : {}
const nextCache = {}
let checker
/**
 * Kunci cache = isi SFC-nya ditambah semua .ts/.vue di foldernya: props sering
 * dideklarasikan di berkas tipe yang diimpor (`interface.ts`, `index.ts`,
 * `use*.ts`), dan JSDoc di sana juga harus terbaca ulang saat berubah.
 */
function metaOf(file) {
  const folder = path.dirname(file)
  const siblings = fs.readdirSync(folder).filter(f => /\.(ts|vue)$/.test(f)).sort().map(f => read(path.join(folder, f)))
  const key = hash(read(file) + siblings.join('\0'))
  const rel = path.relative(ROOT, file)
  if (cache[rel]?.key === key)
    return (nextCache[rel] = cache[rel]).meta
  checker ??= createChecker(path.join(ROOT, 'tsconfig.registry.json'), { forceUseTs: true, printer: { newLine: 1 } })
  const m = checker.getComponentMeta(file)
  const meta = {
    props: m.props.filter(p => !p.global).map(p => ({ name: p.name, type: p.type, required: p.required, default: p.default, description: p.description })),
    events: m.events.map(e => ({ name: e.name, type: e.type, description: e.description })),
    slots: m.slots.map(s => ({ name: s.name, type: s.type, description: s.description })),
  }
  nextCache[rel] = { key, meta }
  return meta
}

/**
 * JSDoc tiap event di blok `defineEmits<{ … }>()` sumbernya. vue-component-meta
 * tidak membaca keterangan emit berbasis tipe, jadi diambil dari teksnya:
 * `/** Keterangan. *\/` tepat di atas `name: [...]` atau `(e: 'name', …)`.
 */
function emitDocs(file) {
  const src = read(file)
  const start = src.indexOf('defineEmits<{')
  if (start < 0)
    return {}
  const block = src.slice(start, src.indexOf('}>()', start))
  const docs = {}
  for (const m of block.matchAll(/\/\*\*\s*(.+?)\s*\*\/\s*(?:\(\s*\w+\s*:\s*['"]([\w:-]+)['"]|['"]?([\w:-]+)['"]?\s*:\s*\[)/g))
    docs[m[2] ?? m[3]] = m[1]
  return docs
}

/** `data-*` di template: nama, dan nilai bila tertulis literal. */
function dataAttributes(file) {
  const template = read(file).match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
  const found = new Map()
  for (const m of template.matchAll(/(?<![\w-])(:|v-bind:)?data-([a-z][a-z0-9-]*)(?:="([^"]*)")?/g)) {
    const [, bound, name, value] = m
    if (!found.has(name))
      found.set(name, { name, bound: !!bound, value: bound ? undefined : value })
  }
  return [...found.values()]
}

const camel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
const esc = s => String(s).replace(/\|/g, '\\|').replace(/\n+/g, ' ')
const code = s => `\`${esc(s)}\``
// --- Anatomy ------------------------------------------------------------------
// Pohon bagian dari demo situs (src/demo): template tiap demo yang mengimpor
// komponen ini diurai, hanya elemen yang merupakan bagiannya yang disimpan
// (elemen lain dilewati, anak-anaknya naik), lalu semua demo digabung.

const DEMOS = fs.readdirSync(path.join(ROOT, 'src/demo')).filter(f => f.endsWith('.vue')).map(f => read(path.join(ROOT, 'src/demo', f)))
const pascal = t => (t.includes('-') ? t.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('') : t)

function anatomy(folder, partNames) {
  const importPath = path.relative(path.join(ROOT, 'src'), folder).split(path.sep).join('/')
  const imports = new RegExp(`from ['"]@/${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`)
  const root = { children: [] }
  const add = (parent, tag) => {
    let c = parent.children.find(x => x.tag === tag)
    if (!c)
      parent.children.push(c = { tag, children: [] })
    return c
  }
  const walk = (node, parent) => {
    for (const ch of node.children ?? []) {
      if (ch.type !== 1)
        continue
      const tag = pascal(ch.tag)
      walk(ch, partNames.has(tag) ? add(parent, tag) : parent)
    }
  }
  for (const demo of DEMOS.filter(d => imports.test(d))) {
    const template = demo.match(/<template>([\s\S]*)<\/template>/)?.[1]
    if (template)
      walk(parse(template), root)
  }
  const seen = new Set()
  const render = (node, depth) => node.children.map((c) => {
    seen.add(c.tag)
    const pad = '  '.repeat(depth)
    return c.children.length ? `${pad}<${c.tag}>\n${render(c, depth + 1)}\n${pad}</${c.tag}>` : `${pad}<${c.tag} />`
  }).join('\n')
  const tree = render(root, 0)
  return { tree, others: [...partNames].filter(n => !seen.has(n)) }
}

// --- CSS Variables ------------------------------------------------------------
// Token tema yang dibaca komponen (dari kelas Tailwind dan var()), dan variabel
// khusus komponen yang ia tetapkan sendiri — dengan sumber nilainya.

const mainCss = read(path.join(ROOT, 'src/assets/main.css'))
const THEME_TOKENS = new Set([...mainCss.slice(mainCss.indexOf(':root')).matchAll(/^\s*--([a-z0-9-]+)\s*:/gm)].map(m => m[1]))
const COLOR_PREFIX = '(?:bg|text|border(?:-[xytrblse])?|ring(?:-offset)?|outline|fill|stroke|from|via|to|shadow|divide|placeholder|caret|accent|decoration)'

function cssVariables(folder) {
  const files = fs.readdirSync(folder).filter(f => /\.(vue|ts)$/.test(f)).map(f => ({ f, s: read(path.join(folder, f)) }))
  const all = files.map(x => x.s).join('\n')
  const tokens = new Set()
  for (const m of all.matchAll(new RegExp(`(?<![\\w-])(?:[\\w-]+:)*${COLOR_PREFIX}-([a-z0-9-]+?)(?:\\/\\d+)?(?![\\w-])`, 'g'))) {
    if (THEME_TOKENS.has(m[1]))
      tokens.add(m[1])
  }
  for (const m of all.matchAll(/var\(--([a-z0-9-]+)/g)) {
    if (THEME_TOKENS.has(m[1]))
      tokens.add(m[1])
  }
  if (/(?<![\w-])rounded(?:-[trblse]{1,2})?-(?:sm|md|lg|xl|2xl|3xl)\b/.test(all))
    tokens.add('radius')
  if (/(?<![\w-:])border(?:-[xytrblse])?(?![\w-])/.test(all))
    tokens.add('border')

  // Nilai: prop → "prop `x`", konstanta → nilainya, literal → apa adanya,
  // ekspresi lain → dihitung saat runtime. Satu variabel bisa diisi di
  // beberapa tempat (mis. lebar sidebar di desktop dan ponsel).
  const constants = new Map([...all.matchAll(/const\s+([A-Z][A-Z0-9_]*)\s*=\s*['"`]([^'"`]+)['"`]/g)].map(m => [m[1], m[2]]))
  const describe = (raw) => {
    const v = raw.trim().replace(/,$/, '')
    const prop = v.match(/props\.(\w+)/)?.[1]
    if (prop)
      return `prop \`${prop}\``
    if (constants.has(v))
      return `\`${constants.get(v)}\``
    const literal = v.match(/^['"]([^'"$]+)['"]$/)?.[1] ?? (/^[\w.%()-]+$/.test(v) && /\d/.test(v) ? v : null)
    return literal ? `\`${literal}\`` : 'dihitung saat runtime'
  }
  const own = new Map()
  const note = (name, value) => {
    if (THEME_TOKENS.has(name) || /^(tw|reka|spacing)/.test(name) || value === `\`var(--${name})\``)
      return
    own.set(name, [...new Set([...(own.get(name) ?? []), value])])
  }
  for (const { s } of files) {
    for (const m of s.matchAll(/['"]--([a-z][a-z0-9-]*)['"]\s*:\s*([^,\n;}]+)/g))
      note(m[1], describe(m[2]))
    for (const m of s.matchAll(/(?<![\w'"-])--([a-z][a-z0-9-]*)\s*:\s*([^;\n}"]+)/g))
      note(m[1], describe(m[2]))
    for (const m of s.matchAll(/\[--([a-z][a-z0-9-]*):([^\]\s]+)\]/g))
      note(m[1], `\`${m[2]}\``)
  }
  // Nilai "runtime" tidak perlu disebut bila ada nilai yang lebih jelas.
  for (const [name, values] of own) {
    const clear = values.filter(v => v !== 'dihitung saat runtime')
    own.set(name, (clear.length ? clear : values).join(', '))
  }
  return { tokens: [...tokens].sort(), own: [...own].sort() }
}

const cleanType = (t, required) => (required ? t : t.replace(/ \| undefined/g, '').replace(/^undefined \| /, '').replace(/ \| null$/, ''))

const data = {}
fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUT_DIR, { recursive: true })

for (const c of components) {
  const parts = c.parts.map((p) => {
    const meta = metaOf(p.file)
    const docs = emitDocs(p.file)
    const modelDoc = name => name.startsWith('update:') ? `Emitted when \`${name.slice(7)}\` changes. Bind with \`v-model:${name.slice(7)}\`.` : ''
    const events = meta.events.map(e => ({ ...e, description: e.description || docs[e.name] || COMMON[e.name] || modelDoc(e.name) }))
    return { name: p.name, ...meta, events, data: dataAttributes(p.file) }
  })
  data[c.name] = parts

  const item = publishedItem(c.name)
  const out = []

  if (item) {
    const files = (item.files ?? []).map(f => targetPath(f.path))
    out.push('<!-- #region requirements -->')
    out.push('## Requirements\n')
    out.push('Semua dipasang otomatis oleh `kliping add`; tabel ini untuk Anda yang memasang manual atau memeriksa project.\n')
    out.push('| Requirement | Value |\n|---|---|')
    out.push('| Project | Vue 3.5+, Tailwind CSS v4, alias `@` — disiapkan `kliping init` |')
    if (item.dependencies?.length)
      out.push(`| npm packages | ${item.dependencies.map(code).join(', ')} |`)
    if (item.registryDependencies?.length)
      out.push(`| Kliping items | ${item.registryDependencies.map(d => code(d.replace('@kliping/', ''))).join(', ')} |`)
    out.push(`| Files | ${files.map(code).join('<br>')} |`)
    out.push('<!-- #endregion requirements -->\n')
  }

  const tree = anatomy(c.folder, new Set(parts.map(p => p.name)))
  if (parts.length > 1 && tree.tree) {
    out.push('<!-- #region anatomy -->')
    out.push('## Anatomy\n')
    out.push('Susunan bagiannya seperti dipakai di contoh-contoh di atas. Impor semua bagian dari satu tempat, lalu susun begini:\n')
    out.push('```vue', tree.tree, '```\n')
    if (tree.others.length)
      out.push(`Bagian lain yang tersedia: ${tree.others.map(code).join(', ')}.\n`)
    out.push('<!-- #endregion anatomy -->\n')
  }

  out.push('## API Reference\n')
  for (const p of parts) {
    if (parts.length > 1)
      out.push(`### ${p.name}\n`)
    out.push(`<!-- #region ${p.name} -->`)
    if (p.props.length) {
      const native = p.props.filter(prop => !prop.description && !COMMON[prop.name] && NATIVE_INPUT_ATTRS.has(prop.name))
      out.push('| Prop | Type | Default | Description |\n|---|---|---|---|')
      for (const prop of p.props.filter(prop => !native.includes(prop))) {
        const desc = prop.description || COMMON[prop.name] || ''
        out.push(`| ${code(prop.name + (prop.required ? '' : '?'))} | ${code(cleanType(prop.type, prop.required))} | ${prop.default === undefined ? '—' : code(prop.default)} | ${esc(desc)} |`)
      }
      out.push('')
      if (native.length)
        out.push(`Ditambah atribut \`<input>\` bawaan, diteruskan ke elemen input: ${native.map(prop => code(prop.name)).join(', ')}.\n`)
    }
    if (p.events.length) {
      out.push('| Event | Payload | Description |\n|---|---|---|')
      for (const e of p.events)
        out.push(`| ${code(`@${e.name}`)} | ${code(e.type)} | ${esc(e.description || COMMON[e.name] || '')} |`)
      out.push('')
    }
    if (p.slots.length) {
      out.push('| Slot | Props |\n|---|---|')
      for (const s of p.slots)
        out.push(`| ${code(`#${s.name}`)} | ${s.type === '{}' || s.type === 'any' ? '—' : code(s.type)} |`)
      out.push('')
    }
    const attrs = p.data.filter(a => a.name !== 'slot')
    const slot = p.data.find(a => a.name === 'slot' && a.value)
    if (attrs.length || slot) {
      out.push('| Data attribute | Value |\n|---|---|')
      if (slot)
        out.push(`| ${code('[data-slot]')} | ${code(`"${slot.value}"`)} |`)
      for (const a of attrs) {
        const prop = p.props.find(x => x.name === camel(a.name))
        const value = a.value !== undefined ? `"${a.value}"` : prop ? cleanType(prop.type, false) : 'set at runtime'
        out.push(`| ${code(`[data-${a.name}]`)} | ${a.value !== undefined || prop ? code(value) : value} |`)
      }
      out.push('')
    }
    if (!p.props.length && !p.events.length && !p.slots.length && !attrs.length && !slot)
      out.push('Tidak punya props, events, atau slot sendiri.\n')
    out.push(`<!-- #endregion ${p.name} -->\n`)
  }

  const own = componentKeyboard[c.name]
  if (own?.rows.length) {
    out.push('<!-- #region keyboard -->')
    out.push('## Keyboard Interactions\n')
    out.push(`${own.note}\n`)
    out.push('| Key | Description |\n|---|---|')
    for (const row of own.rows)
      out.push(`| ${row.keys.map(code).join(', ')} | ${esc(row.description)} |`)
    out.push('<!-- #endregion keyboard -->\n')
  }
  else if (c.primitive) {
    out.push('<!-- #region keyboard -->')
    out.push('## Keyboard Interactions\n')
    out.push(`Perilaku keyboard-nya datang dari primitif Reka UI [\`${c.primitive.name}\`](https://reka-ui.com/docs/components/${c.primitive.slug}#keyboard-interactions) yang dipakai komponen ini, mengikuti pola WAI-ARIA.\n`)
    out.push('| Key | Description |\n|---|---|')
    for (const row of rekaKeyboard[c.primitive.slug])
      out.push(`| ${row.keys.map(code).join(' + ')} | ${esc(row.description)} |`)
    out.push('<!-- #endregion keyboard -->\n')
  }

  const vars = cssVariables(c.folder)
  if (vars.tokens.length || vars.own.length) {
    out.push('<!-- #region css-variables -->')
    out.push('## CSS Variables\n')
    if (vars.tokens.length)
      out.push(`Token tema yang dibaca komponen ini — ubah nilainya di CSS global (\`:root\` dan \`.dark\`, lihat [Theming](/theming)) untuk mengubah tampilannya tanpa menyentuh komponennya: ${vars.tokens.map(t => code(`--${t}`)).join(', ')}.\n`)
    if (vars.own.length) {
      out.push('Variabel khusus komponen ini — bisa ditimpa lewat `style` atau CSS Anda:\n')
      out.push('| Variable | Value |\n|---|---|')
      for (const [name, source] of vars.own)
        out.push(`| ${code(`--${name}`)} | ${source} |`)
      out.push('')
    }
    out.push('<!-- #endregion css-variables -->\n')
  }

  const changes = changeLines(c.name)
  if (changes.length)
    out.push('<!-- #region changelog -->', ...changes, '<!-- #endregion changelog -->\n')

  const credits = creditLines('component', c.name)
  if (credits.length)
    out.push('<!-- #region credits -->', ...credits, '<!-- #endregion credits -->\n')

  fs.writeFileSync(path.join(OUT_DIR, `${c.name}.md`), `${out.join('\n').trim()}\n`)
}

fs.mkdirSync(CACHE_DIR, { recursive: true })
fs.writeFileSync(CACHE_FILE, JSON.stringify(nextCache))
fs.writeFileSync(DATA_FILE, `${JSON.stringify(data, null, 1)}\n`)
const total = components.reduce((n, c) => n + c.parts.length, 0)
console.log(`✔ API reference — ${components.length} components, ${total} parts`)
