import { effectScope } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFps } from './use-fps'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

/** A fake rAF loop that can be advanced frame by frame. */
function stubRaf() {
  let id = 0
  const queue = new Map<number, FrameRequestCallback>()
  let time = 0

  const raf = vi.fn((cb: FrameRequestCallback) => {
    id += 1
    queue.set(id, cb)
    return id
  })
  const cancel = vi.fn((n: number) => queue.delete(n))

  const originalRaf = globalThis.requestAnimationFrame
  const originalCancel = globalThis.cancelAnimationFrame
  const originalNow = performance.now

  globalThis.requestAnimationFrame = raf as any
  globalThis.cancelAnimationFrame = cancel as any
  performance.now = () => time

  return {
    raf,
    cancel,
    /** Runs the given number of frames, each advancing time by 10 ms. */
    advance(frames: number) {
      for (let i = 0; i < frames; i += 1) {
        const next = [...queue.entries()][0]
        if (!next)
          return
        queue.delete(next[0])
        time += 10
        next[1](time)
      }
    },
    pending: () => queue.size,
    restore() {
      globalThis.requestAnimationFrame = originalRaf
      globalThis.cancelAnimationFrame = originalCancel
      performance.now = originalNow
    },
  }
}

describe('useFps', () => {
  let fake: ReturnType<typeof stubRaf>

  beforeEach(() => {
    fake = stubRaf()
  })
  afterEach(() => {
    fake.restore()
  })

  it('starts at zero', () => {
    const { result, scope } = runInScope(() => useFps())
    expect(result.value).toBe(0)
    scope.stop()
  })

  it('measures after a number of frames, not every frame', () => {
    const { result, scope } = runInScope(() => useFps({ every: 5 }))

    fake.advance(4)
    expect(result.value).toBe(0)

    // 5 bingkai dalam 50 ms = 100 fps
    fake.advance(1)
    expect(result.value).toBe(100)

    scope.stop()
  })

  // Tanpa cancelAnimationFrame, tiap komponen yang dibuka lalu ditutup
  // meninggalkan gelung yang terus berjalan selamanya di latar.
  it('stops its loop when the scope stops', () => {
    const { scope } = runInScope(() => useFps({ every: 5 }))

    fake.advance(2)
    expect(fake.pending()).toBe(1)

    scope.stop()
    expect(fake.cancel).toHaveBeenCalled()
    expect(fake.pending()).toBe(0)
  })
})
