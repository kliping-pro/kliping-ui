import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globalSetup: ['./src/utils/setup.ts'],
    include: ['src/tests/**/*.test.ts'],
    // Each test installs packages and builds a project; run them one at a
    // time so npm/pnpm and the build do not compete for CPU and disk.
    fileParallelism: false,
    testTimeout: 15 * 60_000,
    hookTimeout: 5 * 60_000,
  },
})
