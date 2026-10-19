/**
 * Menjalankan sesuatu setiap kali ada klik di mana pun di halaman.
 *
 * Setipis di sumbernya: satu pemanggilan `useEventListener` ke `window`. Tetap
 * dikirim sebagai item tersendiri karena namanya menyebut maksudnya, dan yang
 * membacanya di tempat pemakaian langsung tahu cakupannya seluruh halaman —
 * bukan sebuah elemen yang kebetulan tidak disebutkan.
 */
import { useEventListener } from '@/composables/use-event-listener'

/**
 * @param handler Called with every click anywhere on the page.
 * @returns Removes the listener.
 */
export function useClickAnyWhere(handler: (event: MouseEvent) => void) {
  return useEventListener('click', handler)
}
