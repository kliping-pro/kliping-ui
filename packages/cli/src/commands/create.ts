import { Command } from 'commander'
import path from 'pathe'
import { runInit } from '@/src/commands/init'
import { clearRegistryContext } from '@/src/registry/context'
import { createProject, TEMPLATES } from '@/src/utils/create-project'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { getPackageManager } from '@/src/utils/updaters/update-dependencies'
import { writePage } from '@/src/utils/write-page'

// Builder tahap C (KLIPING-ROADMAP-REGISTRY-CLI.md): satu perintah dari nol
// sampai landing page jalan — project baru, init, block dipasang, dan halaman
// sambutan diganti halaman yang merender block sesuai urutan.

/** Where the welcome page of each built-in template lives — the page is written there. */
export const PAGE_FILES = {
  vite: 'src/App.vue',
  nuxt: 'app/pages/index.vue',
} as const

const ITEM_NAME = /^[a-z0-9][a-z0-9-]*$/

/**
 * Reads a Builder link (`https://kliping.pro/builder?n=Landing+page&b=navbar-01,hero-01`):
 * the blocks in order (`b`) and the page name (`n`).
 */
export function parseBuilderLink(link: string) {
  let url: URL
  try {
    url = new URL(link)
  }
  catch {
    throw new Error(`Not a Builder link: ${link}`)
  }
  const blocks = (url.searchParams.get('b') ?? '').split(',').map(s => s.trim()).filter(Boolean)
  const invalid = blocks.filter(name => !ITEM_NAME.test(name))
  if (invalid.length)
    throw new Error(`Not a block name: ${invalid.join(', ')}`)
  if (!blocks.length)
    throw new Error(`The Builder link has no blocks (b=…): ${link}`)
  return { blocks, pageName: url.searchParams.get('n')?.trim() || undefined }
}

/** "Landing page" → `landing-page`. */
export function projectSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export const create = new Command()
  .name('create')
  .description('create a new project with the given blocks on its first page')
  .argument('[name]', 'the folder and package name of the new project.')
  .argument('[blocks...]', 'blocks (or other items) to install, in page order.')
  .option('--from <link>', 'take the blocks, in order, from a kliping.pro/builder link.')
  .option('-t, --template <template>', 'the template for the new project. (vite, nuxt)', 'vite')
  .option(
    '-c, --cwd <cwd>',
    'the folder to create the project in. defaults to the current directory.',
    process.cwd(),
  )
  .option('-s, --silent', 'mute output.', false)
  .action(async (name: string | undefined, blocks: string[], opts) => {
    try {
      if (!TEMPLATES[opts.template as keyof typeof TEMPLATES]) {
        logger.error(`Invalid template ${highlighter.info(opts.template)}. Use ${highlighter.info('vite')} or ${highlighter.info('nuxt')}.`)
        process.exit(1)
      }
      const template = opts.template as keyof typeof PAGE_FILES

      let items = blocks
      let pageName: string | undefined
      if (opts.from) {
        const link = parseBuilderLink(opts.from)
        items = [...link.blocks, ...blocks]
        pageName = link.pageName
      }
      const projectName = name ?? (pageName && projectSlug(pageName)) ?? 'my-landing'

      const cwd = path.resolve(opts.cwd)
      const { projectPath } = await createProject({
        cwd,
        name: projectName,
        template,
        components: [],
        // The name and template are known: no prompts.
        force: true,
      })

      const config = await runInit({
        cwd: projectPath,
        name: projectName,
        template,
        components: items,
        isNewProject: true,
        yes: true,
        defaults: true,
        force: true,
        silent: opts.silent,
        cssVariables: true,
        baseStyle: true,
        baseColor: 'neutral',
      })

      // The welcome page becomes the assembled page.
      if (items.length)
        await writePage(items, PAGE_FILES[template], config, { overwrite: true, silent: opts.silent })

      const packageManager = await getPackageManager(projectPath, { withFallback: true })
      const dev = packageManager === 'npm' ? 'npm run dev' : `${packageManager} dev`
      logger.break()
      logger.log(`${highlighter.success('Success!')} Created ${highlighter.info(projectName)}${items.length ? ` with ${items.length} ${items.length === 1 ? 'item' : 'items'} on ${highlighter.info(PAGE_FILES[template])}` : ''}.`)
      logger.log(`Next:\n  cd ${projectName}\n  ${dev}`)
      logger.break()
    }
    catch (error) {
      logger.break()
      handleError(error)
    }
    finally {
      clearRegistryContext()
    }
  })
