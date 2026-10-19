/**
 * Elemen yang sedang menerima fokus.
 *
 * Dipantau lewat `focus` dan `blur` pada fase **capture**. Itu bukan detail
 * gaya: keduanya tidak menggelembung, jadi pendengar biasa di `window` tidak
 * akan pernah mendengarnya sama sekali.
 *
 * `blur` diabaikan kalau `relatedTarget` terisi — artinya fokusnya cuma pindah
 * ke elemen lain, dan `focus` berikutnya sudah akan melaporkannya. Yang
 * ditangani di sini adalah fokus yang benar-benar keluar dari halaman.
 */
import { getCurrentScope, onScopeDispose, readonly, shallowRef } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export interface UseActiveElementOptions {
  /** Descend into open shadow roots. Default: true. */
  deep?: boolean
  /** Re-check when DOM nodes are removed. Default: false. */
  triggerOnRemoval?: boolean
}

function findActiveElement(deep: boolean): Element | null {
  if (!isBrowser)
    return null

  let active: Element | null = document.activeElement
  if (!deep)
    return active

  while (active?.shadowRoot?.activeElement)
    active = active.shadowRoot.activeElement

  return active
}

/**
 * @param options Whether to look inside shadow roots and react to the focused element being removed.
 * @returns Reactive, read-only focused element; `null` when nothing is focused.
 */
export function useActiveElement(options: UseActiveElementOptions = {}) {
  const { deep = true, triggerOnRemoval = false } = options

  // Sengaja tidak dibaca saat setup: di server tidak ada `document`, dan di
  // peramban gambaran pertama harus sama dengan yang dari server.
  const active = shallowRef<Element | null>(null)

  const update = () => {
    active.value = findActiveElement(deep)
  }

  useEventListener('focus', update, { capture: true })
  useEventListener('blur', (event: FocusEvent) => {
    if (event.relatedTarget !== null)
      return
    update()
  }, { capture: true })

  let observer: MutationObserver | undefined

  tryOnMounted(() => {
    update()

    if (!triggerOnRemoval || typeof MutationObserver === 'undefined')
      return

    observer = new MutationObserver(update)
    observer.observe(document, { childList: true, subtree: true })
  })

  // Pengamatnya bukan pendengar peristiwa, jadi tidak ikut terlepas oleh
  // `useEventListener` di atas. Pelepasannya disebut sendiri, di scope — bukan
  // di `onUnmounted`, supaya tetap bekerja saat dipanggil dari `effectScope`.
  if (getCurrentScope())
    onScopeDispose(() => observer?.disconnect())

  return readonly(active)
}
