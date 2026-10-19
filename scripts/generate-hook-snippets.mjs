// Menyorot cuplikan pemakaian tiap composable untuk thumbnail kode di kartu
// halaman kategori Hooks.
//
// Disorot di sini, saat build, bukan di peramban: Shiki beserta tata bahasanya
// ratusan kilobyte, sementara hasilnya untuk 59 cuplikan pendek cuma beberapa
// kilobyte HTML. Thumbnail-nya selalu gelap — jendela terminal, seperti di
// shadcn.io — jadi cukup satu tema.
//
// Sumber: src/composables/snippets.json
// Hasil:  src/registry/hook-snippets.json  { "<nama>": "<html span bersorot>" }
//
// Jalankan: npm run generate:hook-snippets  (otomatis lewat `predocs:build`)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tsLang from '@shikijs/langs/typescript'
import darkTheme from '@shikijs/themes/github-dark-default'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const { snippets } = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/composables/snippets.json'), 'utf-8'))

const shiki = await createHighlighterCore({ langs: [tsLang], themes: [darkTheme], engine: createJavaScriptRegexEngine() })

const highlighted = {}
for (const [name, code] of Object.entries(snippets)) {
  // Hanya isi <code>-nya: bingkai, latar, dan huruf diatur kartunya sendiri.
  const html = shiki.codeToHtml(code, { lang: 'typescript', theme: 'github-dark-default' })
  highlighted[name] = html.replace(/^[\s\S]*?<code>/, '').replace(/<\/code><\/pre>\s*$/, '')
}

const outputFile = path.join(ROOT, 'src/registry/hook-snippets.json')
fs.writeFileSync(outputFile, `${JSON.stringify(highlighted, null, 2)}\n`)
console.log(`✔ ${Object.keys(highlighted).length} composable snippets highlighted to src/registry/hook-snippets.json`)
