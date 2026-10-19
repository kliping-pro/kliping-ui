import type { Config } from '@/src/utils/get-config'
import { promises as fs } from 'node:fs'
import { Command } from 'commander'
import deepmerge from 'deepmerge'
import fsExtra from 'fs-extra'
import path from 'pathe'
import prompts from 'prompts'
import { z } from 'zod'
import { preFlightInit } from '@/src/preflights/preflight-init'
import { decodePreset, isPresetCode } from '@/src/preset/preset'
import {
  DEFAULT_PRESETS,
  promptForBase,
  promptForPreset,
  resolveInitUrl,
  resolveRegistryBaseConfig,
} from '@/src/preset/presets'
import {
  getRegistryBaseColors,
  getRegistryItems,
} from '@/src/registry/api'
import { buildUrlAndHeadersForRegistryItem } from '@/src/registry/builder'
import { composeStyleId, configWithDefaults } from '@/src/registry/config'
import {
  BASE_COLORS,
  BASES,
  BUILTIN_REGISTRIES,
  FONTS,
  ICON_LIBRARIES,
  INIT_ITEM,
  KLIPING_REGISTRY,
  STYLES,
} from '@/src/registry/constants'
import { clearRegistryContext } from '@/src/registry/context'
import { isUrl } from '@/src/registry/utils'
import { rawConfigSchema } from '@/src/schema'
import { addComponents } from '@/src/utils/add-components'
import { createProject, TEMPLATES } from '@/src/utils/create-project'
import { loadEnvFiles } from '@/src/utils/env-loader'
import * as ERRORS from '@/src/utils/errors'
import {
  createFileBackup,
  deleteFileBackup,
  FILE_BACKUP_SUFFIX,
  restoreFileBackup,
} from '@/src/utils/file-helper'
import {
  createConfig,
  DEFAULT_COMPONENTS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_CSS,
  DEFAULT_UTILS,
  getConfig,
  resolveConfigPaths,
} from '@/src/utils/get-config'
import {
  getProjectConfig,
  getProjectInfo,
} from '@/src/utils/get-project-info'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { ensureRegistriesInConfig } from '@/src/utils/registries'
import { spinner } from '@/src/utils/spinner'
import { updateTailwindContent } from '@/src/utils/updaters/update-tailwind-content'

process.on('exit', (code) => {
  const filePath = path.resolve(process.cwd(), 'components.json')

  // Delete backup if successful.
  if (code === 0) {
    return deleteFileBackup(filePath)
  }

  // Restore backup if error.
  return restoreFileBackup(filePath)
})

export const initOptionsSchema = z.object({
  cwd: z.string(),
  name: z.string().optional(),
  preset: z.union([z.boolean(), z.string()]).optional(),
  registryBaseConfig: rawConfigSchema.deepPartial().optional(),
  installStyleIndex: z.boolean().optional(),
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  defaults: z.boolean(),
  force: z.boolean(),
  silent: z.boolean(),
  isNewProject: z.boolean(),
  srcDir: z.boolean().optional(),
  cssVariables: z.boolean(),
  template: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return TEMPLATES[val as keyof typeof TEMPLATES]
        }
        return true
      },
      {
        message: 'Invalid template. Please use \'vite\' or \'nuxt\'.',
      },
    ),
  base: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return BASES.find(base => base.name === val)
        }
        return true
      },
      {
        message: `Invalid base. Please use '${BASES.map(base => base.name).join('\', \'')}'`,
      },
    ),
  style: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return STYLES.find(style => style.name === val)
        }
        return true
      },
      {
        message: `Invalid style. Please use '${STYLES.map(style => style.name).join('\', \'')}'`,
      },
    ),
  iconLibrary: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return ICON_LIBRARIES.find(lib => lib.name === val)
        }
        return true
      },
      {
        message: `Invalid icon library. Please use '${ICON_LIBRARIES.map(lib => lib.name).join('\', \'')}'`,
      },
    ),
  font: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return FONTS.find(font => font.name === val)
        }
        return true
      },
      {
        message: `Invalid font. Please use '${FONTS.map(font => font.name).join('\', \'')}'`,
      },
    ),
  baseColor: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return BASE_COLORS.find(color => color.name === val)
        }

        return true
      },
      {
        message: `Invalid base color. Please use '${BASE_COLORS.map(
          color => color.name,
        ).join('\', \'')}'`,
      },
    ),
  baseStyle: z.boolean(),
  monorepo: z.boolean().optional(),
  reinstall: z.boolean().optional(),
  rtl: z.boolean().optional(),
  pointer: z.boolean().optional(),
})

