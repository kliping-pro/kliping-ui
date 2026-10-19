import { resolve } from 'pathe'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globalSetup: ['./test/global-setup.ts'],
    alias: [{ find: '@', replacement: resolve(import.meta.dirname, '.') }],
  },
})
