/**
 * Data penyusun typeset: daftar fon, pilihan ritme, nilai bawaan, dan cara
 * membaca serta menulisnya ke query URL.
 *
 * Satu sumber kebenaran untuk apa yang boleh dipilih tiap kendali. Pemilih,
 * pengacak, pembaca URL, dan pembuat kode semuanya membaca dari sini, jadi
 * tidak ada daftar kedua yang bisa berselisih.
 */

export type FontKind = 'sans' | 'serif' | 'mono'

export interface Font {
  id: string
  /** Nama yang tampil di pemilih, sekaligus nama keluarga fonnya. */
  label: string
  kind: FontKind
  /** Tumpukan `font-family` yang dipakai pratinjau dan ditulis ke kode. */
  stack: string
  /** Nama variabel CSS yang diberikan ke pemakai. */
  cssVar: string
  /**
   * Fon web: dimuat dari Google Fonts, dan punya paket Fontsource dengan nama
   * yang sama dalam kebab-case. Fon sistem tidak perlu dimuat apa pun.
   */
  web: boolean
  /** Google Fonts menolak seluruh permintaan kalau sumbu `ital` diminta dari keluarga yang tidak punya miring. */
  italic?: boolean
}

const SANS = 'ui-sans-serif, system-ui, sans-serif'
const SERIF = 'ui-serif, Georgia, serif'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

function webFont(id: string, label: string, kind: FontKind, italic = true): Font {
  const fallback = kind === 'mono' ? MONO : kind === 'serif' ? SERIF : SANS
  return { id, label, kind, stack: `"${label}", ${fallback}`, cssVar: `--font-${id}`, web: true, italic }
}

export const FONTS: Font[] = [
  {
    id: 'system',
    label: 'System UI',
    kind: 'sans',
    // Urutan yang sama dengan `--font-sans` situs ini.
    stack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    cssVar: '--font-system',
    web: false,
  },
  webFont('geist', 'Geist', 'sans', false),
  webFont('inter', 'Inter', 'sans'),
  webFont('dm-sans', 'DM Sans', 'sans'),
  webFont('ibm-plex-sans', 'IBM Plex Sans', 'sans'),
  webFont('figtree', 'Figtree', 'sans'),
  webFont('manrope', 'Manrope', 'sans', false),
  {
    id: 'system-serif',
    label: 'System Serif',
    kind: 'serif',
    stack: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    cssVar: '--font-system-serif',
    web: false,
  },
  webFont('lora', 'Lora', 'serif'),
  webFont('source-serif-4', 'Source Serif 4', 'serif'),
  webFont('merriweather', 'Merriweather', 'serif'),
  webFont('newsreader', 'Newsreader', 'serif'),
  {
    id: 'system-mono',
    label: 'System Mono',
    kind: 'mono',
    stack: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    cssVar: '--font-system-mono',
    web: false,
  },
  webFont('geist-mono', 'Geist Mono', 'mono', false),
  webFont('jetbrains-mono', 'JetBrains Mono', 'mono'),
  webFont('ibm-plex-mono', 'IBM Plex Mono', 'mono'),
  webFont('fira-code', 'Fira Code', 'mono', false),
  webFont('source-code-pro', 'Source Code Pro', 'mono'),
]

export function findFont(id: string | undefined) {
  return FONTS.find(f => f.id === id)
}

export const FONT_GROUPS: { label: string, kind: FontKind }[] = [
  { label: 'Sans', kind: 'sans' },
  { label: 'Serif', kind: 'serif' },
  { label: 'Mono', kind: 'mono' },
]

export interface ControlOption { value: string, label: string }

export const SIZES: ControlOption[] = [
  { value: '14', label: '14px' },
  { value: '15', label: '15px' },
  { value: '16', label: '16px' },
  { value: '18', label: '18px' },
]

export const LEADING: ControlOption[] = [
  { value: '1.6', label: 'Tight (1.6)' },
  { value: '1.75', label: 'Regular (1.75)' },
  { value: '1.9', label: 'Loose (1.9)' },
]

