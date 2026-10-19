import { effectScope, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { useTitle } from './use-title'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

afterEach(() => {
  document.title = ''
})

describe('useTitle', () => {
  it('reads the existing title', () => {
    document.title = 'Kliping'
    const { result, scope } = runInScope(() => useTitle())
    expect(result.value).toBe('Kliping')
    scope.stop()
  })

  it('writes the initial title to document', () => {
    const { scope } = runInScope(() => useTitle('New Page'))
    expect(document.title).toBe('New Page')
    scope.stop()
  })

  it('writing to the ref changes the page title', async () => {
    const { result, scope } = runInScope(() => useTitle('Initial'))

    result.value = 'Changed'
    await nextTick()
    expect(document.title).toBe('Changed')

    scope.stop()
  })

  it('follows a reactive source', async () => {
    const source = ref('One')
    const { result, scope } = runInScope(() => useTitle(source))

    source.value = 'Two'
    await nextTick()
    expect(result.value).toBe('Two')
    expect(document.title).toBe('Two')

    scope.stop()
  })

  it('a %s template wraps the title', async () => {
    const { result, scope } = runInScope(() =>
      useTitle('Home', { titleTemplate: '%s — Kliping' }),
    )

    expect(document.title).toBe('Home — Kliping')

    result.value = 'Blocks'
    await nextTick()
    expect(document.title).toBe('Blocks — Kliping')

    // Yang disimpan tetap judul mentahnya, bukan hasil polanya. Kalau tertukar,
    // judulnya akan terbungkus dua kali pada perubahan berikutnya.
    expect(result.value).toBe('Blocks')

    scope.stop()
  })

  it('a function template is accepted too', () => {
    const { scope } = runInScope(() =>
      useTitle('Blocks', { titleTemplate: j => `${j} | Kliping` }),
    )

    expect(document.title).toBe('Blocks | Kliping')
    scope.stop()
  })
})
