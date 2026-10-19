import { effectScope } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { useActiveElement } from './use-active-element'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

function makeInput() {
  const el = document.createElement('input')
  document.body.appendChild(el)
  return el
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('useActiveElement', () => {
  it('reads the focused element when called', () => {
    const input = makeInput()
    input.focus()

    const { result, scope } = runInScope(() => useActiveElement())
    expect(result.value).toBe(input)

    scope.stop()
  })

  it('follows focus as it moves', () => {
    const first = makeInput()
    const second = makeInput()
    first.focus()

    const { result, scope } = runInScope(() => useActiveElement())
    expect(result.value).toBe(first)

    second.focus()
    expect(result.value).toBe(second)

    scope.stop()
  })

  // `focus` tidak menggelembung. Pendengar tanpa capture di window tidak akan
  // pernah mendengarnya, dan composable-nya akan diam selamanya.
  it('listens in the capture phase, not the bubble phase', () => {
    const input = makeInput()
    const { result, scope } = runInScope(() => useActiveElement())

    input.focus()
    expect(result.value).toBe(input)

    scope.stop()
  })

  it('stops tracking after the scope stops', () => {
    const first = makeInput()
    const second = makeInput()
    first.focus()

    const { result, scope } = runInScope(() => useActiveElement())
    scope.stop()

    second.focus()
    expect(result.value).toBe(first)
  })
})
