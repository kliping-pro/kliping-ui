import { effectScope } from 'vue'
import { describe, expect, it } from 'vitest'
import { useToggle } from './use-toggle'

/** Runs the composable in a detached scope and returns its result and the scope. */
function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useToggle', () => {
  it('starts from the left value', () => {
    const { result, scope } = runInScope(() => useToggle())
    expect(result.value.value).toBe(false)
    scope.stop()
  })

  it('flips between left and right', () => {
    const { result, scope } = runInScope(() => useToggle())

    result.toggle()
    expect(result.value.value).toBe(true)
    result.toggle()
    expect(result.value.value).toBe(false)

    scope.stop()
  })

  it('works with two non-boolean values', () => {
    const { result, scope } = runInScope(() => useToggle('day', 'night'))

    expect(result.value.value).toBe('day')
    result.toggle()
    expect(result.value.value).toBe('night')
    result.setLeft()
    expect(result.value.value).toBe('day')
    result.setRight()
    expect(result.value.value).toBe('night')

    scope.stop()
  })

  it('set accepts a value from either side', () => {
    const { result, scope } = runInScope(() => useToggle('day', 'night'))

    result.set('night')
    expect(result.value.value).toBe('night')

    scope.stop()
  })

  it('reads the initial value from a ref or a getter', () => {
    const { result, scope } = runInScope(() => useToggle(() => 'morning', 'evening'))

    expect(result.value.value).toBe('morning')
    result.toggle()
    expect(result.value.value).toBe('evening')

    scope.stop()
  })

  // `===` gagal di sini: `NaN === NaN` selalu false, jadi toggle-nya akan
  // menyangka nilainya sudah di kanan dan mengembalikannya ke kiri terus.
  it('still works when one side is NaN', () => {
    const { result, scope } = runInScope(() => useToggle(Number.NaN, 0))

    expect(result.value.value).toBeNaN()
    result.toggle()
    expect(result.value.value).toBe(0)
    result.toggle()
    expect(result.value.value).toBeNaN()

    scope.stop()
  })
})
