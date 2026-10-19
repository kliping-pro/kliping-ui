import type { HighlighterCore } from 'shiki/core'
import { shallowRef } from 'vue'

/**
 * Penyorot kode panel Docs, dimuat di peramban saat pertama dibutuhkan.
 *
 * Kode di blok lain situs ini disorot saat build (`scripts/generate-code.mjs`), tapi
 * potongan di panel Docs dibuat langsung dari setelan, jadi tidak ada yang bisa
 * disiapkan sebelumnya. Yang dimuat bundel halus Shiki — sama dengan
 * `src/lib/highlight-code.ts`: inti saja, mesin regex JavaScript tanpa WASM, dua
 * tema yang sama dengan blok kode situs, dan bahasa `vue` yang sekaligus
 * membawa `css`, `ts`, `html`, dan `json` sebagai dependensinya.
 *
 * Disimpan di `shallowRef`: setiap blok kode menunggu nilainya terisi, lalu
 * menyorot ulang secara sinkron setiap kali kodenya berubah — tanpa jeda dan
 * tanpa kedip teks polos di antara dua setelan.
 */
export const highlighter = shallowRef<HighlighterCore | null>(null)

let loading: Promise<void> | undefined

export function prepareHighlighter() {
  if (typeof window === 'undefined')
    return Promise.resolve()
  loading ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, vue, light, dark] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('@shikijs/langs/vue'),
      import('../../../shiki-light-theme.mjs'),
      import('@shikijs/themes/github-dark-default'),
    ])
    highlighter.value = await createHighlighterCore({
      langs: [vue.default],
      themes: [light.default, dark.default],
      engine: createJavaScriptRegexEngine(),
    })
  })().catch(() => {
    // Gagal memuat bukan masalah: kodenya tetap tampil sebagai teks polos.
  })
  return loading
}

export type Language = 'css' | 'ts' | 'vue'

/**
 * Baris-baris tersorot tanpa `<pre>` pembungkus Shiki — bingkainya milik
 * komponen. Warnanya ditulis sebagai `--shiki-light` dan `--shiki-dark`, yang
 * dibaca aturan `.vp-code span` VitePress: aturan yang sama yang mewarnai
 * blok kode markdown, jadi terang-gelapnya selalu seiring.
 */
export function highlight(code: string, lang: Language) {
  const shiki = highlighter.value
  if (!shiki)
    return null
  try {
    return shiki.codeToHtml(code, {
      lang,
      themes: { light: 'kliping-light', dark: 'github-dark-default' },
      defaultColor: false,
      structure: 'inline',
    })
  }
  catch {
    return null
  }
}
