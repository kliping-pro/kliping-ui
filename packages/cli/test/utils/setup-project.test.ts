import { IndentationText, Project, QuoteKind } from 'ts-morph'
import { describe, expect, it } from 'vitest'
import { editNuxtConfig, editViteConfig, isViteStarterApp, isViteStarterCss } from '../../src/utils/setup-project'

function edit(input: string, { tailwind = true, alias = true } = {}) {
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
      indentationText: IndentationText.TwoSpaces,
      useTrailingCommas: true,
    },
  })
  const sourceFile = project.createSourceFile('vite.config.ts', input)
  if (editViteConfig(sourceFile, { tailwind, alias }) === null)
    return null
  return sourceFile.getFullText()
}

// `npm create vite@latest -- --template vue-ts`
const VITE_TEMPLATE = `import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
`

describe('setupViteProject: vite.config edits', () => {
  it('adds Tailwind and the @ alias to the Vite template, in its own style', () => {
    expect(edit(VITE_TEMPLATE)).toBe(`import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
`)
  })

  it('keeps double quotes and semicolons when the file uses them', () => {
    const output = edit(`import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
});
`)
    expect(output).toContain(`import tailwindcss from "@tailwindcss/vite";`)
    expect(output).toContain(`import { fileURLToPath, URL } from "node:url";`)
  })

  it('adds @ to an existing resolve.alias and leaves other aliases', () => {
    const output = edit(`import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': '/src',
    },
  },
})
`, { tailwind: false })
    expect(output).toContain(`'~': '/src',`)
    expect(output).toContain(`'@': fileURLToPath(new URL('./src', import.meta.url)),`)
  })

  it('does nothing when Tailwind and @ are already there', () => {
    const input = `import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
`
    expect(edit(input)).toBe(input)
  })

  it('leaves the function form alone', () => {
    expect(edit(`import { defineConfig } from 'vite'

export default defineConfig(() => ({ plugins: [] }))
`)).toBeNull()
  })
})

describe('isViteStarterCss', () => {
  it('recognizes the create-vite demo stylesheet', () => {
    expect(isViteStarterCss(`:root {\n  --text: #6b6375;\n  --text-h: #08060d;\n}\n.counter {\n  font-size: 16px;\n}\n#app {\n  max-width: 1126px;\n}\n`)).toBe(true)
  })

  it('leaves a stylesheet the user wrote alone', () => {
    expect(isViteStarterCss(`body {\n  margin: 0;\n}\n#app {\n  min-height: 100vh;\n}\n`)).toBe(false)
  })
})

describe('setupProject: nuxt.config edits', () => {
  function editNuxt(input: string) {
    const project = new Project({
      useInMemoryFileSystem: true,
      manipulationSettings: {
        quoteKind: QuoteKind.Single,
        indentationText: IndentationText.TwoSpaces,
        useTrailingCommas: true,
      },
    })
    const sourceFile = project.createSourceFile('nuxt.config.ts', input)
    editNuxtConfig(sourceFile, { tailwind: true, cssPath: '~/assets/css/tailwind.css' })
    return sourceFile.getFullText()
  }

  it('adds the Tailwind vite plugin, the css entry and shadcn-nuxt to the Nuxt starter', () => {
    expect(editNuxt(`// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
`)).toBe(`import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/tailwind.css'],
  modules: ['shadcn-nuxt'],
})
`)
  })

  it('extends existing vite, css and modules entries', () => {
    const output = editNuxt(`import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
`)
    expect(output).toContain(`modules: ['@nuxt/eslint', 'shadcn-nuxt'],`)
    expect(output).toContain(`css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],`)
    expect(output.match(/tailwindcss\(\)/g)).toHaveLength(1)
  })
})

describe('isViteStarterApp', () => {
  it('recognizes the create-vite App.vue (TypeScript and JavaScript)', () => {
    expect(isViteStarterApp(`<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>
`)).toBe(true)
    expect(isViteStarterApp(`<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>
`)).toBe(true)
  })

  it('leaves an App.vue the user changed alone', () => {
    expect(isViteStarterApp(`<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
  <footer>Mine</footer>
</template>
`)).toBe(false)
  })
})
