import { describe, expect, it, vi } from 'vitest'
import { searchRegistries } from './search'

vi.mock('./api', () => ({
  getRegistry: vi.fn(async () => ({
    name: 'kliping',
    homepage: 'https://kliping.pro',
    items: [
      { name: 'table-06', type: 'registry:component', description: 'Table with a sticky header row.' },
      { name: 'hero-02', type: 'registry:block', description: 'A two-column hero section.' },
      { name: 'hero-01', type: 'registry:block', description: 'A centered hero section.' },
      { name: 'ecommerce-15', type: 'registry:block', description: 'Promo card with a captioned hero photo.' },
      { name: 'pricing-03', type: 'registry:block', description: 'Three pricing plans.' },
    ],
  })),
}))

const names = async (query: string) => (await searchRegistries(['@kliping'], { query })).items.map(i => i.name)

describe('searchRegistries', () => {
  it('returns only items containing the words, names first', async () => {
    expect(await names('hero')).toEqual(['hero-01', 'hero-02', 'ecommerce-15'])
  })

  it('needs every word', async () => {
    expect(await names('centered hero')).toEqual(['hero-01'])
  })

  it('falls back to fuzzy matching for typos', async () => {
    expect(await names('pricng')).toContain('pricing-03')
  })

  it('returns nothing for unrelated text', async () => {
    expect(await names('zzzqqq')).toEqual([])
  })
})
