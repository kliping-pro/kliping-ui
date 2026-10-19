import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { cp, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { inject } from 'vitest'
import { CLI_PATH, FIXTURES_DIR, TEMP_DIR } from './paths'

export interface CommandResult {
  exitCode: number
  output: string
}

/** Copies `fixtures/<name>` to a fresh temp directory and returns its path. */
export async function createFixtureTestDirectory(name: string) {
  const dir = path.join(TEMP_DIR, `${name}-${randomUUID().slice(0, 8)}`)
  await cp(path.join(FIXTURES_DIR, name), dir, { recursive: true })
  return dir
}

/** An empty temp directory. */
/**
 * An empty folder. `outsideRepo`: in the system temp dir, so the package
 * manager is not picked from this repo's package-lock.json, as for a user.
 */
export async function createEmptyTestDirectory(name: string, { outsideRepo = false } = {}) {
  const dir = outsideRepo
    ? await mkdtemp(path.join(tmpdir(), `kliping-${name}-`))
    : path.join(TEMP_DIR, `${name}-${randomUUID().slice(0, 8)}`)
  await mkdir(dir, { recursive: true })
  return dir
}

// Vitest sets NODE_ENV=test and VITEST*; consola (std-env) then drops to
// level 1 and swallows every `logger.log`. The CLI must run as it does for
// the user, so the test runner's variables are not passed on.
function userEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env }
  for (const name of Object.keys(env)) {
    if (name === 'NODE_ENV' || name === 'TEST' || name.startsWith('VITEST'))
      delete env[name]
  }
  return env
}

function run(command: string, args: string[], cwd: string, env: Record<string, string> = {}): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...userEnv(),
        CI: 'true',
        FORCE_COLOR: '0',
        NO_PROXY: [process.env.NO_PROXY, '127.0.0.1', 'localhost'].filter(Boolean).join(','),
        no_proxy: [process.env.no_proxy, '127.0.0.1', 'localhost'].filter(Boolean).join(','),
        ...env,
      },
      // No stdin, like CI: the CLI must not wait for an answer.
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
    })
    let output = ''
    child.stdout.on('data', (chunk) => { output += chunk })
    child.stderr.on('data', (chunk) => { output += chunk })
    child.on('error', reject)
    child.on('close', code => resolve({ exitCode: code ?? 1, output }))
  })
}

/** Runs the built CLI against the local registry. */
export function kliping(cwd: string, args: string[], env: Record<string, string> = {}) {
  return run('node', [CLI_PATH, ...args], cwd, { REGISTRY_URL: inject('registryUrl'), ...env })
}

/** Runs a package manager command and fails with its output when it fails. */
export async function packageManager(name: 'npm' | 'pnpm', cwd: string, args: string[]) {
  const result = await run(name, args, cwd)
  if (result.exitCode !== 0)
    throw new Error(`${name} ${args.join(' ')} failed in ${cwd}:\n${result.output.slice(-4000)}`)
  return result
}

export const npmInstall = (cwd: string) =>
  packageManager('npm', cwd, ['install', '--no-audit', '--no-fund'])

export function fileExists(cwd: string, file: string) {
  return existsSync(path.join(cwd, file))
}

export function readProjectFile(cwd: string, file: string) {
  return readFile(path.join(cwd, file), 'utf8')
}

export function writeProjectFile(cwd: string, file: string, content: string) {
  return mkdir(path.dirname(path.join(cwd, file)), { recursive: true })
    .then(() => writeFile(path.join(cwd, file), content))
}

/** Fails the test with the command output when the command failed. */
export function expectSuccess(result: CommandResult, what: string) {
  if (result.exitCode !== 0)
    throw new Error(`${what} exited with ${result.exitCode}:\n${result.output.slice(-4000)}`)
  return result
}

/** A page that renders a component, a block and a hook installed by `add`. */
export function demoPage(lang: 'ts' | 'js') {
  return `<script setup${lang === 'ts' ? ' lang="ts"' : ''}>
import Hero01 from '@/components/blocks/hero-01/hero-01.vue'
import { Button } from '@/components/ui/button'
import { useBoolean } from '@/composables/use-boolean'

const { value: open, toggle } = useBoolean(false)
</script>

<template>
  <Button @click="toggle()">{{ open ? 'On' : 'Off' }}</Button>
  <Hero01 />
</template>
`
}
