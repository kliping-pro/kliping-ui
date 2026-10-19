// Memeriksa bahwa kode yang terkirim lewat registry berbahasa Inggris.
//
// Komentar biasa boleh berbahasa Indonesia — semuanya dibuang dari keluaran
// registry, penjelasannya tinggal di repo dan halaman dokumentasi. Yang ikut
// sampai ke project orang, dan karena itu wajib berbahasa Inggris:
//
//   1. nama variabel, fungsi, tipe, dan parameter
//   2. JSDoc satu baris (`/** … */`) — muncul sebagai tooltip di editor orang
//   3. teks yang dibaca manusia: string, teks template, label aksesibilitas,
//      pesan galat
//
// Kata Indonesianya dari scripts/indonesian-words.json. Untuk string dan teks
// template, satu kata belum cukup — nama orang, kota, dan kata yang kebetulan
// sama di dua bahasa membuatnya terlalu bising. Dua kata Indonesia dalam satu
// string baru dihitung.
//
// Jalankan: node scripts/check-language.mjs [file or folder …]
//           (tanpa argumen: seluruh sumber registry)

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const WORDS = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/indonesian-words.json'), 'utf-8')))
const DEFAULT_TARGETS = ['src/components', 'src/blocks', 'src/charts', 'src/variants', 'src/composables', 'src/lib']

const wordsOf = s => (s.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g) ?? []).map(w => w.toLowerCase())
export const indonesianWords = s => wordsOf(s).filter(w => WORDS.has(w))

/** Membuang komentar yang tidak ikut terkirim; JSDoc satu baris dipertahankan. */
function stripDroppedComments(content) {
  return content
    // Metadata galeri situs — dibuang generator dari keluaran registry.
    .replace(/<script lang="ts">\s*export const description = [^\n]*\n(?:export default \{\}\n)?<\/script>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*(?!\*[^\n]*\*\/)[\s\S]*?\*\//g, m => '\n'.repeat(m.split('\n').length - 1))
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1')
}

export function checkContent(content, file = '') {
  const findings = []
  const lineOf = i => content.slice(0, i).split('\n').length
  const cleaned = stripDroppedComments(content)

  // JSDoc satu baris
  for (const m of cleaned.matchAll(/\/\*\*([^\n]*?)\*\//g)) {
    const words = indonesianWords(m[1])
    if (words.length)
      findings.push({ kind: 'jsdoc', text: m[0].trim(), words })
  }
  const withoutJsdoc = cleaned.replace(/\/\*\*[^\n]*?\*\//g, '')

  // String (termasuk atribut template) dan teks template
  const stringPattern = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g
  for (const m of withoutJsdoc.matchAll(stringPattern)) {
    const s = m[1] ?? m[2] ?? m[3]
    // Kelas Tailwind dan jalur impor bukan bahasa.
    if (/^[@./]/.test(s) || /^[\w:[\]/.%#-]+(\s+[\w:[\]/.%#()&>*,=-]+)*$/.test(s) && !/\s[a-z]+\s[a-z]+\s/.test(` ${s} `))
      continue
    const words = indonesianWords(s)
    if (words.length >= 2)
      findings.push({ kind: 'text', text: s.slice(0, 80), words })
  }
  if (file.endsWith('.vue')) {
    const tpl = withoutJsdoc.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
    for (const m of tpl.replace(/<[^>]*>/g, '\n').replace(/\{\{[\s\S]*?\}\}/g, ' ').split('\n')) {
      const t = m.trim()
      if (t && indonesianWords(t).length >= 2)
        findings.push({ kind: 'text', text: t.slice(0, 80), words: indonesianWords(t) })
    }
  }

  // Nama: semua pengenal di luar string dan teks template.
  let code = withoutJsdoc.replace(stringPattern, ' ')
  if (file.endsWith('.vue'))
    code = code.replace(/(<template>[\s\S]*<\/template>)/, t => t.replace(/>[^<]*</g, '><').replace(/=\s*"[^"]*"/g, '=""'))
  const seen = new Set()
  for (const m of code.matchAll(/\b[A-Za-z_$][\w$]*\b/g)) {
    const name = m[0]
    if (seen.has(name))
      continue
    const words = indonesianWords(name)
    if (words.length) {
      seen.add(name)
      findings.push({ kind: 'name', text: name, words, line: lineOf(m.index) })
    }
  }
  // Pengenal di ekspresi template (`:value="nilai"`, `{{ nilai }}`)
  if (file.endsWith('.vue')) {
    const tpl = withoutJsdoc.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
    for (const m of tpl.matchAll(/(?:[:@#]|v-[\w-]+)[\w.:-]*\s*=\s*"([^"]*)"|\{\{([\s\S]*?)\}\}/g)) {
      const expression = (m[1] ?? m[2]).replace(stringPattern, ' ')
      for (const n of expression.match(/\b[A-Za-z_$][\w$]*\b/g) ?? []) {
        if (!seen.has(n) && indonesianWords(n).length) {
          seen.add(n)
          findings.push({ kind: 'name', text: n, words: indonesianWords(n) })
        }
      }
    }
  }
  return findings
}

function allFiles(p) {
  const abs = path.resolve(ROOT, p)
  if (!fs.existsSync(abs))
    return []
  if (fs.statSync(abs).isFile())
    return [abs]
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap(e => allFiles(path.join(abs, e.name)))
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const targets = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_TARGETS
  const files = targets.flatMap(allFiles).filter(f => /\.(vue|ts)$/.test(f) && !/\.(test|spec)\.ts$|\.d\.ts$/.test(f))
  let total = 0
  for (const f of files) {
    const t = checkContent(fs.readFileSync(f, 'utf-8'), f)
    if (!t.length)
      continue
    total += t.length
    console.log(path.relative(ROOT, f))
    for (const x of t)
      console.log(`  ${x.kind.padEnd(5)} ${x.text}${x.line ? ` (line ${x.line})` : ''}  [${x.words.join(', ')}]`)
  }
  console.log(total ? `✘ ${total} findings in ${files.length} files` : `✔ ${files.length} files in English`)
  process.exit(total ? 1 : 0)
}
