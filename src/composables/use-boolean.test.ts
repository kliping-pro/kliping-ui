import { effectScope } from 'vue'
import { describe, expect, it } from 'vitest'
import { useBoolean } from './use-boolean'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useBoolean', () => {
  it('starts as false', () => {
    const { result, scope } = runInScope(() => useBoolean())
    expect(result.value.value).toBe(false)
    scope.stop()
  })

  it('respects the given initial value', () => {
    const { result, scope } = runInScope(() => useBoolean(true))
    expect(result.value.value).toBe(true)
    scope.stop()
  })

  it('setTrue, setFalse, and toggle work', () => {
    const { result, scope } = runInScope(() => useBoolean(false))

    result.setTrue()
    expect(result.value.value).toBe(true)
    result.setFalse()
    expect(result.value.value).toBe(false)
    result.toggle()
    expect(result.value.value).toBe(true)
    result.toggle()
    expect(result.value.value).toBe(false)

    scope.stop()
  })

  // Nilai awal `true` membuat sisi kiri dan kanannya tertukar dibanding kasus
  // biasa. Kalau toggle-nya dibangun dengan asumsi kiri selalu `false`, cacatnya
  // baru muncul di sini.
  it('toggle stays correct when starting from true', () => {
    const { result, scope } = runInScope(() => useBoolean(true))

    result.toggle()
    expect(result.value.value).toBe(false)
    result.toggle()
    expect(result.value.value).toBe(true)

    scope.stop()
  })

  it('calling setTrue twice does not flip anything', () => {
    const { result, scope } = runInScope(() => useBoolean(false))

    result.setTrue()
    result.setTrue()
    expect(result.value.value).toBe(true)

    scope.stop()
  })
})
