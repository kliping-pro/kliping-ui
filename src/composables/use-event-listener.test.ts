import { effectScope, nextTick, ref, shallowRef } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useEventListener } from './use-event-listener'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useEventListener', () => {
  it('listens on window by default', () => {
    const listener = vi.fn()
    const { scope } = runInScope(() => useEventListener('resize', listener))

    window.dispatchEvent(new Event('resize'))
    expect(listener).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('listens on the given element', () => {
    const button = document.createElement('button')
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener('click', listener, { target: button }),
    )

    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('accepts several event names at once', () => {
    const button = document.createElement('button')
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener(['pointerdown', 'pointerup'], listener, { target: button }),
    )

    button.dispatchEvent(new Event('pointerdown'))
    button.dispatchEvent(new Event('pointerup'))
    expect(listener).toHaveBeenCalledTimes(2)

    scope.stop()
  })

  // Ini uji yang paling penting di berkas ini. Pendengar yang tidak dilepas
  // tidak pernah terlihat di dokumentasi, tidak pernah membuat uji lain gagal,
  // dan baru muncul sebagai kebocoran di project orang.
  it('removes its listener when its scope stops', () => {
    const button = document.createElement('button')
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener('click', listener, { target: button }),
    )

    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    scope.stop()

    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('removes its listener when the stop function is called', () => {
    const button = document.createElement('button')
    const listener = vi.fn()

    const { result, scope } = runInScope(() =>
      useEventListener('click', listener, { target: button }),
    )

    result()
    button.dispatchEvent(new Event('click'))
    expect(listener).not.toHaveBeenCalled()

    scope.stop()
  })

  it('moves to a new target and detaches from the old one', async () => {
    const oldTarget = document.createElement('button')
    const newTarget = document.createElement('button')
    const target = shallowRef<HTMLElement>(oldTarget)
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener('click', listener, { target }),
    )

    oldTarget.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    target.value = newTarget
    await nextTick()

    newTarget.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(2)

    // Yang lama harus sudah tuli. Tanpa pembongkaran di awal callback, panggilan
    // ini menaikkan hitungannya jadi 3.
    oldTarget.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(2)

    scope.stop()
  })

  it('waits for a target that does not exist yet during setup', async () => {
    const target = shallowRef<HTMLElement | null>(null)
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener('click', listener, { target }),
    )

    const button = document.createElement('button')
    target.value = button
    await nextTick()

    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('a reactive enable turns the listener on and off', async () => {
    const button = document.createElement('button')
    const enabled = ref(false)
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener('click', listener, { target: button, enable: enabled }),
    )

    button.dispatchEvent(new Event('click'))
    expect(listener).not.toHaveBeenCalled()

    enabled.value = true
    await nextTick()
    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    enabled.value = false
    await nextTick()
    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('forwards the once option', () => {
    const button = document.createElement('button')
    const listener = vi.fn()

    const { scope } = runInScope(() =>
      useEventListener('click', listener, { target: button, once: true }),
    )

    button.dispatchEvent(new Event('click'))
    button.dispatchEvent(new Event('click'))
    expect(listener).toHaveBeenCalledTimes(1)

    scope.stop()
  })
})
