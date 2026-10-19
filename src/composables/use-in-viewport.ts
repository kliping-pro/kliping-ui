/**
 * Apakah sebuah elemen sedang terlihat di layar.
 *
 * `IntersectionObserver`, bukan menghitung posisi saat scroll. Bedanya bukan
 * gaya: menghitung posisi berarti bekerja di setiap peristiwa scroll, di utas
 * utama, untuk setiap elemen yang dipantau. `IntersectionObserver` dikerjakan
 * peramban di luar itu dan cuma memanggil balik saat keadaannya benar-benar
 * berubah.
 *
 * Ini yang dipakai untuk memuat gambar saat mendekat, menandai bagian aktif di
 * daftar isi, dan memuat halaman berikutnya saat dasar daftar tersentuh.
 */
import { getCurrentScope, onScopeDispose, ref, watch } from 'vue'
import { getTargetElement } from '@/lib/target'
import type { BasicTarget } from '@/lib/target'

export interface UseInViewportOptions {
  /** Margin around the root, as CSS (e.g. `"0px 0px -20% 0px"`); grows or shrinks the visible area. */
  rootMargin?: string
  /** Visible fraction (0–1), or list of fractions, at which `ratio` updates. */
  threshold?: number | number[]
  /** Element treated as the "screen". Leave empty for the viewport. */
  root?: BasicTarget
  /** Called with each IntersectionObserver entry. */
  callback?: (entry: IntersectionObserverEntry) => void
}

/**
 * @param target Element, or list of elements, to observe.
 * @param options Observer settings.
 */
export function useInViewport(
  target: BasicTarget | BasicTarget[],
  options: UseInViewportOptions = {},
) {
  const { rootMargin, threshold, root, callback } = options

  const inViewport = ref<boolean | undefined>(undefined)
  const ratio = ref<number | undefined>(undefined)

  let observer: IntersectionObserver | undefined

  const teardown = () => {
    observer?.disconnect()
    observer = undefined
  }

  const stopWatch = watch(
    () => {
      const targets = Array.isArray(target) ? target : [target]
      return targets.map(t => getTargetElement(t))
    },
    (elements) => {
      teardown()

      const present = elements.filter(Boolean) as Element[]
      if (!present.length || typeof IntersectionObserver === 'undefined')
        return

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratio.value = entry.intersectionRatio
            inViewport.value = entry.isIntersecting
            callback?.(entry)
          }
        },
        {
          rootMargin,
          threshold,
          root: getTargetElement(root) as Element | null ?? null,
        },
      )

      for (const el of present)
        observer.observe(el)
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope())
    onScopeDispose(stop)

  return {
    /** Whether the target is in view; `undefined` until first observed. Reactive. */
    inViewport,
    /** Visible fraction of the target, 0–1. Reactive. */
    ratio,
    /** Stops observing. */
    stop: stop,
  }
}
