// Memeriksa perintah CLI yang tertulis di situs (Lapis 3: satu sumber
// perintah).
//
//   1. Tidak ada `shadcn-vue@…` yang bisa dijalankan pembaca, kecuali di
//      berkas yang memang membahas kompatibilitas/sejarah (ALLOWED).
//   2. Setiap `kliping@latest add <nama…>` menunjuk butir yang ada di
//      registry.json — perintah ke butir yang tidak ada lebih buruk daripada
//      tidak ada perintah.
//
// Jalankan: npm run check:commands

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
process.chdir(ROOT)

// Berkas yang boleh menyebut perintah shadcn-vue: alternatif lewat URL
// registry, catatan sejarah, dan sumber CLI itu sendiri.
const ALLOWED = new Set([
  'docs/.vitepress/theme/InstallCLI.vue',
  'docs/cli.md',
  'docs/installation.md',
  'docs/legacy.md',
  'docs/credits.md',
  'docs/changelog.md',
  'docs/registry/faq.md',
  'scripts/check-commands.mjs',
])

const registry = new Set(JSON.parse(fs.readFileSync('registry.json', 'utf8')).items.map(i => i.name))

const files = execSync('git ls-files docs scripts src', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(f => /\.(md|vue|ts|mjs)$/.test(f) && !f.startsWith('docs/public/') && fs.existsSync(f))

const problems = []
for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    const where = `${file}:${i + 1}`
    if (/shadcn-vue@(latest|\d)/.test(line) && !ALLOWED.has(file))
      problems.push(`${where}: shadcn-vue command — use npx kliping@latest (docs/.vitepress/kliping-command.mjs)`)
    for (const m of line.matchAll(/kliping@latest add ((?:[a-z0-9@/.:-]+ ?)+)/g)) {
      for (const arg of m[1].trim().split(/\s+/)) {
        // Hanya nama polos yang berarti butir Kliping; @namespace/…, owner/repo/…
        // (GitHub), dan URL menunjuk registry lain.
        if (arg.startsWith('-') || arg.startsWith('@') || arg.includes('/') || arg.includes('$'))
          continue
        if (!registry.has(arg))
          problems.push(`${where}: "${arg}" is not a registry item`)
      }
    }
  })
}

if (problems.length) {
  console.error(`✘ ${problems.length} problems:\n${problems.map(p => `  ${p}`).join('\n')}`)
  process.exit(1)
}
console.log(`✔ CLI commands consistent in ${files.length} files.`)
