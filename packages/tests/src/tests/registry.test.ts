import { describe, expect, it } from 'vitest'
import {
  createFixtureTestDirectory,
  expectSuccess,
  kliping,
  npmInstall,
  packageManager,
  readProjectFile,
  writeProjectFile,
} from '../utils/helpers'

// Every item of the registry, installed the way a user installs it, must
// type-check under the Vite template's strict settings (vue-tsc -b with
// noUnusedLocals/Parameters) and bundle. One project, all items: a broken
// import, a missing dependency or a type error in any item fails here.
describe('registry', () => {
  it('installs every item into one Vite project, which then builds', async () => {
    const app = await createFixtureTestDirectory('vite-app')
    await npmInstall(app)
    expectSuccess(await kliping(app, ['init', '--defaults']), 'init')

    const { output } = expectSuccess(await kliping(app, ['add', '--all', '--yes', '--overwrite']), 'add --all')
    expect(output).not.toMatch(/Circular dependency/)

    // Bundle every installed file, not only what App.vue imports.
    await writeProjectFile(app, 'src/all-items.ts', `export const items = import.meta.glob([
  './components/**/*.vue',
  './composables/*.ts',
  './lib/*.ts',
])
`)
    const main = await readProjectFile(app, 'src/main.ts')
    await writeProjectFile(app, 'src/main.ts', `import './all-items'\n${main}`)

    await packageManager('npm', app, ['run', 'build'])
  })
})
