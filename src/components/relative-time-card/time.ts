/**
 * Menyusun waktu relatif — "3 jam lalu", "sebentar lagi".
 *
 * Sumbernya menyusun kalimatnya sendiri dengan penjamakan Inggris yang
 * ditanam di kode: `${n} hour${n === 1 ? '' : 's'} ago`. Itu benar untuk satu
 * bahasa dan salah untuk semua yang lain — dan kebetulan salah juga untuk
 * bahasa halaman ini, yang tidak menjamakkan kata bendanya sama sekali.
 *
 * Yang dipakai di sini `Intl.RelativeTimeFormat`, yang sudah ada di tiap
 * peramban dan mengikuti lokal pembacanya. Hasilnya benar di semua bahasa
 * tanpa satu pun tabel penjamakan.
 */
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['second', 1000],
  ['minute', 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
]

/** Anything shorter than this reads as "now", not "0 seconds ago". */
const NOW_THRESHOLD = 5000

/** Anything older than a week is written as a date, not a distance. */
const DATE_THRESHOLD = 7 * 24 * 60 * 60 * 1000

export function formatRelativeTime(date: Date, locale?: string): string {
  const diff = date.getTime() - Date.now()
  const abs = Math.abs(diff)

  if (abs < NOW_THRESHOLD) {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'second')
  }

  if (abs >= DATE_THRESHOLD) return date.toLocaleDateString(locale)

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })

  // Dicari satuan terbesar yang nilainya masih bulat lebih dari satu — jadi
  // 90 menit terbaca "1 jam lalu", bukan "90 menit lalu".
  let chosen: [Intl.RelativeTimeFormatUnit, number] = UNITS[0] as never
  for (const unit of UNITS) {
    if (abs >= unit[1]) chosen = unit
  }

  return formatter.format(Math.round(diff / chosen[1]), chosen[0])
}

/** The locale this browser actually uses. */
export function getBrowserLocale(): string {
  return Intl.DateTimeFormat().resolvedOptions().locale
}
