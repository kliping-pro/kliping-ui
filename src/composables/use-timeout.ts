/**
 * Menjalankan sesuatu sekali, setelah jeda.
 *
 * Timernya dipasang begitu composable-nya dipanggil, sama seperti sumbernya,
 * dan ikut dibatalkan saat scope-nya mati. `start()` memasang ulang dari awal —
 * berguna untuk pola "sembunyikan pesan tiga detik setelah kemunculan
 * terakhirnya", di mana tiap kemunculan baru harus menyetel ulang hitungannya.
 *
 * `delay` negatif berarti jangan dijalankan sama sekali.
 */
import { getCurrentScope, onScopeDispose, readonly, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'

/**
 * @param fn Function called once after the delay.
 * @param delay Milliseconds to wait; a negative value does nothing. May be reactive; changing it restarts the timer.
 */
export function useTimeout(
  fn: () => void,
  delay: MaybeRefOrGetter<number> = 0,
) {
  const isPending = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const stop = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
    isPending.value = false
  }

  const start = () => {
    stop()
    // Lihat catatan yang sama di `use-interval`: timer yang dibuat saat render
    // server menahan proses build-nya tetap hidup.
    if (!isBrowser)
      return

    const ms = toValue(delay)
    if (ms < 0)
      return

    isPending.value = true
    timer = setTimeout(() => {
      timer = undefined
      isPending.value = false
      fn()
    }, ms)
  }

  watch(() => toValue(delay), start, { immediate: true })

  if (getCurrentScope())
    onScopeDispose(stop)

  return {
    /** Whether the timer is running. Reactive. */
    isPending: readonly(isPending),
    /** Starts, or restarts, the timer. */
    start,
    /** Cancels the timer. */
    stop,
  }
}
