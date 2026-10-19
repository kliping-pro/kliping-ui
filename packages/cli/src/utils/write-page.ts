import type { Config } from '@/src/utils/get-config'
import fs from 'fs-extra'
import path from 'pathe'
import { getRegistryItems } from '@/src/registry/api'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { spinner } from '@/src/utils/spinner'

// Builder tahap B (KLIPING-ROADMAP-REGISTRY-CLI.md): `kliping add navbar-01
// hero-03 --page src/LandingPage.vue` menulis satu SFC yang merender item
// yang baru dipasang, sesuai urutan argumen — halaman yang sama dengan yang
// disusun di kliping.pro/builder.

/** `hero-01` → `Hero01`, `logo-cloud-01` → `LogoCloud01`. */
export function componentName(name: string) {
  return name.split(/[^a-z0-9]+/i).filter(Boolean).map(p => p[0]!.toUpperCase() + p.slice(1)).join('')
}

/**
 * Where an item's main file lands, as an import: `<name>/<name>.vue` under
 * the components alias (`@/components/blocks/hero-01/hero-01.vue`).
 */
export function mainImport(item: { name: string, files?: { path: string }[] }, componentsAlias: string) {
  const main = item.files?.find(f => f.path.endsWith(`/${item.name}/${item.name}.vue`))
  const index = main?.path.lastIndexOf('/components/') ?? -1
  if (!main || index < 0)
    return null
  return `${componentsAlias}/${main.path.slice(index + '/components/'.length)}`
}

export function pageSource(entries: { name: string, from: string }[], typescript: boolean) {
  const unique = [...new Map(entries.map(e => [e.name, e])).values()]
  const imports = unique.map(e => `import ${componentName(e.name)} from '${e.from}'`).join('\n')
  const body = entries.map(e => `  <${componentName(e.name)} />`).join('\n')
  return `<script setup${typescript ? ' lang="ts"' : ''}>\n${imports}\n</script>\n\n<template>\n${body}\n</template>\n`
}

export async function writePage(
  names: string[],
  page: string,
  config: Config,
  options: { overwrite?: boolean, silent?: boolean } = {},
) {
  const target = path.resolve(config.resolvedPaths.cwd, page)
  const relative = path.relative(config.resolvedPaths.cwd, target)
  if (fs.existsSync(target) && !options.overwrite) {
    logger.warn(`${relative} already exists — the page was not written. Add ${highlighter.info('--overwrite')} to replace it.`)
    return null
  }

  const items = await getRegistryItems(names, { config })
  const byName = new Map(items.map(item => [item.name, item]))
  const entries: { name: string, from: string }[] = []
  const skipped: string[] = []
  for (const arg of names) {
    const name = arg.split('/').pop()!.replace(/\.json$/, '')
    const item = byName.get(name)
    const from = item ? mainImport(item, config.aliases.components) : null
    if (from)
      entries.push({ name, from })
    else
      skipped.push(arg)
  }

  if (skipped.length)
    logger.warn(`Not on the page (no single main file to render): ${skipped.join(', ')}.`)
  if (!entries.length) {
    logger.warn('Nothing to put on the page.')
    return null
  }

  await fs.outputFile(target, pageSource(entries, config.typescript), 'utf8')
  spinner(`Wrote ${relative} (${entries.length} ${entries.length === 1 ? 'item' : 'items'}).`, { silent: options.silent })?.succeed()
  return target
}
