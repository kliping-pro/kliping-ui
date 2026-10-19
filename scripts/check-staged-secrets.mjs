// Menolak commit yang membawa rahasia: berkas lingkungan (`.env`, `.dev.vars`,
// kunci privat) dan baris yang mirip token sungguhan (npm, GitHub, Stripe,
// Clerk, AWS, Slack, JWT, kunci privat). Hanya baris yang DITAMBAHKAN di
// staging yang diperiksa — cepat, dan tidak menghakimi riwayat lama.
// Dipanggil hook `.husky/pre-commit`; bisa juga dijalankan langsung.
//
// Pola sengaja hanya yang berkeyakinan tinggi (awalan khas tiap layanan),
// supaya data contoh seperti `API_KEY=sk-1234567890` tidak ikut ditolak.

import { execFileSync } from 'node:child_process'
import process from 'node:process'

const BLOCKED_FILES = [
  /(^|\/)\.env(\.(?!example$)[\w.-]+)?$/, // .env, .env.local, … — bukan .env.example
  /(^|\/)\.dev\.vars$/, // rahasia lokal wrangler
  /\.(pem|p12|pfx|key)$/,
  /(^|\/)id_(rsa|ed25519|ecdsa)$/,
]

const TOKEN_PATTERNS = [
  ['npm token', /npm_[A-Za-z0-9]{36}/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{36}\b|github_pat_[A-Za-z0-9_]{40,}/],
  ['Stripe/Clerk live key', /\b(sk|pk|rk)_live_[A-Za-z0-9]{16,}/],
  ['Stripe/Clerk test secret', /\bsk_test_[A-Za-z0-9]{20,}/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['JWT', /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
  ['npm auth token', /_authToken=(?:npm_)?[A-Za-z0-9_-]{20,}/],
]

const git = (...args) => execFileSync('git', args, { encoding: 'utf-8', maxBuffer: 1 << 28 })

const problems = []
for (const file of git('diff', '--cached', '--name-only', '--diff-filter=ACMR').split('\n').filter(Boolean)) {
  if (BLOCKED_FILES.some(re => re.test(file)))
    problems.push(`${file}: secret file must not be committed`)
}

let file = ''
for (const line of git('diff', '--cached', '-U0', '--no-color', '--diff-filter=ACMR').split('\n')) {
  if (line.startsWith('+++ '))
    file = line.slice(6)
  else if (line.startsWith('+') && !line.startsWith('+++')) {
    for (const [name, re] of TOKEN_PATTERNS) {
      if (re.test(line))
        problems.push(`${file}: looks like a ${name}`)
    }
  }
}

if (problems.length) {
  console.error(`✘ Commit blocked — possible secrets:\n${[...new Set(problems)].map(p => `  ${p}`).join('\n')}`)
  console.error('  Move secrets to .env.local / wrangler secret. If this is a false positive, commit with --no-verify and say why in the message.')
  process.exit(1)
}
