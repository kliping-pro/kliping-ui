/**
 * Pola dan mesin perapian untuk `MaskInput`.
 *
 * Aksara pola yang dikenali:
 *
 *   `#`  satu angka
 *   `A`  satu huruf
 *   `*`  satu angka atau huruf
 *
 * Selain ketiganya dianggap pemisah dan disisipkan apa adanya. Yang di React
 * cuma mengenal `#`; dua yang lain ditambahkan di sini karena pola non-angka
 * memang ada — pelat nomor dan kode pos beberapa negara memuat huruf di posisi
 * tetap, dan tanpa aksara untuknya polanya tidak bisa dinyatakan sama sekali.
 */
export interface MaskPattern {
  /** The format shape, e.g. `###-##-####`. */
  pattern: string
  /** Cleans the raw input before it is formatted. */
  transform?: (value: string) => string
  /** Whether the raw value is complete and valid. */
  validate?: (value: string) => boolean
}

const NON_DIGIT = /\D/g
const NON_ALPHANUMERIC = /[^a-z0-9]/gi
const NON_LETTER = /[^a-z]/gi

const digitsOnly = (value: string) => value.replace(NON_DIGIT, '')
const alphanumericOnly = (value: string) => value.replace(NON_ALPHANUMERIC, '')

// Berapa tahun ke belakang dan ke depan yang dianggap tanggal masuk akal.
const YEARS_BACK = 120
const YEARS_AHEAD = 20

function isValidDate(raw: string): boolean {
  if (raw.length !== 8) return false

  const day = Number.parseInt(raw.slice(0, 2), 10)
  const month = Number.parseInt(raw.slice(2, 4), 10)
  const year = Number.parseInt(raw.slice(4, 8), 10)

  const currentYear = new Date().getFullYear()
  if (month < 1 || month > 12) return false
  if (year < currentYear - YEARS_BACK || year > currentYear + YEARS_AHEAD) return false

  // Hari terakhir tiap bulan dihitung peramban, bukan ditabelkan — tabel
  // bulan tidak tahu tahun kabisat tanpa aturan tambahan.
  const lastDay = new Date(year, month, 0).getDate()
  return day >= 1 && day <= lastDay
}

/** Luhn checksum, used for card numbers. */
function luhn(raw: string): boolean {
  if (raw.length < 13) return false

  let sum = 0
  let even = false

  for (let i = raw.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(raw[i] as string, 10)
    if (even) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    even = !even
  }

  return sum % 10 === 0
}

// Sumbernya menyediakan lima belas pola, dan sebelas di antaranya khas
// Amerika Serikat — SSN, EIN, ZIP code, dan pelat nomornya. Yang tidak
// berlaku di mana pun selain sana tidak dibawa; yang setara untuk pembaca
// dokumentasi ini ditambahkan sebagai gantinya: NIK, NPWP, dan nomor telepon
// berformat Indonesia.
/** Ready-made mask patterns. */
export const MASK_PATTERNS = {
  phone: {
    pattern: '#### #### ####',
    transform: digitsOnly,
    validate: value => value.length >= 9 && value.length <= 13,
  },
  nik: {
    pattern: '#### #### #### ####',
    transform: digitsOnly,
    validate: value => value.length === 16,
  },
  npwp: {
    pattern: '##.###.###.#-###.###',
    transform: digitsOnly,
    validate: value => value.length === 15 || value.length === 16,
  },
  date: {
    pattern: '##/##/####',
    transform: digitsOnly,
    validate: isValidDate,
  },
  time: {
    pattern: '##:##',
    transform: digitsOnly,
    validate: (value) => {
      if (value.length !== 4) return false
      const hours = Number.parseInt(value.slice(0, 2), 10)
      const minutes = Number.parseInt(value.slice(2, 4), 10)
      return hours < 24 && minutes < 60
    },
  },
  card: {
    pattern: '#### #### #### ####',
    transform: digitsOnly,
    validate: luhn,
  },
  cardExpiry: {
    pattern: '##/##',
    transform: digitsOnly,
    validate: (value) => {
      if (value.length !== 4) return false
      const month = Number.parseInt(value.slice(0, 2), 10)
      return month >= 1 && month <= 12
    },
  },
  postalCode: {
    pattern: '#####',
    transform: digitsOnly,
    validate: value => value.length === 5,
  },
  licensePlate: {
    pattern: 'AA #### AAA',
    transform: alphanumericOnly,
    validate: value => value.length >= 5,
  },
  ipv4: {
    pattern: '###.###.###.###',
    transform: digitsOnly,
    validate: (value) => {
      const octets = value.match(/\d{1,3}/g) ?? []
      return octets.length === 4 && octets.every(b => Number.parseInt(b, 10) <= 255)
    },
  },
  mac: {
    pattern: '**:**:**:**:**:**',
    transform: value => value.replace(NON_LETTER, m => (/[a-f]/i.test(m) ? m : '')).replace(NON_ALPHANUMERIC, ''),
    validate: value => value.length === 12,
  },
} satisfies Record<string, MaskPattern>

export type MaskPatternKey = keyof typeof MASK_PATTERNS

const matchesSlot = (patternChar: string, char: string) => {
  if (patternChar === '#') return /\d/.test(char)
  if (patternChar === 'A') return /[a-z]/i.test(char)
  if (patternChar === '*') return /[a-z0-9]/i.test(char)
  return false
}

/** Whether a pattern character is an input slot rather than a fixed separator. */
export const isMaskSlot = (char: string) => char === '#' || char === 'A' || char === '*'

// Aksara yang tidak cocok dengan slotnya dibuang, bukan disisipkan. Kalau
// disisipkan, satu salah ketik menggeser seluruh sisa nilainya — dan yang
// terlihat pemakainya bukan aksara yang salah, melainkan seluruh nomornya
// yang tiba-tiba kacau.
/** Formats a raw value according to the pattern, dropping characters that do not fit their slot. */
export function applyMask(raw: string, pattern: string): string {
  const result: string[] = []
  let cursor = 0
  let i = 0

  while (i < pattern.length && cursor < raw.length) {
    const patternChar = pattern[i] as string

    if (!isMaskSlot(patternChar)) {
      result.push(patternChar)
      i++
      continue
    }

    const char = raw[cursor] as string
    cursor++

    // Yang tidak cocok dibuang tanpa memajukan posisi polanya, jadi aksara
    // berikutnya mencoba slot yang sama.
    if (!matchesSlot(patternChar, char)) continue

    result.push(char)
    i++
  }

  // Pemisah yang menggantung di ujung dibuang — "12/" terbaca seperti
  // kesalahan, sedangkan "12" terbaca seperti ketikan yang belum selesai.
  while (result.length && !isMaskSlot(pattern[result.length - 1] as string)) result.pop()

  return result.join('')
}

// Keluaran `applyMask` selalu sejajar dengan polanya posisi demi posisi, jadi
// yang perlu dilakukan cuma membuang aksara yang jatuh di posisi pemisah.
/** Strips the separators from a formatted value, leaving the raw value that is stored and validated. */
export function unmask(value: string, pattern: string): string {
  const result: string[] = []

  for (let i = 0; i < value.length && i < pattern.length; i++) {
    if (isMaskSlot(pattern[i] as string)) result.push(value[i] as string)
  }

  return result.join('')
}
