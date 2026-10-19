import { effectScope } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounceFn } from './use-debounce-fn'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useDebounceFn', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('delays until the wait elapses', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useDebounceFn(fn, 100))

    result.run()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('collapses rapid calls into one', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useDebounceFn(fn, 100))

    result.run(1)
    vi.advanceTimersByTime(50)
    result.run(2)
    vi.advanceTimersByTime(50)
    result.run(3)
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)

    scope.stop()
  })

  it('leading runs the first call immediately', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() =>
      useDebounceFn(fn, 100, { leading: true, trailing: false }),
    )

    result.run('a')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    result.run('b')
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('leading and trailing together run twice for two calls', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() =>
      useDebounceFn(fn, 100, { leading: true, trailing: true }),
    )

    result.run('a')
    result.run('b')
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenNthCalledWith(1, 'a')
    expect(fn).toHaveBeenNthCalledWith(2, 'b')

    scope.stop()
  })

  it('cancel discards the pending call', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useDebounceFn(fn, 100))

    result.run()
    result.cancel()
    vi.advanceTimersByTime(200)

    expect(fn).not.toHaveBeenCalled()
    scope.stop()
  })

  it('flush runs it right away', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useDebounceFn(fn, 100))

    result.run('x')
    result.flush()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('x')

    // Timernya ikut dibatalkan, jadi tidak jalan dua kali.
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('flush without a pending call does nothing', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useDebounceFn(fn, 100))

    result.flush()
    expect(fn).not.toHaveBeenCalled()

    scope.stop()
  })

  it('reads a reactive wait when run is called', () => {
    const fn = vi.fn()
    let wait = 100
    const { result, scope } = runInScope(() => useDebounceFn(fn, () => wait))

    result.run()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    wait = 500
    result.run()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(400)
    expect(fn).toHaveBeenCalledTimes(2)

    scope.stop()
  })

  // Timer yang tidak ikut mati bersama scope-nya akan menulis ke sesuatu yang
  // sudah tidak ada. Ini uji yang membuktikan itu tidak terjadi.
  it('cancels its timer when the scope stops', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useDebounceFn(fn, 100))

    result.run()
    scope.stop()
    vi.advanceTimersByTime(200)

    expect(fn).not.toHaveBeenCalled()
  })
})
