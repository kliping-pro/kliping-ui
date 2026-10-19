/**
 * Membaca tempelan berbaris banyak jadi pasangan kunci-nilai.
 *
 * Tiga bentuk yang dikenali, diperiksa berurutan:
 *
 *   `KUNCI=nilai`     berkas .env dan variabel lingkungan
 *   `KUNCI: nilai`    YAML dan potongan header HTTP
 *   `KUNCI\tnilai`    salinan dari spreadsheet, atau dua spasi ke atas
 *
 * Urutannya penting. Baris `URL=https://contoh.com` memuat titik dua juga,
 * dan kalau titik dua diperiksa lebih dulu, kuncinya jadi `URL=https` —
 * pemisah pertama yang menang, bukan yang paling awal muncul di barisnya.
 */
export interface ParsedPair {
  key: string
  value: string
}

// Pola `^(['"])(.*)\1$` terlihat cukup dan tidak. Ia juga cocok dengan
// `"a" dan "b"` — kutip pertama dan kutip terakhir memang berpasangan — dan
// yang tersisa `a" dan "b`, sebuah nilai yang rusak tanpa ada yang mengeluh.
//
// Yang benar menuntut satu syarat tambahan: isi di antaranya tidak boleh
// memuat kutip yang sama.
/** Removes quotes that wrap the ENTIRE value. */
export function unquote(text: string, enabled: boolean): string {
  if (!enabled || text.length < 2) return text

  const first = text[0] as string
  if ((first !== '"' && first !== '\'') || text[text.length - 1] !== first) return text

  const inner = text.slice(1, -1)
  return inner.includes(first) ? text : inner
}

const WIDE_SPACE = /\s{2,}|\t/

export interface ParsePasteOptions {
  /** Trim whitespace at both ends of the key and value. */
  trim?: boolean
  /** Remove quotes wrapping the value. */
  stripQuotes?: boolean
}

/** Parses multi-line pasted text into key-value pairs. */
export function parsePaste(text: string, options: ParsePasteOptions = {}): ParsedPair[] {
  const { trim = true, stripQuotes = true } = options

  const result: ParsedPair[] = []

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue

    let key = ''
    let value = ''

    if (line.includes('=')) {
      const parts = line.split('=')
      key = parts[0] ?? ''
      value = parts.slice(1).join('=')
    }
    else if (line.includes(':')) {
      const parts = line.split(':')
      key = parts[0] ?? ''
      value = parts.slice(1).join(':')
    }
    else if (WIDE_SPACE.test(line)) {
      const parts = line.split(WIDE_SPACE)
      key = parts[0] ?? ''
      value = parts.slice(1).join(' ')
    }
    else {
      continue
    }

    if (trim) {
      key = key.trim()
      value = value.trim()
    }

    value = unquote(value, stripQuotes)

    if (key) result.push({ key, value })
  }

  return result
}
