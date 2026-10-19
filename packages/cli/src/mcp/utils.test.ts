import { describe, expect, it } from 'vitest'
import { formatSearchResultsWithPagination } from './utils'

describe('formatSearchResultsWithPagination', () => {
  it('prints a real add command for every item', async () => {
    const text = await formatSearchResultsWithPagination({
      items: [
        { name: 'ai-chat', type: 'registry:ui', description: 'A chat interface.', registry: '@kliping', addCommandArgument: '@kliping/ai-chat' },
        { name: 'hero-01', type: 'registry:block', registry: '@kliping', addCommandArgument: '@kliping/hero-01' },
      ],
      pagination: { total: 2, offset: 0, limit: 20, hasMore: false },
    }, { query: 'chat', registries: ['@kliping'] })

    expect(text).not.toContain('[object Promise]')
    expect(text).toMatch(/Add command: `(npx|pnpm dlx|yarn dlx|bunx --bun) kliping@latest add @kliping\/ai-chat`/)
    expect(text).toContain('kliping@latest add @kliping/hero-01`')
  })
})
