/**
 * Uji untuk composable yang dibangun di atas pengamat DOM.
 *
 * `ResizeObserver`, `IntersectionObserver`, dan `MutationObserver` tidak
 * seluruhnya ada di jsdom, jadi ketiganya ditiru di sini. Yang dibuktikan bukan
 * cara peramban mengukur — itu bukan urusan kita — melainkan bahwa pengamatnya
 * dipasang ke elemen yang benar, hasilnya diteruskan apa adanya, dan yang
 * paling penting: **dilepas saat scope-nya berhenti**.
 */
import { effectScope, nextTick, shallowRef } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useElementSize } from './use-element-size'
import { useInViewport } from './use-in-viewport'
import { useStickToBottom } from './use-stick-to-bottom'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

/** A fake observer that keeps its callback so tests can trigger it. */
function createFakeObserver() {
  const instances: any[] = []
  class FakeObserver {
    cb: any
    observed: any[] = []
    disconnected = false
    constructor(cb: any) {
      this.cb = cb
      instances.push(this)
    }

    observe(el: any) { this.observed.push(el) }
    unobserve() {}
    disconnect() { this.disconnected = true }
  }
  return { FakeObserver, instances }
}

describe('useElementSize', () => {
  let fake: ReturnType<typeof createFakeObserver>
  let original: any

  beforeEach(() => {
    fake = createFakeObserver()
    original = globalThis.ResizeObserver
    globalThis.ResizeObserver = fake.FakeObserver as any
  })
  afterEach(() => {
    globalThis.ResizeObserver = original
  })

  it('starts from the given initial size', () => {
    const box = document.createElement('div')
    const { result, scope } = runInScope(() =>
      useElementSize(box, { width: 10, height: 20 }),
    )

    expect(result.width.value).toBe(10)
    expect(result.height.value).toBe(20)

    scope.stop()
  })

  it('follows the size reported by the observer', () => {
    const box = document.createElement('div')
    const { result, scope } = runInScope(() => useElementSize(box))

    fake.instances[0].cb([{
      contentBoxSize: [{ inlineSize: 300, blockSize: 150 }],
      contentRect: { width: 300, height: 150 },
    }])

    expect(result.width.value).toBe(300)
    expect(result.height.value).toBe(150)

    scope.stop()
  })

  it('disconnects its observer when the scope stops', () => {
    const box = document.createElement('div')
    const { scope } = runInScope(() => useElementSize(box))

    expect(fake.instances[0].disconnected).toBe(false)
    scope.stop()
    expect(fake.instances[0].disconnected).toBe(true)
  })

  it('moves its observer when the target changes', async () => {
    const first = document.createElement('div')
    const second = document.createElement('div')
    const target = shallowRef<HTMLElement>(first)

    const { scope } = runInScope(() => useElementSize(target))
    expect(fake.instances).toHaveLength(1)

    target.value = second
    await nextTick()

    expect(fake.instances[0].disconnected).toBe(true)
    expect(fake.instances[1].observed[0]).toBe(second)

    scope.stop()
  })
})

describe('useInViewport', () => {
  let fake: ReturnType<typeof createFakeObserver>
  let original: any

  beforeEach(() => {
    fake = createFakeObserver()
    original = globalThis.IntersectionObserver
    globalThis.IntersectionObserver = fake.FakeObserver as any
  })
  afterEach(() => {
    globalThis.IntersectionObserver = original
  })

  it('has no answer before the observer reports', () => {
    const box = document.createElement('div')
    const { result, scope } = runInScope(() => useInViewport(box))

    expect(result.inViewport.value).toBeUndefined()
    scope.stop()
  })

  it('forwards the state and ratio from the observer', () => {
    const box = document.createElement('div')
    const callback = vi.fn()
    const { result, scope } = runInScope(() => useInViewport(box, { callback }))

    fake.instances[0].cb([{ isIntersecting: true, intersectionRatio: 0.75 }])

    expect(result.inViewport.value).toBe(true)
    expect(result.ratio.value).toBe(0.75)
    expect(callback).toHaveBeenCalledTimes(1)

    scope.stop()
  })

  it('observes several targets at once', () => {
    const first = document.createElement('div')
    const second = document.createElement('div')
    const { scope } = runInScope(() => useInViewport([first, second]))

    expect(fake.instances[0].observed).toEqual([first, second])
    scope.stop()
  })

  it('disconnects its observer when the scope stops', () => {
    const box = document.createElement('div')
    const { scope } = runInScope(() => useInViewport(box))

    scope.stop()
    expect(fake.instances[0].disconnected).toBe(true)
  })
})

describe('useStickToBottom', () => {
  function makeContainer({ scrollTop = 0, scrollHeight = 1000, clientHeight = 300 } = {}) {
    const el = document.createElement('div')
    Object.defineProperty(el, 'scrollHeight', { configurable: true, get: () => scrollHeight })
    Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => clientHeight })
    let top = scrollTop
    Object.defineProperty(el, 'scrollTop', {
      configurable: true,
      get: () => top,
      set: (n) => { top = n },
    })
    el.scrollTo = vi.fn((options: any) => { top = options.top })
    document.body.appendChild(el)
    return el
  }

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('counts as at the bottom when the distance is below the threshold', () => {
    const el = makeContainer({ scrollTop: 700, scrollHeight: 1000, clientHeight: 300 })
    const { result, scope } = runInScope(() => useStickToBottom(el))

    expect(result.isAtBottom.value).toBe(true)
    scope.stop()
  })

  it('unsticks when the user scrolls up', () => {
    const el = makeContainer({ scrollTop: 700 })
    const { result, scope } = runInScope(() => useStickToBottom(el))

    el.scrollTop = 100
    el.dispatchEvent(new Event('scroll'))

    expect(result.isAtBottom.value).toBe(false)
    expect(result.isSticky.value).toBe(false)

    scope.stop()
  })

  it('scrollToBottom sticks it again', () => {
    const el = makeContainer({ scrollTop: 100 })
    const { result, scope } = runInScope(() => useStickToBottom(el))

    el.dispatchEvent(new Event('scroll'))
    expect(result.isSticky.value).toBe(false)

    result.scrollToBottom()
    expect(el.scrollTo).toHaveBeenCalled()
    expect(result.isSticky.value).toBe(true)

    scope.stop()
  })

  it('stops listening after the scope stops', () => {
    const el = makeContainer({ scrollTop: 700 })
    const { result, scope } = runInScope(() => useStickToBottom(el))

    scope.stop()
    el.scrollTop = 0
    el.dispatchEvent(new Event('scroll'))

    expect(result.isAtBottom.value).toBe(true)
  })
})
