// Menjaga package-lock.json tetap bisa dipasang Cloudflare Pages (npm 10, Linux).
//
// Paket khusus platform (`@esbuild/win32-x64`, `@rollup/rollup-darwin-arm64`,
// …) harus bertanda `"optional": true` (atau `"devOptional": true`). npm 11 —
// terutama di Windows — dan alat lain yang menyusun ulang lockfile kadang
// membuang tanda itu; npm 10 di Cloudflare lalu menolak memasang paket untuk
// OS lain dan build gagal `EBADPLATFORM`. Pemeriksaan ini menangkapnya di
// laptop dan di CI, sebelum sampai ke Cloudflare.
//
// Jalankan: npm run check:lockfile

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'package-lock.json'), 'utf-8'))

const broken = Object.entries(lock.packages ?? {})
  .filter(([, p]) => (p.os || p.cpu) && !p.optional && !p.devOptional)
  .map(([name]) => name)

if (broken.length) {
  console.error(`✘ ${broken.length} platform-specific packages in package-lock.json are not optional:`)
  for (const name of broken.slice(0, 20))
    console.error(`  ${name}`)
  console.error('Cloudflare (npm 10) fails with EBADPLATFORM. Restore package-lock.json from main and reinstall with `npm ci` / npm 10.')
  process.exit(1)
}
console.log('✔ package-lock.json: platform-specific packages are optional.')
