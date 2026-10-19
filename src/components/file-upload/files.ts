/** File size in human-readable units. */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const exponent = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  const value = bytes / 1024 ** exponent

  // Satu angka di belakang koma untuk yang kecil, tanpa koma untuk yang
  // besar — "1.5 MB" berguna, "1.5 TB" jarang.
  return `${value.toFixed(exponent === 0 ? 0 : value < 10 ? 1 : 0)} ${units[exponent]}`
}

// Tiga bentuk yang dikenali, sama seperti `<input accept>`:
//
//   `.pdf`        akhiran nama berkasnya
//   `image/png`   tipe MIME persis
//   `image/*`     seluruh tipe dalam satu kelompok
//
// Peramban sudah menyaringnya di dialog pemilih berkas, tapi tidak pada
// berkas yang diseret masuk — dan itu jalur yang paling sering dipakai.
/** Whether a file matches an `accept` attribute. */
export function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true

  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()

  return accept.split(',').map(a => a.trim().toLowerCase()).filter(Boolean).some((pattern) => {
    if (pattern.startsWith('.')) return name.endsWith(pattern)
    if (pattern.endsWith('/*')) return type.startsWith(`${pattern.slice(0, -1)}`)
    return type === pattern
  })
}

export type RejectReason = 'type' | 'size' | 'count' | 'duplicate'

export interface ValidationResult {
  accepted: File[]
  rejected: { file: File, reason: RejectReason, message: string }[]
}

// Yang ditolak dikembalikan beserta alasannya, bukan dibuang diam-diam.
// Berkas yang hilang tanpa penjelasan adalah salah satu kegagalan pengunggah
// yang paling membingungkan — pemakainya menyeret lima berkas, tiga muncul,
// dan tidak ada yang menjelaskan ke mana dua sisanya.
/** Filters incoming files against the limits, returning rejections with reasons. */
export function validateFiles(
  incoming: File[],
  existing: File[],
  limits: { accept?: string, maxSize?: number, maxFiles?: number },
): ValidationResult {
  const accepted: File[] = []
  const rejected: ValidationResult['rejected'] = []

  const keyOf = (f: File) => `${f.name}:${f.size}:${f.lastModified}`
  const seen = new Set(existing.map(keyOf))

  for (const file of incoming) {
    if (seen.has(keyOf(file))) {
      rejected.push({ file, reason: 'duplicate', message: 'This file has already been added.' })
      continue
    }

    if (!matchesAccept(file, limits.accept)) {
      rejected.push({ file, reason: 'type', message: `This file type is not accepted (${limits.accept}).` })
      continue
    }

    if (limits.maxSize && file.size > limits.maxSize) {
      rejected.push({
        file,
        reason: 'size',
        message: `The file exceeds ${formatFileSize(limits.maxSize)}.`,
      })
      continue
    }

    if (limits.maxFiles && existing.length + accepted.length >= limits.maxFiles) {
      rejected.push({
        file,
        reason: 'count',
        message: `The number of files exceeds ${limits.maxFiles}.`,
      })
      continue
    }

    seen.add(keyOf(file))
    accepted.push(file)
  }

  return { accepted, rejected }
}
