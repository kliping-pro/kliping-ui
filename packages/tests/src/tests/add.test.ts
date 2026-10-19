import { appendFile } from 'node:fs/promises'
import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import {
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

describe('kliping add / diff', () => {
  let app: string

  beforeAll(async () => {
    app = await createFixtureTestDirectory('vite-app')
    await npmInstall(app)
    expectSuccess(await kliping(app, ['init', '--defaults']), 'init')
  })

  it('adds a component, a block and a hook, with their dependencies', async () => {
    expectSuccess(await kliping(app, ['add', 'button', 'hero-01', 'use-boolean', '--yes']), 'add')
    for (const file of [
      'src/components/ui/button/button.vue',
      'src/components/ui/button/index.ts',
      'src/components/ui/badge/index.ts',
      'src/components/blocks/hero-01/hero-01.vue',
      'src/composables/use-boolean.ts',
      'src/composables/use-toggle.ts',
    ])
      expect(fileExists(app, file), file).toBe(true)

    await writeProjectFile(app, 'src/App.vue', demoPage('ts'))
    await packageManager('npm', app, ['run', 'build'])
  })

  it('writes a page of the added blocks in order (--page, Builder stage B)', async () => {
    const { output } = expectSuccess(await kliping(app, ['add', 'navbar-01', 'hero-03', 'footer-01', 'use-boolean', '--yes', '--page', 'src/LandingPage.vue']), 'add --page')
    expect(output).toContain('Wrote src/LandingPage.vue (3 items)')
    expect(output).toContain('Not on the page')
    expect(await readProjectFile(app, 'src/LandingPage.vue')).toBe(`<script setup lang="ts">
import Navbar01 from '@/components/blocks/navbar-01/navbar-01.vue'
import Hero03 from '@/components/blocks/hero-03/hero-03.vue'
import Footer01 from '@/components/blocks/footer-01/footer-01.vue'
</script>

<template>
  <Navbar01 />
  <Hero03 />
  <Footer01 />
</template>
`)
    const again = expectSuccess(await kliping(app, ['add', 'navbar-01', '--yes', '--page', 'src/LandingPage.vue']), 'add --page again')
    expect(again.output).toContain('already exists')

    await writeProjectFile(app, 'src/App.vue', `<script setup lang="ts">\nimport LandingPage from './LandingPage.vue'\n</script>\n\n<template>\n  <LandingPage />\n</template>\n`)
    await packageManager('npm', app, ['run', 'build'])
  })

  it('keeps a block that appears twice on the page (Builder duplicate)', async () => {
    expectSuccess(await kliping(app, ['add', 'hero-03', 'stats-01', 'hero-03', '--yes', '--page', 'src/RepeatPage.vue']), 'add --page with a repeat')
    const page = await readProjectFile(app, 'src/RepeatPage.vue')
    expect(page.match(/import Hero03 /g)).toHaveLength(1)
    expect(page).toContain('  <Hero03 />\n  <Stats01 />\n  <Hero03 />\n')
  })

  it('accepts @kliping/ names', async () => {
    expectSuccess(await kliping(app, ['add', '@kliping/accordion', '--yes']), 'add')
    expect(fileExists(app, 'src/components/ui/accordion/index.ts')).toBe(true)
  })

  it('diff reports nothing right after add, and the files the user changed', async () => {
    const clean = expectSuccess(await kliping(app, ['diff', 'button']), 'diff button')
    expect(clean.output).toContain('No updates found for button.')

    await appendFile(path.join(app, 'src/components/ui/button/index.ts'), '// changed\n')
    const changed = expectSuccess(await kliping(app, ['diff']), 'diff')
    expect(changed.output).toContain('- button')
    expect(changed.output).toContain('src/components/ui/button/index.ts')
  })
})
