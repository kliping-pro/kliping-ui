// Menyusun registry Kliping lengkap — semua yang bisa dipasang, dari satu tempat.
//
//   registry.json             manifes sumber: tiap item, berkas aslinya di src/,
//                             dan ketergantungannya. Di-commit — inilah yang
//                             ditinjau saat sebuah item berubah.
//   docs/public/r/<nama>.json item siap pasang, isi berkasnya ikut di dalamnya.
//                             Disajikan situs di https://kliping.pro/r/<nama>.json.
//   docs/public/r/registry.json  indeks seluruh item, tanpa isi berkas.
//
// Yang masuk:
//
//   src/components/ui/<x>/     registry:ui       → components/ui/<x>/
//   src/components/<x>/        registry:ui       → components/ui/<x>/
//   src/blocks/<x>/            registry:block    → components/blocks/<x>/
//   src/charts/<X>.vue         registry:block    → components/charts/<x>/
//   src/variants/<k>/<x>.vue    registry:component→ components/variants/<x>/
//   src/composables/<x>.ts     registry:hook     → composables/<x>.ts
//   src/lib/<x>.ts             registry:lib      → lib/<x>.ts
//
// Templates tidak masuk: masing-masing project utuh di repo-nya sendiri.
//
// TIDAK ADA YANG DITULIS TANGAN. Ketergantungan diturunkan dari impor
// sungguhan di tiap berkas:
//
//   - paket npm      → `dependencies`, dengan rentang versi dari package.json
//   - item Kliping   → `registryDependencies` sebagai `@kliping/<nama>`
//   - berkas lokal   → ikut dikemas ke dalam item (komponen bantu sebuah block,
//                      data, konfigurasi)
//   - kelas animasi dan utilitas buatan sendiri (animations.css, utilities.css)
//                    → `cssVars` dan `css`, supaya CLI menuliskannya ke CSS
//                      project orang
//
// Jalur berkas di JSON terbitan ditulis dalam bentuk kanonis shadcn-vue
// (`registry/kliping/ui/button/Button.vue`), dan impornya diubah ke bentuk
// `@/registry/kliping/...`. Dari dua hal itu CLI menentukan sendiri ke folder
// mana berkas mendarat dan menulis ulang impornya ke alias project orang —
// aturan yang sama dengan registry shadcn-vue sendiri.
//
// Apa pun yang tidak bisa dipetakan membuat skrip ini gagal dengan pesan yang
// menyebut item dan berkasnya: impor ke berkas yang tidak ada, paket yang tidak
// ada di package.json, nama bentrok, ketergantungan ke item yang tidak terdaftar.
// Kesalahan registry itu diam — yang menanggungnya orang lain, di mesin lain.
//
// Jalankan: npm run generate:registry  (otomatis lewat `predocs:build`)
//           npm run check:registry  (tanpa menulis; gagal kalau registry.json basi)

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import { checkContent, indonesianWords } from './check-language.mjs'
import { formatCode } from './format-code.mjs'
import { readChanges } from './item-changes.mjs'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const SRC = path.join(ROOT, 'src')
const OUTPUT_DIR = path.join(ROOT, 'docs/public/r')
const CHECK = process.argv.includes('--check')

const SITE_URL = 'https://kliping.pro'
const ITEM_SCHEMA = 'https://kliping.pro/schema/registry-item.json'
const REGISTRY_SCHEMA = 'https://kliping.pro/schema/registry.json'

// CRLF → LF: Git untuk Windows (core.autocrlf) memeriksa berkas dengan CRLF;
// tanpa ini isi item dan perbandingan `--check` berbeda hanya di Windows.
const read = p => fs.readFileSync(p, 'utf-8').replace(/\r\n/g, '\n')
const readJson = p => JSON.parse(read(path.join(ROOT, p)))
const rel = p => path.relative(ROOT, p).split(path.sep).join('/')

const pkgJson = readJson('package.json')
const VERSIONS = { ...pkgJson.devDependencies, ...pkgJson.dependencies }
/**
 * Rentang versi sebuah paket: dari package.json, atau — untuk paket yang cuma
 * datang lewat paket lain (shiki lewat VitePress) — dari versi yang terpasang.
 */
function version(pkg) {
  if (VERSIONS[pkg])
    return VERSIONS[pkg]
  const p = path.join(ROOT, 'node_modules', pkg, 'package.json')
  return fs.existsSync(p) ? `^${JSON.parse(read(p)).version}` : undefined
}
/** Paket yang pasti sudah ada di project Vue mana pun. */
const BUILTIN = new Set(['vue'])

const problems = []
const report = (items, message) => {
  if (!problems.includes(`${items}: ${message}`))
    problems.push(`${items}: ${message}`)
}

// ---------------------------------------------------------------------------
// Nama dan metadata

/**
 * Nama berkas di project orang selalu kebab-case: `Button.vue` → `button.vue`,
 * `PaymentCard.vue` → `payment-card.vue`, `QRCode.vue` → `qr-code.vue`,
 * `useCarousel.ts` → `use-carousel.ts`. Segmen yang sudah kebab tidak disentuh.
 */
