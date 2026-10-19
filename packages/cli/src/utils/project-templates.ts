import { klipingWelcomePage } from '@/src/utils/setup-project'

// Project baru untuk `kliping init` di folder kosong. Ditulis dari sini, bukan
// diunduh: tidak bergantung pada repo orang lain (dulu
// github:unovue/shadcn-vue/templates#dev, branch yang terus berubah).
// Isinya sengaja polos — sama dengan create-vite dan starter Nuxt 4, tanpa
// Tailwind dan alias. Sesudah dibuat, `init` menjalankan setupProject seperti
// pada project yang sudah ada, jalur yang sama yang diuji packages/tests.
// Versi paket: ikuti create-vite / nuxi terbaru saat memperbarui berkas ini.

export const PROJECT_TEMPLATES = {
  vite: 'Vite',
  nuxt: 'Nuxt 4',
} as const

export type ProjectTemplate = keyof typeof PROJECT_TEMPLATES

const GITIGNORE_VITE = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#18181b" />
  <path d="M11 8v16M21 8l-7 8 7 8" fill="none" stroke="#fafafa" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`

const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`

function viteFiles(name: string): Record<string, string> {
  return {
    'package.json': json({
      name,
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        'dev': 'vite',
        'build': 'vue-tsc -b && vite build',
        'preview': 'vite preview',
      },
      dependencies: {
        vue: '^3.5.42',
      },
      devDependencies: {
        '@types/node': '^24.13.3',
        '@vitejs/plugin-vue': '^6.0.8',
        '@vue/tsconfig': '^0.9.1',
        'typescript': '~6.0.2',
        'vite': '^8.3.0',
        'vue-tsc': '^3.3.11',
      },
    }),
    '.gitignore': GITIGNORE_VITE,
    '.vscode/extensions.json': json({ recommendations: ['Vue.volar'] }),
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    'public/favicon.svg': FAVICON,
    'vite.config.ts': `import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
`,
    'tsconfig.json': json({
      files: [],
      references: [
        { path: './tsconfig.app.json' },
        { path: './tsconfig.node.json' },
      ],
    }),
    'tsconfig.app.json': `{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
`,
    'tsconfig.node.json': `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
`,
    'src/main.ts': `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
`,
    'src/style.css': '',
    'src/App.vue': klipingWelcomePage('src/App.vue'),
  }
}

function nuxtFiles(name: string): Record<string, string> {
  return {
    'package.json': json({
      name,
      private: true,
      type: 'module',
      scripts: {
        'build': 'nuxt build',
        'dev': 'nuxt dev',
        'generate': 'nuxt generate',
        'preview': 'nuxt preview',
        'postinstall': 'nuxt prepare',
      },
      dependencies: {
        'nuxt': '^4.0.0',
        'vue': '^3.5.13',
        'vue-router': '^4.5.1',
      },
      pnpm: {
        onlyBuiltDependencies: ['@parcel/watcher', 'esbuild'],
      },
    }),
    '.gitignore': `# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example
`,
    'nuxt.config.ts': `// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
`,
    'tsconfig.json': json({
      files: [],
      references: [
        { path: './.nuxt/tsconfig.app.json' },
        { path: './.nuxt/tsconfig.server.json' },
        { path: './.nuxt/tsconfig.shared.json' },
        { path: './.nuxt/tsconfig.node.json' },
      ],
    }),
    'app/app.vue': `<template>
  <NuxtPage />
</template>
`,
    'app/pages/index.vue': klipingWelcomePage('app/pages/index.vue'),
  }
}

/** Files of a new project, keyed by path relative to the project root. */
export function projectFiles(template: ProjectTemplate, name: string) {
  return template === 'nuxt' ? nuxtFiles(name) : viteFiles(name)
}
