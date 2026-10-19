/**
 * Uji untuk composable yang membaca perangkat dan papan klip.
 *
 * Semuanya menyentuh API yang tidak ada di jsdom, jadi yang dibuktikan bukan
 * perilaku peramban melainkan perilaku composable-nya: nilai bawaan yang aman
 * saat API-nya tidak ada, pembacaan yang benar saat ada, dan pelepasan yang
 * bersih saat scope-nya berhenti.
 */
import { effectScope, nextTick, reactive } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useBattery } from './use-battery'
import { useNetwork } from './use-network'
import { useClipboard } from './use-clipboard'
import { useMouse } from './use-mouse'
import { useFullscreen } from './use-fullscreen'
import { useWhyDidYouUpdate } from './use-why-did-you-update'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

function stub(obj: any, name: string, val: any) {
  const original = Object.getOwnPropertyDescriptor(obj, name)
  Object.defineProperty(obj, name, { configurable: true, writable: true, value: val })
  return () => {
    if (original)
      Object.defineProperty(obj, name, original)
    else
      delete obj[name]
  }
}

const restorers: (() => void)[] = []
afterEach(() => {
  while (restorers.length) restorers.pop()!()
})

describe('useBattery', () => {
  it('reports unsupported when getBattery is missing', () => {
    const { result, scope } = runInScope(() => useBattery())

    expect(result.isSupported.value).toBe(false)
    expect(result.level.value).toBe(1)

    scope.stop()
  })

  it('reads the battery state when supported', async () => {
    const manager = {
      charging: true,
      chargingTime: 120,
      dischargingTime: Number.POSITIVE_INFINITY,
      level: 0.42,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    restorers.push(stub(navigator, 'getBattery', () => Promise.resolve(manager)))

    const { result, scope } = runInScope(() => useBattery())
    expect(result.isSupported.value).toBe(true)

    await Promise.resolve()
    await Promise.resolve()

    expect(result.level.value).toBe(0.42)
    expect(result.charging.value).toBe(true)
    expect(manager.addEventListener).toHaveBeenCalledTimes(4)

    scope.stop()
    expect(manager.removeEventListener).toHaveBeenCalledTimes(4)
  })
})

describe('useNetwork', () => {
  it('reads the initial state from navigator', () => {
    const { result, scope } = runInScope(() => useNetwork())
    expect(result.value.online).toBe(true)
    scope.stop()
  })

  it('records the time when the connection drops', () => {
    const { result, scope } = runInScope(() => useNetwork())

    window.dispatchEvent(new Event('offline'))
    expect(result.value.online).toBe(false)
    expect(result.value.since).toBeInstanceOf(Date)

    window.dispatchEvent(new Event('online'))
    expect(result.value.online).toBe(true)

    scope.stop()
  })

  it('also reads navigator.connection when present', () => {
    restorers.push(stub(navigator, 'connection', {
      rtt: 50,
      downlink: 10,
      effectiveType: '4g',
      saveData: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result, scope } = runInScope(() => useNetwork())
    expect(result.value.effectiveType).toBe('4g')
    expect(result.value.saveData).toBe(true)

    scope.stop()
  })
})

describe('useClipboard', () => {
  it('copies through the Clipboard API and sets copied', async () => {
    const writeText = vi.fn(() => Promise.resolve())
    restorers.push(stub(navigator, 'clipboard', { writeText, readText: vi.fn() }))

    const { result, scope } = runInScope(() => useClipboard())

    await result.copy('hello')
    expect(writeText).toHaveBeenCalledWith('hello')
    expect(result.text.value).toBe('hello')
    expect(result.copied.value).toBe(true)

    scope.stop()
  })

  it('uses source when copy is called without an argument', async () => {
    const writeText = vi.fn(() => Promise.resolve())
    restorers.push(stub(navigator, 'clipboard', { writeText, readText: vi.fn() }))

    const { result, scope } = runInScope(() => useClipboard({ source: 'from-source' }))

    await result.copy()
    expect(writeText).toHaveBeenCalledWith('from-source')

    scope.stop()
  })

  it('copied resets itself after its duration', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn(() => Promise.resolve())
    restorers.push(stub(navigator, 'clipboard', { writeText, readText: vi.fn() }))

    const { result, scope } = runInScope(() => useClipboard({ copiedDuring: 100 }))

    await result.copy('x')
    expect(result.copied.value).toBe(true)

    vi.advanceTimersByTime(100)
    expect(result.copied.value).toBe(false)

    scope.stop()
    vi.useRealTimers()
  })
})

describe('useMouse', () => {
  it('follows mouse movement', () => {
    const { result, scope } = runInScope(() => useMouse())

    expect(result.sourceType.value).toBeNull()

    const event = new MouseEvent('mousemove')
    Object.defineProperty(event, 'pageX', { value: 120 })
    Object.defineProperty(event, 'pageY', { value: 80 })
    window.dispatchEvent(event)

    expect(result.x.value).toBe(120)
    expect(result.y.value).toBe(80)
    expect(result.sourceType.value).toBe('mouse')

    scope.stop()
  })

  it('uses the requested coordinate system', () => {
    const { result, scope } = runInScope(() => useMouse({ type: 'client' }))

    const event = new MouseEvent('mousemove')
    Object.defineProperty(event, 'pageX', { value: 999 })
    Object.defineProperty(event, 'clientX', { value: 42 })
    Object.defineProperty(event, 'clientY', { value: 24 })
    window.dispatchEvent(event)

    expect(result.x.value).toBe(42)
    expect(result.y.value).toBe(24)

    scope.stop()
  })

  it('stops tracking after the scope stops', () => {
    const { result, scope } = runInScope(() => useMouse())
    scope.stop()

    const event = new MouseEvent('mousemove')
    Object.defineProperty(event, 'pageX', { value: 500 })
    window.dispatchEvent(event)

    expect(result.x.value).toBe(0)
  })
})

describe('useFullscreen', () => {
  it('reports unsupported when the API is missing', () => {
    const { result, scope } = runInScope(() => useFullscreen())
    expect(result.isFullscreen.value).toBe(false)
    scope.stop()
  })

  it('calls the enter method on the element', async () => {
    const box = document.createElement('div')
    const request = vi.fn(() => Promise.resolve())
    ;(box as any).requestFullscreen = request
    restorers.push(stub(document, 'exitFullscreen', vi.fn()))
    restorers.push(stub(document, 'fullScreen', false))

    const { result, scope } = runInScope(() => useFullscreen(box))
    expect(result.isSupported.value).toBe(true)

    await result.enter()
    expect(request).toHaveBeenCalledTimes(1)
    expect(result.isFullscreen.value).toBe(true)

    scope.stop()
  })
})

describe('useWhyDidYouUpdate', () => {
  it('logs the props that changed', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    // Harus reaktif. Objek biasa tidak punya apa pun untuk dipantau — di dalam
    // komponen hal ini tidak jadi soal, karena props memang selalu reaktif.
    const props = reactive({ a: 1, b: 'unchanged' })

    const { scope } = runInScope(() => useWhyDidYouUpdate('Card', props))

    props.a = 2
    await nextTick()

    expect(logSpy).toHaveBeenCalled()
    const [tag, name, changed] = logSpy.mock.calls.at(-1)!
    expect(tag).toBe('[why-did-you-update]')
    expect(name).toBe('Card')
    expect(changed).toEqual({ a: { from: 1, to: 2 } })

    logSpy.mockRestore()
    scope.stop()
  })

  it('stays quiet when no prop changed', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const props = reactive({ a: 1 })

    const { scope } = runInScope(() => useWhyDidYouUpdate('Card', props))

    props.a = 1
    await nextTick()
    expect(logSpy).not.toHaveBeenCalled()

    logSpy.mockRestore()
    scope.stop()
  })
})
