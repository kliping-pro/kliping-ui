import { effectScope } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useThrottleFn } from './use-throttle-fn'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useThrottleFn', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('runs the first call immediately', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useThrottleFn(fn, 100))

    result.run('a')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    scope.stop()
  })

  it('limits rapid calls to one per wait', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useThrottleFn(fn, 100))

    result.run('a')
    result.run('b')
    result.run('c')
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('c')

    scope.stop()
  })

  it('leading false delays the first call', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() =>
      useThrottleFn(fn, 100, { leading: false }),
    )

    result.run('a')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    scope.stop()
  })

  it('trailing false discards the held call', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() =>
      useThrottleFn(fn, 100, { trailing: false }),
    )

    result.run('a')
    result.run('b')
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    scope.stop()
  })

  it('cancel discards the held call', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useThrottleFn(fn, 100))

    result.run('a')
    result.run('b')
    result.cancel()
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledTimes(1)
    scope.stop()
  })

  it('flush runs the held call right away', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useThrottleFn(fn, 100))

    result.run('a')
    result.run('b')
    result.flush()

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('b')

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(2)

    scope.stop()
  })

  it('cancels its timer when the scope stops', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useThrottleFn(fn, 100))

    result.run('a')
    result.run('b')
    scope.stop()
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledTimes(1)
  })
})
