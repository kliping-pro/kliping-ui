/**
 * Menghitung letak kursor teks di dalam sebuah `<input>` atau `<textarea>`.
 *
 * Tidak ada API peramban untuk ini. Cara yang dipakai semua pustaka mention
 * sama: sebuah elemen bayangan dibuat dengan gaya persis sama dengan
 * masukannya, diisi teks sampai posisi kursor, lalu diukur di mana teks itu
 * berakhir. Yang diukur bayangannya, bukan masukannya.
 *
 * Bayangannya dibuat dan dibuang tiap kali dipanggil. Menyimpannya akan lebih
 * cepat, tapi gaya masukannya bisa berubah kapan saja — font yang selesai
 * dimuat, tema yang berganti, wadah yang menyempit — dan bayangan yang basi
 * menaruh daftar saran di tempat yang salah tanpa ada yang tahu sebabnya.
 */
const COPIED_STYLES = [
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing',
  'tabSize',
] as const

export interface CaretPosition {
  /** Distance from the input's left edge, in pixels. */
  x: number
  /** Distance from the input's top edge, in pixels. */
  y: number
  /** The height of one line, to place the list right below the cursor. */
  lineHeight: number
}

export function getCaretPosition(
  input: HTMLInputElement | HTMLTextAreaElement,
  position: number,
): CaretPosition {
  const style = window.getComputedStyle(input)
  const mirror = document.createElement('div')

  for (const name of COPIED_STYLES) mirror.style[name] = style[name]

  mirror.style.position = 'absolute'
  mirror.style.visibility = 'hidden'
  mirror.style.whiteSpace = input instanceof HTMLTextAreaElement ? 'pre-wrap' : 'pre'
  mirror.style.wordWrap = 'break-word'

  mirror.textContent = input.value.slice(0, position)

  // Penanda kosong di ujung teks: letaknya persis letak kursornya. `|` yang
  // terlihat tidak dipakai — lebarnya sendiri akan menggeser hasilnya.
  const marker = document.createElement('span')
  marker.textContent = input.value.slice(position) || '.'
  mirror.appendChild(marker)

  document.body.appendChild(mirror)
  const x = marker.offsetLeft
  const y = marker.offsetTop
  const lineHeight = Number.parseFloat(style.lineHeight) || marker.offsetHeight
  document.body.removeChild(mirror)

  return { x: x - input.scrollLeft, y: y - input.scrollTop, lineHeight }
}

export interface MentionMatch {
  /** The word being typed after the trigger character, without the trigger. */
  query: string
  /** The index of the trigger character in the text. */
  start: number
}

// Mengembalikan `null` kalau tidak ada — kursornya bukan di belakang sebuah
// pemicu, atau sudah ada spasi di antaranya. Spasi yang mengakhiri sebutan
// itu penting: tanpanya, "@rani lalu makan" masih dianggap satu kueri yang
// panjang, dan daftarnya tidak pernah menutup.
/** Reads the mention being typed right before the cursor, or `null` if there is none. */
export function readMention(text: string, cursor: number, trigger: string): MentionMatch | null {
  const before = text.slice(0, cursor)
  const start = before.lastIndexOf(trigger)

  if (start === -1) return null

  const query = before.slice(start + trigger.length)
  if (/\s/.test(query)) return null

  // Pemicu harus berada di awal teks atau setelah spasi — kalau tidak,
  // alamat surel seperti `nama@contoh.com` akan membuka daftar saran.
  const previous = start === 0 ? ' ' : before[start - 1]
  if (previous && !/\s/.test(previous)) return null

  return { query, start }
}
