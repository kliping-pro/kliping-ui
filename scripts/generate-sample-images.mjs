// Gambar contoh milik Kliping sendiri: avatar, foto, produk, dan logo merek
// rekaan, semuanya SVG yang digambar dari angka — tanpa foto orang, tanpa
// merek dagang pihak lain, tanpa host luar.
//
// Kenapa: block dan varian dulu menunjuk ± 200 gambar di unsplash, pexels,
// pixabay, uifaces, randomuser, fffuel, material-tailwind, dan avatar GitHub
// orang sungguhan. Lisensi sebagian tidak jelas untuk di-host ulang, host-nya
// bisa berubah kapan saja, dan pratinjau situs jadi bergantung internet.
//
// Keluaran: docs/public/samples/<jenis>/<jenis>-NN.svg. Di sumber registry
// ditulis `/samples/…`; scripts/generate-registry.mjs menulisnya jadi
// `https://kliping.pro/samples/…` di kode terbit.
//
// Deterministik: seed tetap, jadi menjalankan ulang menghasilkan berkas yang
// sama byte per byte. Warna mentah di sini sah — ini berkas gambar, bukan CSS
// situs.
//
// Jalankan: npm run generate:samples

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const OUT = path.join(ROOT, 'docs/public/samples')

export const SAMPLE_COUNTS = { avatars: 24, photos: 24, products: 12, logos: 8 }

/** PRNG kecil dan deterministik (mulberry32). */
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hsl = (h, s, l) => `hsl(${Math.round(((h % 360) + 360) % 360)} ${Math.round(s)}% ${Math.round(l)}%)`
const pad = n => String(n).padStart(2, '0')
const round = n => Math.round(n * 10) / 10

function svg(viewBox, body, { slice = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${slice ? ' preserveAspectRatio="xMidYMid slice"' : ''}>${body}</svg>\n`
}

/** Avatar: siluet kepala dan bahu di atas latar gradien lembut — bukan wajah siapa pun. */
function avatar(i) {
  const r = rng(1000 + i)
  const hue = (i * 47) % 360
  const bg1 = hsl(hue, 45 + r() * 15, 86)
  const bg2 = hsl(hue + 25, 40 + r() * 15, 72)
  const fg = hsl(hue + 10, 25, 98)
  return svg('0 0 128 128', [
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>`,
    '<rect width="128" height="128" fill="url(#g)"/>',
    `<circle cx="64" cy="52" r="24" fill="${fg}" opacity=".92"/>`,
    `<path d="M14 128c2-30 24-46 50-46s48 16 50 46z" fill="${fg}" opacity=".92"/>`,
  ].join(''))
}

/** Foto: lanskap berlapis — langit, matahari, tiga punggung bukit. */
const PHOTO_PALETTES = [
  // [langit atas, langit bawah, matahari, bukit (jauh → dekat)]
  ['#bcd6ee', '#eaf2f8', '#fff7d6', ['#8fb3a9', '#5f8f7f', '#36614f']],
  ['#f6c6a8', '#fbe5c8', '#fff3e0', ['#c98f7a', '#9a6156', '#5e3a3a']],
  ['#a9c7e8', '#dbe9f5', '#ffffff', ['#9fb6c8', '#6f8ea6', '#40607a']],
  ['#2b3a5c', '#5a5f8a', '#f1ead2', ['#3c4466', '#2a3150', '#1a2038']],
  ['#d8e8d2', '#f2f6ea', '#fffbe6', ['#a9c49a', '#7aa06a', '#4d7244']],
  ['#f3d9c2', '#f8eadb', '#fff8ee', ['#d9b79a', '#b08a6c', '#7a5a45']],
]

