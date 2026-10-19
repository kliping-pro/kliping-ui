// Membaca impor sebuah sumber varian atau grafik — dipakai bersama oleh
// `generate-code.mjs` (berkas apa saja yang ditampilkan tab Code) dan skrip
// penyusun halaman (komponen apa yang dipasang tab Install).
//
// Sengaja cuma membaca baris `import … from '…'` dengan ekspresi reguler, bukan
// mengurai SFC-nya. Sumbernya ditulis di repo ini dengan satu gaya impor, dan
// yang dicari cuma dua bentuk jalur: `@/components/ui/<nama>` dan
// `@/variants/<komponen>/components/<berkas>`.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')

const IMPORT_PATTERN = /from\s+'(@\/[^']+)'/g

const importsOf = file => [...fs.readFileSync(file, 'utf-8').matchAll(IMPORT_PATTERN)].map(m => m[1])

/** `@/variants/x/components/Y.vue` → jalur berkasnya, dengan atau tanpa ekstensi. */
function localPath(specifier) {
  if (!specifier.startsWith('@/variants/'))
    return undefined
  const base = path.join(ROOT, 'src', specifier.slice(2))
  return [base, `${base}.ts`, `${base}.vue`].find(c => fs.existsSync(c) && fs.statSync(c).isFile())
}

/**
 * Berkas pembantu yang diimpor sebuah varian, termasuk yang diimpor pembantunya
 * sendiri — `CategoryFilter.vue` memakai `CollapsibleFilter.vue`. Urut jalur,
 * tanpa berkas utamanya.
 */
export function helperFiles(main) {
  const seen = new Set([main])
  const queue = [main]
  while (queue.length) {
    for (const s of importsOf(queue.shift())) {
      const j = localPath(s)
      if (j && !seen.has(j)) {
        seen.add(j)
        queue.push(j)
      }
    }
  }
  seen.delete(main)
  return [...seen].sort()
}

/** Komponen registry yang dipakai sekumpulan berkas — `button`, `dropdown-menu`. */
export function usedComponents(files) {
  const result = new Set()
  for (const b of files) {
    for (const s of importsOf(b)) {
      const m = s.match(/^@\/components\/ui\/([^/']+)/)
      if (m)
        result.add(m[1])
    }
  }
  return [...result].sort()
}