export const FLOW: ControlOption[] = [
  { value: '1em', label: 'Compact (1em)' },
  { value: '1.25em', label: 'Regular (1.25em)' },
  { value: '2em', label: 'Airy (2em)' },
]

/**
 * Measure ditulis dalam `ch` di pemilih, tapi dipasang sebagai `em` di
 * pembungkus — sama seperti upstream. `ch` bergantung pada lebar angka nol
 * fon yang sedang dipakai, jadi lebar kolomnya akan melompat setiap kali fon
 * diganti; `em` tidak.
 */
export const MEASURE: (ControlOption & { width: string })[] = [
  { value: '60', label: '60ch', width: '28em' },
  { value: '70', label: '70ch', width: '33em' },
  { value: '80', label: '80ch', width: '37em' },
  { value: '90', label: '90ch', width: '42em' },
]

export const ARTICLE_OPTIONS = [
  { value: 'docs', label: 'Docs' },
  { value: 'chat', label: 'Chat' },
  { value: 'article', label: 'Article' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'notes', label: 'Notes' },
] as const

export type ArticleName = typeof ARTICLE_OPTIONS[number]['value']

export interface Settings {
  body: string
  heading: string
  mono: string
  size: string
  measure: string
  leading: string
  flow: string
  item: ArticleName
}

export const DEFAULTS: Settings = {
  body: 'geist',
  heading: 'inherit',
  mono: 'geist-mono',
  size: '15',
  measure: '80',
  leading: '1.75',
  flow: '1.25em',
  item: 'docs',
}

const VALID_VALUES: Record<keyof Settings, readonly string[]> = {
  body: FONTS.map(f => f.id),
  heading: ['inherit', ...FONTS.map(f => f.id)],
  mono: FONTS.map(f => f.id),
  size: SIZES.map(o => o.value),
  measure: MEASURE.map(o => o.value),
  leading: LEADING.map(o => o.value),
  flow: FLOW.map(o => o.value),
  item: ARTICLE_OPTIONS.map(o => o.value),
}

export const SETTING_KEYS = Object.keys(DEFAULTS) as (keyof Settings)[]

/**
 * Setelan yang bisa dikunci supaya dilewati Shuffle — semuanya kecuali naskah
 * contoh, yang memang tidak pernah diacak.
 */
export type ControlKey = Exclude<keyof Settings, 'item'>

/** Nilai dari URL hanya diterima kalau memang salah satu pilihan yang ada. */
export function readQuery(search: string): Partial<Settings> {
  const q = new URLSearchParams(search)
  const result: Partial<Settings> = {}
  for (const k of SETTING_KEYS) {
    const v = q.get(k)
    if (v !== null && VALID_VALUES[k].includes(v))
      (result as Record<string, string>)[k] = v
  }
  return result
}

/** Hanya nilai yang berbeda dari bawaan yang ditulis, supaya URL-nya tetap pendek. */
export function writeQuery(s: Settings) {
  const q = new URLSearchParams()
  for (const k of SETTING_KEYS) {
    if (s[k] !== DEFAULTS[k])
      q.set(k, s[k])
  }
  const text = q.toString()
  return text ? `?${text}` : ''
}

function pickRandom<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]!
}

/**
 * Mengacak rancangan hurufnya, tapi tidak artikel yang sedang dilihat. Setelan
 * yang dikunci tetap memegang nilainya sekarang.
 */
export function randomizeSettings(s: Settings, locked: readonly ControlKey[] = []): Settings {
  const textFonts = FONTS.filter(f => f.kind !== 'mono').map(f => f.id)
  const monoFonts = FONTS.filter(f => f.kind === 'mono').map(f => f.id)
  const result: Settings = {
    ...s,
    body: pickRandom(textFonts),
    heading: pickRandom(['inherit', ...textFonts]),
    mono: pickRandom(monoFonts),
    size: pickRandom(SIZES).value,
    measure: pickRandom(MEASURE).value,
    leading: pickRandom(LEADING).value,
    flow: pickRandom(FLOW).value,
  }
  for (const k of locked)
    result[k] = s[k]
  return result
}

