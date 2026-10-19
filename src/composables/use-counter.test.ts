import { effectScope, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { useCounter } from './use-counter'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useCounter', () => {
  it('starts at zero', () => {
    const { result, scope } = runInScope(() => useCounter())
    expect(result.count.value).toBe(0)
    scope.stop()
  })

  it('inc, dec, set, and reset work', () => {
    const { result, scope } = runInScope(() => useCounter(10))

    result.inc()
    expect(result.count.value).toBe(11)
    result.dec()
    result.dec()
    expect(result.count.value).toBe(9)
    result.set(100)
    expect(result.count.value).toBe(100)
    result.reset()
    expect(result.count.value).toBe(10)

    scope.stop()
  })

  it('set accepts an updater that reads the current value', () => {
    const { result, scope } = runInScope(() => useCounter(5))

    result.set(current => current * 3)
    expect(result.count.value).toBe(15)

    scope.stop()
  })

  // Nilai awal dibaca sekali. Kalau reset ikut membaca ulang sumbernya, angka
  // yang dikembalikan akan berubah-ubah dan namanya jadi bohong.
  it('reset returns to the initial value, not the changed source value', () => {
    const initial = ref(7)
    const { result, scope } = runInScope(() => useCounter(initial))

    initial.value = 99
    result.inc()
    result.reset()
    expect(result.count.value).toBe(7)

    scope.stop()
  })
})
