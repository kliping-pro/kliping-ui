/**
 * Perhitungan waktu dan penyangga untuk pemutar media.
 *
 * Dipisahkan dari komponennya supaya bisa diuji tanpa DOM. Yang di sini
 * kelirunya halus — satu detik yang dibulatkan ke arah yang salah membuat
 * durasi 1:00 tampil sebagai 0:60 — dan itu jenis keliru yang tidak akan
 * pernah terlihat kalau hanya diperiksa dengan mata di satu berkas contoh.
 */

// Jamnya baru muncul kalau memang ada. Video sepuluh menit yang ditulis
// `0:09:30` membuat pemakainya membaca dua kali; `9:30` tidak.
//
// Nilai yang belum diketahui — media yang belum termuat memberi `NaN`, siaran
// langsung memberi `Infinity` — jadi tanda hubung, bukan `0:00`. Keduanya
// berbeda: `0:00` berarti awal, tanda hubung berarti belum tahu.
/** Formats seconds as clock text; unknown values become dashes. */
export function formatTime(seconds: number, forceHours = false): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--'

  const whole = Math.floor(seconds)
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const rest = whole % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  return hours > 0 || forceHours
    ? `${hours}:${pad(minutes)}:${pad(rest)}`
    : `${minutes}:${pad(rest)}`
}

// Sebagian pemutar menampilkan sisa alih-alih durasi. Itu bukan sekadar
// selera: yang menonton lebih sering ingin tahu berapa lama lagi daripada
// berapa lama seluruhnya.
/** Remaining time, written with a leading minus sign. */
export function formatRemaining(currentTime: number, duration: number): string {
  if (!Number.isFinite(duration) || !Number.isFinite(currentTime)) return '--:--'

  return `-${formatTime(Math.max(0, duration - currentTime))}`
}

/** A single time range, like an entry of `TimeRanges` but constructible. */
export interface TimeRange {
  start: number
  end: number
}

/** Converts DOM `TimeRanges` into a plain array. */
export function readTimeRanges(ranges: TimeRanges | null | undefined): TimeRange[] {
  if (!ranges) return []

  const result: TimeRange[] = []
  for (let i = 0; i < ranges.length; i++)
    result.push({ start: ranges.start(i), end: ranges.end(i) })

  return result
}

// Yang dihitung ujung rentang yang memuat posisi sekarang, bukan rentang
// terjauh yang ada. Media yang dilompati meninggalkan potongan tersangga di
// tempat-tempat yang sudah ditinggalkan, dan menggambar semuanya sebagai satu
// batang penuh menjanjikan sesuatu yang tidak benar.
/** How far the media is buffered from the current position, in percent. */
export function bufferedPercent(ranges: TimeRange[], currentTime: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0

  const containing = ranges.find(r => currentTime >= r.start && currentTime <= r.end)
  if (!containing) return 0

  return Math.min(100, (containing.end / duration) * 100)
}

/** The current position as a percentage of the duration. */
export function progressPercent(currentTime: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0

  return Math.min(100, Math.max(0, (currentTime / duration) * 100))
}

// Ujung akhirnya sengaja tidak persis `duration`. Melompat tepat ke ujung
// memicu `ended` di sebagian peramban dan tidak di sebagian yang lain, dan
// selisih yang tidak terlihat mata itu membuat perilakunya sama di semuanya.
/** Clamps a seek position into the duration. */
export function clampTime(seconds: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0

  return Math.min(Math.max(seconds, 0), Math.max(0, duration - 0.01))
}

// Kecepatan yang tidak ada dalam daftar — diatur dari luar — dianggap berada
// sebelum yang pertama, jadi yang berikutnya kecepatan pertama.
/** The next playback rate in the list, wrapping back to the start. */
export function nextPlaybackRate(current: number, rates: number[]): number {
  if (!rates.length) return current

  const i = rates.indexOf(current)
  return rates[(i + 1) % rates.length] as number
}
