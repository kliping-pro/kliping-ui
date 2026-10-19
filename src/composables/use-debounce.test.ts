import { effectScope, nextTick, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './use-debounce'
import { useThrottle } from './use-throttle'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts from the source value', () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => useDebounce(source, 100))

    expect(result.value).toBe('a')
    scope.stop()
  })

  it('lags behind the source until the wait elapses', async () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => useDebounce(source, 100))

    source.value = 'b'
    await nextTick()
    expect(result.value).toBe('a')

    vi.advanceTimersByTime(100)
    expect(result.value).toBe('b')

    scope.stop()
  })

  it('rapid changes produce only one update', async () => {
    const source = ref(0)
    const { result, scope } = runInScope(() => useDebounce(source, 100))

    for (const n of [1, 2, 3, 4]) {
      source.value = n
      await nextTick()
      vi.advanceTimersByTime(50)
    }

    expect(result.value).toBe(0)
    vi.advanceTimersByTime(100)
    expect(result.value).toBe(4)

    scope.stop()
  })

  it('accepts a getter as the source', async () => {
    const source = ref({ name: 'a' })
    const { result, scope } = runInScope(() => useDebounce(() => source.value.name, 100))

    source.value = { name: 'b' }
    await nextTick()
    vi.advanceTimersByTime(100)
    expect(result.value).toBe('b')

    scope.stop()
  })

  it('does not write again after the scope stops', async () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => useDebounce(source, 100))

    source.value = 'b'
    await nextTick()
    scope.stop()
    vi.advanceTimersByTime(200)

    expect(result.value).toBe('a')
  })
})

describe('useThrottle', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('passes the first change through immediately', async () => {
    const source = ref('a')
    const { result, scope } = runInScope(() => useThrottle(source, 100))

    source.value = 'b'
    await nextTick()
    expect(result.value).toBe('b')

    scope.stop()
  })

  it('throttles rapid changes', async () => {
    const source = ref(0)
    const { result, scope } = runInScope(() => useThrottle(source, 100))

    source.value = 1
    await nextTick()
    expect(result.value).toBe(1)

    source.value = 2
    await nextTick()
    source.value = 3
    await nextTick()
    expect(result.value).toBe(1)

    vi.advanceTimersByTime(100)
    expect(result.value).toBe(3)

    scope.stop()
  })

  it('does not write again after the scope stops', async () => {
    const source = ref(0)
    const { result, scope } = runInScope(() => useThrottle(source, 100))

    source.value = 1
    await nextTick()
    source.value = 2
    await nextTick()

    scope.stop()
    vi.advanceTimersByTime(200)

    expect(result.value).toBe(1)
  })
})
