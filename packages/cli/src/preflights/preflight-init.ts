import type { z } from 'zod'
import type { initOptionsSchema } from '@/src/commands/init'
import fs from 'fs-extra'
import path from 'pathe'
import prompts from 'prompts'
import * as ERRORS from '@/src/utils/errors'
import { getProjectInfo } from '@/src/utils/get-project-info'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { findConfigFile, setupProject } from '@/src/utils/setup-project'
import { spinner } from '@/src/utils/spinner'

export async function preFlightInit(
  options: z.infer<typeof initOptionsSchema>,
  { autoSetup = true }: { autoSetup?: boolean } = {},
) {
  const errors: Record<string, boolean> = {}

  // Ensure target directory exists.
  // Check for empty project. We assume if no package.json exists, the project is empty.
  if (
    !fs.existsSync(options.cwd)
    || !fs.existsSync(path.resolve(options.cwd, 'package.json'))
  ) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      projectInfo: null,
    }
  }

  const projectSpinner = spinner(`Preflight checks.`, {
    silent: options.silent,
  }).start()

  if (
    fs.existsSync(path.resolve(options.cwd, 'components.json'))
    && !options.force
  ) {
    projectSpinner?.fail()
    logger.break()
    logger.error(
      `A ${highlighter.info(
        'components.json',
      )} file already exists at ${highlighter.info(
        options.cwd,
      )}.\nTo start over, remove the ${highlighter.info(
        'components.json',
      )} file and run ${highlighter.info('init')} again.`,
    )
    logger.break()
    process.exit(1)
  }

  projectSpinner?.succeed()

  const frameworkSpinner = spinner(`Verifying framework.`, {
    silent: options.silent,
  }).start()
  const projectInfo = await getProjectInfo(options.cwd)
  if (!projectInfo || projectInfo?.framework.name === 'manual') {
    errors[ERRORS.UNSUPPORTED_FRAMEWORK] = true
    frameworkSpinner?.fail()
    logger.break()
    if (projectInfo?.framework.links.installation) {
      logger.error(
        `We could not detect a supported framework at ${highlighter.info(
          options.cwd,
        )}.\n`
        + `Visit ${highlighter.info(
          projectInfo?.framework.links.installation,
        )} to manually configure your project.\nOnce configured, you can use the cli to add components.`,
      )
    }
    logger.break()
    process.exit(1)
  }
  frameworkSpinner?.succeed(
    `Verifying framework. Found ${highlighter.info(
      projectInfo.framework.label,
    )}.`,
  )

  const tailwindMissing
    = (projectInfo.tailwindVersion === 'v3'
      && (!projectInfo?.tailwindConfigFile || !projectInfo?.tailwindCssFile))
    || (projectInfo.tailwindVersion === 'v4' && !projectInfo?.tailwindCssFile)
    || !projectInfo.tailwindVersion
  const aliasMissing = !projectInfo?.aliasPrefix
  if (tailwindMissing)
    errors[ERRORS.TAILWIND_NOT_CONFIGURED] = true
  if (aliasMissing)
    errors[ERRORS.IMPORT_ALIAS_MISSING] = true

  // A Vite (TypeScript or JavaScript) or Nuxt project missing only
  // Tailwind v4 and/or the `@` alias is set up here instead of sending the
  // user to the docs. Tailwind v3 projects are left alone. Decided before the
  // checks are shown: what init will set up is not a failure, so it gets a
  // neutral mark instead of a red cross.
  const setupFramework = projectInfo.framework.name === 'vite'
    ? 'vite'
    : projectInfo.framework.name === 'nuxt3' || projectInfo.framework.name === 'nuxt4'
      ? 'nuxt'
      : null
  const missingTailwind = tailwindMissing && projectInfo.tailwindVersion !== 'v3'
  const missingAlias = aliasMissing
  const canSetup = autoSetup
    && (missingTailwind || missingAlias)
    && (missingTailwind || !tailwindMissing)
    && !!setupFramework
    && !!findConfigFile(options.cwd, setupFramework)

  const tailwindSpinner = spinner(
    projectInfo.tailwindVersion === 'v4'
      ? `Validating Tailwind CSS config. Found ${highlighter.info('v4')}.`
      : 'Validating Tailwind CSS.',
    { silent: options.silent },
  ).start()
  if (!tailwindMissing)
    tailwindSpinner?.succeed()
  else if (canSetup)
    tailwindSpinner?.info('Tailwind CSS v4 is not set up yet — init will set it up.')
  else
    tailwindSpinner?.fail()

  const tsConfigSpinner = spinner(`Validating import alias.`, {
    silent: options.silent,
  }).start()
  if (!aliasMissing)
    tsConfigSpinner?.succeed()
  else if (canSetup)
    tsConfigSpinner?.info('The @ import alias is not set up yet — init will set it up.')
  else
    tsConfigSpinner?.fail()

  if (canSetup && setupFramework) {
    const what = [missingTailwind && 'Tailwind CSS v4', missingAlias && 'the @ import alias']
      .filter(Boolean)
      .join(' and ')
    let proceed = options.yes
    if (!proceed) {
      logger.break()
      ;({ proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: `Set up ${highlighter.info(what)} in this ${projectInfo.framework.label} project?`,
        initial: true,
      }))
    }
    if (proceed) {
      const { manual } = await setupProject(options.cwd, {
        framework: setupFramework,
        typescript: projectInfo.typescript,
        tailwind: missingTailwind,
        alias: missingAlias,
        silent: options.silent,
      })
      if (manual.length) {
        logger.break()
        logger.warn('Finish these steps by hand, then run init again:')
        for (const step of manual)
          logger.warn(`  - ${step}`)
      }
      // Check again, quietly: the setup step already reported what it did.
      return preFlightInit({ ...options, silent: true }, { autoSetup: false })
    }
  }

  if (Object.keys(errors).length > 0) {
    if (errors[ERRORS.TAILWIND_NOT_CONFIGURED]) {
      logger.break()
      logger.error(
        `No Tailwind CSS configuration found at ${highlighter.info(
          options.cwd,
        )}.`,
      )
      logger.error(
        `It is likely you do not have Tailwind CSS installed or have an invalid configuration.`,
      )
      logger.error(`Install Tailwind CSS then try again.`)
      if (projectInfo?.framework.links.tailwind) {
        logger.error(
          `Visit ${highlighter.info(
            projectInfo?.framework.links.tailwind,
          )} to get started.`,
        )
      }
    }

    if (errors[ERRORS.IMPORT_ALIAS_MISSING]) {
      logger.break()
      logger.error(`No import alias found in your tsconfig.json file.`)
      if (projectInfo?.framework.links.installation) {
        logger.error(
          `Visit ${highlighter.info(
            projectInfo?.framework.links.installation,
          )} to learn how to set an import alias.`,
        )
      }
    }

    logger.break()
    process.exit(1)
  }

  return {
    errors,
    projectInfo,
  }
}
