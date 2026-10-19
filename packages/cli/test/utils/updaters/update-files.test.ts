import type { Config } from '../../../src/utils/get-config'
import { describe, expect, it } from 'vitest'

import { RegistryValidationError } from '../../../src/registry/errors'
import {
  findCommonRoot,
  resolveFilePath,
  resolveTargetDir,
} from '../../../src/utils/updaters/update-files'

// TODO: `isSrcDir` is not being use yet
describe.todo('resolveTargetDir', () => {
  it('should handle a home target without a src directory', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: false,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      '~/.env',
    )
    expect(targetDir).toBe('/foo/bar/.env')
  })

  it('should handle a home target even with a src directory', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: true,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      '~/.env',
    )
    expect(targetDir).toBe('/foo/bar/.env')
  })

  it('should handle a simple target', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: false,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      './components/ui/button.ts',
    )
    expect(targetDir).toBe('/foo/bar/components/ui/button.ts')
  })

  it('should handle a simple target with src directory', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: true,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      './components/ui/button.ts',
    )
    expect(targetDir).toBe('/foo/bar/components/ui/button.ts')
  })
})

describe('resolveFilePath containment', () => {
  const config = {
    typescript: true,
    aliases: {
      components: '@/components',
      ui: '@/components/ui',
      lib: '@/lib',
      composables: '@/composables',
      utils: '@/lib/utils',
    },
    resolvedPaths: {
      cwd: '/project',
      ui: '/project/components/ui',
      lib: '/project/lib',
      components: '/project/components',
      composables: '/project/composables',
    },
  } as unknown as Config

  it('resolves an ordinary target inside the project', () => {
    expect(
      resolveFilePath(
        { path: 'ui/Button.vue', type: 'registry:file', target: 'components/ui/Button.vue' },
        config,
        { commonRoot: '' },
      ),
    ).toBe('/project/components/ui/Button.vue')
  })

  it('resolves a ~/ target against the project root', () => {
    expect(
      resolveFilePath(
        { path: 'env', type: 'registry:file', target: '~/.env.local' },
        config,
        { commonRoot: '' },
      ),
    ).toBe('/project/.env.local')
  })

  it.each([
    '../../../.bashrc',
    '../outside.txt',
    '~/../../.ssh/authorized_keys',
  ])('rejects a target that escapes the project: %s', (target) => {
    expect(() =>
      resolveFilePath(
        { path: 'ui/Button.vue', type: 'registry:file', target },
        config,
        { commonRoot: '' },
      ),
    ).toThrow(RegistryValidationError)
  })

  it('rejects a traversing path when the item declares no target', () => {
    expect(() =>
      resolveFilePath(
        { path: '../../../etc/passwd', type: 'registry:ui' },
        config,
        { commonRoot: '' },
      ),
    ).toThrow(RegistryValidationError)
  })

  it('allows a leading-dots file name that does not actually escape', () => {
    expect(
      resolveFilePath(
        { path: 'x', type: 'registry:file', target: '..config.json' },
        config,
        { commonRoot: '' },
      ),
    ).toBe('/project/..config.json')
  })

  it('does not constrain an explicit --path given by the user', () => {
    expect(
      resolveFilePath(
        { path: 'ui/Button.vue', type: 'registry:file' },
        config,
        { commonRoot: '', path: '/somewhere/else', fileIndex: 0 },
      ),
    ).toBe('/somewhere/else/Button.vue')
  })
})

describe('resolveFilePath with files of several items', () => {
  const config = {
    typescript: true,
    aliases: {
      components: '@/components',
      ui: '@/components/ui',
      lib: '@/lib',
      composables: '@/composables',
      utils: '@/lib/utils',
    },
    resolvedPaths: {
      cwd: '/project',
      ui: '/project/src/components/ui',
      lib: '/project/src/lib',
      components: '/project/src/components',
      composables: '/project/src/composables',
    },
  } as unknown as Config

  // `kliping add button use-boolean` on a project without components.json:
  // init's lib/utils.ts is installed with them, and is the only lib file.
  const files = [
    { path: 'registry/kliping/lib/utils.ts', type: 'registry:lib' },
    { path: 'registry/kliping/ui/button/button.vue', type: 'registry:ui' },
    { path: 'registry/kliping/ui/button/index.ts', type: 'registry:ui' },
    { path: 'registry/kliping/composables/use-boolean.ts', type: 'registry:hook' },
    { path: 'registry/kliping/components/blocks/hero-01/hero-01.vue', type: 'registry:component' },
  ] as const

  const resolve = (file: (typeof files)[number]) =>
    resolveFilePath({ ...file }, config, {
      commonRoot: findCommonRoot(files.map(f => f.path), file.path),
    })

  it('does not climb above registry/<style>/<kind>', () => {
    expect(findCommonRoot(files.map(f => f.path), files[0].path)).toBe(
      '/registry/kliping/lib',
    )
  })

  it.each([
    [files[0], '/project/src/lib/utils.ts'],
    [files[1], '/project/src/components/ui/button/button.vue'],
    [files[2], '/project/src/components/ui/button/index.ts'],
    [files[3], '/project/src/composables/use-boolean.ts'],
    [files[4], '/project/src/components/blocks/hero-01/hero-01.vue'],
  ])('places %o at %s', (file, expected) => {
    expect(resolve(file)).toBe(expected)
  })
})