function kebabFile(segment) {
  if (!/[A-Z]/.test(segment))
    return segment
  const [name, ...ext] = segment.split('.')
  const k = name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase()
  return [k, ...ext].join('.')
}
const kebabPath = p => p.split('/').map(kebabFile).join('/')
const kebab = n => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const titleFromName = n => n.split('-').map(b => (/^\d+$/.test(b) ? b : b[0].toUpperCase() + b.slice(1))).join(' ')

/**
 * `ui/marquee` (marquee satu komponen, dipakai block testimonial) dan
 * `components/marquee` (marquee majemuk yang didokumentasikan di
 * /components/marquee) sama-sama ingin mendarat di `components/ui/marquee`.
 * Yang terdokumentasi memegang nama aslinya.
 */
const UI_NAMES = { marquee: 'marquee-basic' }

/** Item tanpa halaman dokumentasi — keterangannya ditulis di sini. */
const CUSTOM_DESCRIPTIONS = {
  'animated-grid-pattern': 'Latar pola kisi dengan kotak yang muncul dan menghilang bergantian.',
  'border-beam': 'Sinar cahaya yang berjalan mengelilingi tepi sebuah elemen.',
  'dot-pattern': 'Latar pola titik, bisa dengan titik yang berdenyut.',
  'particles': 'Latar partikel yang melayang perlahan.',
  'marquee-basic': 'Baris isi yang bergulir tanpa henti — versi satu komponen yang dipakai block.',
  'logos': 'Kumpulan logo contoh untuk block dan pratinjau.',
}

