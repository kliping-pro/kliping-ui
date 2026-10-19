import type { Font, Settings } from './data'
import { selectedFonts, measureWidth } from './data'

/**
 * Pembuat potongan kode di panel Docs dan Prompt. Semuanya fungsi murni dari
 * setelan saat ini, jadi apa yang disalin pembaca selalu sama dengan yang
 * sedang ia lihat di pratinjau.
 */

export const FRAMEWORK = [
  { value: 'nuxt', label: 'Nuxt', css: 'assets/css/main.css' },
  { value: 'vite', label: 'Vite', css: 'src/style.css' },
  { value: 'laravel', label: 'Laravel', css: 'resources/css/app.css' },
  { value: 'astro', label: 'Astro', css: 'src/styles/global.css' },
] as const

export type Framework = typeof FRAMEWORK[number]['value']

export function cssFile(fw: Framework) {
  return FRAMEWORK.find(f => f.value === fw)!.css
}

/** Fon yang dipakai, tanpa duplikat — heading yang sama dengan body cukup sekali. */
export function usedFonts(s: Settings): Font[] {
  const { body, heading, mono } = selectedFonts(s)
  return [...new Map([body, heading, mono].map(f => [f.id, f])).values()]
}

export const CSS_IMPORTS = '@import "tailwindcss";\n@import "./typeset.css";'

/**
 * Paket Fontsource statis per bobot, bukan paket `-variable`: paket variabel
 * mendaftarkan keluarganya sebagai "Geist Variable", jadi variabel CSS yang
 * menyebut "Geist" tidak akan pernah cocok.
 */
function fontsourcePackage(f: Font) {
  return `@fontsource/${f.id}`
}

const WEIGHTS = ['400', '500', '600']

/** Ada fon yang perlu dimuat? Kalau semuanya fon sistem, langkah fonnya cukup variabel CSS. */
export function hasWebFonts(s: Settings) {
  return usedFonts(s).some(f => f.web)
}

export function nuxtFontsCode(s: Settings) {
  const webFonts = usedFonts(s).filter(f => f.web)
  if (!webFonts.length)
    return '// nuxt.config.ts\n// System fonts only: nothing to load.'
  return [
    '// nuxt.config.ts',
    'export default defineNuxtConfig({',
    '  modules: [\'@nuxt/fonts\'],',
    '  fonts: {',
    '    families: [',
    ...webFonts.map(f => `      { name: '${f.label}', provider: 'google' },`),
    '    ],',
    '  },',
    '})',
  ].join('\n')
}

export function fontsourceInstallCommand(s: Settings) {
  const webFonts = usedFonts(s).filter(f => f.web)
  return webFonts.length ? `npm install ${webFonts.map(fontsourcePackage).join(' ')}` : ''
}

export function cssFontsource(s: Settings, fw: Framework) {
  const webFonts = usedFonts(s).filter(f => f.web)
  return [
    `/* ${cssFile(fw)} */`,
    ...webFonts.flatMap(f => WEIGHTS.map(b => `@import "${fontsourcePackage(f)}/${b}.css";`)),
    ...(webFonts.length ? [''] : []),
    ...fontVariables(s),
  ].join('\n')
}

function fontVariables(s: Settings) {
  return [':root {', ...usedFonts(s).map(f => `  ${f.cssVar}: ${f.stack};`), '}']
}

export function cssVariables(s: Settings, fw: Framework) {
  return [`/* ${cssFile(fw)} */`, ...fontVariables(s)].join('\n')
}

export function presetName(s: Settings) {
  return `typeset-${s.item}`
}

export function cssPreset(s: Settings) {
  const { body, heading, mono } = selectedFonts(s)
  return `.${presetName(s)} {
  --typeset-font-body: var(${body.cssVar});
  --typeset-font-heading: var(${heading.cssVar});
  --typeset-font-mono: var(${mono.cssVar});
  --typeset-size: ${s.size}px;
  --typeset-leading: ${s.leading};
  --typeset-flow: ${s.flow};
}`
}

export function fullPresetCss(s: Settings, fw: Framework) {
  return `/* ${cssFile(fw)} */
@import "tailwindcss";
@import "./typeset.css";

${cssPreset(s)}`
}

export function wrapperCode(s: Settings) {
  return `<template>
  <article
    class="typeset ${presetName(s)} max-w-[${measureWidth(s)}]"
    v-html="html"
  />
</template>`
}

export function promptText(s: Settings, fw: Framework, origin: string) {
  const css = cssFile(fw)
  // Fon sistem tidak perlu didaftarkan atau dipasang, tapi variabelnya tetap
  // perlu: preset di langkah 4 menyebutnya lewat `var()`.
  const hasWeb = hasWebFonts(s)
  const fontStep = fw === 'nuxt'
    ? hasWeb
      ? `Register the fonts with @nuxt/fonts:

${nuxtFontsCode(s)}

Then declare the CSS variables in ${css}:

${cssVariables(s, fw)}`
      : `The picked fonts are system fonts, so there is nothing to register with @nuxt/fonts. Declare the CSS variables in ${css}:

${cssVariables(s, fw)}`
    : hasWeb
      ? `Install the fonts:

${fontsourceInstallCommand(s)}

Then import them and declare the CSS variables in ${css}:

${cssFontsource(s, fw)}`
      : `The picked fonts are system fonts, so there is nothing to install. Declare the CSS variables in ${css}:

${cssFontsource(s, fw)}`

  return `Install Typeset in this project.

Typeset is a single stylesheet that styles rendered markdown: wrap the output in a \`typeset\` container and everything inside (headings, lists, tables, code, blockquotes) is styled. Everything outside is untouched.

1. Download ${origin}/typeset.css and save it as typeset.css next to ${css} (the file where Tailwind is imported). If the file already exists, replace it with the downloaded copy.

2. Import it in ${css}, after the Tailwind import:

@import "./typeset.css";

3. ${fontStep}

4. Add this preset to ${css}, after the typeset import. If a class named .${presetName(s)} already exists, update its values in place. Leave any other typeset-* presets untouched: they belong to other surfaces.

${cssPreset(s)}

5. Do not apply the class anywhere yet. Search the project for surfaces that render markdown or rich content: v-html bindings fed by markdown-it, marked or a CMS, Nuxt Content's ContentRenderer, MDC components, existing prose classes. Present the candidates as a short list and ask which surface should use typeset. Then wrap only the surface the user picks:

${wrapperCode(s)}

If the picked surface already has its own typography (a prose class, styled markdown components), list those styles and let the user decide what to remove before wrapping.

Notes:

- To exclude an embedded component from typeset styles, add the not-typeset class or the data-not-typeset attribute to it.
- Verify on the surface the user picked: headings, lists, tables and code inside the container should be styled with no classes on the content itself.
- Docs: ${origin}/typeset#docs`
}
