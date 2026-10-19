/**
 * Apakah tab-nya sedang dilihat.
 *
 * Dipakai untuk berhenti bekerja saat tidak ada yang melihat: hentikan polling,
 * jeda animasi, tunda muat ulang. Berpasangan rapi dengan `useInterval`, yang
 * berhenti kalau jedanya `null`:
 *
 * ```ts
 * const terlihat = useDocumentVisibility()
 * useInterval(muatUlang, () => (terlihat.value === 'visible' ? 5000 : null))
 * ```
 *
 * Nilainya `visible` saat dirender di server — bukan tebakan, melainkan satu-
 * satunya jawaban yang membuat HTML server dan gambaran pertama di peramban
 * cocok untuk tab yang memang sedang dibuka.
 */
import { readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

/**
 * @returns Reactive, read-only `document.visibilityState`: `visible` or `hidden`.
 */
export function useDocumentVisibility() {
  const visibility = ref<DocumentVisibilityState>('visible')

  const update = () => {
    if (isBrowser)
      visibility.value = document.visibilityState
  }

  tryOnMounted(update)
  useEventListener('visibilitychange', update, {
    target: isBrowser ? document : undefined,
    passive: true,
  })

  return readonly(visibility)
}
