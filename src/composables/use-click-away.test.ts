import { effectScope, nextTick, shallowRef } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useClickAway } from './use-click-away'
import { useClickAnyWhere } from './use-click-any-where'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

function makeElement() {
  const el = document.createElement('div')
  document.body.appendChild(el)
  return el
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('useClickAway', () => {
  it('fires when the click lands outside', async () => {
    const box = makeElement()
    const outside = makeElement()
    const fn = vi.fn()

    const { scope } = runInScope(() => useClickAway(fn, box))
    await nextTick()

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('stays quiet when the click lands inside', async () => {
    const box = makeElement()
    const child = document.createElement('span')
    box.appendChild(child)
    const fn = vi.fn()

    const { scope } = runInScope(() => useClickAway(fn, box))
    await nextTick()

    box.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    child.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).not.toHaveBeenCalled()

    scope.stop()
  })

  it('accepts several targets at once', async () => {
    const a = makeElement()
    const b = makeElement()
    const outside = makeElement()
    const fn = vi.fn()

    const { scope } = runInScope(() => useClickAway(fn, [a, b]))
    await nextTick()

    a.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    b.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).not.toHaveBeenCalled()

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  // Ini cacat klasik yang membuat menu tertutup tepat pada klik yang membukanya:
  // saat setup berjalan, ref-nya masih kosong, dan target yang belum ada tidak
  // boleh dianggap "di luar".
  it('a target that does not exist yet is not treated as outside', async () => {
    const target = shallowRef<HTMLElement | null>(null)
    const outside = makeElement()
    const fn = vi.fn()

    const { scope } = runInScope(() => useClickAway(fn, target))
    await nextTick()

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).not.toHaveBeenCalled()

    target.value = makeElement()
    await nextTick()
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('can watch events other than click', async () => {
    const box = makeElement()
    const outside = makeElement()
    const fn = vi.fn()

    const { scope } = runInScope(() => useClickAway(fn, box, 'pointerdown'))
    await nextTick()

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).not.toHaveBeenCalled()

    outside.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('stops listening after the scope stops', async () => {
    const box = makeElement()
    const outside = makeElement()
    const fn = vi.fn()

    const { scope } = runInScope(() => useClickAway(fn, box))
    await nextTick()

    scope.stop()
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fn).not.toHaveBeenCalled()
  })
})

describe('useClickAnyWhere', () => {
  it('fires for a click anywhere', () => {
    const fn = vi.fn()
    const { scope } = runInScope(() => useClickAnyWhere(fn))

    window.dispatchEvent(new MouseEvent('click'))
    expect(fn).toHaveBeenCalledTimes(1)

    scope.stop()
    window.dispatchEvent(new MouseEvent('click'))
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