/** Frontmatter halaman dokumentasi komponen. */
function docFrontmatter(name) {
  const p = path.join(ROOT, 'docs/components', `${name}.md`)
  if (!fs.existsSync(p))
    return {}
  const content = read(p)
  const pick = k => content.match(new RegExp(`^${k}:(.*)$`, 'm'))?.[1].trim().replace(/^(["'])(.*)\1$/, '$2')
  return { title: pick('title'), description: pick('description') }
}

const blocksJson = readJson('src/registry/blocks.json')
const blocksByName = new Map(blocksJson.map(b => [b.name, b]))
const variantsJson = readJson('src/registry/variants.json')
const variantsByName = new Map(variantsJson.map(v => [v.name, v]))
const oldManifest = fs.existsSync(path.join(ROOT, 'registry.json')) ? readJson('registry.json') : { items: [] }
const oldItems = new Map(oldManifest.items.map(i => [i.name, i]))
// Keterangan Indonesia untuk halaman Hooks situs. Sumbernya berkas situs itu
// sendiri, bukan registry.json — manifes itu kini memuat keterangan Inggris.
const siteHookDescriptions = new Map(readJson('src/registry/registry-hooks.json').items.map(i => [i.name, i.description]))

// ---------------------------------------------------------------------------
// Membaca impor

/** Komentar dibuang dulu — contoh `import … from 'shiki'` di dalam komentar bukan ketergantungan. */
function stripComments(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1')
}

const IMPORT_PATTERN = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])([^'"\n]+)\2/g

function listImports(content) {
  return [...stripComments(content).matchAll(IMPORT_PATTERN)].map(m => m[3])
}

const EXTENSIONS = ['', '.ts', '.vue', '.js', '/index.ts', '/index.js']

/** Jalur absolut berkas lokal yang dituju sebuah impor, atau null untuk paket npm. */
function resolveImport(specifier, importer) {
  let base
  if (specifier.startsWith('@/'))
    base = path.join(SRC, specifier.slice(2))
  else if (specifier.startsWith('.'))
    base = path.resolve(path.dirname(importer), specifier)
  else
    return null
  for (const e of EXTENSIONS) {
    // `normalize`: di Windows `base + '/index.ts'` menghasilkan garis miring
    // campuran (`…\button/index.ts`) yang tidak sama dengan jalur dari
    // `allFiles` (`…\button\index.ts`) — impor `from '.'` lalu dikira keluar folder.
    const p = path.normalize(base + e)
    if (fs.existsSync(p) && fs.statSync(p).isFile())
      return p
  }
  return undefined
}

/**
 * Paket tipe pendamping: `qrcode` tidak membawa deklarasi tipenya sendiri, jadi
 * project TypeScript orang butuh `@types/qrcode`. Diambil kalau repo ini juga
 * memasangnya — itulah tanda paketnya memang perlu.
 */
function typesPackage(pkg) {
  const info = path.join(ROOT, 'node_modules', pkg, 'package.json')
  if (!fs.existsSync(info))
    return undefined
  const j = JSON.parse(read(info))
  const hasOwnTypes = j.types || j.typings || fs.existsSync(path.join(ROOT, 'node_modules', pkg, 'index.d.ts'))
    || Object.values(j.exports ?? {}).some(e => typeof e === 'object' && e && ('types' in e || Object.values(e).some(x => typeof x === 'object' && x && 'types' in x)))
  if (hasOwnTypes)
    return undefined
  const name = `@types/${pkg.startsWith('@') ? pkg.slice(1).replace('/', '__') : pkg}`
  return version(name) ? `${name}@${version(name)}` : undefined
}

/** Nama paket npm dari sebuah spesifier: `@a/b/c` → `@a/b`, `x/y` → `x`. */
function packageName(specifier) {
  const b = specifier.split('/')
  return specifier.startsWith('@') ? `${b[0]}/${b[1]}` : b[0]
}

// ---------------------------------------------------------------------------
// Pemilik tiap berkas lokal: berkas di folder sebuah komponen milik komponen
// itu; composable dan lib milik itemnya sendiri. Selain itu berkas "lepas" —
// ikut dikemas ke item yang memakainya.

const UI_DIR = path.join(SRC, 'components/ui')
const COMPONENTS_DIR = path.join(SRC, 'components')

/** Hooks dan lib yang diterbitkan: yang sudah terdaftar, ditambah lib yang dipakai komponen. */
const HOOK_NAMES = oldManifest.items.filter(i => i.type === 'registry:hook').map(i => i.name)
const LIB_NAMES = [...new Set([...oldManifest.items.filter(i => i.type === 'registry:lib').map(i => i.name), 'create-context', 'highlight-code'])]

function owner(abs) {
  const r = rel(abs)
  let m = r.match(/^src\/components\/ui\/([^/]+)\//)
  if (m)
    return { name: UI_NAMES[m[1]] ?? m[1], kind: 'ui' }
  m = r.match(/^src\/components\/([^/]+)\//)
  if (m)
    return { name: m[1], kind: 'ui' }
  m = r.match(/^src\/composables\/([^/]+)\.ts$/)
  if (m)
    return HOOK_NAMES.includes(m[1]) ? { name: m[1], kind: 'hook' } : { unpublished: true }
  if (r === 'src/lib/utils.ts')
    return { utils: true }
  m = r.match(/^src\/lib\/([^/]+)\.ts$/)
  if (m)
    return LIB_NAMES.includes(m[1]) ? { name: m[1], kind: 'lib' } : { unpublished: true }
  return null
}

/** Jalur kanonis berkas milik item ui/hook/lib — bentuk yang dikenali CLI. */
function ownedCanonical(abs, p) {
  const r = rel(abs)
  if (p.kind === 'hook')
    return `registry/kliping/composables/${p.name}.ts`
  if (p.kind === 'lib')
    return `registry/kliping/lib/${p.name}.ts`
  const inner = r.replace(/^src\/components\/(ui\/)?[^/]+\//, '')
  return `registry/kliping/ui/${p.name}/${kebabPath(inner)}`
}

// ---------------------------------------------------------------------------
// CSS buatan sendiri: animasi dan utilitas. Tiap kelas yang dipakai sebuah item
// membawa definisinya — `--animate-*` ke `cssVars.theme`, @keyframes, @utility,
// dan @property ke `css`.

function toObject(node) {
  const o = {}
  for (const n of node.nodes ?? []) {
    if (n.type === 'decl')
      o[n.prop] = n.value
    else if (n.type === 'rule')
      o[n.selector] = toObject(n)
    else if (n.type === 'atrule')
      o[`@${n.name} ${n.params}`] = toObject(n)
  }
  return o
}

const css = { animations: new Map(), keyframes: new Map(), utilities: new Map(), properties: new Map() }
for (const file of ['src/assets/animations.css', 'src/assets/utilities.css']) {
  postcss.parse(read(path.join(ROOT, file))).walk((n) => {
    if (n.type === 'decl' && n.prop.startsWith('--animate-') && n.parent?.type === 'atrule' && n.parent.name === 'theme')
      css.animations.set(n.prop.slice(2), n.value)
    else if (n.type === 'atrule' && n.name === 'keyframes')
      css.keyframes.set(n.params, toObject(n))
    else if (n.type === 'atrule' && n.name === 'utility')
      css.utilities.set(n.params, { object: toObject(n), text: n.toString() })
    else if (n.type === 'atrule' && n.name === 'property')
      css.properties.set(n.params, toObject(n))
  })
}

// Token warna buatan Kliping (`pill`, `surface`, `code`, …) — tidak ada di
// project shadcn-vue biasa. Item yang memakainya membawa definisinya, untuk
// tema terang dan gelap.
const STANDARD_TOKENS = new Set(['background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground', 'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground', 'accent', 'accent-foreground', 'destructive', 'destructive-foreground', 'border', 'input', 'ring', 'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring'])
const token = new Map() // nama → { theme, light, dark }
{
  const light = {}
  const dark = {}
  const theme = {}
  postcss.parse(read(path.join(ROOT, 'src/assets/main.css'))).walkDecls((d) => {
    const parent = d.parent
    if (parent?.type === 'atrule' && parent.name === 'theme' && d.prop.startsWith('--color-'))
      theme[d.prop.slice('--color-'.length)] = d.value
    else if (parent?.type === 'rule' && parent.selector === ':root')
      light[d.prop.slice(2)] = d.value
    else if (parent?.type === 'rule' && parent.selector === '.dark')
      dark[d.prop.slice(2)] = d.value
  })
  for (const [name, value] of Object.entries(theme)) {
    if (!STANDARD_TOKENS.has(name) && light[name] !== undefined)
      token.set(name, { theme: value, light: light[name], dark: dark[name] ?? light[name] })
  }
}

/** Utilitas Tailwind yang menerima warna — `bg-pill`, `border-x-surface`, `ring-offset-code`. */
const COLOR_UTILITIES = 'bg|text|fill|stroke|from|via|to|caret|accent|decoration|placeholder|divide|outline|shadow|inset-shadow|drop-shadow|ring|inset-ring|ring-offset|border(?:-[xytrblse])?'

const classBoundary = name => new RegExp(`(?<![\\w-])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`)

/** cssVars dan css untuk isi sebuah item. */
function cssFor(combinedContent) {
  const theme = {}
  const rules = {}
  const keyframeNames = new Set()
  const addKeyframesFrom = (text) => {
    for (const k of css.keyframes.keys()) {
      if (classBoundary(k).test(text))
        keyframeNames.add(k)
    }
  }
  for (const [name, value] of css.animations) {
    if (classBoundary(name).test(combinedContent) || combinedContent.includes(`var(--${name})`)) {
      theme[name] = value
      addKeyframesFrom(value)
    }
  }
  for (const [name, u] of css.utilities) {
    if (classBoundary(name).test(combinedContent)) {
      rules[`@utility ${name}`] = u.object
      addKeyframesFrom(u.text)
      for (const [p, o] of css.properties) {
        if (u.text.includes(p))
          rules[`@property ${p}`] = o
      }
    }
  }
  // Keyframes yang dipanggil langsung: `animation:` di CSS, `animationName:`
  // di objek gaya, atau `animate-[…]`.
  for (const m of combinedContent.matchAll(/animation(?:-name|Name)?['"]?\s*:\s*([^;}\n]+)|animate-\[([^\]]+)\]/g))
    addKeyframesFrom((m[1] ?? m[2]).replace(/_/g, ' '))
  for (const k of [...keyframeNames].sort())
    rules[`@keyframes ${k}`] = css.keyframes.get(k)
  const light = {}
  const dark = {}
  // Terpanjang dulu: `surface-foreground` bukan `surface`.
  for (const [name, t] of [...token].sort((a, b) => b[0].length - a[0].length)) {
    const used = new RegExp(`(?<![\\w-])(?:${COLOR_UTILITIES})-${name}(?![\\w-])`).test(combinedContent) || combinedContent.includes(`var(--${name})`)
    if (used) {
      theme[`color-${name}`] = t.theme
      light[name] = t.light
      dark[name] = t.dark
    }
  }
  const vars = Object.keys(theme).length ? { theme } : undefined
  if (vars && Object.keys(light).length)
    Object.assign(vars, { light, dark })
  return {
    cssVars: vars,
    css: Object.keys(rules).length ? rules : undefined,
  }
}

// ---------------------------------------------------------------------------
// Menyusun satu item.
//
// `initialFiles` adalah berkas yang pasti ikut. Untuk ui itu seluruh foldernya;
// untuk block, chart, dan variant cuma berkas utamanya — sisanya ditemukan
// dengan mengikuti impor, jadi berkas yang tidak dipakai tidak ikut terkirim.

function allFiles(dir) {
  // Diurutkan sendiri: urutan readdirSync berbeda antar OS (Windows tidak
  // membedakan huruf besar-kecil: `index.ts` sebelum `Item.vue`).
  return fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory())
      return allFiles(p)
    return /\.(test|spec|stories)\.ts$|\.md$/.test(e.name) ? [] : [p]
  })
}

/**
 * @param {object} def
 * @param {string} def.name
 * @param {string} def.type           jenis item registry
 * @param {string} def.fileType     jenis tiap berkasnya
 * @param {string[]} def.initialFiles   jalur absolut
 * @param {(abs: string) => string} [def.looseCanonical]  jalur kanonis berkas lepas (block, chart, variant)
 * @param {boolean} [def.keepRelative]  ui: struktur foldernya utuh, impor relatif dibiarkan
 */
function buildItem(def) {
  const files = new Map() // abs → kanonis
  const deps = new Set()
  const devDeps = new Set()
  const regDeps = new Set()
  const queue = [...def.initialFiles]
  const isOwn = abs => def.initialFiles.includes(abs)

  const canonical = (abs) => {
    if (files.has(abs))
      return files.get(abs)
    const p = owner(abs)
    const k = p?.name === def.name ? ownedCanonical(abs, p) : def.looseCanonical(abs)
    files.set(abs, k)
    return k
  }
  for (const abs of def.initialFiles)
    canonical(abs)

  const rewritten = new Map() // abs → isi baru

  while (queue.length) {
    const abs = queue.shift()
    const content = read(abs)
    const replacements = new Map()
    for (const spec of listImports(content)) {
      const target = resolveImport(spec, abs)
      if (target === null) {
        const pkg = packageName(spec)
        if (BUILTIN.has(pkg))
          continue
        if (!version(pkg)) {
          report(def.name, `${rel(abs)} imports package "${pkg}", which is not in package.json`)
          continue
        }
        deps.add(`${pkg}@${version(pkg)}`)
        const typesPkg = typesPackage(pkg)
        if (typesPkg)
          devDeps.add(typesPkg)
        continue
      }
      if (target === undefined) {
        report(def.name, `${rel(abs)} imports "${spec}", file not found`)
        continue
      }
      const p = owner(target)
      if (p?.utils) {
        if (spec !== '@/lib/utils')
          replacements.set(spec, '@/lib/utils')
        continue
      }
      if (p?.unpublished) {
        report(def.name, `${rel(abs)} imports ${rel(target)}, which is not a registry item`)
        continue
      }
      if (p && p.name !== def.name) {
        // Item Kliping lain: jadi ketergantungan, impornya ke bentuk kanonis.
        regDeps.add(`@kliping/${p.name}`)
        const k = ownedCanonical(target, p)
        const withoutExt = /\.(vue|ts|js)$/.test(spec) ? k : k.replace(/(\/index)?\.(ts|js)$/, '')
        replacements.set(spec, `@/${withoutExt}`)
        continue
      }
      // Berkas milik item ini sendiri, atau berkas lepas yang ikut dikemas.
      if (!files.has(target) && !isOwn(target)) {
        if (!def.looseCanonical) {
          report(def.name, `${rel(abs)} imports ${rel(target)} outside its folder`)
          continue
        }
        queue.push(target)
      }
      const k = canonical(target)
      if (def.keepRelative && spec.startsWith('.')) {
        // Struktur folder komponen utuh, tapi nama berkasnya jadi kebab-case:
        // impor relatifnya dihitung ulang dari jalur barunya.
        let r = path.posix.relative(path.posix.dirname(canonical(abs)), k)
        if (!r.startsWith('.'))
          r = `./${r}`
        if (!/\.(vue|ts|js)$/.test(spec))
          r = r.replace(/(\/index)?\.(ts|js)$/, '')
        if (r !== spec)
          replacements.set(spec, r)
        continue
      }
      const withoutExt = /\.(vue|ts|js)$/.test(spec) ? k : k.replace(/(\/index)?\.(ts|js)$/, '')
      replacements.set(spec, `@/${withoutExt}`)
    }
    let updated = content
    for (const [from, to] of replacements)
      updated = updated.replace(new RegExp(`(['"])${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g'), `$1${to}$1`)
    rewritten.set(abs, updated)
  }

  // Jalur kanonis tidak boleh membingungkan aturan alias CLI: segmen yang
  // diawali "ui" atau bernama "components" di luar tempatnya akan dipetakan
  // ke folder yang salah.
  const allCanonical = [...files.values()]
  if (new Set(allCanonical).size !== allCanonical.length)
    report(def.name, `two files land on the same path: ${allCanonical.join(', ')}`)
  for (const k of allCanonical) {
    const rest = k.replace(/^registry\/kliping\/(ui|lib|composables|components)\//, '')
    if (/(^|\/)(ui|components|composables)(\/|$)/.test(rest))
      report(def.name, `path ${k} contains a segment the CLI uses to pick a folder`)
  }

  const combinedContent = [...rewritten.values()].join('\n')
  regDeps.delete(`@kliping/${def.name}`)
  return {
    files: [...files].map(([abs, k]) => ({ abs, path: k, type: def.fileType, content: rewritten.get(abs) })),
    dependencies: [...deps].sort(),
    devDependencies: [...devDeps].sort(),
    registryDependencies: [...regDeps].sort(),
    ...cssFor(combinedContent),
  }
}

// ---------------------------------------------------------------------------
// Daftar item per modul

const items = []

function add(meta, result) {
  items.push({ ...meta, ...result })
}

// Komponen: ui bawaan dan komponen Kliping. Satu folder, satu item.
for (const [dir, baseDir] of [
  ...fs.readdirSync(UI_DIR).sort().map(d => [d, UI_DIR]),
  ...fs.readdirSync(COMPONENTS_DIR).filter(d => d !== 'ui').sort().map(d => [d, COMPONENTS_DIR]),
]) {
  const folder = path.join(baseDir, dir)
  if (!fs.statSync(folder).isDirectory())
    continue
  const name = baseDir === UI_DIR ? (UI_NAMES[dir] ?? dir) : dir
  const doc = baseDir === COMPONENTS_DIR || !UI_NAMES[dir] ? docFrontmatter(name) : {}
  add(
    {
      name,
      type: 'registry:ui',
      title: doc.title ?? titleFromName(name),
      description: CUSTOM_DESCRIPTIONS[name] ?? doc.description,
      categories: ['components'],
    },
    buildItem({ name, type: 'registry:ui', fileType: 'registry:ui', initialFiles: allFiles(folder), keepRelative: true }),
  )
}

/** Jalur kanonis berkas lepas sebuah block, chart, atau variant. */
function looseCanonicalFor(group, name, itemFolder, main, mainName) {
  return (abs) => {
    let r
    if (abs === main)
      r = mainName
    else if (itemFolder && abs.startsWith(itemFolder + path.sep))
      r = path.relative(itemFolder, abs).split(path.sep).join('/').replace(/^components\//, '')
    else
      r = rel(abs).split('/components/').pop().replace(/^src\/[^/]+\/[^/]+\//, '')
    return `registry/kliping/components/${group}/${name}/${kebabPath(r)}`
  }
}

// Blocks
for (const name of fs.readdirSync(path.join(SRC, 'blocks')).sort()) {
  const folder = path.join(SRC, 'blocks', name)
  const main = path.join(folder, 'page.vue')
  if (!fs.existsSync(main)) {
    report(name, 'block without page.vue')
    continue
  }
  const b = blocksByName.get(name)
  add(
    { name, type: 'registry:block', title: titleFromName(name), description: b?.description, categories: ['blocks', ...(b?.categories ?? [])] },
    buildItem({ name, type: 'registry:block', fileType: 'registry:component', initialFiles: [main], looseCanonical: looseCanonicalFor('blocks', name, folder, main, `${name}.vue`) }),
  )
}

// Charts
for (const f of fs.readdirSync(path.join(SRC, 'charts')).filter(f => f.endsWith('.vue')).sort()) {
  const original = f.replace(/\.vue$/, '')
  const name = kebab(original)
  const main = path.join(SRC, 'charts', f)
  const b = blocksByName.get(original)
  add(
    { name, type: 'registry:block', title: titleFromName(name), description: b?.description, categories: ['charts', ...(b?.categories ?? []).filter(c => c !== 'chart')] },
    buildItem({ name, type: 'registry:block', fileType: 'registry:component', initialFiles: [main], looseCanonical: looseCanonicalFor('charts', name, null, main, `${name}.vue`) }),
  )
}

// Variants
for (const k of fs.readdirSync(path.join(SRC, 'variants')).sort()) {
  for (const f of fs.readdirSync(path.join(SRC, 'variants', k)).filter(f => f.endsWith('.vue')).sort()) {
    const name = f.replace(/\.vue$/, '')
    const main = path.join(SRC, 'variants', k, f)
    add(
      { name, type: 'registry:component', title: titleFromName(name), description: variantsByName.get(name)?.description, categories: ['variants', k] },
      buildItem({ name, type: 'registry:component', fileType: 'registry:component', initialFiles: [main], looseCanonical: looseCanonicalFor('variants', name, null, main, `${name}.vue`) }),
    )
  }
}

// Hooks dan lib: judul dan keterangannya dirawat di manifes, isinya diturunkan.
for (const [kind, names, dir, type] of [['hook', HOOK_NAMES, 'composables', 'registry:hook'], ['lib', LIB_NAMES, 'lib', 'registry:lib']]) {
  for (const name of names) {
    const abs = path.join(SRC, dir, `${name}.ts`)
    if (!fs.existsSync(abs)) {
      report(name, `src/${dir}/${name}.ts does not exist`)
      continue
    }
    const previous = oldItems.get(name)
    const libTitles = { 'create-context': 'createContext', 'highlight-code': 'highlightCode' }
    const libDescriptions = {
      'create-context': 'Membuat sepasang penyedia dan pembaca context untuk satu komponen majemuk.',
      'highlight-code': 'Menyorot kode dengan Shiki, dimuat malas — nol byte sampai dipakai.',
    }
    add(
      { name, type, title: previous?.title ?? libTitles[name] ?? name, description: siteHookDescriptions.get(name) ?? libDescriptions[name] ?? previous?.description, categories: [kind === 'hook' ? 'hooks' : 'lib'] },
      buildItem({ name, type, fileType: type, initialFiles: [abs] }),
    )
  }
}

// ---------------------------------------------------------------------------
// Isi yang terbit: tanpa metadata galeri, tanpa komentar (kecuali JSDoc satu
// baris dan arahan perkakas), format seragam — lihat format-code.mjs. Lalu
// diperiksa bahasanya: nama, JSDoc, dan teks yang terkirim wajib Inggris.

await Promise.all(items.flatMap(it => it.files.map(async (f) => {
  try {
    f.content = await formatCode(f.content, f.path)
  }
  catch (error) {
    report(it.name, `${f.path} could not be formatted: ${error.message.split('\n')[0]}`)
  }
})))

// Aset yang diambil dari `docs/public` situs (`/images/…`, `/placeholder.svg`,
// `/avatars/…`) tidak ada di project pengguna: `src="/…"` statis membuat build
// Vite gagal ("Could not resolve"), sisanya jadi 404. Yang terbit menunjuk ke
// situs; aset yang tidak ada di `docs/public` sama sekali adalah pelanggaran.
const ASSET_PATTERN = /(['"`])(\/(?!\/)[\w./-]+\.(?:png|jpe?g|svg|webp|gif|avif|ico|mp4|webm))\1/g

for (const it of items) {
  for (const f of it.files) {
    f.content = f.content.replace(ASSET_PATTERN, (match, quote, assetPath) => {
      if (!fs.existsSync(path.join(ROOT, 'docs/public', assetPath))) {
        report(it.name, `${f.path}: asset ${assetPath} is not in docs/public`)
        return match
      }
      return `${quote}${SITE_URL}${assetPath}${quote}`
    })
  }
}

// Gambar contoh dari host luar (stok foto, avatar orang, logo merek pihak lain)
// tidak boleh kembali: pakai `/samples/…` dari scripts/generate-sample-images.mjs.
const EXTERNAL_IMAGE = /https?:\/\/(?:images\.unsplash\.com|images\.pexels\.com|cdn\.pixabay\.com|(?:www\.)?fffuel\.co|v3\.material-tailwind\.com|mockmind-api\.uifaces\.co|randomuser\.me|i\.pravatar\.cc|picsum\.photos|github\.com\/[^\s"'`]+\.png)/
for (const it of items) {
  for (const f of it.files) {
    const m = f.content.match(EXTERNAL_IMAGE)
    if (m)
      report(it.name, `${f.path}: external sample image ${m[0]}… — use /samples/… (npm run generate:samples)`)
  }
}

for (const it of items) {
  for (const f of it.files) {
    for (const t of checkContent(f.content, f.path))
      report(it.name, `${f.path}: Indonesian ${t.kind} — ${t.text} [${t.words.join(', ')}]`)
  }
}

// ---------------------------------------------------------------------------
// Pemeriksaan lintas item

const registered = new Map()
for (const it of items) {
  if (registered.has(it.name))
    report(it.name, 'name used by two items')
  if (it.name === 'init')
    report(it.name, 'name "init" is taken by the `kliping init` base item (r/init.json)')
  registered.set(it.name, it)
  if (!it.title)
    report(it.name, 'has no title')
  if (!it.description)
    report(it.name, 'has no description')
  for (const d of it.registryDependencies) {
    if (!registered.has(d.slice('@kliping/'.length)) && !items.some(x => x.name === d.slice('@kliping/'.length)))
      report(it.name, `depends on ${d}, which is not registered`)
  }
}

// Keterangan yang terkirim (r/*.json, dibaca `kliping search/view` dan agen
// MCP) berbahasa Inggris, dari src/registry/descriptions.json. Keterangan
// Indonesia di atas tetap milik halaman situs (registry-hooks.json).
const DESCRIPTIONS_FILE = 'src/registry/descriptions.json'
const englishDescriptions = readJson(DESCRIPTIONS_FILE)
for (const it of items) {
  const en = englishDescriptions[it.name]
  if (!en)
    report(it.name, `has no English description in ${DESCRIPTIONS_FILE}`)
  else if (indonesianWords(en).length)
    report(it.name, `English description has Indonesian words [${indonesianWords(en).join(', ')}]: ${en}`)
  it.siteDescription = it.description
  it.description = en
}
for (const name of Object.keys(englishDescriptions)) {
  if (!registered.has(name))
    report(name, `${DESCRIPTIONS_FILE} describes an item that does not exist`)
}
// Catatan perubahan per item (src/registry/changes.json): nama harus ada,
// jenisnya salah satu dari empat, dan kedua catatannya terisi.
for (const [i, entry] of readChanges().entries()) {
  const where = `src/registry/changes.json entries[${i}]`
  if (!['added', 'changed', 'fixed', 'removed'].includes(entry.type))
    report(where, `unknown type "${entry.type}"`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date ?? ''))
    report(where, `date must be YYYY-MM-DD, got "${entry.date}"`)
  if (!entry.note || !entry.noteEn)
    report(where, 'needs both note (Indonesian) and noteEn (English)')
  for (const name of entry.items ?? []) {
    if (!registered.has(name) && entry.type !== 'removed')
      report(where, `item "${name}" does not exist`)
  }
}

if (problems.length) {
  console.error(`✘ ${problems.length} problems:\n${problems.map(m => `  ${m}`).join('\n')}`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Menulis

const clean = o => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && !(Array.isArray(v) && !v.length)))

const manifest = {
  $schema: REGISTRY_SCHEMA,
  name: 'kliping',
  homepage: SITE_URL,
  items: items.map(it => clean({
    name: it.name,
    type: it.type,
    title: it.title,
    description: it.description,
    categories: it.categories,
    dependencies: it.dependencies,
    devDependencies: it.devDependencies,
    registryDependencies: it.registryDependencies,
    files: it.files.map(f => ({ path: rel(f.abs), type: f.type })),
    cssVars: it.cssVars,
    css: it.css,
  })),
}
const manifestText = `${JSON.stringify(manifest, null, 2)}\n`

// Halaman Hooks butuh judul dan keterangan tiap composable di peramban.
// Manifes lengkapnya ratusan kilobita — yang dikirim ke peramban cuma ini.
const HOOKS_FILE = path.join(ROOT, 'src/registry/registry-hooks.json')
const hooksText = `${JSON.stringify({
  items: items.filter(it => it.type === 'registry:hook').map(it => ({ name: it.name, title: it.title, description: it.siteDescription })),
}, null, 2)}\n`

// Nama semua butir, untuk keranjang "Start setup" di peramban: memastikan
// yang disimpan pembaca masih ada di registry. Beberapa kilobita saja.
const INDEX_FILE = path.join(ROOT, 'src/registry/registry-index.json')
const indexText = `${JSON.stringify(items.map(it => it.name).sort())}\n`

/** Di mana registry.json yang di-commit berbeda dari hasil sekarang — supaya `--check` tidak menebak. */
function describeDifference(onDisk, fresh) {
  if (onDisk === fresh)
    return 'registry.json matches; the difference is in registry-hooks.json or registry-index.json.'
  let before
  let after
  try {
    before = JSON.parse(onDisk).items
    after = JSON.parse(fresh).items
  }
  catch {
    return 'registry.json on disk is not valid JSON.'
  }
  const beforeNames = before.map(i => i.name)
  const afterNames = after.map(i => i.name)
  if (beforeNames.join() !== afterNames.join()) {
    const i = beforeNames.findIndex((n, k) => n !== afterNames[k])
    return `item order or list differs at position ${i}: committed "${beforeNames[i]}", generated "${afterNames[i]}".`
  }
  for (let k = 0; k < after.length; k++) {
    for (const key of new Set([...Object.keys(before[k]), ...Object.keys(after[k])])) {
      const a = JSON.stringify(before[k][key])
      const b = JSON.stringify(after[k][key])
      if (a !== b) {
        let c = 0
        while (c < a.length && a[c] === b?.[c]) c++
        return `item "${after[k].name}", field "${key}" differs near: committed …${a?.slice(Math.max(0, c - 40), c + 60)}… / generated …${b?.slice(Math.max(0, c - 40), c + 60)}…`
      }
    }
  }
  return 'the difference is in formatting only (whitespace or key order).'
}

if (CHECK) {
  const onDisk = fs.existsSync(path.join(ROOT, 'registry.json')) ? read(path.join(ROOT, 'registry.json')) : ''
  const hooksOnDisk = fs.existsSync(HOOKS_FILE) ? read(HOOKS_FILE) : ''
  const indexOnDisk = fs.existsSync(INDEX_FILE) ? read(INDEX_FILE) : ''
  if (onDisk !== manifestText || hooksOnDisk !== hooksText || indexOnDisk !== indexText) {
    console.error('✘ registry.json, src/registry/registry-hooks.json or registry-index.json is stale — run `npm run generate:registry` and commit the result.')
    console.error(`  ${describeDifference(onDisk, manifestText)}`)
    process.exit(1)
  }
  console.log(`✔ Registry consistent: ${items.length} items.`)
  process.exit(0)
}

fs.writeFileSync(path.join(ROOT, 'registry.json'), manifestText)
fs.writeFileSync(HOOKS_FILE, hooksText)
fs.writeFileSync(INDEX_FILE, indexText)

fs.rmSync(OUTPUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUTPUT_DIR, { recursive: true })
let totalSize = 0
for (const it of items) {
  const json = `${JSON.stringify(clean({
    $schema: ITEM_SCHEMA,
    name: it.name,
    type: it.type,
    title: it.title,
    description: it.description,
    categories: it.categories,
    dependencies: it.dependencies,
    devDependencies: it.devDependencies,
    registryDependencies: it.registryDependencies,
    files: it.files.map(f => ({ path: f.path, content: f.content, type: f.type })),
    cssVars: it.cssVars,
    css: it.css,
  }), null, 2)}\n`
  totalSize += json.length
  fs.writeFileSync(path.join(OUTPUT_DIR, `${it.name}.json`), json)
}
fs.writeFileSync(path.join(OUTPUT_DIR, 'registry.json'), `${JSON.stringify({
  $schema: REGISTRY_SCHEMA,
  name: 'kliping',
  homepage: SITE_URL,
  items: items.map(it => clean({
    name: it.name,
    type: it.type,
    title: it.title,
    description: it.description,
    categories: it.categories,
    dependencies: it.dependencies,
    registryDependencies: it.registryDependencies,
    files: it.files.map(f => ({ path: f.path, type: f.type })),
  })),
}, null, 2)}\n`)

// Berkas pendukung yang dibaca CLI dari registry dasarnya: warna dasar,
// pemetaan ikon, daftar gaya, indeks item, dan daftar namespace yang dikenal.
// Tiga yang pertama diambil apa adanya dari kliping-vue (turunan shadcn-vue,
// MIT) di scripts/registry-base; indeks dan namespace disusun dari Kliping.
const BASE_DIR = path.join(ROOT, 'scripts/registry-base')
for (const sub of ['colors', 'icons', 'styles'])
  fs.cpSync(path.join(BASE_DIR, sub), path.join(OUTPUT_DIR, sub), { recursive: true })
fs.writeFileSync(path.join(OUTPUT_DIR, 'registries.json'), `${JSON.stringify({
  '@kliping': `${SITE_URL}/r/{name}.json`,
  ...JSON.parse(read(path.join(BASE_DIR, 'registries.json'))),
}, null, 2)}\n`)
// Item dasar yang dipasang `kliping init` (CLI: INIT_ITEM di
// packages/cli/src/registry/constants.ts). Semua item Kliping mengandaikan
// `cn()` di lib/utils dan paket-paket ini sudah ada — perannya sama dengan
// `styles/<gaya>/index.json` di shadcn-vue. Bukan item katalog: tidak masuk
// registry.json, index.json, maupun hitungan.
const UTILS_FILE = path.join(SRC, 'lib/utils.ts')
fs.writeFileSync(path.join(OUTPUT_DIR, 'init.json'), `${JSON.stringify({
  $schema: ITEM_SCHEMA,
  name: 'init',
  type: 'registry:style',
  title: 'Kliping',
  description: 'Base for Kliping items: the cn() helper and the shared dependencies.',
  dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'].map(p => `${p}@${version(p)}`),
  devDependencies: [`tw-animate-css@${version('tw-animate-css')}`],
  files: [{
    path: 'registry/kliping/lib/utils.ts',
    content: await formatCode(read(UTILS_FILE), UTILS_FILE),
    type: 'registry:lib',
  }],
}, null, 2)}\n`)
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), `${JSON.stringify(items.map(it => clean({
  name: it.name,
  type: it.type,
  dependencies: it.dependencies,
  registryDependencies: it.registryDependencies,
  files: it.files.map(f => ({ path: f.path, type: f.type })),
})), null, 2)}\n`)

const counts = {}
for (const it of items) counts[it.categories[0]] = (counts[it.categories[0]] ?? 0) + 1
console.log(`✔ ${items.length} registry items → docs/public/r (${(totalSize / 1e6).toFixed(1)} MB): ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ')}`)
