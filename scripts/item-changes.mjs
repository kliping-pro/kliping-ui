// Catatan perubahan per item registry — `src/registry/changes.json`, tulis
// tangan. Dipakai generator halaman (bagian "Changelog" di tiap item) dan
// diperiksa `scripts/generate-registry.mjs` (nama item harus ada).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const FILE = path.join(ROOT, 'src/registry/changes.json')

/** Seluruh entri, paling baru di atas. */
export function readChanges() {
  return JSON.parse(fs.readFileSync(FILE, 'utf-8')).entries
}

const TYPE = {
  id: { added: 'Added', changed: 'Changed', fixed: 'Fixed', removed: 'Removed' },
  en: { added: 'Added', changed: 'Changed', fixed: 'Fixed', removed: 'Removed' },
}
const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const formatDate = (iso, lang) => {
  if (lang === 'en')
    return iso
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS_ID[m - 1]} ${y}`
}

let cache
/** Bagian `## Changelog` untuk sebuah item — `[]` bila belum ada entri. */
export function changeLines(name, lang = 'id') {
  cache ??= readChanges()
  const mine = cache.filter(e => e.items.includes(name))
  if (!mine.length)
    return []
  return [
    '## Changelog\n',
    ...mine.map(e => `- **${formatDate(e.date, lang)}** · ${TYPE[lang][e.type]} — ${lang === 'en' ? e.noteEn : e.note}`),
    '',
  ]
}
