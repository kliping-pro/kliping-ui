import { Command } from 'commander'
import fsExtra from 'fs-extra'
import path from 'pathe'
import { z } from 'zod'
import { configWithDefaults } from '@/src/registry/config'
import { KLIPING_REGISTRY } from '@/src/registry/constants'
import { clearRegistryContext } from '@/src/registry/context'
import { searchRegistries } from '@/src/registry/search'
import { validateRegistryConfigForItems } from '@/src/registry/validator'
import { rawConfigSchema } from '@/src/schema'
import { loadEnvFiles } from '@/src/utils/env-loader'
import { createConfig, getConfig } from '@/src/utils/get-config'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { ensureRegistriesInConfig } from '@/src/utils/registries'

const searchOptionsSchema = z.object({
  cwd: z.string(),
  query: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  json: z.boolean().optional(),
})

/** A registry argument: `@namespace`, a URL, or a GitHub `owner/repo`. */
const isRegistryArgument = (arg: string) => arg.startsWith('@') || arg.includes('://') || arg.includes('/')

// TODO: We're duplicating logic for shadowConfig here.
// Revisit and properly abstract this.

export const search = new Command()
  .name('search')
  .alias('list')
  .description('search items from registries (the Kliping registry by default)')
  .argument(
    '[query-or-registries...]',
    'words to search for, and/or registries (@name, url or owner/repo). Defaults to @kliping.',
  )
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-q, --query <query>', 'query string')
  .option(
    '-l, --limit <number>',
    'maximum number of items to display (default: 20; 100 with --json)',
  )
  .option('-o, --offset <number>', 'number of items to skip', '0')
  .option('--json', 'print the raw results as JSON (for scripts and tools)', false)
  .action(async (args: string[], opts) => {
    try {
      // `kliping search hero` searches Kliping; `kliping search @acme -q x`
      // keeps working as before.
      const named = args.filter(isRegistryArgument)
      const registries = named.length ? named : [KLIPING_REGISTRY]
      const words = args.filter(arg => !isRegistryArgument(arg)).join(' ')
      const options = searchOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        query: opts.query ?? (words || undefined),
        json: opts.json,
        limit: opts.limit ? Number.parseInt(opts.limit, 10) : opts.json ? 100 : 20,
        offset: opts.offset ? Number.parseInt(opts.offset, 10) : undefined,
      })

      await loadEnvFiles(options.cwd)

      // Start with a shadow config to support partial components.json.
      // Use createConfig to get proper default paths
      const defaultConfig = createConfig({
        style: 'new-york',
        resolvedPaths: {
          cwd: options.cwd,
        },
      })
      let shadowConfig = configWithDefaults(defaultConfig)

      // Check if there's a components.json file (partial or complete).
      const componentsJsonPath = path.resolve(options.cwd, 'components.json')
      if (fsExtra.existsSync(componentsJsonPath)) {
        const existingConfig = await fsExtra.readJson(componentsJsonPath)
        const partialConfig = rawConfigSchema.partial().parse(existingConfig)
        shadowConfig = configWithDefaults({
          ...defaultConfig,
          ...partialConfig,
        })
      }

      // Try to get the full config, but fall back to shadow config if it fails.
      let config = shadowConfig
      try {
        const fullConfig = await getConfig(options.cwd)
        if (fullConfig) {
          config = configWithDefaults(fullConfig)
        }
      }
      catch {
        // Use shadow config if getConfig fails (partial components.json).
      }

      // Only `@namespace` registries need to be discovered in components.json.
      // A url or a `owner/repo` GitHub source carries its own location, and
      // appending "/registry" to one just sends us off to look for an item
      // literally named "registry" - a wasted round trip whose failure is then
      // swallowed.
      const { config: updatedConfig, newRegistries }
        = await ensureRegistriesInConfig(
          registries
            .filter(registry => registry.startsWith('@'))
            .map(registry => `${registry}/registry`),
          config,
          {
            silent: true,
            writeFile: false,
          },
        )
      if (newRegistries.length > 0) {
        config.registries = updatedConfig.registries
      }

      // Validate registries early for better error messages.
      validateRegistryConfigForItems(registries, config)

      // Use searchRegistries for both search and non-search cases
      const results = await searchRegistries(registries as `@${string}`[], {
        query: options.query,
        limit: options.limit,
        offset: options.offset,
        config,
      })

      if (options.json) {
        console.log(JSON.stringify(results, null, 2))
        process.exit(0)
      }
      printResults(results, options.query)
      process.exit(0)
    }
    catch (error) {
      handleError(error)
    }
    finally {
      clearRegistryContext()
    }
  })

/** A short table for people: name, kind, description, then how to add one. */
function printResults(
  results: Awaited<ReturnType<typeof searchRegistries>>,
  query?: string,
) {
  const { items, pagination } = results
  if (!items.length) {
    logger.info(query ? `No items match "${query}".` : 'No items found.')
    return
  }
  const nameOf = (item: (typeof items)[number]) => (item.addCommandArgument ?? item.name).replace(`${KLIPING_REGISTRY}/`, '')
  const kindOf = (item: (typeof items)[number]) => (item.type ?? '').replace('registry:', '')
  const nameWidth = Math.max(...items.map(item => nameOf(item).length))
  const kindWidth = Math.max(...items.map(item => kindOf(item).length))
  const width = process.stdout.columns || 100
  for (const item of items) {
    const left = `${nameOf(item).padEnd(nameWidth)}  ${kindOf(item).padEnd(kindWidth)}  `
    const room = Math.max(width - left.length - 1, 20)
    const description = item.description ?? ''
    logger.log(`${highlighter.info(nameOf(item).padEnd(nameWidth))}  ${kindOf(item).padEnd(kindWidth)}  ${description.length > room ? `${description.slice(0, room - 1)}…` : description}`)
  }
  logger.break()
  const shown = `${pagination.offset + items.length} of ${pagination.total}`
  logger.log(`${shown}${pagination.hasMore ? ` — more with ${highlighter.info(`--offset ${pagination.offset + items.length}`)}` : ''}. Add one: ${highlighter.info(`npx kliping@latest add ${nameOf(items[0])}`)}`)
}
