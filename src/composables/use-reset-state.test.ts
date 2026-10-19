import { effectScope } from 'vue'
import { describe, expect, it } from 'vitest'
import { useResetState } from './use-reset-state'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useResetState', () => {
  it('starts from the given value', () => {
    const { result, scope } = runInScope(() => useResetState(5))
    expect(result.state.value).toBe(5)
    scope.stop()
  })

  it('set and reset work', () => {
    const { result, scope } = runInScope(() => useResetState('a'))

    result.set('b')
    expect(result.state.value).toBe('b')
    result.reset()
    expect(result.state.value).toBe('a')

    scope.stop()
  })

  it('set accepts an updater that reads the current value', () => {
    const { result, scope } = runInScope(() => useResetState(2))

    result.set(current => current + 3)
    expect(result.state.value).toBe(5)

    scope.stop()
  })

  // Di Vue, mengubah isi objek state adalah pemakaian yang wajar. Kalau pabrik
  // nilai awalnya cuma dipanggil sekali, objek itu ikut termutasi dan reset
  // mengembalikan keadaan yang sudah kotor — persis kebalikan dari yang diminta
  // namanya. Ini uji yang menjaganya.
  it('reset gives a fresh object, not the mutated initial one', () => {
    const { result, scope } = runInScope(() =>
      useResetState(() => ({ name: 'initial', tag: [] as string[] })),
    )

    result.state.value.name = 'changed'
    result.state.value.tag.push('dirty')

    result.reset()
    expect(result.state.value.name).toBe('initial')
    expect(result.state.value.tag).toEqual([])

    scope.stop()
  })

  it('resetting twice still gives different objects', () => {
    const { result, scope } = runInScope(() => useResetState(() => ({ n: 0 })))

    result.reset()
    const first = result.state.value
    result.reset()
    expect(result.state.value).not.toBe(first)

    scope.stop()
  })

  it('a plain value that is not a factory is used as is', () => {
    const { result, scope } = runInScope(() => useResetState({ n: 1 }))

    result.set({ n: 2 })
    expect(result.state.value.n).toBe(2)
    result.reset()
    expect(result.state.value.n).toBe(1)

    scope.stop()
  })
})
