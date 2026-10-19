import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  createEmptyTestDirectory,
  expectSuccess,
  fileExists,
  kliping,
  packageManager,
  readProjectFile,
} from '../utils/helpers'

describe('kliping create', () => {
  it('creates a Vite project whose first page renders the blocks of a Builder link', async () => {
    const dir = await createEmptyTestDirectory('create')
    const link = 'https://kliping.pro/builder?n=Landing+page&b=navbar-01,hero-01,footer-01'
    const { output } = expectSuccess(await kliping(dir, ['create', '--from', link]), 'create')
    expect(output).not.toMatch(/[✖×]/)
    expect(output).toContain('cd landing-page')

    const app = path.join(dir, 'landing-page')
    expect(fileExists(app, 'components.json')).toBe(true)
    expect(fileExists(app, 'src/components/blocks/hero-01/hero-01.vue')).toBe(true)
    const page = await readProjectFile(app, 'src/App.vue')
    expect(page).not.toContain('Your project is ready.')
    expect(page.indexOf('<Navbar01 />')).toBeLessThan(page.indexOf('<Hero01 />'))
    expect(page.indexOf('<Hero01 />')).toBeLessThan(page.indexOf('<Footer01 />'))

    await packageManager('npm', app, ['run', 'build'])
  })

  it('takes the name and blocks as arguments', async () => {
    const dir = await createEmptyTestDirectory('create-args')
    expectSuccess(await kliping(dir, ['create', 'shop', 'hero-02']), 'create')
    expect(await readProjectFile(path.join(dir, 'shop'), 'src/App.vue')).toContain('<Hero02 />')
  })
})
