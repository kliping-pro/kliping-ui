import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  createEmptyTestDirectory,
  createFixtureTestDirectory,
  demoPage,
  expectSuccess,
  fileExists,
  kliping,
  npmInstall,
  packageManager,
  readProjectFile,
  writeProjectFile,
} from '../utils/helpers'
import { REPO_ROOT } from '../utils/paths'

const VITE_DEMO_LEFTOVERS = [
  'src/components/HelloWorld.vue',
  'src/assets/hero.png',
  'src/assets/vite.svg',
  'src/assets/vue.svg',
]

describe('kliping init', () => {
  it('creates a Vite project in an empty folder (built-in template, no download)', async () => {
    const dir = await createEmptyTestDirectory('empty')
    const { output } = expectSuccess(await kliping(dir, ['init', '--template', 'vite', '--name', 'app', '--defaults']), 'init')
    expect(output).not.toMatch(/[✖×]/)
    const app = path.join(dir, 'app')
    expect(fileExists(app, 'components.json')).toBe(true)
    expect(fileExists(app, 'src/lib/utils.ts')).toBe(true)
    expect(await readProjectFile(app, 'vite.config.ts')).toContain('tailwindcss()')
    expect(await readProjectFile(app, 'tsconfig.app.json')).toContain('"@/*"')
    expect(await readProjectFile(app, 'src/style.css')).toContain('@import "tailwindcss"')
    expect(await readProjectFile(app, 'src/App.vue')).toContain('Your project is ready.')

    expectSuccess(await kliping(app, ['add', 'button', 'hero-01', '--yes']), 'add')
    await packageManager('npm', app, ['run', 'build'])
  })

  // pnpm, as `pnpm dlx kliping init` would: npm 10 itself crashes installing
  // Nuxt 4 ("edgesOut"), with or without Kliping.
  it('creates a Nuxt 4 project in an empty folder (pnpm)', async () => {
    const dir = await createEmptyTestDirectory('empty-nuxt', { outsideRepo: true })
    const { output } = expectSuccess(await kliping(dir, ['init', '--template', 'nuxt', '--name', 'app', '--defaults'], { npm_config_user_agent: 'pnpm/10.0.0 npm/? node/v22' }), 'init')
    expect(output).not.toMatch(/[✖×]/)
    const app = path.join(dir, 'app')
    const config = await readProjectFile(app, 'nuxt.config.ts')
    expect(config).toContain('tailwindcss()')
    expect(config).toContain('shadcn-nuxt')
    expect(await readProjectFile(app, 'app/pages/index.vue')).toContain('Your project is ready.')

    expectSuccess(await kliping(app, ['add', 'button', '--yes']), 'add')
    await packageManager('pnpm', app, ['run', 'build'])
    if (!process.env.KEEP_TEMP)
      await rm(dir, { recursive: true, force: true })
  })

  it('sets up Tailwind CSS and the @ alias in a create-vite (TypeScript) project', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    await npmInstall(app)
    const { output } = expectSuccess(await kliping(app, ['init', '--defaults']), 'init')

    expect(output).toContain('Setting up Tailwind CSS and the @ alias')
    // What init sets up itself is not a failure: no red cross.
    expect(output).not.toMatch(/[✖×]/)

    const config = await readProjectFile(app, 'vite.config.ts')
    expect(config).toContain(`import tailwindcss from '@tailwindcss/vite'`)
    expect(config).toContain('plugins: [vue(), tailwindcss()],')
    expect(config).toContain(`'@': fileURLToPath(new URL('./src', import.meta.url)),`)
    expect(await readProjectFile(app, 'tsconfig.json')).toContain('"@/*"')
    expect(await readProjectFile(app, 'tsconfig.app.json')).toContain('"@/*"')

    const css = await readProjectFile(app, 'src/style.css')
    expect(css).toContain('@import "tailwindcss"')
    expect(css).not.toContain('.counter')

    // The untouched create-vite demo becomes the Kliping welcome page.
    expect(await readProjectFile(app, 'src/App.vue')).toContain('Your project is ready.')
    for (const file of VITE_DEMO_LEFTOVERS)
      expect(fileExists(app, file), file).toBe(false)

    await packageManager('npm', app, ['run', 'build'])
  })

  it('sets up a project that already has tailwindcss installed but not wired', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    await packageManager('npm', app, ['install', '--no-audit', '--no-fund', 'tailwindcss', '@tailwindcss/vite'])
    expectSuccess(await kliping(app, ['init', '--defaults']), 'init')
    expect(await readProjectFile(app, 'vite.config.ts')).toContain('tailwindcss()')
    await packageManager('npm', app, ['run', 'build'])
  })

  it('never touches an App.vue the user wrote', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    const own = await readFile(path.join(REPO_ROOT, 'src/App.vue'), 'utf8')
    await writeProjectFile(app, 'src/App.vue', own)
    await npmInstall(app)
    const { output } = expectSuccess(await kliping(app, ['init', '--defaults']), 'init')
    expect(output).not.toContain('welcome page')
    expect(await readProjectFile(app, 'src/App.vue')).toBe(own)
    expect(fileExists(app, 'src/components/HelloWorld.vue')).toBe(true)
  })

  it('inits a project that is already set up without changing it', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    await npmInstall(app)
    expectSuccess(await kliping(app, ['init', '--defaults']), 'first init')
    const config = await readProjectFile(app, 'vite.config.ts')
    await rm(path.join(app, 'components.json'))
    const { output } = expectSuccess(await kliping(app, ['init', '--defaults']), 'second init')
    expect(output).not.toContain('Setting up')
    expect(await readProjectFile(app, 'vite.config.ts')).toBe(config)
  })

  it('stops on an existing components.json and points to add', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    await npmInstall(app)
    expectSuccess(await kliping(app, ['init', '--defaults']), 'init')
    const again = await kliping(app, ['init'])
    expect(again.exitCode).not.toBe(0)
    expect(again.output).toContain('already set up')
    expect(again.output).toContain('kliping@latest add')
  })

  it('sets up a create-vite JavaScript project (alias in jsconfig.json)', async () => {
    const app = await createFixtureTestDirectory('vite-app-js')
    await npmInstall(app)
    expectSuccess(await kliping(app, ['init', '--defaults']), 'init')
    expect(await readProjectFile(app, 'jsconfig.json')).toContain('"@/*"')
    expect(await readProjectFile(app, 'vite.config.js')).toContain('tailwindcss()')
    expect(await readProjectFile(app, 'components.json')).toContain('"typescript": false')
    expect(await readProjectFile(app, 'src/App.vue')).toContain('Your project is ready.')

    expectSuccess(await kliping(app, ['add', 'button', 'hero-01', 'use-boolean', '--yes']), 'add')
    expect(fileExists(app, 'src/components/ui/button/index.js')).toBe(true)
    expect(fileExists(app, 'src/composables/use-boolean.js')).toBe(true)
    await writeProjectFile(app, 'src/App.vue', demoPage('js'))
    await packageManager('npm', app, ['run', 'build'])
  })

  it('sets up an existing Nuxt 4 project (pnpm)', async () => {
    const app = await createFixtureTestDirectory('nuxt-app')
    await packageManager('pnpm', app, ['install'])
    expectSuccess(await kliping(app, ['init', '--defaults']), 'init')
    const config = await readProjectFile(app, 'nuxt.config.ts')
    expect(config).toContain('tailwindcss()')
    expect(config).toContain(`'~/assets/css/tailwind.css'`)
    expect(config).toContain(`'shadcn-nuxt'`)
    expect(fileExists(app, 'app/assets/css/tailwind.css')).toBe(true)
    expect(fileExists(app, 'app/lib/utils.ts')).toBe(true)

    expectSuccess(await kliping(app, ['add', 'button', 'hero-01', 'use-boolean', '--yes']), 'add')
    await writeProjectFile(app, 'app/pages/index.vue', demoPage('ts'))
    await packageManager('pnpm', app, ['run', 'build'])
  })

  it('leaves a Tailwind CSS v3 project alone', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    await packageManager('npm', app, ['install', '--no-audit', '--no-fund', 'tailwindcss@3'])
    const config = await readProjectFile(app, 'vite.config.ts')
    const result = await kliping(app, ['init', '--defaults'])
    expect(result.exitCode).not.toBe(0)
    expect(result.output).toContain('No Tailwind CSS configuration')
    expect(await readProjectFile(app, 'vite.config.ts')).toBe(config)
  })

  it('stops in a folder without a supported framework', async () => {
    const dir = await createFixtureTestDirectory('no-framework')
    const result = await kliping(dir, ['init', '--defaults'])
    expect(result.exitCode).not.toBe(0)
    expect(result.output).toContain('could not detect a supported framework')
    expect(fileExists(dir, 'components.json')).toBe(false)
  })
})
