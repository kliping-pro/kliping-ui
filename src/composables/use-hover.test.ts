import { effectScope, nextTick, shallowRef } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useHover } from './use-hover'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useHover', () => {
  it('tracks the pointer entering and leaving', () => {
    const box = document.createElement('div')
    const { result, scope } = runInScope(() => useHover(box))

    expect(result.value).toBe(false)

    box.dispatchEvent(new MouseEvent('mouseenter'))
    expect(result.value).toBe(true)

    box.dispatchEvent(new MouseEvent('mouseleave'))
    expect(result.value).toBe(false)

    scope.stop()
  })

  it('calls onEnter, onLeave, and onChange', () => {
    const box = document.createElement('div')
    const onEnter = vi.fn()
    const onLeave = vi.fn()
    const onChange = vi.fn()

    const { scope } = runInScope(() =>
      useHover(box, { onEnter, onLeave, onChange }),
    )

    box.dispatchEvent(new MouseEvent('mouseenter'))
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(true)

    box.dispatchEvent(new MouseEvent('mouseleave'))
    expect(onLeave).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(false)

    scope.stop()
  })

  it('waits for a target that does not exist yet during setup', async () => {
    const target = shallowRef<HTMLElement | null>(null)
    const { result, scope } = runInScope(() => useHover(target))

    const box = document.createElement('div')
    target.value = box
    await nextTick()

    box.dispatchEvent(new MouseEvent('mouseenter'))
    expect(result.value).toBe(true)

    scope.stop()
  })

  it('stops listening after the scope stops', () => {
    const box = document.createElement('div')
    const { result, scope } = runInScope(() => useHover(box))

    scope.stop()
    box.dispatchEvent(new MouseEvent('mouseenter'))
    expect(result.value).toBe(false)
  })
})
