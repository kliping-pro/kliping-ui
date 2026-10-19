import { ref } from 'vue'

/**
 * Pengelola paket yang dipilih pembaca, dipakai bersama seluruh blok perintah.
 *
 * Satu nilai untuk seluruh situs, bukan satu per blok — seperti di shadcn-vue.
 * Pembaca yang memakai pnpm memilihnya sekali, dan setiap perintah di setiap
 * halaman ikut berganti. Disimpan di `localStorage` supaya pilihan itu tidak
 * hilang saat pindah halaman atau membuka situsnya lagi besok.
 *
 * Server selalu merender `pnpm`; pilihan tersimpan baru dibaca setelah
 * terpasang, jadi hidrasinya tidak pernah berselisih.
 */
export const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const
export type PackageManager = typeof PACKAGE_MANAGERS[number]

const STORAGE_KEY = 'kliping-package-manager'

export const packageManager = ref<PackageManager>('pnpm')

let alreadyRead = false

export function readChoice() {
  if (alreadyRead)
    return
  alreadyRead = true
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (PACKAGE_MANAGERS as readonly string[]).includes(stored))
      packageManager.value = stored as PackageManager
  }
  catch {}
}

export function choosePackageManager(value: PackageManager) {
  packageManager.value = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  }
  catch {}
}

/**
 * Tulis ulang satu perintah npm untuk pengelola paket lain.
 *
 * Aturannya sama dengan `CodeBlockCommand` di shadcn-vue, ditambah `npm i`.
 * Urutannya penting: `npx create-` harus dicek sebelum `npx`.
 */
export function convertCommand(command: string, to: PackageManager) {
  if (to === 'npm')
    return command

  return command.split('\n').map((line) => {
    if (/\bnpm (install|i)\b/.test(line)) {
      const replacement = { pnpm: 'pnpm add', yarn: 'yarn add', bun: 'bun add' }[to]
      return line.replace(/\bnpm (install|i)\b/g, replacement)
    }
    if (line.includes('npx create-'))
      return to === 'bun' ? line.replaceAll('npx', 'bunx --bun') : line.replaceAll('npx create-', `${to} create `)
    if (line.includes('npm create'))
      return line.replaceAll('npm create', `${to} create`)
    if (/\bnpx\b/.test(line))
      return line.replace(/\bnpx\b/g, { pnpm: 'pnpm dlx', yarn: 'yarn dlx', bun: 'bunx --bun' }[to])
    if (line.includes('npm run'))
      return line.replaceAll('npm run', to)
    return line
  }).join('\n')
}

/** Apakah seluruh isi sebuah blok `bash` cuma perintah npm yang bisa diterjemahkan. */
export function isPackageCommand(code: string) {
  const lines = code.trim().split('\n').filter(l => l.trim())
  return lines.length > 0 && lines.every(l => /^(npx\s|npm (install|i|create|run)\b)/.test(l.trim()))
}
