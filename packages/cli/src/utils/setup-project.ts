import type { ObjectLiteralExpression, SourceFile } from 'ts-morph'
import { addDependency, addDevDependency } from 'nypm'
import fs from 'fs-extra'
import { applyEdits, modify, parse } from 'jsonc-parser'
import path from 'pathe'
import { IndentationText, Node, Project, QuoteKind, ScriptKind, SyntaxKind } from 'ts-morph'
import { getPackageInfo } from '@/src/utils/get-package-info'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { spinner } from '@/src/utils/spinner'
import { x } from 'tinyexec'
import { getPackageManager } from '@/src/utils/updaters/update-dependencies'

// Sets up an existing Vite or Nuxt project the way
// https://kliping.pro/installation/{vite,nuxt} describes it by hand:
// Tailwind CSS v4 through `@tailwindcss/vite`, and the `@` import alias.
// Only touches what is missing, and only edits it can do safely; anything
// else is reported so the user can finish by hand.

const VITE_CONFIG_FILES = [
  'vite.config.ts',
  'vite.config.mts',
  'vite.config.js',
  'vite.config.mjs',
]
const NUXT_CONFIG_FILES = ['nuxt.config.ts', 'nuxt.config.mjs', 'nuxt.config.js']
const MAIN_FILES = ['src/main.ts', 'src/main.js']
const TSCONFIG_FILES = ['tsconfig.json', 'tsconfig.app.json']
const NUXT_CSS = 'assets/css/tailwind.css'
const TAILWIND_IMPORT = '@import "tailwindcss";'
const ALIAS_PATHS = { '@/*': ['./src/*'] }

export type SetupFramework = 'vite' | 'nuxt'

export interface SetupProjectResult {
  /** Files that were created or changed. */
  changed: string[]
  /** Steps that could not be done automatically. */
  manual: string[]
}

export function findConfigFile(cwd: string, framework: SetupFramework) {
  const files = framework === 'nuxt' ? NUXT_CONFIG_FILES : VITE_CONFIG_FILES
  return files.find(file => fs.existsSync(path.resolve(cwd, file))) ?? null
}

export async function setupProject(
  cwd: string,
  options: {
    framework: SetupFramework
    typescript: boolean
    tailwind: boolean
    alias: boolean
    silent?: boolean
  },
): Promise<SetupProjectResult> {
  const result: SetupProjectResult = { changed: [], manual: [] }
  const { framework } = options
  const configFile = findConfigFile(cwd, framework)
  if (!configFile) {
    result.manual.push(`No ${framework}.config file found.`)
    return result
  }

  const setupSpinner = spinner(
    `Setting up ${[options.tailwind && 'Tailwind CSS', options.alias && 'the @ alias'].filter(Boolean).join(' and ')}.`,
    { silent: options.silent },
  ).start()

  const configPath = path.resolve(cwd, configFile)
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
      indentationText: IndentationText.TwoSpaces,
      useTrailingCommas: true,
    },
  })
  const sourceFile = project.createSourceFile(
    'vite.config.ts',
    await fs.readFile(configPath, 'utf8'),
    { scriptKind: ScriptKind.TS },
  )
  const configChanged = framework === 'nuxt'
    ? editNuxtConfig(sourceFile, { tailwind: options.tailwind, cssPath: `~/${NUXT_CSS}` })
    : editViteConfig(sourceFile, options)
  if (configChanged === null) {
    result.manual.push(`Edit ${configFile} by hand (see https://kliping.pro/installation/${framework}).`)
  }

  if (options.tailwind) {
    const cssFiles = framework === 'nuxt'
      ? await ensureNuxtTailwindCss(cwd)
      : await ensureTailwindCss(cwd)
    if (cssFiles)
      result.changed.push(...cssFiles)
    else
      result.manual.push(`Add ${highlighter.info(TAILWIND_IMPORT)} to your global CSS file.`)
  }

  // Nuxt generates its `@` alias in .nuxt/tsconfig*.json (nuxt prepare,
  // below); Vite needs it in tsconfig.json / jsconfig.json.
  if (options.alias && framework === 'vite')
    result.changed.push(...(await addConfigPaths(cwd, options.typescript)))

  if (configChanged) {
    await fs.writeFile(configPath, sourceFile.getFullText(), 'utf8')
    result.changed.push(configFile)
  }

  await installSetupDependencies(cwd, options)

  if (framework === 'nuxt' && !(await nuxtPrepare(cwd)))
    result.manual.push(`Run ${highlighter.info('npx nuxt prepare')}.`)

  setupSpinner?.succeed()
  if (!options.silent) {
    for (const file of [...new Set(result.changed)])
      logger.log(`  - ${file}`)
  }

  return result
}

