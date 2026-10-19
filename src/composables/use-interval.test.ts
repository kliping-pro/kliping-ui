import { effectScope, nextTick, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInterval } from './use-interval'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useInterval', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('runs repeatedly at its delay', () => {
    const fn = vi.fn()
    const { scope } = runInScope(() => useInterval(fn, 100))

    vi.advanceTimersByTime(350)
    expect(fn).toHaveBeenCalledTimes(3)

    scope.stop()
  })

  it('immediate runs it once at the start', () => {
    const fn = vi.fn()
    const { scope } = runInScope(() => useInterval(fn, 100, { immediate: true }))

    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)

    scope.stop()
  })

  it('pause and resume', () => {
    const fn = vi.fn()
    const { result, scope } = runInScope(() => useInterval(fn, 100))

    expect(result.isActive.value).toBe(true)
    result.pause()
    expect(result.isActive.value).toBe(false)

    vi.advanceTimersByTime(300)
    expect(fn).not.toHaveBeenCalled()

    result.resume()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  // Ini yang membuat pola "berhenti saat tab tersembunyi" jadi satu baris di
  // tempat pemakaian, tanpa cabang if.
  it('a null delay stops it, and a number starts it again', async () => {
    const fn = vi.fn()
    const delay = ref<number | null>(100)
    const { result, scope } = runInScope(() => useInterval(fn, delay))

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(2)

    delay.value = null
    await nextTick()
    expect(result.isActive.value).toBe(false)
    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(2)

    delay.value = 100
    await nextTick()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(3)

    scope.stop()
  })

  it('a changed delay restarts without stacking timers', async () => {
    const fn = vi.fn()
    const delay = ref(100)
    const { scope } = runInScope(() => useInterval(fn, delay))

    delay.value = 50
    await nextTick()
    vi.advanceTimersByTime(100)

    // Kalau timer lamanya tidak dihentikan, hitungannya jadi 3 bukan 2.
    expect(fn).toHaveBeenCalledTimes(2)
    scope.stop()
  })

  it('stops when the scope stops', () => {
    const fn = vi.fn()
    const { scope } = runInScope(() => useInterval(fn, 100))

    scope.stop()
    vi.advanceTimersByTime(500)
    expect(fn).not.toHaveBeenCalled()
  })
})
