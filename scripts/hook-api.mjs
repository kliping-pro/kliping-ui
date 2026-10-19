// Tabel API composable dan lib, dibaca dari kodenya lewat TypeScript.
//
// vue-component-meta hanya mengenal komponen; composable adalah fungsi biasa,
// jadi yang membacanya pemeriksa tipe TypeScript sendiri. Untuk tiap fungsi
// yang diekspor:
//
//   Parameters  nama, tipe, nilai bawaan, keterangan `@param` di JSDoc-nya;
//               parameter berupa objek opsi diurai per properti (`options.x`),
//               keterangannya JSDoc properti di interface-nya.
//   Returns     bila mengembalikan objek: tiap propertinya, keterangannya JSDoc
//               di atas properti itu (di objek `return { … }` atau di
//               interface-nya); selain itu satu baris tipe + `@returns`.
//
// Dipakai scripts/generate-hook-docs.mjs.

import path from 'node:path'
import ts from 'typescript'

/** Program TypeScript untuk berkas-berkas ini, dengan konfigurasi registry. */
export function createHookApi(root, files) {
  const configPath = path.join(root, 'tsconfig.registry.json')
  const config = ts.readConfigFile(configPath, ts.sys.readFile)
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root)
  const program = ts.createProgram(files, { ...parsed.options, noEmit: true })
  const checker = program.getTypeChecker()

  const docOf = symbol => ts.displayPartsToString(symbol?.getDocumentationComment(checker) ?? []).replace(/\s+/g, ' ').trim()
  const typeText = (type, node) => checker.typeToString(type, node, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)

  /** Objek yang layak diurai per properti: bukan fungsi, array, Ref, atau tipe primitif. */
  function objectProperties(type, node) {
    const nonNullable = checker.getNonNullableType(type)
    if (!(nonNullable.flags & ts.TypeFlags.Object) || nonNullable.getCallSignatures().length)
      return null
    if (checker.isArrayType(nonNullable) || checker.isTupleType(nonNullable))
      return null
    const name = nonNullable.getSymbol()?.getName() ?? ''
    if (/^(?:Ref|ShallowRef|ComputedRef|WritableComputedRef|Readonly|Map|Set|Promise|Date|HTMLElement|Element|Window|Document|Event|RegExp)$/.test(name))
      return null
    // Kunci simbol (`[RefSymbol]` dsb.) bukan bagian API yang dibaca orang.
    const props = checker.getPropertiesOfType(nonNullable).filter(p => !p.getName().startsWith('__@'))
    // `Ref` / `Readonly<Ref>` hasil `readonly(ref)`: satu properti `value` —
    // itu nilai reaktif, bukan objek berisi beberapa properti.
    if (!props.length || (props.length === 1 && props[0].getName() === 'value'))
      return null
    return props.map(p => ({
      name: p.getName(),
      optional: !!(p.flags & ts.SymbolFlags.Optional),
      type: typeText(checker.getTypeOfSymbolAtLocation(p, node), node),
      description: docOf(p),
    }))
  }

  function describeFunction(name, declaration) {
    const signature = checker.getSignatureFromDeclaration(declaration)
    if (!signature)
      return null
    const jsdocParams = new Map(ts.getJSDocTags(declaration).filter(ts.isJSDocParameterTag).map(t => [t.name.getText(), ts.getTextOfJSDocComment(t.comment) ?? '']))
    const params = []
    for (const p of declaration.parameters) {
      const pname = ts.isIdentifier(p.name) ? p.name.text : 'options'
      const type = checker.getTypeAtLocation(p)
      params.push({
        name: pname,
        optional: !!p.questionToken || !!p.initializer,
        type: typeText(type, p),
        default: p.initializer?.getText(),
        description: (jsdocParams.get(pname) ?? '').replace(/^-\s*/, '').replace(/\s+/g, ' ').trim(),
      })
      // Objek opsi: tiap propertinya jadi baris sendiri.
      const nested = objectProperties(type, p)
      if (nested && /options|config|params/i.test(pname))
        for (const prop of nested)
          params.push({ ...prop, name: `${pname}.${prop.name}` })
    }
    const returnType = checker.getReturnTypeOfSignature(signature)
    const returnTag = ts.getJSDocReturnTag(declaration)
    const returns = {
      type: typeText(returnType, declaration),
      description: (ts.getTextOfJSDocComment(returnTag?.comment) ?? '').replace(/\s+/g, ' ').trim(),
      properties: objectProperties(returnType, declaration),
    }
    // `readonly(ref)` bertipe DeepReadonly yang sudah diurai — `{ readonly value: T }`
    // atau `Readonly<Ref<…>>` dengan T ikut diurai (untuk Element: ribuan
    // karakter). Yang ditampilkan: tipe ref sebelum dibungkus, yaitu argumen
    // `readonly(x)` di pernyataan return-nya.
    let inner
    const visit = (node) => {
      if (inner)
        return
      if (ts.isReturnStatement(node) && node.expression && ts.isCallExpression(node.expression)
        && node.expression.expression.getText() === 'readonly' && node.expression.arguments[0])
        inner = checker.getTypeAtLocation(node.expression.arguments[0])
      else if (!ts.isFunctionLike(node) || node === declaration)
        ts.forEachChild(node, visit)
    }
    visit(declaration)
    if (inner) {
      returns.type = `Readonly<${checker.typeToString(inner, declaration)}>`
      returns.properties = null
    }
    return { name, params, returns }
  }

  /** Semua fungsi yang diekspor sebuah berkas. */
  return function api(file) {
    const source = program.getSourceFile(file)
    if (!source)
      return []
    const result = []
    for (const statement of source.statements) {
      const exported = ts.getCombinedModifierFlags(statement) & ts.ModifierFlags.Export
      if (!exported)
        continue
      if (ts.isFunctionDeclaration(statement) && statement.name && statement.body) {
        const d = describeFunction(statement.name.text, statement)
        if (d)
          result.push(d)
      }
      else if (ts.isVariableStatement(statement)) {
        for (const decl of statement.declarationList.declarations) {
          const init = decl.initializer
          if (ts.isIdentifier(decl.name) && init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
            const d = describeFunction(decl.name.text, init)
            if (d)
              result.push(d)
          }
        }
      }
    }
    return result
  }
}
