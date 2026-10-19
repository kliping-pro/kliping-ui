import type { z } from 'zod'
import type { initOptionsSchema } from '@/src/commands/init'
import type { ProjectTemplate } from '@/src/utils/project-templates'
import fs from 'fs-extra'
import { installDependencies } from 'nypm'
import path from 'pathe'
import prompts from 'prompts'
import { x } from 'tinyexec'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'
import { PROJECT_TEMPLATES, projectFiles } from '@/src/utils/project-templates'
import { spinner } from '@/src/utils/spinner'
import { getPackageManager } from '@/src/utils/updaters/update-dependencies'

export const TEMPLATES = PROJECT_TEMPLATES

export type TemplateType = ProjectTemplate

export async function createProject(
  options: Pick<
    z.infer<typeof initOptionsSchema>,
    'cwd' | 'name' | 'force' | 'components' | 'template'
  >,
) {
  let template: TemplateType
    = options.template && TEMPLATES[options.template as TemplateType]
      ? (options.template as TemplateType)
      : 'vite'
  let projectName = options.name ?? 'my-vue-app'

  if (!options.force) {
    const { type, name } = await prompts([
      {
        type: options.template ? null : 'select',
        name: 'type',
        message: `The path ${highlighter.info(
          options.cwd,
        )} does not contain a package.json file.\n  Would you like to start a new project?`,
        choices: Object.entries(PROJECT_TEMPLATES).map(([value, title]) => ({ title, value })),
        initial: 0,
      },
      {
        type: options.name ? null : 'text',
        name: 'name',
        message: 'What is your project named?',
        initial: projectName,
        format: (value: string) => value.trim(),
        validate: (value: string) =>
          value.length > 128
            ? `Name should be less than 128 characters.`
            : true,
      },
    ])

    template = type ?? template
    projectName = name ?? projectName
  }

  // Detect once up front (from parent cwd) so we can use the same PM the user
  // invoked us with (e.g. `pnpm dlx`) when installing template deps. With
  // `withFallback`, falls through to `npm_config_user_agent` when no lockfile
  // is found in the parent dir.
  const packageManager = await getPackageManager(options.cwd, {
    withFallback: true,
  })

  const projectPath = `${options.cwd}/${projectName}`

  // Check if path is writable.
  try {
    await fs.access(options.cwd, fs.constants.W_OK)
  }
  catch {
    logger.break()
    logger.error(`The path ${highlighter.info(options.cwd)} is not writable.`)
    logger.error(
      `It is likely you do not have write permissions for this folder or the path ${highlighter.info(
        options.cwd,
      )} does not exist.`,
    )
    logger.break()
    process.exit(1)
  }

  if (fs.existsSync(path.resolve(options.cwd, projectName, 'package.json'))) {
    logger.break()
    logger.error(
      `A project with the name ${highlighter.info(projectName)} already exists.`,
    )
    logger.error(`Please choose a different name and try again.`)
    logger.break()
    process.exit(1)
  }

  const createSpinner = spinner(
    `Creating a new ${template} project. This may take a few minutes.`,
  ).start()

  try {
    // Written from the CLI itself: no download, no third-party repository.
    for (const [file, content] of Object.entries(projectFiles(template, projectName)))
      await fs.outputFile(path.join(projectPath, file), content, 'utf8')

    // Initialize git repository
    await x('git', ['init'], {
      nodeOptions: {
        cwd: projectPath,
      },
    })

    // Install dependencies
    await installDependencies({
      cwd: projectPath,
      packageManager,
      silent: true,
      // See update-dependencies.ts: the package manager on PATH, not corepack's.
      corepack: false,
    })

    createSpinner?.succeed(`Created a new ${template} project.`)
  }
  catch (error) {
    createSpinner?.fail(`Something went wrong creating a new ${template} project.`)
    // npm 10 (bundled with Node 22) crashes installing Nuxt 4 — an npm bug, the
    // same with `npm create nuxt`. npm 11 and pnpm install it fine.
    if (packageManager === 'npm' && String((error as Error)?.stack ?? error).includes('edgesOut')) {
      logger.break()
      logger.error(`npm hit a known bug ("edgesOut") installing the ${template} project.`)
      logger.error(`Use pnpm (${highlighter.info('pnpm dlx kliping@latest init')}) or update npm (${highlighter.info('npm install -g npm@latest')}), then run init again in an empty folder.`)
    }
    handleError(error)
  }

  return {
    projectPath,
    projectName,
    template,
  }
}