// `export default defineConfig({ ... })` or `export default { ... }`. A
// function form (`defineConfig(() => ({ ... }))`) is left alone.
export function findConfigObject(sourceFile: SourceFile) {
  const exported = sourceFile.getExportAssignment(e => !e.isExportEquals())
  let expression: Node | undefined = exported?.getExpression()
  if (expression && Node.isCallExpression(expression))
    expression = expression.getArguments()[0]
  if (expression && Node.isParenthesizedExpression(expression))
    expression = expression.getExpression()
  return expression && Node.isObjectLiteralExpression(expression) ? expression : null
}

interface PlannedImport {
  moduleSpecifier: string
  default?: string
  named?: string[]
}

// Returns the local name to use; new import statements are queued and
// written by writeImports() after all structural edits (inserting text makes
// earlier ts-morph nodes stale).
function planImport(sourceFile: SourceFile, queue: PlannedImport[], wanted: PlannedImport) {
  const existing = sourceFile.getImportDeclaration(d => d.getModuleSpecifierValue() === wanted.moduleSpecifier)
  if (existing) {
    const missingNamed = (wanted.named ?? []).filter(n => !existing.getNamedImports().some(i => i.getName() === n))
    if (missingNamed.length)
      existing.addNamedImports(missingNamed)
    if (wanted.default && !existing.getDefaultImport())
      existing.setDefaultImport(wanted.default)
    return existing.getDefaultImport()?.getText() ?? wanted.default
  }
  const queued = queue.find(q => q.moduleSpecifier === wanted.moduleSpecifier)
  if (queued)
    queued.named = [...new Set([...(queued.named ?? []), ...(wanted.named ?? [])])]
  else
    queue.push({ ...wanted })
  return wanted.default
}

// Written as text in the file's own style (quotes, semicolons): the ts-morph
// printer would always use its own.
function writeImports(sourceFile: SourceFile, queue: PlannedImport[]) {
  if (!queue.length)
    return
  const imports = sourceFile.getImportDeclarations()
  const sample = imports[0]?.getText() ?? ''
  const quote = sample.includes('"') ? '"' : '\''
  const semicolon = sample.trimEnd().endsWith(';') ? ';' : ''
  const statements = queue.map((q) => {
    const clause = [q.default, q.named?.length ? `{ ${q.named.join(', ')} }` : '']
      .filter(Boolean)
      .join(', ')
    return `import ${clause} from ${quote}${q.moduleSpecifier}${quote}${semicolon}`
  }).join('\n')

  const last = imports.at(-1)
  if (last)
    sourceFile.insertText(last.getEnd(), `\n${statements}`)
  else
    sourceFile.insertText(0, `${statements}\n`)
}

/** Adds what is missing to vite.config; returns whether anything changed. */
export function editViteConfig(
  sourceFile: SourceFile,
  options: { tailwind: boolean, alias: boolean },
) {
  const config = findConfigObject(sourceFile)
  if (!config)
    return null
  const queue: PlannedImport[] = []
  let changed = false
  if (options.tailwind && addTailwindPlugin(sourceFile, config, queue))
    changed = true
  if (options.alias && addAlias(sourceFile, config, queue))
    changed = true
  writeImports(sourceFile, queue)
  return changed
}

function addTailwindPlugin(sourceFile: SourceFile, config: ObjectLiteralExpression, queue: PlannedImport[]) {
  const plugins = config.getProperty('plugins')
  const pluginsArray = plugins && Node.isPropertyAssignment(plugins)
    ? plugins.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression)
    : undefined

  if (pluginsArray?.getElements().some(e => /tailwindcss\s*\(/.test(e.getText())))
    return false

  const local = planImport(sourceFile, queue, { moduleSpecifier: '@tailwindcss/vite', default: 'tailwindcss' }) ?? 'tailwindcss'

  if (pluginsArray)
    pluginsArray.addElement(`${local}()`)
  else if (!plugins)
    config.insertPropertyAssignment(0, { name: 'plugins', initializer: `[${local}()]` })
  else
    return false
  return true
}

