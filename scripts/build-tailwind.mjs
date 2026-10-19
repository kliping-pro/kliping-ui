// Menyusun CSS Tailwind situs di proses tersendiri, sebelum `vitepress build`.
//
//   src/assets/main.css  →  docs/.vitepress/cache/tailwind.css
//
// Kenapa tidak lewat plugin @tailwindcss/vite saat build: plugin itu menyimpan
// compiler dan hasil pindaian seluruh berkas di memori sepanjang proses build,
// termasuk selama VitePress membangun bundel SSR dan merender ± 3.000 halaman —
// ± 2,2 GB heap dari puncak ± 5,5 GB (diukur 18 Okt 2026). Di proses sendiri,
// memori itu bebas begitu CSS-nya selesai ditulis.
//
// Caranya meniru plugin itu persis (versi 4.3): compiler @tailwindcss/node,
// pemindai Oxide dengan sumber yang sama — deteksi otomatis dari root Vite
// (`docs/`) ditambah `@source` di CSS — lalu `optimize` dengan minify seperti
// mode build plugin. config.ts memakai berkas hasilnya saat build bila ada;
// dev server tetap memakai plugin.
//
// Jalankan: otomatis di akhir `predocs:build`.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile, optimize } from '@tailwindcss/node'
import { Scanner } from '@tailwindcss/oxide'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const ENTRY = path.join(ROOT, 'src/assets/main.css')
const VITE_ROOT = path.join(ROOT, 'docs')
const OUTPUT = path.join(ROOT, 'docs/.vitepress/cache/tailwind.css')

const started = Date.now()
const compiler = await compile(fs.readFileSync(ENTRY, 'utf-8'), {
  base: path.dirname(ENTRY),
  shouldRewriteUrls: true,
  onDependency: () => {},
})

const sources = (compiler.root === 'none'
  ? []
  : compiler.root === null
    ? [{ base: VITE_ROOT, pattern: '**/*', negated: false }]
    : [{ ...compiler.root, negated: false }]
).concat(compiler.sources)

const candidates = new Scanner({ sources }).scan()
const { code } = optimize(compiler.build(candidates), { minify: true })

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, code)
console.log(`✔ Tailwind CSS — ${candidates.length} candidates, ${(code.length / 1024).toFixed(0)} KB in ${((Date.now() - started) / 1000).toFixed(1)}s`)
