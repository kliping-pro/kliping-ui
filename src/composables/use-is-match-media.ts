/**
 * Apakah sebuah kueri media sedang cocok.
 *
 * Kuerinya boleh reaktif — pendengarnya dipasang ulang kalau kuerinya berganti,
 * dan yang lama dilepas lebih dulu.
 *
 * `false` saat dirender di server. Itu berarti tata letak yang bergantung pada
 * composable ini akan sempat menggambar keadaan "tidak cocok" sebelum
 * diperbaiki di peramban. Untuk hal yang tidak boleh berkedip seperti itu,
 * kueri media di CSS tetap jawaban yang lebih baik — composable ini untuk
 * keputusan yang tidak bisa diambil CSS, misalnya memilih komponen mana yang
 * dipasang.
 */
import { getCurrentScope, onScopeDispose, readonly, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'

/**
 * @param query CSS media query, e.g. `(min-width: 768px)`. May be reactive.
 * @returns Whether the query currently matches. Reactive, read-only.
 */
export function useIsMatchMedia(query: MaybeRefOrGetter<string>) {
  const matches = ref(false)
  let detach: (() => void) | undefined

  const teardown = () => {
    detach?.()
    detach = undefined
  }

  const stopWatch = watch(
    () => toValue(query),
    (mediaQuery) => {
      teardown()
      if (!isBrowser || typeof window.matchMedia !== 'function')
        return

      const mediaQueryList = window.matchMedia(mediaQuery)
      matches.value = mediaQueryList.matches

      const handler = (event: MediaQueryListEvent) => {
        matches.value = event.matches
      }

      mediaQueryList.addEventListener('change', handler)
      detach = () => mediaQueryList.removeEventListener('change', handler)
    },
    { immediate: true },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope())
    onScopeDispose(stop)

  return readonly(matches)
}