/** Foto: lanskap berlapis — langit, matahari, tiga punggung bukit. */
function photo(i) {
  const r = rng(2000 + i)
  const [sky1, sky2, sun, hills] = PHOTO_PALETTES[(i - 1) % PHOTO_PALETTES.length]
  const layers = [0.55, 0.7, 0.84].map((base, k) => {
    const pts = []
    const n = 6 + Math.floor(r() * 4)
    for (let j = 0; j <= n; j++) pts.push([round((1600 / n) * j), round(1000 * (base - r() * 0.14))])
    let d = `M0 1000L${pts[0][0]} ${pts[0][1]}`
    for (let j = 1; j < pts.length; j++) {
      const [x0, y0] = pts[j - 1]
      const [x1, y1] = pts[j]
      d += `C${round(x0 + (x1 - x0) / 2)} ${y0} ${round(x0 + (x1 - x0) / 2)} ${y1} ${x1} ${y1}`
    }
    d += 'L1600 1000Z'
    return `<path d="${d}" fill="${hills[k]}"/>`
  })
  return svg('0 0 1600 1000', [
    `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient></defs>`,
    '<rect width="1600" height="1000" fill="url(#s)"/>',
    `<circle cx="${round(300 + r() * 1000)}" cy="${round(220 + r() * 180)}" r="${round(70 + r() * 60)}" fill="${sun}" opacity=".9"/>`,
    ...layers,
  ].join(''), { slice: true })
}

/** Produk: benda sederhana di atas alas, latar lembut — seperti foto katalog. */
function product(i) {
  const r = rng(3000 + i)
  const hue = (i * 53 + 20) % 360
  const bg = hsl(hue, 30, 92)
  const body = hsl(hue + 150 + r() * 60, 35 + r() * 20, 50 + r() * 12)
  const shade = hsl(hue + 150, 30, 30)
  const shape = i % 4
  const object = [
    // botol/vas
    `<path d="M370 250h60v60c50 30 80 80 80 150v170q0 40-40 40H330q-40 0-40-40V460c0-70 30-120 80-150z" fill="${body}"/>`,
    // kotak
    `<rect x="260" y="330" width="280" height="340" rx="28" fill="${body}"/><rect x="260" y="330" width="280" height="70" rx="28" fill="${shade}" opacity=".25"/>`,
    // bola
    `<circle cx="400" cy="480" r="170" fill="${body}"/><circle cx="345" cy="420" r="45" fill="#fff" opacity=".25"/>`,
    // pakaian
    `<path d="M300 260l60-30q40 40 80 0l60 30 90 90-60 60-40-40v300H310V370l-40 40-60-60z" fill="${body}"/>`,
  ][shape]
  return svg('0 0 800 800', [
    `<rect width="800" height="800" fill="${bg}"/>`,
    `<ellipse cx="400" cy="720" rx="230" ry="28" fill="${shade}" opacity=".18"/>`,
    `<g transform="translate(400 470) scale(1.3) translate(-400 -470)">${object}</g>`,
  ].join(''), { slice: true })
}

/** Logo merek rekaan: bentuk geometris, tanpa teks. */
function logo(i) {
  const c1 = hsl((i * 71) % 360, 70, 45)
  const c2 = hsl((i * 71 + 40) % 360, 75, 60)
  const marks = [
    `<circle cx="32" cy="32" r="22" fill="${c1}"/><circle cx="32" cy="32" r="10" fill="#fff"/>`,
    `<rect x="10" y="10" width="44" height="44" rx="12" fill="${c1}"/><path d="M22 42l10-20 10 20z" fill="#fff"/>`,
    `<path d="M32 8l24 14v20L32 56 8 42V22z" fill="${c1}"/><path d="M32 20l12 7v10l-12 7-12-7V27z" fill="${c2}"/>`,
    `<circle cx="24" cy="32" r="16" fill="${c1}"/><circle cx="40" cy="32" r="16" fill="${c2}" opacity=".85"/>`,
  ]
  return svg('0 0 64 64', marks[i % marks.length])
}

const MAKERS = { avatars: avatar, photos: photo, products: product, logos: logo }
const SINGULAR = { avatars: 'avatar', photos: 'photo', products: 'product', logos: 'logo' }

/** Jalur publik gambar ke-n (1-based) dari suatu jenis. */
export const samplePath = (kind, n) => `/samples/${kind}/${SINGULAR[kind]}-${pad(n)}.svg`

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [kind, count] of Object.entries(SAMPLE_COUNTS)) {
    const dir = path.join(OUT, kind)
    fs.rmSync(dir, { recursive: true, force: true })
    fs.mkdirSync(dir, { recursive: true })
    for (let i = 1; i <= count; i++)
      fs.writeFileSync(path.join(ROOT, 'docs/public', samplePath(kind, i)), MAKERS[kind](i))
  }
  console.log(`✔ sample images → docs/public/samples (${Object.entries(SAMPLE_COUNTS).map(([k, n]) => `${n} ${k}`).join(', ')})`)
}
