/**
 * Bagian `#` dari alamat halaman, yang bisa dibaca dan ditulis.
 *
 * Menulis ke sini mengubah alamatnya, dan itu memicu `hashchange` yang lalu
 * membaca balik nilainya — jadi satu sumber kebenaran, bukan dua yang harus
 * dijaga tetap sama. Perubahan dari luar (tombol kembali, tautan `#bagian`,
 * kode lain) ikut terbaca tanpa perlakuan khusus.
 *
 * Kosong saat dirender di server: di sana tidak ada alamat yang bisa dibaca,
 * dan `#` memang tidak pernah dikirim ke server oleh peramban mana pun.
 */
import { customRef } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export function useHash() {
  let value = ''
  let notify: (() => void) | undefined

  const read = () => (isBrowser ? window.location.hash : '')

  const update = () => {
    const next = read()
    if (next === value)
      return
    value = next
    notify?.()
  }

  const hash = customRef<string>((track, trigger) => {
    notify = trigger
    return {
      get() {
        track()
        return value
      },
      set(next) {
        if (!isBrowser) {
          value = next
          trigger()
          return
        }
        // Ditulis ke alamatnya, bukan ke variabelnya. `hashchange` yang
        // menyusul akan membaca balik dan menyalakan pemberitahuannya, jadi
        // nilai ini tidak pernah bisa menyimpang dari alamat yang sebenarnya.
        window.location.hash = next
      },
    }
  })

  tryOnMounted(update)
  useEventListener('hashchange', update)

  return hash
}
