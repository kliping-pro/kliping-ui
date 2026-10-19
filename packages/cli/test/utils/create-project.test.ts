import type { MockInstance } from 'vitest'
import fs from 'fs-extra'
import { detectPackageManager, installDependencies } from 'nypm'
import prompts from 'prompts'
import { x } from 'tinyexec'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { createProject } from '../../src/utils/create-project'
import { spinner } from '../../src/utils/spinner'

// Mock dependencies
vi.mock('fs-extra')
vi.mock('tinyexec')
vi.mock('prompts')
vi.mock('nypm', () => ({
  detectPackageManager: vi.fn(),
  installDependencies: vi.fn(),
}))
vi.mock('@/src/utils/spinner')
vi.mock('@/src/utils/logger', () => ({
  logger: {
    break: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}))

describe('createProject', () => {
  let mockExit: MockInstance

  beforeEach(() => {
    vi.clearAllMocks()

    // Stable PM detection across tests so we don't fall back to the test
    // runner's npm_config_user_agent (which would be `pnpm/...`).
    vi.mocked(detectPackageManager).mockResolvedValue({
      name: 'npm',
      command: 'npm',
    })
    vi.mocked(installDependencies).mockResolvedValue({} as any)

    // Reset all fs mocks
    vi.mocked(fs.access).mockResolvedValue(undefined)
    vi.mocked(fs.existsSync).mockReturnValue(false)
    vi.mocked(fs.outputFile).mockResolvedValue(undefined as any)

    // Mock x (tinyexec) to resolve immediately without actual execution
    vi.mocked(x).mockResolvedValue({ stdout: '', stderr: '' } as any)

    // Reset prompts mock
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    // Mock spinner
    const mockSpinner = {
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
      fail: vi.fn().mockReturnThis(),
      stop: vi.fn().mockReturnThis(),
    }
    vi.mocked(spinner).mockReturnValue(mockSpinner as any)
  })

  afterEach(() => {
    vi.resetAllMocks()
    mockExit?.mockRestore()
  })

  const written = () => new Map(vi.mocked(fs.outputFile).mock.calls.map(([file, content]) => [String(file), String(content)]))

  it('writes a Vite project from the built-in template (no download)', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'vite', name: 'my-vite-app' })

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result).toEqual({
      projectPath: '/test/my-vite-app',
      projectName: 'my-vite-app',
      template: 'vite',
    })
    const files = written()
    expect([...files.keys()]).toEqual(expect.arrayContaining([
      '/test/my-vite-app/package.json',
      '/test/my-vite-app/vite.config.ts',
      '/test/my-vite-app/tsconfig.app.json',
      '/test/my-vite-app/src/main.ts',
      '/test/my-vite-app/src/App.vue',
      '/test/my-vite-app/.gitignore',
    ]))
    expect(JSON.parse(files.get('/test/my-vite-app/package.json')!).name).toBe('my-vite-app')
    expect(files.get('/test/my-vite-app/src/App.vue')).toContain('Your project is ready.')
    expect(files.get('/test/my-vite-app/vite.config.ts')).not.toContain('tailwind')
  })

  it('writes a Nuxt 4 project from the built-in template', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-nuxt-app' })

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result.template).toBe('nuxt')
    const files = written()
    expect(JSON.parse(files.get('/test/my-nuxt-app/package.json')!).dependencies.nuxt).toMatch(/^\^4/)
    expect(files.get('/test/my-nuxt-app/app/pages/index.vue')).toContain('app/pages/index.vue')
    expect(files.has('/test/my-nuxt-app/nuxt.config.ts')).toBe(true)
  })

  it('defaults to Vite with --template unset and no prompt answer', async () => {
    vi.mocked(prompts).mockResolvedValue({})

    const result = await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(result).toEqual({ projectPath: '/test/my-vue-app', projectName: 'my-vue-app', template: 'vite' })
  })

  it('uses --template and --name without prompting', async () => {
    const result = await createProject({
      cwd: '/test',
      force: true,
      name: 'shop',
      components: undefined,
      template: 'nuxt',
    })

    expect(prompts).not.toHaveBeenCalled()
    expect(result).toEqual({ projectPath: '/test/shop', projectName: 'shop', template: 'nuxt' })
  })

  it('should run git init after download', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(x).toHaveBeenCalledWith(
      'git',
      ['init'],
      { nodeOptions: { cwd: '/test/my-app' } },
    )
  })

  it('should install dependencies after download', async () => {
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(installDependencies).toHaveBeenCalledWith({
      cwd: '/test/my-app',
      packageManager: 'npm',
      silent: true,
      corepack: false,
    })
  })

  it('should throw error if project path already exists', async () => {
    vi.mocked(fs.existsSync).mockImplementation((path: any) => {
      return path.toString().includes('existing-app/package.json')
    })
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'existing-app' })

    mockExit = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it('should throw error if path is not writable', async () => {
    vi.mocked(fs.access).mockRejectedValue(new Error('Permission denied'))
    vi.mocked(prompts).mockResolvedValue({ type: 'nuxt', name: 'my-app' })

    mockExit = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)

    await createProject({
      cwd: '/test',
      force: false,
      name: undefined,
      components: undefined,
      template: undefined,
    })

    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
