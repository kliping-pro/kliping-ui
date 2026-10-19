/**
 * Uji untuk composable yang membaca keadaan peramban.
 *
 * Dikumpulkan dalam satu berkas karena semuanya menuntut hal yang sama:
 * mengganti sesuatu yang sebenarnya milik peramban, lalu mengembalikannya. Yang
 * dijaga sama di semuanya — nilainya terbaca setelah terpasang, ikut berubah
 * saat peristiwanya datang, dan berhenti mengikuti setelah scope-nya berhenti.
 */
import { effectScope } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDocumentVisibility } from './use-document-visibility'
import { useIsOnline } from './use-is-online'
import { useHash } from './use-hash'
import { useIsMatchMedia } from './use-is-match-media'
import { useOs } from './use-os'
import { useIsHydrated } from './use-is-hydrated'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

function stubProperty(obj: any, key: string, val: any) {
  const original = Object.getOwnPropertyDescriptor(obj, key)
  Object.defineProperty(obj, key, { configurable: true, get: () => val })
  return () => {
    if (original)
      Object.defineProperty(obj, key, original)
    else
      delete obj[key]
  }
}

const restorers: (() => void)[] = []
afterEach(() => {
  while (restorers.length) restorers.pop()!()
})

describe('useDocumentVisibility', () => {
  it('reads the current state', () => {
    const { result, scope } = runInScope(() => useDocumentVisibility())
    expect(result.value).toBe('visible')
    scope.stop()
  })

  it('updates on visibilitychange', () => {
    const { result, scope } = runInScope(() => useDocumentVisibility())

    restorers.push(stubProperty(document, 'visibilityState', 'hidden'))
    document.dispatchEvent(new Event('visibilitychange'))
    expect(result.value).toBe('hidden')

    scope.stop()
  })

  it('stops tracking after the scope stops', () => {
    const { result, scope } = runInScope(() => useDocumentVisibility())
    scope.stop()

    restorers.push(stubProperty(document, 'visibilityState', 'hidden'))
    document.dispatchEvent(new Event('visibilitychange'))
    expect(result.value).toBe('visible')
  })
})

describe('useIsOnline', () => {
  it('reads navigator.onLine', () => {
    const { result, scope } = runInScope(() => useIsOnline())
    expect(result.value).toBe(true)
    scope.stop()
  })

  it('updates on offline and online', () => {
    const { result, scope } = runInScope(() => useIsOnline())

    restorers.push(stubProperty(navigator, 'onLine', false))
    window.dispatchEvent(new Event('offline'))
    expect(result.value).toBe(false)

    scope.stop()
  })
})

describe('useHash', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  it('reads the existing hash', () => {
    window.location.hash = '#section'
    const { result, scope } = runInScope(() => useHash())
    expect(result.value).toBe('#section')
    scope.stop()
  })

  it('updates on hashchange', () => {
    const { result, scope } = runInScope(() => useHash())

    window.location.hash = '#two'
    window.dispatchEvent(new Event('hashchange'))
    expect(result.value).toBe('#two')

    scope.stop()
  })

  // Menulis ke ref-nya harus mengubah alamatnya, bukan cuma variabelnya —
  // kalau tidak, keduanya bisa menyimpang dan yang terlihat bukan yang benar.
  it('writing to the ref changes the page URL', () => {
    const { result, scope } = runInScope(() => useHash())

    result.value = '#three'
    expect(window.location.hash).toBe('#three')

    scope.stop()
  })
})

describe('useIsMatchMedia', () => {
  function stubMatchMedia(matching: boolean) {
    const listeners = new Set<(e: any) => void>()
    const fake = vi.fn(() => ({
      matches: matching,
      addEventListener: (_: string, fn: any) => listeners.add(fn),
      removeEventListener: (_: string, fn: any) => listeners.delete(fn),
    }))
    restorers.push(stubProperty(window, 'matchMedia', fake))
    return { listeners, fake }
  }

  it('reads the initial match', () => {
    stubMatchMedia(true)
    const { result, scope } = runInScope(() => useIsMatchMedia('(min-width: 640px)'))
    expect(result.value).toBe(true)
    scope.stop()
  })

  it('updates on change', () => {
    const { listeners } = stubMatchMedia(false)
    const { result, scope } = runInScope(() => useIsMatchMedia('(min-width: 640px)'))

    expect(result.value).toBe(false)
    for (const fn of listeners) fn({ matches: true })
    expect(result.value).toBe(true)

    scope.stop()
  })

  it('removes its listener when the scope stops', () => {
    const { listeners } = stubMatchMedia(false)
    const { scope } = runInScope(() => useIsMatchMedia('(min-width: 640px)'))

    expect(listeners.size).toBe(1)
    scope.stop()
    expect(listeners.size).toBe(0)
  })
})

describe('useOs', () => {
  it('detects the platform from userAgent', () => {
    restorers.push(stubProperty(navigator, 'userAgent', 'mozilla/5.0 (linux; android 14)'))
    const { result, scope } = runInScope(() => useOs())
    expect(result.value).toBe('android')
    scope.stop()
  })

  // iPad modern menyamar sebagai macOS; yang membedakannya cuma layar sentuh.
  it('tells iPad apart from Mac via maxTouchPoints', () => {
    restorers.push(stubProperty(navigator, 'userAgent', 'mozilla/5.0 (macintosh)'))
    restorers.push(stubProperty(navigator, 'platform', 'MacIntel'))
    restorers.push(stubProperty(navigator, 'maxTouchPoints', 5))

    const { result, scope } = runInScope(() => useOs())
    expect(result.value).toBe('ios')
    scope.stop()
  })
})

describe('useIsHydrated', () => {
  it('is true once running in the browser', () => {
    const { result, scope } = runInScope(() => useIsHydrated())
    expect(result.value).toBe(true)
    scope.stop()
  })
})