export function applyInitUrlOptions(
  url: URL,
  options: Pick<z.infer<typeof initOptionsSchema>, 'rtl' | 'pointer'>,
) {
  if (options.rtl) {
    url.searchParams.set('rtl', 'true')
  }
  else if (options.rtl === false) {
    url.searchParams.delete('rtl')
  }

  if (options.pointer) {
    url.searchParams.set('pointer', 'true')
  }
  else if (options.pointer === false) {
    url.searchParams.delete('pointer')
  }

  return url
}

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .argument('[components...]', 'names, url or local path to component')
  .option(
    '-p, --preset [preset]',
    `use a preset configuration, preset code, or URL. (${Object.keys(DEFAULT_PRESETS).join(', ')})`,
  )
  .option(
    '-t, --template <template>',
    'the template for a new project. (vite, nuxt)',
  )
  .option(
    '--base <base>',
    'the component library base to use. (reka)',
    undefined,
  )
  .option(
    '--style <style>',
    'the visual style to use. (vega, nova, maia, lyra, mira)',
    undefined,
  )
  .option(
    '--icon-library <icon-library>',
    'the icon library to use. (lucide, tabler, hugeicons, phosphor, remixicon)',
    undefined,
  )
  .option(
    '--font <font>',
    'the font to use. (inter, figtree, jetbrains-mono, geist, geist-mono)',
    undefined,
  )
  .option(
    '-b, --base-color <base-color>',
    'the base color to use. (neutral, gray, zinc, stone, slate)',
    undefined,
  )
  .option('-y, --yes', 'skip confirmation prompt.', true)
  .option('-d, --defaults,', 'use default configuration.', false)
  .option('-f, --force', 'force overwrite of existing configuration.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-s, --silent', 'mute output.', false)
  .option(
    '--src-dir',
    'use the src directory when creating a new project.',
    false,
  )
  .option(
    '--no-src-dir',
    'do not use the src directory when creating a new project.',
  )
  .option('--css-variables', 'use css variables for theming.', true)
  .option('--no-css-variables', 'do not use css variables for theming.')
  .option('--no-base-style', 'do not install the Kliping base (cn helper and base dependencies).')
  .option('-n, --name <name>', 'the name for the new project.')
  // .option('--monorepo', 'scaffold a monorepo project.')
  // .option('--no-monorepo', 'skip the monorepo prompt.')
  .option('--reinstall', 're-install existing UI components.')
  .option('--no-reinstall', 'do not re-install existing UI components.')
  .option('--rtl', 'enable RTL support.')
  .option('--no-rtl', 'disable RTL support.')
  .option('--pointer', 'enable pointer cursor for buttons.')
  .option('--no-pointer', 'disable pointer cursor for buttons.')
  .action(async (components, opts) => {
    // NOTE: --monorepo is not yet supported in shadcn-vue since Vue-specific
    // monorepo templates aren't available. We keep the flag for parity so
    // users can discover it and we fail fast with a clear message.
    if (opts.monorepo === true) {
      logger.break()
      logger.warn(
        'The --monorepo flag is not yet supported in kliping.',
      )
      process.exit(1)
    }

    // NOTE: --rtl is wired through to the config (`rtl: true`) but the
    // shadcn-vue component templates don't yet ship with RTL-aware classes.
    // Users can run `npx shadcn-vue migrate rtl` after init to transform
    // installed components.
    if (opts.rtl === true) {
      logger.info(
        'RTL support enabled in config. Run `kliping migrate rtl` to transform installed components.',
      )
    }

    try {
      // Reject obviously invalid preset strings early (before URL resolution).
      const presetsByName = DEFAULT_PRESETS
      if (
        typeof opts.preset === 'string'
        && !isUrl(opts.preset)
        && !isPresetCode(opts.preset)
        && !(opts.preset in presetsByName)
      ) {
        logger.error(
          `Invalid preset: ${highlighter.info(opts.preset)}. Available presets: ${Object.keys(presetsByName).join(', ')}`,
        )
        process.exit(1)
      }

      // Without a terminal (CI, piped stdin) prompts cannot be answered: the
      // process would just end with nothing written. Use the defaults instead.
      if (!process.stdin.isTTY && !opts.defaults && opts.preset === undefined) {
        opts.defaults = true
        logger.info('No interactive terminal: using the default configuration (--defaults).')
      }

      // Apply defaults when --defaults flag is set.
      if (opts.defaults) {
        opts.template = opts.template || 'nuxt'
        opts.base = opts.base || 'reka'
      }

      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        isNewProject: false,
        components,
        ...opts,
      })

      // Like shadcn: an existing components.json is only replaced on request
      // (--force, or "yes" to the prompt). Kliping items need no re-init:
      // `@kliping` is built in, so `add` works with any components.json.
      const existingConfigPath = path.resolve(options.cwd, 'components.json')
      if (fsExtra.existsSync(existingConfigPath) && !options.force) {
        // No terminal: never overwrite silently, stop with the hint below.
        const { overwrite } = !process.stdin.isTTY ? { overwrite: false } : await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `A ${highlighter.info('components.json')} file already exists. Would you like to overwrite it?`,
          initial: false,
        })
        if (!overwrite) {
          logger.break()
          logger.info(
            `This project is already set up. Add Kliping items directly:\n  ${highlighter.info('npx kliping@latest add button')}`,
          )
          logger.info(
            `To start over, run ${highlighter.info('init --force')} or remove ${highlighter.info('components.json')}.`,
          )
          logger.break()
          process.exit(1)
        }
        options.force = true
      }

      await loadEnvFiles(options.cwd)

      // Resolve preset → inject init URL into components.
      if (options.preset !== undefined) {
        const presetArg = options.preset === true ? true : options.preset

        if (presetArg === true) {
          const result = await promptForPreset({
            rtl: options.rtl ?? false,
            pointer: options.pointer,
            template: options.template,
            base: options.base ?? (await promptForBase()),
          })
          // User cancelled the prompt (Ctrl+C or escaped) — exit cleanly so
          // the outer finally block still runs.
          if (result.kind === 'cancelled') {
            logger.break()
            process.exit(1)
          }
          // "Custom" means the user was redirected to the web builder;
          // nothing more for the CLI to do this run.
          if (result.kind === 'custom') {
            logger.break()
            process.exit(0)
          }
          components = [result.url, ...components]
        }

        if (typeof presetArg === 'string') {
          let initUrl: string

          if (isUrl(presetArg)) {
            const url = new URL(presetArg)
            applyInitUrlOptions(url, options)
            initUrl = url.toString()
          }
          else if (isPresetCode(presetArg)) {
            const decoded = decodePreset(presetArg)
            if (!decoded) {
              logger.error(
                `Invalid preset code: ${highlighter.info(presetArg)}`,
              )
              logger.break()
              process.exit(1)
            }
            initUrl = resolveInitUrl(
              {
                ...decoded,
                base: options.base ?? 'reka',
                rtl: options.rtl ?? false,
              },
              { template: options.template, preset: presetArg, pointer: options.pointer },
            )
          }
          else {
            const preset = presetsByName[presetArg as keyof typeof presetsByName]
            if (!preset) {
              throw new Error(`Unknown preset: ${presetArg}`)
            }
            initUrl = resolveInitUrl(
              {
                ...preset,
                base: options.base ?? preset.base,
                rtl: options.rtl ?? preset.rtl,
              },
              { template: options.template, pointer: options.pointer },
            )
          }

          components = [initUrl, ...components]
        }

        // Fetch the registry:base item, extract its config, and stash on options.
        const { registryBaseConfig, installStyleIndex, url: cleanUrl }
          = await resolveRegistryBaseConfig(components[0]!, path.resolve(opts.cwd))
        components[0] = cleanUrl
        if (registryBaseConfig) {
          options.registryBaseConfig = registryBaseConfig
        }
        if (!installStyleIndex) {
          options.installStyleIndex = false
          options.baseStyle = false
        }
        // Re-sync options.components with the mutated components array.
        options.components = components
      }

      // We need to check if we're initializing with a new style.
      // This will allow us to determine if we need to install the base style.
      // And if we should prompt the user for a base color.
      if (components.length > 0) {
        // We don't know the full config at this point.
        // So we'll use a shadow config to fetch the first item.
        let shadowConfig = configWithDefaults(
          createConfig({
            resolvedPaths: {
              cwd: options.cwd,
            },
          }),
        )

        // Check if there's a components.json file.
        // If so, we'll merge with our shadow config.
        const componentsJsonPath = path.resolve(options.cwd, 'components.json')
        if (fsExtra.existsSync(componentsJsonPath)) {
          const existingConfig = await fsExtra.readJson(componentsJsonPath)
          const config = rawConfigSchema.partial().parse(existingConfig)
          const baseConfig = createConfig({
            resolvedPaths: {
              cwd: options.cwd,
            },
          })
          shadowConfig = configWithDefaults({
            ...config,
            resolvedPaths: {
              ...baseConfig.resolvedPaths,
              cwd: options.cwd,
            },
          })

          // Since components.json might not be valid at this point.
          // Temporarily rename components.json to allow preflight to run.
          // We'll rename it back after preflight.
          createFileBackup(componentsJsonPath)
        }

        // Ensure all registries used in components are configured.
        const { config: updatedConfig } = await ensureRegistriesInConfig(
          components,
          shadowConfig,
          {
            silent: true,
            writeFile: false,
          },
        )
        shadowConfig = updatedConfig

        // This forces a shadowConfig validation early in the process.
        buildUrlAndHeadersForRegistryItem(components[0], shadowConfig)

        const [item] = await getRegistryItems([components[0]], {
          config: shadowConfig,
        })
        if (item?.type === 'registry:style') {
          // Set a default base color so we're not prompted.
          // The style will extend or override it.
          options.baseColor = 'neutral'

          // If the style extends none, we don't want to install the base style.
          options.baseStyle
            = item.extends === 'none' ? false : options.baseStyle
        }
      }

      // If --no-base-style, we don't want to prompt for a base color either.
      // The style will extend or override it.
      if (!options.baseStyle) {
        options.baseColor = 'neutral'
      }

      await runInit(options)

      logger.log(
        `${highlighter.success(
          'Success!',
        )} Project initialization completed.\nYou may now add components.`,
      )

      // We need when running with custom cwd.
      deleteFileBackup(path.resolve(options.cwd, 'components.json'))
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

