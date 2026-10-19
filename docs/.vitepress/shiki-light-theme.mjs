// Tema sorotan kode terang untuk seluruh situs: Primer `github-light-default`
// dengan satu warna diganti — komentar #6E7781 hanya 4,28:1 di atas latar blok
// kode (--code), di bawah WCAG AA 4,5:1. #59636E (fgColor-muted Primer yang
// lebih baru) → 5,9:1. Warna lain tema ini sudah ≥ 4,5:1.
//
// Dipakai tiga tempat yang harus sama: blok kode markdown (config.ts), kode
// contoh yang disorot saat build (scripts/generate-code.mjs), dan penyorot di
// peramban (theme/pages/typeset/highlight.ts).

import base from '@shikijs/themes/github-light-default'

export default {
  ...base,
  name: 'kliping-light',
  tokenColors: base.tokenColors.map(rule => /^#6e7781$/i.test(rule.settings?.foreground ?? '')
    ? { ...rule, settings: { ...rule.settings, foreground: '#59636E' } }
    : rule),
}
