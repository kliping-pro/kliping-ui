/**
 * Menyorot potongan kode di peramban, semurah mungkin.
 *
 * Ada dua cara memakai Shiki, dan bedanya besar sekali.
 *
 * `import { codeToHtml } from 'shiki'` menarik **seluruh** bahasa, **seluruh**
 * tema, dan mesin regex Oniguruma dalam bentuk WebAssembly — untuk menyorot satu
 * potong kode. Itu bukan mahal sedikit; itu megabyte.
 *
 * Yang dipakai di sini bundel halusnya: inti Shiki saja, satu bahasa, dua tema,
 * dan mesin regex JavaScript yang membuang WASM sepenuhnya. Lalu seluruhnya
 * dimuat lewat `import()` di dalam fungsi ini — jadi **nol byte** sampai ada
 * yang benar-benar memanggilnya.
 *
 * Penyorotnya dibuat sekali lalu disimpan. Tiga block memakai fungsi ini, dan
 * kalau ketiganya tampil di satu halaman galeri, yang dibangun tetap satu.
 */
import type { HighlighterCore } from 'shiki/core'

let highlighter: Promise<HighlighterCore> | undefined

function prepare() {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, vue, light, dark] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('@shikijs/langs/vue'),
      import('@shikijs/themes/github-light-default'),
      import('@shikijs/themes/github-dark-default'),
    ])

    return createHighlighterCore({
      langs: [vue.default],
      themes: [light.default, dark.default],
      engine: createJavaScriptRegexEngine(),
    })
  })()

  return highlighter
}

// Dua tema dipasang sekaligus lewat variabel CSS, bukan satu tema yang diganti
// saat modenya berubah. Artinya berpindah terang-gelap tidak menyorot ulang apa
// pun — yang berganti cuma nilai variabelnya, dan itu dikerjakan CSS.
/** Returns highlighted HTML for a snippet of code. */
export async function highlightCode(code: string, lang = 'vue') {
  const shiki = await prepare()

  return shiki.codeToHtml(code, {
    lang,
    themes: { light: 'github-light-default', dark: 'github-dark-default' },
    defaultColor: false,
  })
}
