import { effectScope, nextTick, ref, watch } from 'vue'
import { describe, expect, it } from 'vitest'
import { usePrevious } from './use-previous'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('usePrevious', () => {
  it('returns undefined before any change', () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => usePrevious(source))

    expect(result.value).toBeUndefined()
    scope.stop()
  })

  it('remembers one value back', () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => usePrevious(source))

    source.value = 'b'
    expect(result.value).toBe('a')
    source.value = 'c'
    expect(result.value).toBe('b')

    scope.stop()
  })

  it('respects the given comparator', () => {
    const source = ref({ id: 1, name: 'a' })
    const { result, scope } = runInScope(() =>
      usePrevious(source, (prev, next) => prev?.id !== next.id),
    )

    // id-nya sama, jadi tidak dianggap berubah dan yang sebelumnya tidak bergeser.
    source.value = { id: 1, name: 'b' }
    expect(result.value).toBeUndefined()

    source.value = { id: 2, name: 'c' }
    expect(result.value).toEqual({ id: 1, name: 'a' })

    scope.stop()
  })

  // Inilah alasan `flush: 'sync'` dipakai. Watcher biasa berjalan setelah
  // pembaruan dikumpulkan; kalau usePrevious ikut antre di sana, urutannya tidak
  // dijamin dan pembacanya bisa mendapat nilai yang sudah ikut bergeser.
  it('the previous value is ready when a regular watcher runs', async () => {
    const source = ref(1)
    const seen: (number | undefined)[] = []

    const { scope } = runInScope(() => {
      const previous = usePrevious(source)
      watch(source, () => seen.push(previous.value))
      return previous
    })

    source.value = 2
    await nextTick()
    source.value = 3
    await nextTick()

    expect(seen).toEqual([1, 2])
    scope.stop()
  })

  it('accepts a getter as the source', () => {
    const getterSource = ref({ n: 1 })
    const { result, scope } = runInScope(() => usePrevious(() => getterSource.value.n))

    getterSource.value = { n: 2 }
    expect(result.value).toBe(1)

    scope.stop()
  })

  it('stops tracking after the scope stops', () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => usePrevious(source))

    source.value = 'b'
    expect(result.value).toBe('a')

    scope.stop()
    source.value = 'c'
    expect(result.value).toBe('a')
  })
})
