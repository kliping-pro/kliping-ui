import { describe, expect, it } from 'vitest'
import { componentName, mainImport, pageSource } from './write-page'

describe('write-page', () => {
  it('names components in PascalCase', () => {
    expect(componentName('hero-01')).toBe('Hero01')
    expect(componentName('logo-cloud-01')).toBe('LogoCloud01')
  })

  it('imports the main file under the components alias', () => {
    const item = { name: 'hero-01', files: [
      { path: 'registry/kliping/components/blocks/hero-01/dreamy-background.vue' },
      { path: 'registry/kliping/components/blocks/hero-01/hero-01.vue' },
    ] }
    expect(mainImport(item, '@/components')).toBe('@/components/blocks/hero-01/hero-01.vue')
    expect(mainImport({ name: 'use-boolean', files: [{ path: 'registry/kliping/composables/use-boolean.ts' }] }, '@/components')).toBeNull()
  })

  it('renders entries in order, importing each once', () => {
    const page = pageSource([
      { name: 'navbar-01', from: '@/components/blocks/navbar-01/navbar-01.vue' },
      { name: 'hero-01', from: '@/components/blocks/hero-01/hero-01.vue' },
      { name: 'navbar-01', from: '@/components/blocks/navbar-01/navbar-01.vue' },
    ], true)
    expect(page).toBe(`<script setup lang="ts">
import Navbar01 from '@/components/blocks/navbar-01/navbar-01.vue'
import Hero01 from '@/components/blocks/hero-01/hero-01.vue'
</script>

<template>
  <Navbar01 />
  <Hero01 />
  <Navbar01 />
</template>
`)
    expect(pageSource([{ name: 'hero-01', from: 'x' }], false)).toContain('<script setup>\n')
  })
})
