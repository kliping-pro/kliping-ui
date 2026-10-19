/**
 * Menunda sebuah fungsi sampai pemanggilannya berhenti sejenak.
 *
 * Ditulis sendiri, bukan membungkus paket debounce mana pun. Itu keputusan yang
 * disengaja: composable Kliping tidak boleh membawa dependensi runtime. Kalau
 * memasang `@kliping/use-debounce-fn` memaksa orang menambah satu paket, mereka
 * akan memakai paketnya langsung dan registry ini kehilangan alasan keberadaannya.
 *
 * Yang didapat sebagai gantinya bukan cuma nol dependensi: timernya ikut mati
 * bersama scope-nya. Debounce dari paket mana pun tidak tahu apa-apa soal siklus
 * hidup Vue, jadi pemanggilnya harus ingat membatalkannya sendiri — dan itu
 * jenis hal yang selalu terlupa.
 *
 * `wait` boleh reaktif. Yang dibaca adalah nilainya saat `run()` dipanggil,
 * bukan saat composable-nya dibuat.
 */
import { getCurrentScope, onScopeDispose, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface UseDebounceFnOptions {
  /** Invoke once on the leading edge, before the wait starts. Default: false. */
  leading?: boolean
  /** Invoke on the trailing edge of the wait. Default: true. */
  trailing?: boolean
}

/**
 * @param fn The function to debounce.
 * @param wait Delay in milliseconds; may be reactive. Default: 1000.
 * @param options Leading and trailing edge behaviour.
 */
export function useDebounceFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: MaybeRefOrGetter<number> = 1000,
  options: UseDebounceFnOptions = {},
) {
  const { leading = false, trailing = true } = options

  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<Fn> | undefined

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  /** Discards the pending call; calls that already ran are not undone. */
  const cancel = () => {
    clearTimer()
    lastArgs = undefined
  }

  /** Runs the pending call immediately, without waiting for the delay. */
  const flush = () => {
    if (timer === undefined || !lastArgs)
      return
    const pendingArgs = lastArgs
    cancel()
    fn(...pendingArgs)
  }

  const run = (...args: Parameters<Fn>) => {
    // Dibaca sebelum timernya dihentikan: yang menentukan panggilan ini "awal"
    // adalah tidak adanya timer yang sedang berjalan, bukan keadaan sesudahnya.
    const isLeading = timer === undefined

    clearTimer()
    lastArgs = args

    if (leading && isLeading) {
      lastArgs = undefined
      fn(...args)
    }

    timer = setTimeout(() => {
      timer = undefined
      if (trailing && lastArgs) {
        const pendingArgs = lastArgs
        lastArgs = undefined
        fn(...pendingArgs)
      }
    }, toValue(wait))
  }

  if (getCurrentScope())
    onScopeDispose(cancel)

  return {
    /** Schedules `fn` with these arguments, restarting the delay. */
    run,
    /** Drops the pending call. */
    cancel,
    /** Runs the pending call now. */
    flush,
  }
}