/** Fon yang benar-benar dipakai, setelah `inherit` pada heading diselesaikan. */
export function selectedFonts(s: Settings) {
  const body = findFont(s.body) ?? findFont(DEFAULTS.body)!
  const heading = s.heading === 'inherit' ? body : (findFont(s.heading) ?? body)
  const mono = findFont(s.mono) ?? findFont(DEFAULTS.mono)!
  return { body, heading, mono }
}

/** Variabel `--typeset-*` yang dipasang di container pratinjau — API yang sama dengan yang diberikan ke pemakai. */
export function typesetStyle(s: Settings) {
  const { body, heading, mono } = selectedFonts(s)
  return {
    '--typeset-font-body': body.stack,
    '--typeset-font-heading': heading.stack,
    '--typeset-font-mono': mono.stack,
    '--typeset-size': `${s.size}px`,
    '--typeset-leading': s.leading,
    '--typeset-flow': s.flow,
  }
}

export function measureWidth(s: Settings) {
  return MEASURE.find(o => o.value === s.measure)?.width ?? '37em'
}

/**
 * Memuat fon web dari Google Fonts, sekali per keluarga.
 *
 * Lewat `<link>` yang disisipkan saat dibutuhkan, bukan dari build: tidak ada
 * yang diunduh sampai pembaca memilih fonnya, dan build situs tidak bergantung
 * pada jaringan sama sekali.
 */
const loadedFonts = new Set<string>()

export function loadFont(font: Font) {
  if (typeof document === 'undefined' || !font.web || loadedFonts.has(font.id))
    return
  loadedFonts.add(font.id)
  const family = font.label.replace(/ /g, '+')
  const axes = font.italic
    ? 'ital,wght@0,400;0,500;0,600;0,700;1,400'
    : 'wght@400;500;600;700'
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${family}:${axes}&display=swap`
  link.dataset.typesetFont = font.id
  document.head.appendChild(link)
}

/**
 * Memuat cuplikan setiap fon web untuk menu pemilih fon, supaya tiap nama
 * tampil dalam hurufnya sendiri. Dipanggil saat menu fon pertama kali dibuka.
 *
 * Satu `<link>` untuk semua keluarga, dengan parameter `text=`: Google Fonts
 * hanya mengirim glif yang dipakai nama-namanya, jadi seluruh menu cuma
 * beberapa kilobyte — bukan belasan keluarga lengkap.
 *
 * Fon yang sudah dimuat penuh dilewati. Cuplikannya mendeklarasikan keluarga
 * dengan nama yang sama, dan untuk deskriptor yang sama aturan `@font-face`
 * yang terakhir yang dipakai: cuplikan yang ditambahkan sesudah fon lengkap
 * akan menimpanya dan membuat naskah pratinjau kehilangan glif. Sebaliknya
 * aman — fon lengkap yang dimuat belakangan selalu menang atas cuplikannya.
 */
let previewsLoaded = false

export function loadFontPreviews() {
  if (typeof document === 'undefined' || previewsLoaded)
    return
  previewsLoaded = true
  const list = FONTS.filter(f => f.web && !loadedFonts.has(f.id))
  if (!list.length)
    return
  const glyphs = [...new Set(list.map(f => f.label).join(''))].join('')
  const families = list.map(f => `family=${f.label.replace(/ /g, '+')}`).join('&')
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?${families}&text=${encodeURIComponent(glyphs)}&display=swap`
  link.dataset.typesetPreview = ''
  document.head.appendChild(link)
}

/**
 * Memastikan `typeset.css` terpasang. Frontmatter halamannya sudah menaruhnya
 * di `<head>`; ini jaring pengaman untuk navigasi SPA dari halaman lain dan
 * untuk situs yang dipasang di bawah `base` selain `/`.
 */
export function ensureStylesheet(href: string) {
  if (typeof document === 'undefined')
    return
  if (document.querySelector('link[href$="typeset.css"]'))
    return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}
