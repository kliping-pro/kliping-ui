import { describe, expect, it, vi } from 'vitest'
import { useLockFn } from './use-lock-fn'

describe('useLockFn', () => {
  it('ignores calls while the previous one is still running', async () => {
    const task = vi.fn(async () => {
      await new Promise(r => setTimeout(r, 10))
      return 'done'
    })
    const locked = useLockFn(task)

    const a = locked()
    const b = locked()

    expect(await b).toBeUndefined()
    expect(await a).toBe('done')
    expect(task).toHaveBeenCalledTimes(1)
  })

  it('can be called again after it finishes', async () => {
    const task = vi.fn(async () => 'ok')
    const locked = useLockFn(task)

    await locked()
    await locked()
    expect(task).toHaveBeenCalledTimes(2)
  })

  it('forwards its arguments', async () => {
    const task = vi.fn(async (a: number, b: number) => a + b)
    const locked = useLockFn(task)

    expect(await locked(2, 3)).toBe(5)
    expect(task).toHaveBeenCalledWith(2, 3)
  })

  // Kunci yang tidak dilepas saat gagal akan membekukan tombolnya selamanya —
  // cacat yang cuma muncul di hari yang buruk, saat jaringannya sedang gagal.
  it('releases the lock even when the function throws', async () => {
    const task = vi.fn(async () => {
      throw new Error('failed')
    })
    const locked = useLockFn(task)

    await expect(locked()).rejects.toThrow('failed')
    await expect(locked()).rejects.toThrow('failed')
    expect(task).toHaveBeenCalledTimes(2)
  })
})
