import { effectScope } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { useScrollLock } from './use-scroll-lock'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

afterEach(() => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})

describe('useScrollLock', () => {
  it('locks body by default', () => {
    const { result, scope } = runInScope(() => useScrollLock())

    expect(result.isLocked.value).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')

    scope.stop()
  })

  it('autoLock false defers locking until requested', () => {
    const { result, scope } = runInScope(() => useScrollLock({ autoLock: false }))

    expect(result.isLocked.value).toBe(false)
    expect(document.body.style.overflow).toBe('')

    result.lock()
    expect(document.body.style.overflow).toBe('hidden')

    scope.stop()
  })

  // Gaya aslinya dikembalikan, bukan dikosongkan. Elemen yang sudah punya
  // overflow sendiri harus mendapatkannya kembali utuh.
  it('restores the original styles instead of clearing them', () => {
    const box = document.createElement('div')
    box.style.overflow = 'scroll'
    box.style.paddingRight = '8px'
    document.body.appendChild(box)

    const { result, scope } = runInScope(() => useScrollLock({ lockTarget: box }))
    expect(box.style.overflow).toBe('hidden')

    result.unlock()
    expect(box.style.overflow).toBe('scroll')
    expect(box.style.paddingRight).toBe('8px')

    scope.stop()
    box.remove()
  })

  it('unlocks when the scope stops', () => {
    const { scope } = runInScope(() => useScrollLock())
    expect(document.body.style.overflow).toBe('hidden')

    scope.stop()
    expect(document.body.style.overflow).toBe('')
  })

  it('accepts a CSS selector as the target', () => {
    const box = document.createElement('div')
    box.id = 'container'
    document.body.appendChild(box)

    const { scope } = runInScope(() => useScrollLock({ lockTarget: '#container' }))
    expect(box.style.overflow).toBe('hidden')

    scope.stop()
    box.remove()
  })
})
