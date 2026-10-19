/**
 * Menjalankan sesuatu berulang kali, dengan jeda yang boleh berubah.
 *
 * Bedanya dari `setInterval` telanjang ada tiga, dan ketiganya sering jadi
 * sumber cacat: timernya ikut mati bersama scope, jedanya bisa diganti tanpa
 * memasang ulang, dan `null` menghentikannya tanpa perlu cabang `if` di
 * pemanggilnya.
 *
 * `delay` berupa `null` atau angka negatif berarti berhenti. Itu yang membuat
 * pola "jalan hanya saat tab terlihat" jadi satu baris:
 *
 * ```ts
 * const terlihat = useDocumentVisibility()
 * useInterval(muatUlang, () => (terlihat.value === 'visible' ? 5000 : null))
 * ```
 */
import { getCurrentScope, onScopeDispose, readonly, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'

export interface UseIntervalOptions {
  /** Run once immediately, before the first delay elapses. */
  immediate?: boolean
}

/**
 * @param fn Function called on every tick.
 * @param delay Milliseconds between ticks; `null` or a negative number pauses. May be reactive.
 * @param options Interval settings.
 */
export function useInterval(
  fn: () => void,
  delay: MaybeRefOrGetter<number | null> = 1000,
  options: UseIntervalOptions = {},
) {
  const { immediate = false } = options

  const isActive = ref(false)
  let timer: ReturnType<typeof setInterval> | undefined

  const pause = () => {
    if (timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
    isActive.value = false
  }

  const start = (interval: number) => {
    pause()
    // Di server tidak ada yang menonton, dan timer yang dibuat di sana membuat
    // event loop Node tidak pernah kosong — `vitepress build` menggantung
    // selamanya tanpa satu pun pesan galat. Ditemukan persis begitu.
    if (!isBrowser)
      return
    if (immediate)
      fn()
    timer = setInterval(fn, interval)
    isActive.value = true
  }

  const resume = () => {
    const interval = toValue(delay)
    if (typeof interval === 'number' && interval >= 0)
      start(interval)
  }

  watch(
    () => toValue(delay),
    (interval) => {
      if (typeof interval !== 'number' || interval < 0) {
        pause()
        return
      }
      start(interval)
    },
    { immediate: true },
  )

  if (getCurrentScope())
    onScopeDispose(pause)

  return {
    /** Whether the interval is running. Reactive. */
    isActive: readonly(isActive),
    /** Stops the interval. */
    pause,
    /** Restarts the interval with the current delay. */
    resume,
  }
}
