// Merapikan isi berkas sebelum terbit lewat registry.
//
// Kode yang tiba di project orang adalah wajah Kliping di editor mereka, jadi
// yang terkirim bukan sumber mentah repo ini, melainkan:
//
//   1. tanpa metadata galeri — blok `<script lang="ts">export const
//      description = …</script>` yang dibaca situs untuk katalognya
//   2. tanpa komentar — penjelasan panjang tinggal di repo dan halaman
//      dokumentasi. Yang dipertahankan:
//        - JSDoc satu baris (`/** … */`): muncul sebagai tooltip di editor
//        - arahan untuk perkakas: `@ts-expect-error`, `@ts-ignore`,
//          `@vite-ignore`, `#__PURE__`, `eslint-disable…`, `/// <reference>`
//   3. diformat seragam dengan prettier: kutip tunggal, tanpa titik koma
//
// Komentar dibuang lewat scanner TypeScript, bukan regex: `//` di dalam string,
// URL, template literal, dan regex tidak boleh ikut terpotong.

import prettier from 'prettier'
import ts from 'typescript'

export const PRETTIER_OPTIONS = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 100,
  vueIndentScriptAndStyle: false,
}

const DIRECTIVE = /^\/\/\s*@ts-|^\/\*\s*@vite-ignore|^\/\*\s*[#@]__PURE__|eslint-disable|^\/\/\/\s*<reference/
const SINGLE_LINE_JSDOC = /^\/\*\*[^\n]*\*\/$/

const NOT_REGEX_AFTER = new Set([
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.CloseParenToken,
  ts.SyntaxKind.CloseBracketToken,
  ts.SyntaxKind.CloseBraceToken,
  ts.SyntaxKind.ThisKeyword,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.PlusPlusToken,
  ts.SyntaxKind.MinusMinusToken,
])

/** Rentang komentar yang dibuang dari sepotong kode TypeScript. */
function commentRanges(text) {
  const sc = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text)
  const result = []
  const templateDepth = [] // kedalaman kurung kurawal di dalam tiap `${`
  let previous = null
  for (let t = sc.scan(); t !== ts.SyntaxKind.EndOfFileToken; t = sc.scan()) {
    if (t === ts.SyntaxKind.SingleLineCommentTrivia || t === ts.SyntaxKind.MultiLineCommentTrivia) {
      const content = sc.getTokenText()
      if (!SINGLE_LINE_JSDOC.test(content) && !DIRECTIVE.test(content))
        result.push([sc.getTokenStart(), sc.getTokenEnd()])
      continue
    }
    if (t === ts.SyntaxKind.WhitespaceTrivia || t === ts.SyntaxKind.NewLineTrivia)
      continue
    if (t === ts.SyntaxKind.TemplateHead) {
      templateDepth.push(0)
    }
    else if (t === ts.SyntaxKind.OpenBraceToken && templateDepth.length) {
      templateDepth[templateDepth.length - 1]++
    }
    else if (t === ts.SyntaxKind.CloseBraceToken && templateDepth.length) {
      if (templateDepth[templateDepth.length - 1] === 0) {
        t = sc.reScanTemplateToken(false)
        if (t === ts.SyntaxKind.TemplateTail)
          templateDepth.pop()
      }
      else {
        templateDepth[templateDepth.length - 1]--
      }
    }
    else if ((t === ts.SyntaxKind.SlashToken || t === ts.SyntaxKind.SlashEqualsToken) && !NOT_REGEX_AFTER.has(previous)) {
      t = sc.reScanSlashToken()
    }
    previous = t
  }
  return result
}

/** Membuang komentar; baris yang isinya cuma komentar ikut hilang. */
function stripScriptComments(text) {
  let result = text
  for (const [start, end] of commentRanges(text).reverse()) {
    const lineStart = result.lastIndexOf('\n', start - 1) + 1
    const lineEnd = result.indexOf('\n', end)
    const before = result.slice(lineStart, start)
    const after = result.slice(end, lineEnd === -1 ? result.length : lineEnd)
    if (!before.trim() && !after.trim())
      result = result.slice(0, lineStart) + result.slice(lineEnd === -1 ? result.length : lineEnd + 1)
    else
      result = result.slice(0, start).replace(/[ \t]+$/, '') + result.slice(end)
  }
  return result
}

/** Blok `<script lang="ts">` yang isinya cuma metadata galeri. */
function stripGalleryMetadata(content) {
  return content.replace(/<script lang="ts">([\s\S]*?)<\/script>\s*/g, (block, inner) => {
    const rest = stripScriptComments(inner)
      .replace(/^\s*export const description = (["'`]).*\1\s*$/m, '')
      .replace(/^\s*export default \{\}\s*$/m, '')
    return rest.trim() ? block : ''
  })
}

function formatVue(content) {
  let result = stripGalleryMetadata(content)
  result = result.replace(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/g, (_, open, inner, close) => open + stripScriptComments(inner) + close)
  // Komentar HTML di mana pun di luar blok script dan style — di dalam
  // template maupun di tingkat atas berkas.
  const blocks = []
  result = result.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, (m) => {
    blocks.push(m)
    return `\u0000${blocks.length - 1}\u0000`
  })
  result = result.replace(/[ \t]*<!--[\s\S]*?-->[ \t]*\n?/g, '')
  // Komentar JavaScript di dalam ekspresi atribut terikat (`:class="cn(… // …)"`).
  result = result.replace(/((?:\s[:@#]|\sv-)[\w.:-]*\s*=\s*")([^"]*)(")/g, (m, open, expression, close) =>
    /\/\/|\/\*/.test(expression) ? open + stripScriptComments(expression) + close : m)
  return result.replace(/\u0000(\d+)\u0000/g, (_, i) => blocks[Number(i)])
}

/** Isi berkas yang siap terbit. */
export async function formatCode(content, filePath) {
  const isVue = filePath.endsWith('.vue')
  const withoutComments = isVue ? formatVue(content) : stripScriptComments(content)
  return prettier.format(withoutComments, { ...PRETTIER_OPTIONS, parser: isVue ? 'vue' : 'typescript' })
}
