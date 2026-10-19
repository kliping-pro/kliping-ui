import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export const PACKAGE_ROOT = path.resolve(here, '../..')
export const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..')
export const FIXTURES_DIR = path.join(PACKAGE_ROOT, 'fixtures')
export const TEMP_DIR = path.join(PACKAGE_ROOT, 'temp')
export const CLI_PATH = path.join(REPO_ROOT, 'packages/cli/dist/index.js')
export const REGISTRY_ROOT = path.join(REPO_ROOT, 'docs/public')
