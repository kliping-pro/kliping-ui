import { effectScope } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTimeout } from './use-timeout'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useTimeout', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('runs once after its delay', () => {
    const fn = vi.fn()
    const { scope } = runInScope(() => useTimeout(fn, 100))

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('isPending marks a running timer', () => {
    const { result, scope } = runInScope(() => useTimeout(() => {}, 100))

    expect(result.isPending.value).toBe(true)
    vi.advanceTimersByTime(100)
    expect(result.isPending.value).toBe(false)

    scope.stop()
  })

  it('stop cancels it', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useTimeout(fn, 100))

    result.stop()
    vi.advanceTimersByTime(200)
    expect(fn).not.toHaveBeenCalled()

    scope.stop()
  })

  // Pola "sembunyikan tiga detik setelah kemunculan terakhir": tiap start
  // menyetel ulang hitungannya dari nol, bukan menambah timer baru.
  it('start restarts the countdown', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useTimeout(fn, 100))

    vi.advanceTimersByTime(80)
    result.start()
    vi.advanceTimersByTime(80)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(20)
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('a negative delay means do not run', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useTimeout(fn, -1))

    expect(result.isPending.value).toBe(false)
    vi.advanceTimersByTime(1000)
    expect(fn).not.toHaveBeenCalled()

    scope.stop()
  })

  it('is cancelled when the scope stops', () => {
    const fn = vi.fn()
    const { scope } = runInScope(() => useTimeout(fn, 100))

    scope.stop()
    vi.advanceTimersByTime(500)
    expect(fn).not.toHaveBeenCalled()
  })
})