export async function runInit(
  options: z.infer<typeof initOptionsSchema> & {
    skipPreflight?: boolean
  },
) {
  let projectInfo
  if (!options.skipPreflight) {
    const preflight = await preFlightInit(options)
    if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
      const { projectPath } = await createProject(options)
      if (!projectPath) {
        process.exit(1)
      }
      options.cwd = projectPath
      options.isNewProject = true
      // The new project is plain Vite / Nuxt: the same checks as for an
      // existing project set up Tailwind CSS and the alias.
      projectInfo = (await preFlightInit(options)).projectInfo
    }
    else {
      projectInfo = preflight.projectInfo
    }
  }
  else {
    projectInfo = await getProjectInfo(options.cwd)
  }

  const projectConfig = await getProjectConfig(options.cwd, projectInfo)

  let config = projectConfig
    ? await promptForMinimalConfig(projectConfig, options)
    : await promptForConfig(await getConfig(options.cwd), options)

  if (!options.yes) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Write configuration to ${highlighter.info(
        'components.json',
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  // Prepare the list of components to be added.
  const components = [
    // The Kliping base (`r/init.json`): `cn()` in lib/utils plus the
    // dependencies every Kliping item assumes. The theme for the chosen base
    // color is added alongside it (see resolveRegistryTree).
    ...(options.baseStyle ? [INIT_ITEM] : []),
    ...(options.components ?? []),
  ]

  // Ensure registries are configured for the components we're about to add.
  const fullConfigForRegistry = await resolveConfigPaths(options.cwd, config)
  const { config: configWithRegistries } = await ensureRegistriesInConfig(
    components,
    fullConfigForRegistry,
    {
      silent: true,
    },
  )

  // Update config with any new registries found.
  if (configWithRegistries.registries) {
    config.registries = configWithRegistries.registries
  }

  const componentSpinner = spinner(`Writing components.json.`).start()
  const targetPath = path.resolve(options.cwd, 'components.json')
  const backupPath = `${targetPath}${FILE_BACKUP_SUFFIX}`

  // Merge and keep registries at the end.
  const mergeConfig = (base: typeof config, override: object) => {
    const { registries, ...merged } = deepmerge(base, override) as typeof config
    return { ...merged, registries } as typeof config
  }

  // Merge with backup config if it exists and not using --force
  if (!options.force && fsExtra.existsSync(backupPath)) {
    const existingConfig = await fsExtra.readJson(backupPath)
    config = mergeConfig(existingConfig, config)
  }

  // Merge config from registry:base item (preset).
  if (options.registryBaseConfig) {
    config = mergeConfig(config, options.registryBaseConfig)
  }

  // rtl from CLI takes priority over registryBaseConfig.
  if (options.rtl !== undefined) {
    config.rtl = options.rtl
  }

  // pointer from CLI takes priority over registryBaseConfig.
  if (options.pointer !== undefined) {
    config.pointer = options.pointer
  }

  // Make sure to filter out built-in registries, except `@kliping`: it is
  // written out so other shadcn-vue compatible CLIs can resolve the
  // `@kliping/*` dependencies of installed items.
  // TODO: fix this in ensureRegistriesInConfig.
  config.registries = {
    [KLIPING_REGISTRY]: BUILTIN_REGISTRIES[KLIPING_REGISTRY],
    ...Object.fromEntries(
      Object.entries(config.registries || {}).filter(
        ([key]) => key === KLIPING_REGISTRY || !Object.keys(BUILTIN_REGISTRIES).includes(key),
      ),
    ),
  }

  // Write components.json.
  await fs.writeFile(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8')
  componentSpinner.succeed()

  // Add components.
  const fullConfig = await resolveConfigPaths(options.cwd, config)

  await addComponents(components, fullConfig, {
    // Init will always overwrite files.
    overwrite: true,
    silent: options.silent,
    baseStyle: options.baseStyle,
    isNewProject:
      options.isNewProject || projectInfo?.framework.name === 'nuxt4',
  })

  // If a new project is using src dir, let's update the tailwind content config.
  // TODO: Handle this per framework.
  if (options.isNewProject && options.srcDir) {
    await updateTailwindContent(
      ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
      fullConfig,
      {
        silent: options.silent,
      },
    )
  }

  return fullConfig
}

async function promptForConfig(defaultConfig: Config | null = null, opts?: z.infer<typeof initOptionsSchema>) {
  let base = opts?.base ?? 'reka'
  // Kliping items come in one style. `style` only picks the variant of
  // `@shadcn/*` items, so it is not asked; `--style` still sets it.
  const style = opts?.style
  let font = opts?.font ?? 'inter'
  let iconLibrary = opts?.iconLibrary ?? 'lucide'
  let baseColor = opts?.baseColor ?? 'neutral'
  let typescript = defaultConfig?.typescript ?? true
  let tailwindCss = defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS
  let tailwindCssVariables = opts?.cssVariables ?? defaultConfig?.tailwind.cssVariables ?? true
  let tailwindPrefix = defaultConfig?.tailwind.prefix ?? ''
  let tailwindConfig = defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG
  let componentsAlias = defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS
  let utilsAlias = defaultConfig?.aliases.utils ?? DEFAULT_UTILS

  if (opts?.preset === undefined && !opts?.defaults) {
    const baseColors = await getRegistryBaseColors()

    logger.info('')
    const options = await prompts([
      {
        type: 'toggle',
        name: 'typescript',
        message: `Would you like to use ${highlighter.info(
          'TypeScript',
        )} (recommended)?`,
        initial: typescript,
        active: 'yes',
        inactive: 'no',
      },
      {
        type: BASES.length > 1 ? 'select' : null,
        name: 'base',
        message: `Which ${highlighter.info('component library')} would you like to use?`,
        choices: BASES.map(b => ({
          title: b.label,
          value: b.name,
          description: b.description,
        })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'iconLibrary',
        message: `Which ${highlighter.info('icon library')} would you like to use?`,
        choices: ICON_LIBRARIES.map(lib => ({
          title: lib.label,
          value: lib.name,
        })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'font',
        message: `Which ${highlighter.info('font')} would you like to use?`,
        choices: FONTS.map(f => ({
          title: f.label,
          value: f.name,
        })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'tailwindBaseColor',
        message: `Which color would you like to use as the ${highlighter.info(
          'base color',
        )}?`,
        choices: baseColors.map(color => ({
          title: color.label,
          value: color.name,
        })),
      },
      {
        type: 'text',
        name: 'tailwindCss',
        message: `Where is your ${highlighter.info('global CSS')} file?`,
        initial: tailwindCss,
      },
      {
        type: 'toggle',
        name: 'tailwindCssVariables',
        message: `Would you like to use ${highlighter.info(
          'CSS variables',
        )} for theming?`,
        initial: tailwindCssVariables,
        active: 'yes',
        inactive: 'no',
      },
      {
        type: 'text',
        name: 'tailwindPrefix',
        message: `Are you using a custom ${highlighter.info(
          'tailwind prefix eg. tw-',
        )}? (Leave blank if not)`,
        initial: '',
      },
      {
        type: 'text',
        name: 'tailwindConfig',
        message: `Where is your ${highlighter.info(
          'tailwind.config.js',
        )} located?`,
        initial: tailwindConfig,
      },
      {
        type: 'text',
        name: 'components',
        message: `Configure the import alias for ${highlighter.info(
          'components',
        )}:`,
        initial: componentsAlias,
      },
      {
        type: 'text',
        name: 'utils',
        message: `Configure the import alias for ${highlighter.info('utils')}:`,
        initial: utilsAlias,
      },
    ])

    base = options.base ?? base
    font = options.font ?? font
    iconLibrary = options.iconLibrary ?? iconLibrary
    baseColor = options.tailwindBaseColor ?? baseColor
    typescript = options.typescript ?? typescript
    tailwindCss = options.tailwindCss ?? tailwindCss
    tailwindCssVariables = options.tailwindCssVariables ?? tailwindCssVariables
    tailwindPrefix = options.tailwindPrefix ?? tailwindPrefix
    tailwindConfig = options.tailwindConfig ?? tailwindConfig
    componentsAlias = options.components ?? componentsAlias
    utilsAlias = options.utils ?? utilsAlias
  }

  return rawConfigSchema.parse({
    $schema: 'https://kliping.pro/schema.json',
    style: composeStyleId(base, style),
    font,
    iconLibrary,
    rtl: opts?.rtl ?? false,
    pointer: opts?.pointer ?? false,
    tailwind: {
      config: tailwindConfig,
      css: tailwindCss,
      baseColor,
      cssVariables: tailwindCssVariables,
      prefix: tailwindPrefix,
    },
    typescript,
    aliases: {
      utils: utilsAlias,
      components: componentsAlias,
      // TODO: fix this.
      lib: componentsAlias.replace(/\/components$/, '/lib'),
      composables: componentsAlias.replace(/\/components$/, '/composables'),
    },
  })
}

async function promptForMinimalConfig(
  defaultConfig: Config,
  opts: z.infer<typeof initOptionsSchema>,
) {
  let base = opts.base ?? 'reka'
  // See promptForConfig: `style` only affects `@shadcn/*` items.
  const style = opts.style
  let iconLibrary = opts.iconLibrary ?? defaultConfig.iconLibrary ?? 'lucide'
  let font = opts.font ?? defaultConfig.font ?? 'inter'
  let baseColor = opts.baseColor ?? defaultConfig.tailwind.baseColor
  // Preserve the project's existing cssVariables unless the user explicitly
  // overrode it on the command line. Since `--css-variables` defaults to
  // `true` in Commander, pulling from `opts` unconditionally would flip an
  // existing `tailwind.cssVariables: false` back to `true` on every run.
  let cssVariables = defaultConfig.tailwind.cssVariables

  if (opts.preset === undefined && !opts.defaults) {
    const baseColors = await getRegistryBaseColors()

    const options = await prompts([
      {
        type: opts.base || BASES.length < 2 ? null : 'select',
        name: 'base',
        message: `Which ${highlighter.info('component library')} would you like to use?`,
        choices: BASES.map(b => ({
          title: b.label,
          value: b.name,
          description: b.description,
        })),
        initial: 0,
      },
      {
        type: opts.iconLibrary ? null : 'select',
        name: 'iconLibrary',
        message: `Which ${highlighter.info('icon library')} would you like to use?`,
        choices: ICON_LIBRARIES.map(lib => ({
          title: lib.label,
          value: lib.name,
        })),
        initial: 0,
      },
      {
        type: opts.font ? null : 'select',
        name: 'font',
        message: `Which ${highlighter.info('font')} would you like to use?`,
        choices: FONTS.map(f => ({
          title: f.label,
          value: f.name,
        })),
        initial: 0,
      },
      {
        type: opts.baseColor ? null : 'select',
        name: 'tailwindBaseColor',
        message: `Which color would you like to use as the ${highlighter.info(
          'base color',
        )}?`,
        choices: baseColors.map(color => ({
          title: color.label,
          value: color.name,
        })),
      },
    ])

    base = options.base ?? base
    iconLibrary = options.iconLibrary ?? iconLibrary
    font = options.font ?? font
    baseColor = options.tailwindBaseColor ?? baseColor
    cssVariables = opts.cssVariables
  }

  return rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    style: composeStyleId(base, style),
    font,
    ...(defaultConfig.fontHeading
      && { fontHeading: defaultConfig.fontHeading }),
    iconLibrary,
    rtl: opts.rtl ?? defaultConfig.rtl ?? false,
    pointer: opts.pointer ?? defaultConfig.pointer ?? false,
    tailwind: {
      ...defaultConfig?.tailwind,
      baseColor,
      cssVariables,
    },
    typescript: defaultConfig.typescript,
    aliases: defaultConfig?.aliases,
  })
}