function addAlias(sourceFile: SourceFile, config: ObjectLiteralExpression, queue: PlannedImport[]) {
  const value = `fileURLToPath(new URL('./src', import.meta.url))`
  const resolve = config.getProperty('resolve')

  if (!resolve) {
    planImport(sourceFile, queue, { moduleSpecifier: 'node:url', named: ['fileURLToPath', 'URL'] })
    const added = config.addPropertyAssignment({ name: 'resolve', initializer: '{}' })
      .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .addPropertyAssignment({ name: 'alias', initializer: '{}' })
      .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
    added.addPropertyAssignment({ name: `'@'`, initializer: value })
    return true
  }

  const resolveObject = Node.isPropertyAssignment(resolve)
    ? resolve.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
    : undefined
  if (!resolveObject)
    return false

  const alias = resolveObject.getProperty('alias')
  if (!alias) {
    planImport(sourceFile, queue, { moduleSpecifier: 'node:url', named: ['fileURLToPath', 'URL'] })
    resolveObject.addPropertyAssignment({ name: 'alias', initializer: '{}' })
      .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .addPropertyAssignment({ name: `'@'`, initializer: value })
    return true
  }

  const aliasObject = Node.isPropertyAssignment(alias)
    ? alias.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
    : undefined
  if (!aliasObject || aliasObject.getProperties().some(p => Node.isPropertyAssignment(p) && /^['"]?@['"]?$/.test(p.getName())))
    return false

  planImport(sourceFile, queue, { moduleSpecifier: 'node:url', named: ['fileURLToPath', 'URL'] })
  aliasObject.addPropertyAssignment({ name: `'@'`, initializer: value })
  return true
}

// The CSS file main.ts imports gets `@import "tailwindcss"` on top. Without
// one, src/style.css is created and imported from main.ts.
async function ensureTailwindCss(cwd: string) {
  const mainFile = MAIN_FILES.find(file => fs.existsSync(path.resolve(cwd, file)))
  if (!mainFile)
    return null

  const mainPath = path.resolve(cwd, mainFile)
  const main = await fs.readFile(mainPath, 'utf8')
  const cssImport = main.match(/^\s*import\s+['"](\.{1,2}\/[^'"]+\.css)['"]/m)?.[1]

  if (cssImport) {
    const cssFile = path.join(path.dirname(mainFile), cssImport)
    const cssPath = path.resolve(cwd, cssFile)
    const css = fs.existsSync(cssPath) ? await fs.readFile(cssPath, 'utf8') : ''
    if (/@import\s+['"]tailwindcss['"]/.test(css))
      return []
    // The create-vite starter styles (centered #app with borders, counter,
    // hero) fight every component; the install guide replaces them, so do
    // the same. Styles the user wrote are kept.
    const starter = isViteStarterCss(css)
    const next = starter ? '' : css
    await fs.writeFile(cssPath, `${TAILWIND_IMPORT}\n${next ? `\n${next}` : ''}`, 'utf8')
    if (!starter)
      return [cssFile]
    logger.info(`Replaced the Vite starter styles in ${highlighter.info(cssFile)} with ${highlighter.info(TAILWIND_IMPORT)}.`)
    // Without its stylesheet the create-vite demo page renders as a pile of
    // unstyled logos; replace it too, but only while it is untouched.
    return [cssFile, ...(await replaceViteStarterPage(cwd))]
  }

  const cssFile = 'src/style.css'
  const cssPath = path.resolve(cwd, cssFile)
  const css = fs.existsSync(cssPath) ? await fs.readFile(cssPath, 'utf8') : ''
  if (!/@import\s+['"]tailwindcss['"]/.test(css))
    await fs.writeFile(cssPath, `${TAILWIND_IMPORT}\n${css ? `\n${css}` : ''}`, 'utf8')
  await fs.writeFile(mainPath, `import './style.css'\n${main}`, 'utf8')
  return [cssFile, mainFile]
}

const VITE_STARTER_ASSETS = ['src/assets/hero.png', 'src/assets/vite.svg', 'src/assets/vue.svg']

// `src/App.vue` exactly as create-vite writes it (TypeScript or JavaScript).
export function isViteStarterApp(source: string) {
  const compact = source.replace(/\s+/g, '').replace(/"/g, '\'')
  return compact === `<scriptsetuplang='ts'>importHelloWorldfrom'./components/HelloWorld.vue'</script><template><HelloWorld/></template>`
    || compact === `<scriptsetup>importHelloWorldfrom'./components/HelloWorld.vue'</script><template><HelloWorld/></template>`
}

// A small welcome page in place of the create-vite demo (and the page of a
// project created by init): no script, so it is valid in TypeScript and
// JavaScript projects; theme tokens from init.
export function klipingWelcomePage(entry: string) {
  return `<template>
  <main class="flex min-h-svh items-center justify-center bg-background p-6 text-foreground">
    <div class="flex w-full max-w-md flex-col items-center gap-6 text-center">
      <span class="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
        Kliping
      </span>
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-semibold tracking-tight">
          Your project is ready.
        </h1>
        <p class="text-balance text-muted-foreground">
          Tailwind CSS, the @ alias and the Kliping base are set up. Add your first component:
        </p>
      </div>
      <code class="w-full rounded-lg border bg-muted px-4 py-3 font-mono text-sm">
        npx kliping@latest add button
      </code>
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
        <a class="underline-offset-4 hover:underline" href="https://kliping.pro/components" target="_blank" rel="noreferrer">Components</a>
        <a class="underline-offset-4 hover:underline" href="https://kliping.pro/blocks" target="_blank" rel="noreferrer">Blocks</a>
        <a class="underline-offset-4 hover:underline" href="https://kliping.pro/charts" target="_blank" rel="noreferrer">Charts</a>
        <a class="underline-offset-4 hover:underline" href="https://kliping.pro/hooks" target="_blank" rel="noreferrer">Hooks</a>
      </nav>
      <p class="text-xs text-muted-foreground">
        Edit <code class="font-mono">${entry}</code> to start building.
      </p>
    </div>
  </main>
</template>
`
}

export const KLIPING_WELCOME_APP = klipingWelcomePage('src/App.vue')

async function replaceViteStarterPage(cwd: string) {
  const appPath = path.resolve(cwd, 'src/App.vue')
  if (!fs.existsSync(appPath) || !isViteStarterApp(await fs.readFile(appPath, 'utf8')))
    return []

  await fs.writeFile(appPath, KLIPING_WELCOME_APP, 'utf8')
  const changed = ['src/App.vue']

  const helloWorld = path.resolve(cwd, 'src/components/HelloWorld.vue')
  if (fs.existsSync(helloWorld)) {
    await fs.remove(helloWorld)
    changed.push('src/components/HelloWorld.vue (removed)')
  }

  // Demo assets go too, unless something else still uses them.
  const sources = await Promise.all(
    (await fs.readdir(path.resolve(cwd, 'src'), { recursive: true }))
      .map(String)
      .filter(file => /\.(?:vue|[cm]?[jt]sx?|css)$/.test(file))
      .map(file => fs.readFile(path.resolve(cwd, 'src', file), 'utf8')),
  )
  for (const asset of VITE_STARTER_ASSETS) {
    const assetPath = path.resolve(cwd, asset)
    if (fs.existsSync(assetPath) && !sources.some(source => source.includes(path.basename(asset)))) {
      await fs.remove(assetPath)
      changed.push(`${asset} (removed)`)
    }
  }

  logger.info(`Replaced the Vite demo page with a Kliping welcome page in ${highlighter.info('src/App.vue')}.`)
  return changed
}

// The stylesheet `npm create vite` writes for its demo page, untouched.
export function isViteStarterCss(css: string) {
  return css.includes('--text-h:') && /\.counter\s*\{/.test(css) && /#app\s*\{/.test(css)
}

// `paths` in tsconfig.json (read by this CLI and editors) and
// tsconfig.app.json (read by vue-tsc in the Vite template); jsconfig.json in
// a JavaScript project, created when missing. Comments and formatting are
// kept. No `baseUrl`: TypeScript 6 deprecates it.
async function addConfigPaths(cwd: string, typescript: boolean) {
  const changed: string[] = []
  const files = typescript ? TSCONFIG_FILES : ['jsconfig.json']
  for (const file of files) {
    const filePath = path.resolve(cwd, file)
    if (!fs.existsSync(filePath)) {
      if (typescript)
        continue
      await fs.writeFile(filePath, `${JSON.stringify({ compilerOptions: { paths: ALIAS_PATHS } }, null, 2)}\n`, 'utf8')
      changed.push(file)
      continue
    }
    const text = await fs.readFile(filePath, 'utf8')
    const paths = parse(text)?.compilerOptions?.paths ?? {}
    if (paths['@/*'])
      continue
    const edits = modify(text, ['compilerOptions', 'paths'], { ...paths, ...ALIAS_PATHS }, {
      formattingOptions: { insertSpaces: true, tabSize: 2 },
    })
    await fs.writeFile(filePath, applyEdits(text, edits), 'utf8')
    changed.push(file)
  }
  return changed
}

async function installSetupDependencies(
  cwd: string,
  options: { framework: SetupFramework, typescript: boolean, tailwind: boolean, alias: boolean },
) {
  const packageInfo = getPackageInfo(cwd, false)
  const has = (name: string) =>
    !!(packageInfo?.dependencies?.[name] || packageInfo?.devDependencies?.[name])

  const tailwind = options.tailwind ? ['tailwindcss', '@tailwindcss/vite'] : []
  // Nuxt: devDependencies, like templates/nuxt; shadcn-nuxt registers the
  // components folder so Nuxt's auto-import does not warn about it.
  // Vite: dependencies, like the install guide; vite.config imports node:url,
  // which the Vite TypeScript template type-checks.
  const dependencies = options.framework === 'vite' ? tailwind.filter(name => !has(name)) : []
  const devDependencies = options.framework === 'nuxt'
    ? [...tailwind, 'shadcn-nuxt'].filter(name => !has(name))
    : options.alias && options.typescript && !has('@types/node') ? ['@types/node'] : []
  if (!dependencies.length && !devDependencies.length)
    return

  const packageManager = await getPackageManager(cwd, { withFallback: true })
  const installOptions = { cwd, packageManager, silent: true, corepack: false }
  if (dependencies.length)
    await addDependency(dependencies, installOptions)
  if (devDependencies.length)
    await addDevDependency(devDependencies, installOptions)
}

/** Adds Tailwind (vite plugin + css entry) and shadcn-nuxt to nuxt.config. */
export function editNuxtConfig(
  sourceFile: SourceFile,
  options: { tailwind: boolean, cssPath: string },
) {
  const config = findConfigObject(sourceFile)
  if (!config)
    return null
  const queue: PlannedImport[] = []
  let changed = false

  if (options.tailwind) {
    const vite = config.getProperty('vite')
    const viteObject = vite && Node.isPropertyAssignment(vite)
      ? vite.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
      : !vite
          ? config.addPropertyAssignment({ name: 'vite', initializer: '{}' })
              .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
          : undefined
    if (viteObject && addTailwindPlugin(sourceFile, viteObject, queue))
      changed = true

    if (addToStringArray(config, 'css', options.cssPath))
      changed = true
  }

  if (addToStringArray(config, 'modules', 'shadcn-nuxt'))
    changed = true

  writeImports(sourceFile, queue)
  return changed
}

function addToStringArray(config: ObjectLiteralExpression, name: string, value: string) {
  const property = config.getProperty(name)
  if (!property) {
    config.addPropertyAssignment({ name, initializer: `['${value}']` })
    return true
  }
  const array = Node.isPropertyAssignment(property)
    ? property.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression)
    : undefined
  if (!array || array.getElements().some(e => e.getText().slice(1, -1) === value))
    return false
  array.addElement(`'${value}'`)
  return true
}

// Nuxt 4 keeps sources in app/ (`~` = app/), Nuxt 3 in the root.
async function ensureNuxtTailwindCss(cwd: string) {
  const srcDir = fs.existsSync(path.resolve(cwd, 'app')) ? 'app' : '.'
  const cssFile = path.join(srcDir, NUXT_CSS)
  const cssPath = path.resolve(cwd, cssFile)
  const css = fs.existsSync(cssPath) ? await fs.readFile(cssPath, 'utf8') : ''
  if (/@import\s+['"]tailwindcss['"]/.test(css))
    return []
  await fs.ensureDir(path.dirname(cssPath))
  await fs.writeFile(cssPath, `${TAILWIND_IMPORT}\n${css ? `\n${css}` : ''}`, 'utf8')
  return [cssFile]
}

// Regenerates .nuxt/ (types, the `@` alias, newly added modules).
async function nuxtPrepare(cwd: string) {
  const bin = ['nuxt', 'nuxi']
    .map(name => path.resolve(cwd, 'node_modules/.bin', name))
    .find(file => fs.existsSync(file))
  if (!bin)
    return false
  const { exitCode } = await x(bin, ['prepare'], { nodeOptions: { cwd, shell: process.platform === 'win32' } })
  return exitCode === 0
}
