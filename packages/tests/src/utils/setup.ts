import type { TestProject } from 'vitest/node'
import { spawnSync } from 'node:child_process'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { mkdir, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { CLI_PATH, REGISTRY_ROOT, REPO_ROOT, TEMP_DIR } from './paths'

declare module 'vitest' {
  export interface ProvidedContext {
    registryUrl: string
  }
}

// Serves docs/public (the registry under /r) for the whole run, the way the
// site does in production.
export default async function setup(project: TestProject) {
  if (!existsSync(CLI_PATH))
    throw new Error('packages/cli/dist is missing: run `npm run cli:build` first.')

  if (!existsSync(path.join(REGISTRY_ROOT, 'r/init.json'))) {
    const build = spawnSync('node', ['scripts/generate-registry.mjs'], { cwd: REPO_ROOT, stdio: 'inherit' })
    if (build.status !== 0)
      throw new Error('Building the registry failed.')
  }

  await mkdir(TEMP_DIR, { recursive: true })

  const server = createServer((request, response) => {
    const file = path.join(REGISTRY_ROOT, decodeURIComponent(new URL(request.url ?? '/', 'http://x').pathname))
    if (!file.startsWith(REGISTRY_ROOT) || !existsSync(file) || statSync(file).isDirectory()) {
      response.writeHead(404).end()
      return
    }
    response.writeHead(200, { 'content-type': 'application/json' })
    createReadStream(file).pipe(response)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address() as { port: number }
  project.provide('registryUrl', `http://127.0.0.1:${port}/r`)

  return async () => {
    server.close()
    if (!process.env.KEEP_TEMP)
      await rm(TEMP_DIR, { recursive: true, force: true })
  }
}
