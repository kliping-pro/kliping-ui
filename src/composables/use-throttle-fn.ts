/**
 * Membatasi sebuah fungsi agar tidak jalan lebih sering dari sekali per jeda.
 *
 * Bedanya dengan debounce sering tertukar, jadi disebutkan di sini: debounce
 * menunggu sampai panggilannya berhenti, throttle tetap jalan sepanjang
 * panggilannya datang — cuma dijatah. Untuk pengetikan pakai debounce; untuk
 * scroll, resize, dan pointermove pakai throttle.
 *
 * Ditulis sendiri dengan alasan yang sama seperti `useDebounceFn`: nol
 * dependensi, dan timernya ikut mati bersama scope-nya.
 */
import { getCurrentScope, onScopeDispose, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface UseThrottleFnOptions {
  /** Invoke the first call immediately. Default: true. */
  leading?: boolean
  /** Invoke the last call after the wait elapses. Default: true. */
  trailing?: boolean
}

/**
 * @param fn Function to throttle.
 * @param wait Minimum milliseconds between calls. May be reactive.
 * @param options Leading and trailing edge settings.
 */
export function useThrottleFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: MaybeRefOrGetter<number> = 1000,
  options: UseThrottleFnOptions = {},
) {
  const { leading = true, trailing = true } = options

  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<Fn> | undefined
  let lastRunAt = 0

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  const cancel = () => {
    clearTimer()
    lastArgs = undefined
    lastRunAt = 0
  }

  const flush = () => {
    if (timer === undefined || !lastArgs)
      return
    const pendingArgs = lastArgs
    clearTimer()
    lastArgs = undefined
    lastRunAt = Date.now()
    fn(...pendingArgs)
  }

  const run = (...args: Parameters<Fn>) => {
    const delay = toValue(wait)
    const now = Date.now()

    // `leading: false` diwujudkan dengan berpura-pura baru saja jalan, sehingga
    // panggilan pertama ikut menunggu jatahnya seperti panggilan berikutnya.
    if (lastRunAt === 0 && !leading)
      lastRunAt = now

    const remaining = delay - (now - lastRunAt)
    lastArgs = args

    // `sisa > jeda` menjaga dari jam sistem yang mundur — tanpa itu, satu
    // penyesuaian waktu bisa membekukan fungsinya sampai jamnya menyusul lagi.
    if (remaining <= 0 || remaining > delay) {
      clearTimer()
      lastRunAt = now
      lastArgs = undefined
      fn(...args)
      return
    }

    if (timer === undefined && trailing) {
      timer = setTimeout(() => {
        timer = undefined
        lastRunAt = leading ? Date.now() : 0
        if (lastArgs) {
          const pendingArgs = lastArgs
          lastArgs = undefined
          fn(...pendingArgs)
        }
      }, remaining)
    }
  }

  if (getCurrentScope())
    onScopeDispose(cancel)

  return {
    /** Calls `fn`, at most once per `wait`. */
    run,
    /** Drops the pending trailing call. */
    cancel,
    /** Runs the pending trailing call now. */
    flush,
  }
}
