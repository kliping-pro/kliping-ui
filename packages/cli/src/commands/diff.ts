import type { Change } from 'diff'
import type { registryIndexSchema } from '@/src/schema'
import type { Config } from '@/src/utils/get-config'
import { existsSync, promises as fs } from 'node:fs'
import { Command } from 'commander'
import { diffLines } from 'diff'
import path from 'pathe'
import { z } from 'zod'
import {
  getRegistryBaseColor,
  getRegistryItems,
  getShadcnRegistryIndex,
} from '@/src/registry/api'
import { getConfig } from '@/src/utils/get-config'
import { getProjectInfo } from '@/src/utils/get-project-info'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { transform } from '@/src/utils/transformers'
import { findCommonRoot, resolveFilePath } from '@/src/utils/updaters/update-files'

const updateOptionsSchema = z.object({
  component: z.string().optional(),
  yes: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
})

export const diff = new Command()
  .name('diff')
  .description('check for updates against the registry')
  .argument('[component]', 'the component name')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (name, opts) => {
    try {
      const options = updateOptionsSchema.parse({
        component: name,
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${highlighter.success(
            `init`,
          )} to create a components.json file.`,
        )
        process.exit(1)
      }

      const registryIndex = await getShadcnRegistryIndex()

      if (!registryIndex) {
        handleError(new Error('Failed to fetch registry index.'))
        process.exit(1)
      }

      if (!options.component) {
        // Items installed in this project: any of their files is where
        // `add` would have written it.
        const framework = (await getProjectInfo(config.resolvedPaths.cwd))?.framework.name
        const projectComponents = registryIndex.filter(item =>
          getFileTargets(
            (item.files ?? []).filter(file => typeof file !== 'string'),
            config,
            framework,
          ).some(({ filePath }) => existsSync(filePath)),
        )

        // Check for updates.
        const componentsWithUpdates = []
        for (const component of projectComponents) {
          const changes = await diffComponent(component, config)
          if (changes.length) {
            componentsWithUpdates.push({
              name: component.name,
              changes,
            })
          }
        }

        if (!componentsWithUpdates.length) {
          logger.info('No updates found.')
          process.exit(0)
        }

        logger.info('The following components have updates available:')
        for (const component of componentsWithUpdates) {
          logger.info(`- ${component.name}`)
          for (const change of component.changes) {
            logger.info(`  - ${path.relative(cwd, change.filePath)}`)
          }
        }
        logger.break()
        logger.info(
          `Run ${highlighter.success(`diff <component>`)} to see the changes.`,
        )
        process.exit(0)
      }

      // Show diff for a single component.
      const component = registryIndex.find(
        item => item.name === options.component,
      )

      if (!component) {
        logger.error(
          `The component ${highlighter.success(
            options.component,
          )} does not exist.`,
        )
        process.exit(1)
      }

      const changes = await diffComponent(component, config)

      if (!changes.length) {
        logger.info(`No updates found for ${options.component}.`)
        process.exit(0)
      }

      for (const change of changes) {
        logger.info(`- ${path.relative(cwd, change.filePath)}`)
        await printDiff(change.patch)
        logger.info('')
      }
    }
    catch (error) {
      handleError(error)
    }
  })

// Where `add` writes each file of an item: same resolution as updateFiles.
function getFileTargets<T extends { path: string, type: string, target?: string }>(
  files: T[],
  config: Config,
  framework?: string,
) {
  return files.map((file) => {
    let filePath = resolveFilePath(file as Parameters<typeof resolveFilePath>[0], config, {
      framework: framework as Parameters<typeof resolveFilePath>[2]['framework'],
      commonRoot: findCommonRoot(files.map(f => f.path), file.path),
    })
    if (filePath && !config.typescript)
      filePath = filePath.replace(/\.ts?$/, () => '.js')
    return { file, filePath }
  }).filter(({ filePath }) => !!filePath)
}

async function diffComponent(
  component: z.infer<typeof registryIndexSchema>[number],
  config: Config,
) {
  const [item] = await getRegistryItems([component.name], { config })
  if (!item) {
    return []
  }
  const [baseColor, projectInfo] = await Promise.all([
    getRegistryBaseColor(config.tailwind.baseColor),
    getProjectInfo(config.resolvedPaths.cwd),
  ])

  const changes = []
  const files = (item.files ?? []).filter(file => file.content)

  for (const { file, filePath } of getFileTargets(files, config, projectInfo?.framework.name)) {
    if (!existsSync(filePath)) {
      continue
    }

    const fileContent = await fs.readFile(filePath, 'utf8')
    const registryContent = await transform({
      filename: file.path,
      raw: file.content!,
      config,
      baseColor,
    })

    const patch = diffLines(registryContent as string, fileContent)
    if (patch.length > 1) {
      changes.push({
        filePath,
        patch,
      })
    }
  }

  return changes
}

async function printDiff(diff: Change[]) {
  diff.forEach((part) => {
    if (part) {
      if (part.added) {
        return process.stdout.write(highlighter.success(part.value))
      }
      if (part.removed) {
        return process.stdout.write(highlighter.error(part.value))
      }

      return process.stdout.write(part.value)
    }
  })
}
