import { describe, expect, it } from 'vitest'
import { parseBuilderLink, projectSlug } from './create'

describe('parseBuilderLink', () => {
  it('reads the blocks in order and the page name', () => {
    expect(parseBuilderLink('https://kliping.pro/builder?n=Landing+page&b=navbar-01,hero-03,footer-10')).toEqual({
      blocks: ['navbar-01', 'hero-03', 'footer-10'],
      pageName: 'Landing page',
    })
  })

  it('keeps repeated blocks and works without a name', () => {
    expect(parseBuilderLink('http://localhost:5173/builder?b=hero-01,%20hero-01')).toEqual({
      blocks: ['hero-01', 'hero-01'],
      pageName: undefined,
    })
  })

  it('rejects links without blocks or with odd names', () => {
    expect(() => parseBuilderLink('kliping.pro/builder?b=hero-01')).toThrow('Not a Builder link')
    expect(() => parseBuilderLink('https://kliping.pro/builder')).toThrow('has no blocks')
    expect(() => parseBuilderLink('https://kliping.pro/builder?b=hero-01,../etc')).toThrow('Not a block name: ../etc')
  })
})

describe('projectSlug', () => {
  it('turns a page name into a folder name', () => {
    expect(projectSlug('Landing page')).toBe('landing-page')
    expect(projectSlug('  Acme — Launch 2027! ')).toBe('acme-launch-2027')
  })
})
